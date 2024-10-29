document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wage-form');
    const resultElement = document.getElementById('result');

    function calculateWage() {
        const bomDifficultyLevel = document.querySelector('input[name="bom-difficulty"]:checked').value;
        const wireDifficultyLevel = document.querySelector('input[name="wire-difficulty"]:checked').value;
        const craftLevel = document.querySelector('input[name="craft-level"]:checked').value;
        const cabinetSize = document.querySelector('input[name="cabinet-size"]:checked').value;
        const customFunction = document.getElementById('custom-function').checked;

        // 获取BOM复杂度系数
        let bomDifficulty;
        let bomDifficultyFormula = '';
        switch (bomDifficultyLevel) {
            case 'simple':
                bomDifficulty = parseFloat(document.getElementById('bom-simple-coefficient').value);
                bomDifficultyFormula = `BOM复杂度（简单：≤1000）= ${bomDifficulty}`;
                break;
            case 'normal':
                bomDifficulty = parseFloat(document.getElementById('bom-normal-coefficient').value);
                bomDifficultyFormula = `BOM复杂度（普通：1000<BOM≤2000）= ${bomDifficulty}`;
                break;
            case 'complex':
                bomDifficulty = parseFloat(document.getElementById('bom-complex-coefficient').value);
                bomDifficultyFormula = `BOM复杂度（复杂：>2000）= ${bomDifficulty}`;
                break;
        }

        // 获取接线难度系数
        let wireDifficulty;
        let wireDifficultyFormula = '';
        switch (wireDifficultyLevel) {
            case 'simple':
                wireDifficulty = parseFloat(document.getElementById('simple-coefficient').value);
                wireDifficultyFormula = `接线难度（简单：≤200）= ${wireDifficulty}`;
                break;
            case 'normal':
                wireDifficulty = parseFloat(document.getElementById('normal-coefficient').value);
                wireDifficultyFormula = `接线难度（普通：200<接线数≤900）= ${wireDifficulty}`;
                break;
            case 'complex':
                wireDifficulty = parseFloat(document.getElementById('complex-coefficient').value);
                wireDifficultyFormula = `接线难度（复杂：>900）= ${wireDifficulty}`;
                break;
        }

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

        // 获取尺寸系数
        let sizeCoefficent;
        switch (cabinetSize) {
            case 'small':
                sizeCoefficent = parseFloat(document.getElementById('small-coefficient').value);
                break;
            case 'medium':
                sizeCoefficent = parseFloat(document.getElementById('medium-coefficient').value);
                break;
            case 'large':
                sizeCoefficent = parseFloat(document.getElementById('large-coefficient').value);
                break;
        }

        // 获取特殊要求系数
        let specialRequirementCoefficent = 1;
        if (customFunction) {
            specialRequirementCoefficent *= parseFloat(document.getElementById('custom-function-coefficient').value);
        }

        // 计算总工资
        const totalWage = bomDifficulty * wireDifficulty * craftLevelCoefficent * 
                         sizeCoefficent * specialRequirementCoefficent;
        
        const finalFormula = `计件工资 = ${bomDifficulty} × ${wireDifficulty} × ${craftLevelCoefficent} × ${sizeCoefficent} × ${specialRequirementCoefficent} = ${totalWage.toFixed(2)}`;

        // 计算工序1（70%）和工序2（30%）的工资
        const wage1 = (totalWage * 0.7).toFixed(2);
        const wage2 = (totalWage * 0.3).toFixed(2);

        return { 
            total: totalWage.toFixed(2), 
            wage1, 
            wage2,
            formulas: {
                bomDifficulty: bomDifficultyFormula,
                wireDifficulty: wireDifficultyFormula,
                final: finalFormula
            }
        };
    }

    function updateResult() {
        if (form.checkValidity()) {
            const wages = calculateWage();
            resultElement.innerHTML = `
                <p>计算过程：</p>
                <p>${wages.formulas.bomDifficulty}</p>
                <p>${wages.formulas.wireDifficulty}</p>
                <p>${wages.formulas.final}</p>
                <p>计算结果：</p>
                <p>总工资：${wages.total} 元</p>
                <p>工序1（安装，布线）：${wages.wage1} 元</p>
                <p>工序2（测试，包装）：${wages.wage2} 元</p>
            `;
            resultElement.style.display = 'block';
        } else {
            resultElement.style.display = 'none';
        }
    }

    form.addEventListener('input', updateResult);
    form.addEventListener('change', updateResult);
});
