document.addEventListener('DOMContentLoaded', () => {
    // Get references to all relevant DOM elements
    const characterSetCheckboxes = document.querySelectorAll('.character-set-section input[type="checkbox"]');
    const numWeightsDropdown = document.getElementById('numWeights');
    const complexityDropdown = document.getElementById('complexity');
    const exclusivityDropdown = document.getElementById('exclusivity');

    const outputBaseCostElem = document.getElementById('outputBaseCost');
    const selectedCharactersList = document.getElementById('selectedCharactersList');
    const outputWeightsMultiplierElem = document.getElementById('outputWeightsMultiplier');
    const outputComplexityMultiplierElem = document.getElementById('outputComplexityMultiplier');
    const outputExclusivityMultiplierElem = document.getElementById('outputExclusivityMultiplier');
    const totalCostElem = document.getElementById('totalCost');

    // Initial calculation when the page loads
    calculateTotalCost();

    // Add event listeners
    characterSetCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalCost);
    });

    numWeightsDropdown.addEventListener('change', calculateTotalCost);
    complexityDropdown.addEventListener('change', calculateTotalCost);
    exclusivityDropdown.addEventListener('change', calculateTotalCost);

    function calculateTotalCost() {
        let baseCost = 0;
        let selectedCharsHtml = ''; // To populate the list in the output panel

        // Calculate Base Cost from Character Set checkboxes
        characterSetCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const cost = parseFloat(checkbox.dataset.cost);
                baseCost += cost;
                selectedCharsHtml += `<li>${checkbox.labels[0].textContent} (€${cost.toLocaleString()})</li>`;
            }
        });

        // Update base cost display and selected characters list
        outputBaseCostElem.textContent = `€${baseCost.toLocaleString()}`;
        selectedCharactersList.innerHTML = selectedCharsHtml === '' ? '<li>None selected</li>' : selectedCharsHtml;


        // Get multipliers from dropdowns
        const weightsMultiplier = parseFloat(numWeightsDropdown.value);
        const complexityMultiplier = parseFloat(complexityDropdown.value);
        const exclusivityMultiplier = parseFloat(exclusivityDropdown.value);

        // Update multiplier displays
        outputWeightsMultiplierElem.textContent = weightsMultiplier.toFixed(1);
        outputComplexityMultiplierElem.textContent = complexityMultiplier.toFixed(1);
        outputExclusivityMultiplierElem.textContent = exclusivityMultiplier.toFixed(1);

        // Calculate Total Cost
        const totalMultiplier = 1 + weightsMultiplier + complexityMultiplier + exclusivityMultiplier;
        const finalCost = baseCost * totalMultiplier;

        // Update Total Cost display
        totalCostElem.textContent = `€${finalCost.toLocaleString()}`; // Format as currency
    }
});