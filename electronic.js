document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        // 获取BOM复杂度系数
        const bomDifficulty = document.querySelector('input[name="bom-difficulty"]:checked').value;
        let bomCoefficient;
        let bomLevelName;
        switch (bomDifficulty) {
            case 'simple':
                bomCoefficient = parseFloat(document.getElementById('bom-simple-coefficient').value);
                bomLevelName = "简单(≤30)";
                break;
            case 'normal':
                bomCoefficient = parseFloat(document.getElementById('bom-normal-coefficient').value);
                bomLevelName = "普通(30<普通≤80)";
                break;
            case 'medium-complex':
                bomCoefficient = parseFloat(document.getElementById('bom-medium-complex-coefficient').value);
                bomLevelName = "较复杂(80<较复杂≤150)";
                break;
            case 'complex':
                bomCoefficient = parseFloat(document.getElementById('bom-complex-coefficient').value);
                bomLevelName = "复杂(>150)";
                break;
        }

        // 获取制作工艺等级系数
        const craftLevel = document.querySelector('input[name="craft-level"]:checked').value;
        let craftLevelCoefficient;
        let craftLevelName;
        switch (craftLevel) {
            case 'sample':
                craftLevelCoefficient = parseFloat(document.getElementById('sample-coefficient').value);
                craftLevelName = "样品";
                break;
            case 'regular':
                craftLevelCoefficient = parseFloat(document.getElementById('regular-coefficient').value);
                craftLevelName = "常规";
                break;
            case 'technical-reform':
                craftLevelCoefficient = parseFloat(document.getElementById('technical-reform-coefficient').value);
                craftLevelName = "技改";
                break;
            case 'maintenance':
                craftLevelCoefficient = parseFloat(document.getElementById('maintenance-coefficient').value);
                craftLevelName = "维修";
                break;
        }

        // 获取特殊要求系数
        let specialRequirementCoefficient = 1;
        const customFunction = document.getElementById('custom-function').checked;
        if (customFunction) {
            specialRequirementCoefficient *= parseFloat(document.getElementById('custom-function-coefficient').value);
        }

        // 计算计件工资
        const totalWage = bomCoefficient * craftLevelCoefficient * specialRequirementCoefficient;

        return {
            total: totalWage.toFixed(2),
            wage1: (totalWage * 0.6).toFixed(2),
            wage2: (totalWage * 0.4).toFixed(2),
            formula: {
                bomLevelName,
                bomCoefficient,
                craftLevelName,
                craftLevelCoefficient,
                specialRequirementCoefficient
            }
        };
    }

    function updateResult() {
        if (form.checkValidity()) {
            const wages = calculateWage();
            const formula = wages.formula;
            
            resultElement.innerHTML = `
                <p>计算过程：</p>
                <p>1. BOM复杂度：${formula.bomLevelName}</p>
                <p>   系数：${formula.bomCoefficient}</p>
                <p>2. 制作工艺等级：${formula.craftLevelName}</p>
                <p>   系数：${formula.craftLevelCoefficient}</p>
                <p>3. 特殊要求：${formula.specialRequirementCoefficient === 1 ? '无' : '客户定制功能'}</p>
                <p>   系数：${formula.specialRequirementCoefficient}</p>
                <p>4. 计件工资计算公式：</p>
                <p>   计件工资 = BOM复杂度 × 制作工艺等级 × 特殊要求</p>
                <p>   = ${formula.bomCoefficient} × ${formula.craftLevelCoefficient} × ${formula.specialRequirementCoefficient}</p>
                <p>   = ${wages.total}</p>
                <hr>
                <p>工序分配：</p>
                <p>工序1（焊接，灌胶，老化）：${wages.wage1} (60%)</p>
                <p>工序2（安装，调试，包装）：${wages.wage2} (40%)</p>
            `;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    // 添加事件监听器
    form.addEventListener('input', updateResult);
    form.addEventListener('change', updateResult);
    
    // 确保页面加载时选中默认选项并显示结果
    const defaultBomDifficulty = document.querySelector('input[name="bom-difficulty"][value="normal"]');
    if (defaultBomDifficulty) {
        defaultBomDifficulty.checked = true;
    }
    
    // 初始化时触发一次计算
    updateResult();
});
