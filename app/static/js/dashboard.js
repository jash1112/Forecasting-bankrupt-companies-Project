document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.getElementById('companyDropdown');

  fetch('/api/company-data/')  // Adjust the API endpoint as necessary
      .then(response => response.json())
      .then(data => {
          data.forEach(company => {
              const option = document.createElement('option');
              option.value = company.symbol;
              option.textContent = company.Name;
              dropdown.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching company data:', error));
});