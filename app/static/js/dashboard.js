let url = 'http://127.0.0.1:5000/api/data';
let url_linear = 'http://127.0.0.1:5000//api/linear/regression';
let allData = [];
let linear_data = []
// Fetch all data and initialize dropdowns
fetch(url)
  .then(response => response.json())
  .then(data => {
    allData = data; 
    updateDropdown(allData);
  })
  .catch(error => console.error('Error fetching data:', error));
// Fetch linear data and initialize dropdowns
  fetch(url)
  .then(response => response.json())
  .then(data => {
      linear_data = data;
 })
  .catch(error => console.error('Error fetching data:', error));



  function updateDropdown(data) {
      // Extract distinct names
      const dropdown = d3.select("#companyDropdown");
    //   console.log(data);
    //   const uniqueNames = [...new Set(data.Name)]; 
      const uniqueNames = new Set(data.Name);
    //   console.log(uniqueNames);
    // Clear previous options
    dropdown.selectAll('option').remove();

    // Populate dropdown with unique company names
    uniqueNames.forEach((name,index)=> {
        dropdown.append("option").text(name).property("value", index);
    });
    // dropdown.on("change", function() {
    //     const selectedCompany = d3.select(this).property("value");
    //     updateBarChart(this.value);
    // });
    dropdown.on("change", function() {
        const selectedIndex = this.value;
        updateBarChart(selectedIndex);
      });
     // Use the first sample from the list to build the initial plots
    //   const firstSample = data.Name[0];
     // Initialize the chart with the first item if available
  if (allData.length > 0) {
    updateBarChart(0);
  }
};

function updateBarChart(index) {
    // index = parseInt(index); // Ensure index is treated as an integer
    console.log(index)

  const selectedData = allData.Name;
   let begin =selectedData.indexOf(index);
   console.log(begin)
  const years = allData['year'].slice(begin, (begin+9)) 
  const azs = allData['Altman Z-Score'].slice(begin,(begin+9));
  console.log(years);
    console.log(azs);
    console.log(allData);
  var trace = {
    x: years,
    y: azs,
    type: 'line',
    marker: {
      color: 'rgba(55,128,191,0.7)',
      line: {
        color: 'rgba(55,128,191,1.0)',
        width: 2
      }
    }
  };

  var layout = {
    title: `Altman Z-Score by Year for ${selectedData.Name}`,
    xaxis: { title: 'Year', tickmode: 'linear' },
    yaxis: { title: 'Altman Z-Score' },
    margin: { t: 50 }
  };

  Plotly.newPlot('financialCharts', [trace], layout);

}

document.addEventListener('DOMContentLoaded', function() {
    const actualData = linear_data.Actual;
    console.log(actualData);
    console.log(linear_data);
    // Simple linear model for demonstration: y = mx + c
    const predictData = linear_data.Prediction;
    console.log(predictData);
    const layout = {
        title: 'Actual vs. Predicted Values',
        xaxis: {
            title: 'X Value'
        },
        yaxis: {
            title: 'Y Value'
        }
    };
    

    Plotly.newPlot('modelOutputs', [actualData, predictData], layout);
});


function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    updateBarChart(newSample);
    // updateDropdown(newSample);
  };

// Initialize the dashboard
// init();

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


// Fetch all data and initialize dropdowns

