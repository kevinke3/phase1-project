window.onload = async function () {
    const brandSelect = document.getElementById('brandSelect');
    const modelSelect = document.getElementById('modelSelect');
    const yearSelect = document.getElementById('yearSelect');

    // Fetch brands
    const brandsResponse = await fetch('db.json');
    const brandsData = await brandsResponse.json();
    console.log('Brands Data:', brandsData); // Log the fetched data
    brandsData.brands.forEach(brand => {
        const option = document.createElement('option');
        option.text = brand.name;
        option.value = brand.coder;
        brandSelect.appendChild(option);
    });

    // Fetch models for the selected brand
    brandSelect.addEventListener('change', async function () {
        modelSelect.innerHTML = '';
        yearSelect.innerHTML = '';
        const selectedBrandCode = this.value;
        const modelsResponse = await fetch('db.json');
        const modelsData = await modelsResponse.json();
        console.log('Models Data:', modelsData); // Log the fetched data
        modelsData.models[selectedBrandCode].models.forEach(model => {
            const option = document.createElement('option');
            option.text = model.name;
            option.value = model.coder;
            modelSelect.appendChild(option);
        });
    });

    // Fetch years for the selected model
    modelSelect.addEventListener('change', async function () {
        yearSelect.innerHTML = '';
        const selectedBrandCode = brandSelect.value;
        const selectedModelCode = this.value;
        const yearsResponse = await fetch('db.json');
        const yearsData = await yearsResponse.json();
        console.log('Years Data:', yearsData); // Log the fetched data
        yearsData.years[selectedBrandCode].models[selectedModelCode].forEach(year => {
            const option = document.createElement('option');
            option.text = year.name;
            option.value = year.coder;
            yearSelect.appendChild(option);
        });
    });
};

async function fetchVehicleDetails() {
    const selectedBrandCode = document.getElementById('brandSelect').value;
    const selectedModelCode = document.getElementById('modelSelect').value;
    const selectedYearCode = document.getElementById('yearSelect').value;
    const response = await fetch('db.json');
    const vehicleDetailsData = await response.json();
    console.log('Vehicle Details Data:', vehicleDetailsData); // Log the fetched data
    const vehicleDetails = vehicleDetailsData.details[selectedBrandCode][selectedModelCode][selectedYearCode];
    const detailsContainer = document.getElementById('vehicleDetails');
    detailsContainer.innerHTML = `
    <p><strong>Brand:</strong> ${vehicleDetails.Brand ? vehicleDetails.Brand : 'N/A'}</p>
    <p><strong>Model:</strong> ${vehicleDetails.Model ? vehicleDetails.Model : 'N/A'}</p>
    <p><strong>Model Year:</strong> ${vehicleDetails.YearModel ? vehicleDetails.YearModel : 'N/A'}</p>
    <p><strong>Fuel:</strong> ${vehicleDetails.Fuel ? vehicleDetails.Fuel : 'N/A'}</p>
    <p><strong>Value:</strong> ${vehicleDetails.Value ? vehicleDetails.Value : 'N/A'}</p>
`;
}
