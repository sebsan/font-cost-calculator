document.addEventListener('DOMContentLoaded', () => {
    // Get references to all relevant DOM elements
    const characterSetCheckboxes = document.querySelectorAll('.character-set-section input[type="checkbox"]');
    const complexityDropdown = document.getElementById('complexity');
    const numMastersDropdown = document.getElementById('numMasters');
    const numWeightsInput = document.getElementById('numWeights');
    const decrementWeightsBtn = document.getElementById('decrementWeights');
    const incrementWeightsBtn = document.getElementById('incrementWeights');
    const exclusivityDropdown = document.getElementById('exclusivity'); // Still 'exclusivity' ID

    const italicStyleCheckbox = document.getElementById('italicStyle');
    const slantedStyleCheckbox = document.getElementById('slantedStyle');

    const outputBaseCostElem = document.getElementById('outputBaseCost');
    const selectedCharactersList = document.getElementById('selectedCharactersList');
    const outputComplexityMultiplierElem = document.getElementById('outputComplexityMultiplier');
    const outputMastersMultiplierElem = document='outputMastersMultiplier';
    const outputWeightsMultiplierElem = document.getElementById('outputWeightsMultiplier');
    const outputExclusivityMultiplierElem = document.getElementById('outputExclusivityMultiplier');
    const totalCostElem = document.getElementById('totalCost');

    const outputItalicMultiplierElem = document.getElementById('outputItalicMultiplier');
    const outputSlantedMultiplierElem = document.getElementById('outputSlantedMultiplier');


    // Initial calculation when the page loads
    calculateTotalCost();

    // Add event listeners
    characterSetCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalCost);
    });
    complexityDropdown.addEventListener('change', calculateTotalCost);
    numMastersDropdown.addEventListener('change', calculateTotalCost);
    exclusivityDropdown.addEventListener('change', calculateTotalCost); // Listener still applies

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

    italicStyleCheckbox.addEventListener('change', calculateTotalCost);
    slantedStyleCheckbox.addEventListener('change', calculateTotalCost);


    function calculateTotalCost() {
        let baseCost = 0;
        let selectedCharsHtml = '';

        characterSetCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const cost = parseFloat(checkbox.dataset.cost);
                baseCost += cost;
                selectedCharsHtml += `<li>${checkbox.labels[0].textContent} (€${cost.toLocaleString()})</li>`;
            }
        });

        outputBaseCostElem.textContent = `€${baseCost.toLocaleString()}`;
        selectedCharactersList.innerHTML = selectedCharsHtml === '' ? '<li>None selected</li>' : selectedCharsHtml;

        // Get multipliers
        const complexityMultiplier = parseFloat(complexityDropdown.value);
        const mastersMultiplier = parseFloat(numMastersDropdown.value);
        const currentWeightsValue = parseInt(numWeightsInput.value);
        const weightsMultiplier = (currentWeightsValue - 1) * 0.15;
        const exclusivityMultiplier = parseFloat(exclusivityDropdown.value); // This will now get the new values

        const italicMultiplier = italicStyleCheckbox.checked ? parseFloat(italicStyleCheckbox.dataset.multiplier) : 0.0;
        const slantedMultiplier = slantedStyleCheckbox.checked ? parseFloat(slantedStyleCheckbox.dataset.multiplier) : 0.0;

        // Update multiplier displays
        outputComplexityMultiplierElem.textContent = complexityMultiplier.toFixed(1);
        outputMastersMultiplierElem.textContent = mastersMultiplier.toFixed(1);
        outputWeightsMultiplierElem.textContent = weightsMultiplier.toFixed(2);
        outputItalicMultiplierElem.textContent = italicMultiplier.toFixed(1);
        outputSlantedMultiplierElem.textContent = slantedMultiplier.toFixed(1);
        outputExclusivityMultiplierElem.textContent = exclusivityMultiplier.toFixed(2); // CHANGED to toFixed(2) for new values


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