document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const standardHourlyRate = parseFloat(document.getElementById('standardHourlyRate').value);
        const componentCount = parseInt(document.getElementById('component-count').value);
        const productType = document.querySelector('input[name="product-type"]:checked').value;
        const productCategory = document.querySelector('input[name="electronic-product-type"]:checked').value;

        // 计算难度系数
        const difficultyCoefficent = Math.ceil(componentCount / 30);

        // 确定产品类型系数
        const productTypeCoefficent = productType === 'industrial' ? 1.5 : 2;

        // 确定产品分类系数
        let productCategoryCoefficent;
        switch (productCategory) {
            case 'normal': productCategoryCoefficent = 1; break;
            case 'technical-reform': productCategoryCoefficent = 1.5; break;
            case 'maintenance': productCategoryCoefficent = 2; break;
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