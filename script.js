const apiUrl = ('https://parallelum.com.br/fipe/api/v1/carros/marcas');

// Fetch brands
fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // fetched data
    console.log('Brands Data:', data);

    // brand
    const brandSelect = document.getElementById('brandSelect');
    brandSelect.addEventListener('change', async function () {
      const selectedBrandCode = this.value;
      const modelsUrl = ('https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos');

      // Fetch models for the selected brand
      const modelsResponse = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos');
      const modelsData = await modelsResponse.json();
      console.log('Models Data:', modelsData);

      // Clear the existing options and add new options
      const modelSelect = document.getElementById('modelSelect');
      modelSelect.innerHTML = '';
      modelsData.modelos.forEach(model => {
          const option = document.createElement('option');
          option.text = model.nome;
          option.value = model.codigo;
          modelSelect.appendChild(option);
      });

      //  modelSelect
      modelSelect.addEventListener('change', async function () {
        const selectedModelCode = this.value;
        const yearsUrl = ('https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos/${selectedModelCode}/anos');

        //years for the selected model
        const yearsResponse = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos/${selectedModelCode}/anos');
        const yearsData = await yearsResponse.json();
        console.log('Years Data:', yearsData);

        // Clearing the previous data
        const yearSelect = document.getElementById('yearSelect');
        yearSelect.innerHTML = '';
        yearsData.forEach(year => {
            const option = document.createElement('option');
            option.text = year.nome;
            option.value = year.codigo;
            yearSelect.appendChild(option);
        });

        // Add event listener to yearSelect
        yearSelect.addEventListener('change', async function () {
          const selectedYearCode = this.value;
          const detailsUrl = ('https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos/${selectedModelCode}/anos/${selectedYearCode}');

          //vehicle details for the selected year
          const detailsResponse = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedBrandCode}/modelos/${selectedModelCode}/anos/${selectedYearCode}');
          const vehicleDetailsData = await detailsResponse.json();
          console.log('Vehicle Details Data:', vehicleDetailsData);

          // vehicle details data
          const detailsContainer = document.getElementById('vehicleDetails');
          detailsContainer.innerHTML = `
          <p><strong>Brand:</strong> ${vehicleDetailsData.marca ? vehicleDetailsData.marca : 'N/A'}</p>
          <p><strong>Model:</strong> ${vehicleDetailsData.modelo ? vehicleDetailsData.modelo : 'N/A'}</p>
          <p><strong>Model Year:</strong> ${vehicleDetailsData.ano_modelo ? vehicleDetailsData.ano_modelo : 'N/A'}</p>
          <p><strong>Fuel:</strong> ${vehicleDetailsData.combustivel ? vehicleDetailsData.combustivel : 'N/A'}</p>
          <p><strong>Value:</strong> ${vehicleDetailsData.Valor ? vehicleDetailsData.Valor : 'N/A'}</p>
`;
        });
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
