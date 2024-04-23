let url = 'http://127.0.0.1:5000/api/data';
let allData = [];
function init() {
    // Use D3 to select the dropdown menu
    var dropdown = d3.select("#companyDropdown");
  
    // Use D3 to fetch the data
    d3.json(url).then(data => {
      console.log(data);
      let names= data["Name"];
    //   allData = data;
        
      // Populate dropdown with subject IDs
     names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
      });
    //   updateDropdown(data);
      // Use the first sample from the list to build the initial plots
      const firstSample = data.Name[0];
      updateBarChart(firstSample);
      updateDropdown(data);

    
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
        updateBarChart(selectedCompany);
    });
}



function updateBarChart(selectedCompany) {
    // Assuming 'allData' contains an array of objects where each object has the data for one company
    const selectedData = allData.filter(item => item.Name === selectedCompany);

    // Now, assuming 'selectedData' has properties 'year' and 'Altman Z-Score' which are arrays
    const years = selectedData.year;  // Example: [2018, 2019, 2020]
    const zScores = selectedData['Altman Z-Score'];  // Example: [1.5, 1.7, 1.8]

    var trace = {
        x: years,
        y: zScores,
        type: 'bar',
        marker: {
            color: 'rgba(55,128,191,0.7)',
            line: {
                color: 'rgba(55,128,191,1.0)',
                width: 2
            }
        }
    };

    var layout = {
        title: 'Altman Z-Score by Year',
        xaxis: { 
            title: 'Year',
            tickmode: 'linear'
        },
        yaxis: {
            title: 'Altman Z-Score'
        },
        margin: { t: 30 }  // Adjust top margin to ensure title fits
    };

    Plotly.newPlot('financialCharts', [trace], layout); // Assumes there is a div with id 'chartDiv' in your HTML
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    updateBarChart(newSample);
    updateDropdown(newSample)
  };

// Initialize the dashboard
init();

//--------------------------------------------------------
  
  
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
// function updateBarChart(company){
//     let z_score = company['Altman Z-Score']
//     let label = company.year;
// var data = [
//     {
//       x: label ,
//       y: z_score,
//       type: 'bar'
//     }
//   ];
  
//   Plotly.newPlot('financialCharts', data);
// }

   
// // function updateMetadata(company) {
// //     d3.json(url).then(data => {
// //         const metadata = data.find(obj => obj.Name === company);  // Assuming data includes a Name field at the top level
// //         const panel = d3.select("#sample-metadata");
// //         panel.html("");  // Clear existing metadata
// //         Object.entries(metadata).forEach(([key, value]) => {
// //             panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
// //         });
// //     });
// // }

//     function optionChanged(newSample) {
//       // Fetch new data each time a new sample is selected
//       updateBarChart(newSample);
//     //   updateMetadata(newSample);
//     }
  
//     // Initialize the dashboard
//     init();

  ///////////////////////////////////////////////////////////////////////////
