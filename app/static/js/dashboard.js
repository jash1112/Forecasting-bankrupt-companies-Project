let url = 'http://127.0.0.1:5000/api/data';

function init() {
    // Use D3 to select the dropdown menu
    var dropdown = d3.select("#companyDropdown");
  
    // Use D3 to fetch the data
    d3.json(url).then(data => {
      console.log(data);
      let names= data["Name"];
        
      // Populate dropdown with subject IDs
     names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
      });
      updateDropdown(data);
      // Use the first sample from the list to build the initial plots
      const firstSample = data.Name[0];
      updateChartsData(firstSample);
    //   updateBubbleCharts(firstSample);
    //   updateMetadata(firstSample);
    });
  };

  function updateDropdown(data) {
    const dropdown = d3.select("#companyDropdown");
    const uniqueNames = [...new Set(data.Name)];  // Extract distinct names

    // Clear previous options
    dropdown.selectAll('option').remove();

    // Populate dropdown with unique company names
    uniqueNames.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
    });
    dropdown.on("change", function() {
        const selectedCompany = d3.select(this).property("value");
        updateChartsData(selectedCompany);
        updateMetadata(selectedCompany);
    });
}
function updateChartsData(selectedCompany) {
    d3.json(url).then(data => {
        let filteredCompany = data.Name == selectedCompany;
        const company = document.getElementById('companyDropdown');
        const company_name = company.value;
        if (company_name) {
            updateBarChart(company_name);
        }
    });
}
  
  
// function updateBarChart(company) {
//     const ctx = document.getElementById('companyDropdown');
//     let z_score = company['Altman Z-Score']

//     if (window.myBarChart) window.myBarChart.destroy();
//     window.myBarChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: company.year,
//             datasets: [{
//                 label: labels,
//                 data: z_score, 
//             }]
//         },
//         options: {
            
//             plugins: {
//                 title: {
//                     display: true,
//                     text: 'Chart.js Bar Chart'
//                 }
//             }
//         }
//     })
// }
function updateBarChart(company){
    let z_score = company['Altman Z-Score']
    let label = company.year;
var data = [
    {
      x: label ,
      y: z_score,
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('financialCharts', data);
}

   
// function updateMetadata(company) {
//     d3.json(url).then(data => {
//         const metadata = data.find(obj => obj.Name === company);  // Assuming data includes a Name field at the top level
//         const panel = d3.select("#sample-metadata");
//         panel.html("");  // Clear existing metadata
//         Object.entries(metadata).forEach(([key, value]) => {
//             panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
//         });
//     });
// }

    function optionChanged(newSample) {
      // Fetch new data each time a new sample is selected
      updateBarChart(newSample);
    //   updateMetadata(newSample);
    }
  
    // Initialize the dashboard
    init();

  