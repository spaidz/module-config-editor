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
  // Iterate through the rows and update your data model or perform other actions
  // This is where you can save changes made to the table
  alert('Changes saved successfully!');
});
