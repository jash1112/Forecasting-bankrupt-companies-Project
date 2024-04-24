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
  fetch(url_linear)
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
        updateLineChart(selectedIndex);
      });
     // Use the first sample from the list to build the initial plots
    //   const firstSample = data.Name[0];
     // Initialize the chart with the first item if available
  if (allData.length > 0) {
    updateBarChart(0);
    updateLineChart(0);
  }
};

function updateBarChart(index) {
    const selectedData = allData.Name;
    let begin =selectedData.indexOf(index);

    const years = allData['year'].slice(begin, (begin+9)) 
    const azs = allData['Altman Z-Score'].slice(begin,(begin+9));
  
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
        title: `Altman Z-Score by Year`,
        xaxis: { title: 'Year', tickmode: 'linear' },
        yaxis: { title: 'Altman Z-Score' },
        margin: { t: 50 }
  };

  Plotly.newPlot('financialCharts', [trace], layout);

}

// function updateLineChart(){
//     //Load actual and predicted data
//     const actualData = linear_data['Actual'];
//     const predictData = linear_data['Prediction'];
//     //Load chart
//     var trace = {
//         x: actualData,
//         y: predictData,
//         type: 'line',
//         marker: {
//           color: 'rgba(55,128,191,0.7)',
//           line: {
//             color: 'rgba(55,128,191,1.0)',
//             width: 2
//           }
//         }
//       };
    
//       var layout = {
//         title: `Altman Z-Score by Year for ${selectedData.Name}`,
//         xaxis: { title: 'Year', tickmode: 'linear' },
//         yaxis: { title: 'Altman Z-Score' },
//         margin: { t: 50 }
//       };
    
//       Plotly.newPlot('modelOutputs', [trace], layout);
// };

function optionChanged(newSample) {
    updateBarChart(newSample);
  };


