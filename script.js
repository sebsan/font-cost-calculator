document.addEventListener('DOMContentLoaded', () => {
    // Get references to all relevant DOM elements
    const characterSetCheckboxes = document.querySelectorAll('.character-set-section input[type="checkbox"]');
    const complexityDropdown = document.getElementById('complexity');
    const numMastersDropdown = document.getElementById('numMasters'); // Correct reference
    const numWeightsInput = document.getElementById('numWeights');
    const decrementWeightsBtn = document.getElementById('decrementWeights');
    const incrementWeightsBtn = document.getElementById('incrementWeights');
    const exclusivityDropdown = document.getElementById('exclusivity');

    const italicStyleCheckbox = document.getElementById('italicStyle');
    const slantedStyleCheckbox = document.getElementById('slantedStyle');

    const outputBaseCostElem = document.getElementById('outputBaseCost');
    const selectedCharactersList = document.getElementById('selectedCharactersList');
    const outputComplexityMultiplierElem = document.getElementById('outputComplexityMultiplier');
    const outputMastersMultiplierElem = document.getElementById('outputMastersMultiplier'); // Ensure this is correctly declared and used
    const outputWeightsMultiplierElem = document.getElementById('outputWeightsMultiplier');
    const outputExclusivityMultiplierElem = document.getElementById('outputExclusivityMultiplier');
    const totalCostElem = document.getElementById('totalCost');

    const outputItalicMultiplierElem = document.getElementById('outputItalicMultiplier');
    const outputSlantedMultiplierElem = document.getElementById('outputSlantedMultiplier');


    // Initial calculation when the page loads
    calculateTotalCost();

    // Add event listeners for checkboxes and dropdowns
    characterSetCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalCost);
    });
    complexityDropdown.addEventListener('change', calculateTotalCost);
    numMastersDropdown.addEventListener('change', calculateTotalCost); // This listener is correct
    exclusivityDropdown.addEventListener('change', calculateTotalCost);

    // Add event listeners for the stepper buttons
    decrementWeightsBtn.addEventListener('click', () => {
        let currentValue = parseInt(numWeightsInput.value);
        if (currentValue > parseInt(numWeightsInput.min)) {
            numWeightsInput.value = currentValue - 1;
            calculateTotalCost();
        }
    });

    incrementWeightsBtn.addEventListener('click', () => {
        let currentValue = parseInt(numWeightsInput.value);
        if (currentValue < parseInt(numWeightsInput.max)) {
            numWeightsInput.value = currentValue + 1;
            calculateTotalCost();
        }
    });

    // Add event listeners for Italic and Slanted checkboxes
    italicStyleCheckbox.addEventListener('change', calculateTotalCost);
    slantedStyleCheckbox.addEventListener('change', calculateTotalCost);


    function calculateTotalCost() {
        let baseCost = 0;
        let selectedCharsHtml = '';

        // Calculate Base Cost from Character Set checkboxes
        characterSetCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const cost = parseFloat(checkbox.dataset.cost);
                baseCost += cost;
                selectedCharsHtml += `<li>${checkbox.labels[0].textContent} (€${cost.toLocaleString()})</li>`;
            }
        });

        outputBaseCostElem.textContent = `€${baseCost.toLocaleString()}`;
        selectedCharactersList.innerHTML = selectedCharsHtml === '' ? '<li>None selected</li>' : selectedCharsHtml;

        // Get multipliers from dropdowns/inputs
        const complexityMultiplier = parseFloat(complexityDropdown.value);
        const mastersMultiplier = parseFloat(numMastersDropdown.value); // This value is correctly retrieved
        const currentWeightsValue = parseInt(numWeightsInput.value);
        const weightsMultiplier = (currentWeightsValue - 1) * 0.03;
        const exclusivityMultiplier = parseFloat(exclusivityDropdown.value);

        const italicMultiplier = italicStyleCheckbox.checked ? parseFloat(italicStyleCheckbox.dataset.multiplier) : 0.0;
        const slantedMultiplier = slantedStyleCheckbox.checked ? parseFloat(slantedStyleCheckbox.dataset.multiplier) : 0.0;

        // Update multiplier displays
        outputComplexityMultiplierElem.textContent = complexityMultiplier.toFixed(1);
        outputMastersMultiplierElem.textContent = mastersMultiplier.toFixed(1); // Ensure this line is present and correct
        outputWeightsMultiplierElem.textContent = weightsMultiplier.toFixed(2);
        outputItalicMultiplierElem.textContent = italicMultiplier.toFixed(1);
        outputSlantedMultiplierElem.textContent = slantedMultiplier.toFixed(1);
        outputExclusivityMultiplierElem.textContent = exclusivityMultiplier.toFixed(2);


        // Calculate Total Multiplier
        const totalMultiplier = 1
                               + complexityMultiplier
                               + mastersMultiplier
                               + weightsMultiplier
                               + italicMultiplier
                               + slantedMultiplier
                               + exclusivityMultiplier;

        const finalCost = baseCost * totalMultiplier;

        totalCostElem.textContent = `€${finalCost.toLocaleString()}`;
    }
});