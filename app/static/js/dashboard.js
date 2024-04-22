let url = 'http://127.0.0.1:5000/api/data';

function init() {
    // Use D3 to select the dropdown menu
    var dropdown = d3.select("#companyDropdown");
  
    // Use D3 to fetch the data
    d3.json(url).then(data => {
      console.log(data);
  
      // Populate dropdown with subject IDs
      data.Names.forEach(name => {
        dropdown.append("option").text(name).property("value", name);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = data.names[0];
      updateCharts(firstSample);
      updateBubbleCharts(firstSample);
      updateMetadata(firstSample);
    });
  };
  
  function updateMetadata(sample) {
    d3.json(url).then(data => {
      var metadata = data.metadata.filter(obj => obj.id == sample)[0];
      var panel = d3.select("#sample-metadata");
      panel.html(""); // Clear any existing metadata
      Object.entries(metadata).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  };
  
  function updateCharts(sample) {
      d3.json(url).then(data => {
        var samples = data.samples.filter(obj => obj.id == sample)[0];
        var otu_ids = samples.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
        var sample_values = samples.sample_values.slice(0,10).reverse();
        var otu_labels = samples.otu_labels.reverse();
    
        // Create the trace for the bar chart
        var barData = [{
          x: sample_values,
          y: otu_ids,
          text: otu_labels,
          type: 'bar',
          orientation: 'h'
        }];
    
        // Bar chart layout
        var barLayout = {
          title: "Top 10 OTUs Found",
          margin: { t: 30, l: 150 }
        };
    
        // Plot the bar chart
        Plotly.newPlot('bar', barData, barLayout);
      });
    };
  
    function updateBubbleCharts(sample) {
      d3.json(url).then(data => {
        var samples = data.samples.filter(obj => obj.id == sample)[0];
        var otu_ids = samples.otu_ids;
        var sample_values = samples.sample_values;
        var otu_labels = samples.otu_labels;
    
        // No need to reverse these for the bubble chart
        // var otu_ids = samples.otu_ids.map(otuID => `OTU ${otuID}`);
        // var sample_values = samples.sample_values;
        // var otu_labels = samples.otu_labels;
    
        // Create the trace for the bubble chart
        var bubbleData = [{
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
            size: sample_values, // Use raw sample values for size
            color: otu_ids, // Use raw otu_ids for color
            colorscale: 'Earth'
          }
        }];
    
        // Bubble chart layout
        var bubbleLayout = {
          title: 'Bacteria Cultures Per Sample',
          hovermode: 'closest',
          xaxis: { title: 'OTU ID' },
          yaxis: { title: 'Sample Values' },
          margin: { t: 30, l: 50, r: 50, b: 50 }
        };
    
        // Plot the bubble chart
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
      });
    }
  
    
    
    function optionChanged(newSample) {
      // Fetch new data each time a new sample is selected
      updateCharts(newSample);
      updateBubbleCharts(newSample);
      updateMetadata(newSample);
    }
  
    
    // Initialize the dashboard
    init();

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
