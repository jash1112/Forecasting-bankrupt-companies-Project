let url = 'http://127.0.0.1:5000/api/data';

cdocument.addEventListener('DOMContentLoaded', function() {
    const companyDropdown = document.getElementById('companyDropdown');

    fetch(url)  // Endpoint to fetch unique company names
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            populateDropdown(data);
        })
        .catch(error => {
            console.error('Failed to fetch company names:', error);
        });

    // Function to populate the dropdown menu
    function populateDropdown(data) {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.Nameame;  // Assuming 'name' is the property
            option.textContent = item.Name;
            companyDropdown.appendChild(option);
        });
    }

    // Event listener for dropdown changes
    companyDropdown.addEventListener('change', function() {
        const selectedCompany = this.value;
        updateDashboard(selectedCompany);
    });

    // Function to update dashboard components
    function updateDashboard(companyName) {
        fetch(`http://127.0.0.1:5000/api/data/${Name}`)  // Endpoint to fetch data for a specific company
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                updateSummaryCards(data);
                updateFinancialCharts(data);
                updateModelOutputs(data);
            })
            .catch(error => {
                console.error(`Failed to fetch data for ${companyName}:`, error);
            });
    }

    // Placeholder functions to update parts of the dashboard
    function updateSummaryCards(data) {
        console.log('Updating summary cards', data);
        // Update summary card logic here
    }

    function updateFinancialCharts(data) {
        console.log('Updating financial charts', data);
        // Update financial chart logic here
    }

    function updateModelOutputs(data) {
        console.log('Updating model outputs', data);
        // Update model output logic here
    }
});

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

// document.addEventListener('DOMContentLoaded', function() {
//     fetchCompanies();
// });

// function fetchCompanies() {
//     fetch('/api/data')  // Your Flask endpoint
//         .then(response => response.json())
//         .then(data => {
//             const uniqueNames = new Set(data.map(item => item.Name));  // Assuming 'Name' is the property
//             populateDropdown(Array.from(uniqueNames));
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function populateDropdown(uniqueNames) {
//     const dropdown = document.getElementById('companyDropdown');
//     uniqueNames.forEach(name => {
//         const option = document.createElement('option');
//         option.value = name;
//         option.textContent = name;
//         dropdown.appendChild(option);
//     });
// }
