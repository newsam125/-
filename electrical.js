document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const standardHourlyRate = parseFloat(document.getElementById('standardHourlyRate').value);
        const wireCount = parseInt(document.getElementById('wire-count').value);
        const cabinetSize = document.querySelector('input[name="cabinet-size"]:checked').value;
        const productCategory = document.querySelector('input[name="electrical-product-type"]:checked').value;

        // 计算难度系数
        const difficultyCoefficent = Math.ceil(wireCount / 30);

        // 获取柜体大小系数
        let cabinetSizeCoefficent;
        switch (cabinetSize) {
            case 'small':
                cabinetSizeCoefficent = parseFloat(document.getElementById('small-coefficient').value);
                break;
            case 'medium':
                cabinetSizeCoefficent = parseFloat(document.getElementById('medium-coefficient').value);
                break;
            case 'large':
                cabinetSizeCoefficent = parseFloat(document.getElementById('large-coefficient').value);
                break;
        }

        // 获取产品分类系数
        let productCategoryCoefficent;
        switch (productCategory) {
            case 'normal':
                productCategoryCoefficent = parseFloat(document.getElementById('normal-coefficient').value);
                break;
            case 'technical-reform':
                productCategoryCoefficent = parseFloat(document.getElementById('technical-reform-coefficient').value);
                break;
            case 'maintenance':
                productCategoryCoefficent = parseFloat(document.getElementById('maintenance-coefficient').value);
                break;
        }

        // 计算工资
        const wage = standardHourlyRate * difficultyCoefficent * cabinetSizeCoefficent * productCategoryCoefficent;

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
