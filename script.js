document.addEventListener("DOMContentLoaded", () => {
  fetchJsonData();
});

let jsonData;

async function fetchJsonData() {
  try {
    const response = await fetch('db.json');
    jsonData = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function searchData() {
  const brandCode = document.getElementById('brandCode').value;
  const modelCode = document.getElementById('modelCode').value;
  const yearCode = document.getElementById('yearCode').value;

  if (brandCode && modelCode && yearCode) {
    displayValueForCodes(brandCode, modelCode, yearCode);
  } else if (brandCode && modelCode) {
    displayYearsForCodes(brandCode, modelCode);
  } else if (brandCode) {
    displayModelsForCode(brandCode);
  } else {
    alert('Please enter a brand code at least.');
  }
}

function displayModelsForCode(brandCode) {
  const dataDiv = document.getElementById('data');
  const brandModels = jsonData.models.find(brand => brand.brand === brandCode);

  if (brandModels && brandModels.models) {
    dataDiv.innerHTML = '<h2>Models</h2>';
    brandModels.models.forEach(model => {
      dataDiv.innerHTML += `<p>${model.code} - ${model.name}</p>`;
    });
  } else {
    dataDiv.innerHTML = '<p>No models found for the given brand code.</p>';
  }
}

function displayYearsForCodes(brandCode, modelCode) {
  const dataDiv = document.getElementById('data');
  
  if (jsonData.years[modelCode]) {
    const years = jsonData.years[modelCode];

    dataDiv.innerHTML = '<h2>Years</h2>';
    years.forEach(year => {
      dataDiv.innerHTML += `<p>${year.code} - ${year.name}</p>`;
    });
  } else {
    dataDiv.innerHTML = '<p>No years found for the given model code.</p>';
  }
}

function displayValueForCodes(brandCode, modelCode, yearCode) {
  const dataDiv = document.getElementById('data');

  if (jsonData.prices && jsonData.prices[yearCode]) {
    const value = jsonData.prices[yearCode];

    dataDiv.innerHTML = '<h2>Value</h2>';
    dataDiv.innerHTML += `
          <p>TypeVeiculum: ${value.TypeVeiculum || 'N/A'}</p>
          <p>Value: ${value.Value || 'N/A'}</p>
          <p>Brand: ${value.Brand || 'N/A'}</p>
          <p>Model: ${value.Model || 'N/A'}</p>
          <p>YearModel: ${value.YearModel || 'N/A'}</p>
          <p>Fuel: ${value.Fuel || 'N/A'}</p>
          <p>CodeFipe: ${value.CodeFipe || 'N/A'}</p>
          <p>MesReference: ${value.MesReference || 'N/A'}</p>
          <p>FuelAcronym: ${value.FuelAcronym || 'N/A'}</p>
      `;
  } else {
    dataDiv.innerHTML = '<p>Out of stock currently.</p>';
  }
}
