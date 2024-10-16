document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const standardHourlyRate = parseFloat(document.getElementById('standardHourlyRate').value);
        const unitPower = parseFloat(document.getElementById('unit-power').value);
        const productType = document.querySelector('input[name="product-type"]:checked').value;
        const unitType = document.querySelector('input[name="unit-type"]:checked').value;
        const unitDifficulty = document.querySelector('input[name="unit-difficulty"]:checked').value;

        // 计算难度系数
        let difficultyCoefficent;
        if (unitPower < 100) {
            difficultyCoefficent = 8;
        } else if (unitPower < 300) {
            difficultyCoefficent = 10;
        } else if (unitPower < 600) {
            difficultyCoefficent = 12;
        } else {
            difficultyCoefficent = 15;
        }

        // 获取产品类型系数
        const productTypeCoefficent = productType === 'diesel' ? 
            parseFloat(document.getElementById('diesel-coefficient').value) : 
            parseFloat(document.getElementById('electric-coefficient').value);

        // 获取机组类型系数
        let unitTypeCoefficent;
        switch (unitType) {
            case 'fixed':
                unitTypeCoefficent = parseFloat(document.getElementById('fixed-coefficient').value);
                break;
            case 'mobile':
                unitTypeCoefficent = parseFloat(document.getElementById('mobile-coefficient').value);
                break;
            case 'box-installation':
                unitTypeCoefficent = parseFloat(document.getElementById('box-installation-coefficient').value);
                break;
        }

        // 获取机组难度系数
        let unitDifficultyCoefficent;
        switch (unitDifficulty) {
            case 'simple':
                unitDifficultyCoefficent = parseFloat(document.getElementById('simple-coefficient').value);
                break;
            case 'medium':
                unitDifficultyCoefficent = parseFloat(document.getElementById('medium-coefficient').value);
                break;
            case 'complex':
                unitDifficultyCoefficent = parseFloat(document.getElementById('complex-coefficient').value);
                break;
        }

        // 计算工资
        const wage = standardHourlyRate * difficultyCoefficent * productTypeCoefficent * unitTypeCoefficent * unitDifficultyCoefficent;

        return wage.toFixed(2); // 保留两位小数
    }

    function updateResult() {
        if (form.checkValidity()) {
            const wage = calculateWage();
            resultElement.textContent = `计算结果：${wage} 元`;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    form.addEventListener('input', updateResult);
    form.addEventListener('change', updateResult);
});
