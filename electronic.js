document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const standardHourlyRate = parseFloat(document.getElementById('standardHourlyRate').value);
        const componentCount = parseInt(document.getElementById('component-count').value);
        const productType = document.querySelector('input[name="product-type"]:checked').value;
        const productCategory = document.querySelector('input[name="electronic-product-type"]:checked').value;

        // 计算难度系数
        const difficultyCoefficent = Math.ceil(componentCount / 25);

        // 获取产品类型系数
        let productTypeCoefficent;
        if (productType === 'industrial') {
            productTypeCoefficent = parseFloat(document.getElementById('industrial-coefficient').value);
        } else {
            productTypeCoefficent = parseFloat(document.getElementById('military-coefficient').value);
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
        const wage = standardHourlyRate * difficultyCoefficent * productTypeCoefficent * productCategoryCoefficent;

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
