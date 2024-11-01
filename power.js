document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const powerLevel = document.querySelector('input[name="power-level"]:checked').value;
        const craftLevel = document.querySelector('input[name="craft-level"]:checked').value;
        const driveType = document.querySelector('input[name="drive-type"]:checked').value;
        const installationType = document.querySelector('input[name="installation-type"]:checked').value;
        const customFunction = document.getElementById('custom-function').checked;
        const testType = document.querySelector('input[name="test-type"]:checked').value;

        // 步骤1：功率等级系数
        let powerLevelName;
        let powerCoefficient;
        switch (powerLevel) {
            case 'small':
                powerCoefficient = parseFloat(document.getElementById('small-power-coefficient').value);
                powerLevelName = "小型(≤100kW)";
                break;
            case 'medium':
                powerCoefficient = parseFloat(document.getElementById('medium-power-coefficient').value);
                powerLevelName = "中型(100-150kW)";
                break;
            case 'large':
                powerCoefficient = parseFloat(document.getElementById('large-power-coefficient').value);
                powerLevelName = "大型(150-600kW)";
                break;
            case 'extra-large':
                powerCoefficient = parseFloat(document.getElementById('extra-large-power-coefficient').value);
                powerLevelName = "超大型(>600kW)";
                break;
        }

        // 步骤2：获取制作工艺等级系数
        let craftLevelCoefficent;
        let craftLevelName;
        switch (craftLevel) {
            case 'sample':
                craftLevelCoefficent = parseFloat(document.getElementById('sample-coefficient').value);
                craftLevelName = "样品";
                break;
            case 'regular':
                craftLevelCoefficent = parseFloat(document.getElementById('regular-coefficient').value);
                craftLevelName = "常规";
                break;
            case 'technical-reform':
                craftLevelCoefficent = parseFloat(document.getElementById('technical-reform-coefficient').value);
                craftLevelName = "技改";
                break;
            case 'maintenance':
                craftLevelCoefficent = parseFloat(document.getElementById('maintenance-coefficient').value);
                craftLevelName = "维修";
                break;
            case 'power-pack':
                craftLevelCoefficent = parseFloat(document.getElementById('power-pack-coefficient').value);
                craftLevelName = "动力包";
                break;
        }

        // 步骤3：获取驱动类型系数
        const driveTypeCoefficent = driveType === 'diesel' ? 
            parseFloat(document.getElementById('diesel-coefficient').value) : 
            parseFloat(document.getElementById('electric-coefficient').value);

        // 步骤4：获取安装方式系数
        let installationTypeCoefficent;
        let installationName;
        switch (installationType) {
            case 'fixed':
                installationTypeCoefficent = parseFloat(document.getElementById('fixed-coefficient').value);
                installationName = "固定";
                break;
            case 'mobile':
                installationTypeCoefficent = parseFloat(document.getElementById('mobile-coefficient').value);
                installationName = "移动";
                break;
            case 'box':
                installationTypeCoefficent = parseFloat(document.getElementById('box-coefficient').value);
                installationName = "箱式";
                break;
        }

        // 步骤5：获取特殊要求系数
        let specialRequirementCoefficent = 1;
        if (customFunction) {
            specialRequirementCoefficent *= parseFloat(document.getElementById('custom-function-coefficient').value);
        }

        // 步骤6：获取试验方式系数
        const testTypeCoefficent = testType === 'factory' ? 
            parseFloat(document.getElementById('factory-test-coefficient').value) : 
            parseFloat(document.getElementById('certification-test-coefficient').value);

        // 计算总工资
        const totalWage = powerCoefficient * craftLevelCoefficent * driveTypeCoefficent * 
                         installationTypeCoefficent * specialRequirementCoefficent * testTypeCoefficent;
        const wage1 = (totalWage * 0.7).toFixed(2);
        const wage2 = (totalWage * 0.3).toFixed(2);

        // 构建计算公式字符串
        const formula = `${powerCoefficient} × ${craftLevelCoefficent} × ${driveTypeCoefficent} × ${installationTypeCoefficent} × ${specialRequirementCoefficent} × ${testTypeCoefficent}`;

        return { 
            formula,
            total: totalWage.toFixed(2), 
            wage1, 
            wage2
        };
    }

    function updateResult() {
        if (form.checkValidity()) {
            const result = calculateWage();
            resultElement.innerHTML = `
                <div class="calculation-details">
                    <h3>计算过程:</h3>
                    <p>计件工资 = ${result.formula} = ${result.total}</p>
                </div>
                <div class="calculation-details">
                    <h3>计算结果:</h3>
                    <p>总工资: ${result.total} 元</p>
                    <p>工序1 (安装，布管布线): ${result.wage1} 元</p>
                    <p>工序2 (试验，喷漆，包装): ${result.wage2} 元</p>
                </div>
            `;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    // 添加事件监听器
    form.addEventListener('input', updateResult);
    form.addEventListener('change', updateResult);
});
