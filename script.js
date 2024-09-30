window.onerror = function(message, source, lineno, colno, error) {
    console.error("JavaScript错误: ", message, "在文件", source, "第", lineno, "行");
    return true;
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    const productCategoryRadios = document.getElementsByName('product-category');
    const electronicFields = document.getElementById('electronic-fields');
    const electricalFields = document.getElementById('electrical-fields');
    const powerFields = document.getElementById('power-fields');
    const resultElement = document.getElementById('result');

    function toggleFields() {
        const selectedCategory = document.querySelector('input[name="product-category"]:checked').value;
        electronicFields.style.display = selectedCategory === 'electronic' ? 'block' : 'none';
        electricalFields.style.display = selectedCategory === 'electrical' ? 'block' : 'none';
        powerFields.style.display = selectedCategory === 'power' ? 'block' : 'none';
    }

    productCategoryRadios.forEach(radio => {
        radio.addEventListener('change', toggleFields);
    });
    toggleFields(); // 初始化字段显示状态

    // 添加计算工资的函数
    function calculateWage() {
        const standardHourlyRate = parseFloat(document.getElementById('standardHourlyRate').value);
        const componentCount = parseInt(document.getElementById('component-count').value);
        const productType = document.querySelector('input[name="product-type"]:checked').value;
        const productCategory = document.querySelector('input[name="electronic-product-type"]:checked').value;

        // 计算难度系数
        const difficultyCoefficent = Math.ceil(componentCount / 25);

        // 确定产品类型系数
        const productTypeCoefficent = productType === 'industrial' ? 1 : 1.5;

        // 确定产品分类系数
        let productCategoryCoefficent;
        switch (productCategory) {
            case 'normal':
                productCategoryCoefficent = 1;
                break;
            case 'technical-reform':
                productCategoryCoefficent = 1.5;
                break;
            case 'maintenance':
                productCategoryCoefficent = 2;
                break;
        }

        // 计算工资
        const wage = standardHourlyRate * difficultyCoefficent * productTypeCoefficent * productCategoryCoefficent;

        return wage.toFixed(2); // 保留两位小数
    }

    // 添加实时计算功能
    const form = document.getElementById('wage-form');
    const inputs = form.querySelectorAll('input');

    function updateResult() {
        if (form.checkValidity()) {
            const wage = calculateWage();
            console.log('计算的工资：', wage);
            resultElement.textContent = `计算结果：${wage} 元`;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', updateResult);
        input.addEventListener('change', updateResult);
    });

    // 初始化结果显示
    updateResult();
});