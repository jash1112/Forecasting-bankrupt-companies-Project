let url = 'http://127.0.0.1:5000/api/data';
let allData = [];
// Fetch all data and initialize dropdowns
fetch(url)
  .then(response => response.json())
  .then(data => {
    allData = data; // Store the data for later use
    updateDropdown(data);
  })
  .catch(error => console.error('Error fetching data:', error));

  function updateDropdown(data) {
      // Extract distinct names
      const dropdown = d3.select("#companyDropdown");
      const uniqueNames = [...new Set(data.Name)]; 

    // Clear previous options
    dropdown.selectAll('option').remove();

    // Populate dropdown with unique company names
    uniqueNames.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
    });
    dropdown.on("change", function() {
        const selectedCompany = d3.select(this).property("value");
        updateBarChart(this.value);
    });
     // Use the first sample from the list to build the initial plots
    //   const firstSample = data.Name[0];
    //   updateBarChart(firstSample);

};



function updateBarChart(sample) {
    // Assuming 'allData' contains an array of objects where each object has the data for one company
    const selectedData = allData[sample];
    const azs = 'Altman Z-Score';

    // Now, assuming 'selectedData' has properties 'year' and 'Altman Z-Score' which are arrays
    const years = allData.year;  // Example: [2018, 2019, 2020]
    const zScores = allData.azs;  // Example: [1.5, 1.7, 1.8]

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
// init();
updateDropdown()

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
