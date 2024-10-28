document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const componentCount = parseInt(document.getElementById('component-count').value);
        const materialLevel = document.querySelector('input[name="material-level"]:checked').value;
        const craftLevel = document.querySelector('input[name="craft-level"]:checked').value;
        const customFunction = document.getElementById('custom-function').checked;

        // 修改难度系数计算方式：取整(BOM数量/5)
        const difficultyCoefficent = Math.floor(componentCount / 5);

        // 获取材料级别系数
        const materialLevelCoefficent = materialLevel === 'industrial' ? 
            parseFloat(document.getElementById('industrial-coefficient').value) : 
            parseFloat(document.getElementById('military-coefficient').value);

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

        // 获取特殊要求系数
        let specialRequirementCoefficent = 1;
        if (customFunction) {
            specialRequirementCoefficent *= parseFloat(document.getElementById('custom-function-coefficient').value);
        }

        // 计算总工资：取整(BOM数量/5)*材料级别*制作工艺等级*特殊要求
        const totalWage = difficultyCoefficent * materialLevelCoefficent * craftLevelCoefficent * specialRequirementCoefficent;

        // 计算工序1（60%）和工序2（40%）的工资
        const wage1 = (totalWage * 0.6).toFixed(2);
        const wage2 = (totalWage * 0.4).toFixed(2);

        return { total: totalWage.toFixed(2), wage1, wage2 };
    }

    function updateResult() {
        if (form.checkValidity()) {
            const wages = calculateWage();
            resultElement.innerHTML = `
                <p>计算结果：</p>
                <p>总工资：${wages.total} 元</p>
                <p>工序1（焊接，灌胶，老化）：${wages.wage1} 元</p>
                <p>工序2（安装，调试，包装）：${wages.wage2} 元</p>
            `;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    form.addEventListener('input', updateResult);
    form.addEventListener('change', updateResult);
    
    // 初始化时触发一次计算
    updateResult();
});
