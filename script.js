const searchInput = document.getElementById('searchInput');
const dataTable = document.getElementById('data-table');
const rows = dataTable.querySelectorAll('tbody tr');
const saveButton = document.getElementById('saveButton');

searchInput.addEventListener('input', function() {
  const searchQuery = searchInput.value.toLowerCase();

  rows.forEach(row => {
    const columns = row.getElementsByTagName('td');
    let foundMatch = false;

    for (const column of columns) {
      if (column.textContent.toLowerCase().includes(searchQuery)) {
        foundMatch = true;
        break;
      }
    }

    if (foundMatch) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

saveButton.addEventListener('click', function() {
  // Your save functionality here
  alert('Changes saved successfully!');
});

function populateTableWithData(data) {
  const tableBody = dataTable.querySelector('tbody');
  tableBody.innerHTML = ''; // Clear existing data

  data.forEach(item => {
    const newRow = document.createElement('tr');
    const codeCell = document.createElement('td');
    const nameCell = document.createElement('td');

    codeCell.textContent = item.code;
    nameCell.textContent = item.name;

    newRow.appendChild(codeCell);
    newRow.appendChild(nameCell);

    tableBody.appendChild(newRow);
  });
}

// Retrieve data from session storage and populate the table
chrome.devtools.inspectedWindow.eval(
  "JSON.parse(sessionStorage.getItem('blModuleConfigs'))",
  function(result, isException) {
    if (!isException && result) {
      populateTableWithData(result);
    } else {
      console.error("Error retrieving data from session storage:", isException);
    }
  }
);
