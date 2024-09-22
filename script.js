// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM content loaded. Initializing Tableau Extension...");

  // Initialize the Tableau extension
  tableau.extensions.initializeAsync().then(() => {
      console.log("Tableau Extension Initialized successfully.");

      // Load data sources once initialization is complete
      loadDataSources();
  }).catch(error => {
      // Handle initialization errors
      console.error("Error initializing Tableau Extension:", error);
      showStatusMessage('Initialization failed.', 'error');
  });
});

// Function to load data sources from the dashboard
function loadDataSources() {
  // Fetch the data sources from the current dashboard
  tableau.extensions.dashboardContent.dashboard.getDataSourcesAsync().then(dataSources => {
      console.log("Data sources retrieved:", dataSources);

      // If no data sources are found, show an error message
      if (dataSources.length === 0) {
          showStatusMessage("No data sources found in the dashboard.", 'error');
          return;
      }

      // Process and display the data sources
      processDataSources(dataSources);
  }).catch(error => {
      // Handle any errors during the data fetching process
      console.error("Error retrieving data sources:", error);
      showStatusMessage('Error loading data sources.', 'error');
  });
}

// Function to process and display the data sources
function processDataSources(dataSources) {
  const dataSourcesList = document.getElementById('dataSourcesList');
  
  // Clear the existing list content
  dataSourcesList.innerHTML = '';

  // Loop through the data sources and display each one
  dataSources.forEach(dataSource => {
      console.log("Processing data source:", dataSource.name);

      let listItem = document.createElement('li');
      listItem.textContent = `Data Source: ${dataSource.name}`;
      dataSourcesList.appendChild(listItem);
  });

  // If everything is successful, show a success message
  showStatusMessage("Data sources loaded successfully.", 'success');
}

// Function to display status messages (success or error)
function showStatusMessage(message, status) {
  const statusMessageDiv = document.getElementById('statusMessage');
  statusMessageDiv.innerHTML = message;
  statusMessageDiv.className = status;

  // Optional: Add some styling based on the status
  if (status === 'success') {
      statusMessageDiv.style.color = 'green';
  } else if (status === 'error') {
      statusMessageDiv.style.color = 'red';
  }
}
