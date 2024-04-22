// let url = 'http://127.0.0.1:5000/api/data';
// let allData = []; // To store all company data

// // Fetch all data and initialize dropdowns
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     allData = data; // Store the data for later use
//     initializeCountriesDropdown(data);
//     initializeDataTypeDropdown(); // Initialize this for user to select data type after country is selected
//   })
//   .catch(error => console.error('Error fetching data:', error));

// function initializeCountriesDropdown(data) {
//   const dropdown = document.getElementById('companyDropdown');
//   const company_name = [...new Set(data.map(item => item.Name))]; // Extract distinct countries
  
//   // Populate dropdown with countries
//   company_name.forEach(company => {
//     const option = new Option(company, company);
//     dropdown.add(option);
//   });
  
//   // Event listener for country selection
//   dropdown.addEventListener('change', function() {
//     updateChartForCountry(this.value); // Update chart when a country is selected
//   });
// }

document.addEventListener('DOMContentLoaded', function() {
    fetchCompanies();
});

function fetchCompanies() {
    fetch('/api/data')  // Your Flask endpoint
        .then(response => response.json())
        .then(data => {
            const uniqueNames = new Set(data.map(item => item.Name));  // Assuming 'Name' is the property
            populateDropdown(Array.from(uniqueNames));
        })
        .catch(error => console.error('Error fetching data:', error));
}

function populateDropdown(uniqueNames) {
    const dropdown = document.getElementById('companyDropdown');
    uniqueNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    });
}