document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const componentCount = parseInt(document.getElementById('component-count').value);
        const unitPower = parseFloat(document.getElementById('unit-power').value);
        const craftLevel = document.querySelector('input[name="craft-level"]:checked').value;
        const driveType = document.querySelector('input[name="drive-type"]:checked').value;
        const installationType = document.querySelector('input[name="installation-type"]:checked').value;
        const customFunction = document.getElementById('custom-function').checked;
        const testType = document.querySelector('input[name="test-type"]:checked').value;

        // 计算难度系数
        const difficultyCoefficent1 = Math.ceil(componentCount / 10);
        const difficultyCoefficent2 = Math.ceil(unitPower / 75);

        // 获取制作工艺等级系数
        let craftLevelCoefficent;
        switch (craftLevel) {
            case 'sample':
                craftLevelCoefficent = parseFloat(document.getElementById('sample-coefficient').value);
                break;
            case 'regular':
                craftLevelCoefficent = parseFloat(document.getElementById('regular-coefficient').value);
                break;
            case 'technical-reform':
                craftLevelCoefficent = parseFloat(document.getElementById('technical-reform-coefficient').value);
                break;
            case 'maintenance':
                craftLevelCoefficent = parseFloat(document.getElementById('maintenance-coefficient').value);
                break;
        }

        // 获取驱动类型系数
        const driveTypeCoefficent = driveType === 'diesel' ? 
            parseFloat(document.getElementById('diesel-coefficient').value) : 
            parseFloat(document.getElementById('electric-coefficient').value);

        // 获取安装方式系数
        let installationTypeCoefficent;
        switch (installationType) {
            case 'fixed':
                installationTypeCoefficent = parseFloat(document.getElementById('fixed-coefficient').value);
                break;
            case 'mobile':
                installationTypeCoefficent = parseFloat(document.getElementById('mobile-coefficient').value);
                break;
            case 'box':
                installationTypeCoefficent = parseFloat(document.getElementById('box-coefficient').value);
                break;
        }

        // 获取特殊要求系数
        let specialRequirementCoefficent = 1;
        if (customFunction) {
            specialRequirementCoefficent *= parseFloat(document.getElementById('custom-function-coefficient').value);
        }

        // 获取试验方式系数
        const testTypeCoefficent = testType === 'factory' ? 
            parseFloat(document.getElementById('factory-test-coefficient').value) : 
            parseFloat(document.getElementById('certification-test-coefficient').value);

        // 计算总工资
        const totalWage = difficultyCoefficent1 * difficultyCoefficent2 * craftLevelCoefficent * driveTypeCoefficent * 
                          installationTypeCoefficent * specialRequirementCoefficent * testTypeCoefficent;

        // 计算工序1和工序2的工资
        const wage1 = (totalWage * 0.7).toFixed(2);
        const wage2 = (totalWage * 0.3).toFixed(2);

        return { total: totalWage.toFixed(2), wage1, wage2 };
    }

    function updateResult() {
        if (form.checkValidity()) {
            const wages = calculateWage();
            resultElement.innerHTML = `
                <p>计算结果：</p>
                <p>总工资：${wages.total} 元</p>
                <p>工序1（安装，布管布线）：${wages.wage1} 元</p>
                <p>工序2（试验，喷漆，包装）：${wages.wage2} 元</p>
            `;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    form.addEventListener('input', updateResult);
    form.addEventListener('change', updateResult);
});
