let isDarkMode = false;

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === '1234') {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('appContainer').classList.remove('hidden');
  } else {
    alert('Invalid credentials!');
  }
}

let totalCost = 0;

function addProduct() {
  const name = document.getElementById('productName').value;
  const qty = parseInt(document.getElementById('productQty').value);
  const price = parseFloat(document.getElementById('productPrice').value);
  const discount = document.getElementById('applyDiscount').checked;
  const tax = document.getElementById('applyTax').checked;

  if (!name || qty <= 0 || price <= 0) {
    alert('Enter valid product details.');
    return;
  }

  let total = qty * price;
  if (discount) total *= 0.95;
  if (tax) total *= 1.18;
  total = parseFloat(total.toFixed(2));
  totalCost += total;

  const tbody = document.querySelector('#productTable tbody');
  const row = tbody.insertRow();
  row.innerHTML = `
    <td>${name}</td>
    <td>${qty}</td>
    <td>${price.toFixed(2)}</td>
    <td>${total.toFixed(2)}</td>
    <td><button onclick="this.parentElement.parentElement.remove(); updateTotal()">❌</button></td>
  `;

  updateTotal();
}

function updateTotal() {
  totalCost = 0;
  document.querySelectorAll('#productTable tbody tr').forEach(row => {
    const cell = row.cells[3];
    if (cell) {
      totalCost += parseFloat(cell.textContent);
    }
  });
  document.getElementById('totalCost').innerText = `Total Cost: ₹${totalCost.toFixed(2)}`;
}

function deleteSelected() {
  const tbody = document.querySelector('#productTable tbody');
  tbody.innerHTML = '';
  updateTotal();
}

function exportToCSV() {
  let csv = 'Name,Quantity,Price,Total\n';
  document.querySelectorAll('#productTable tbody tr').forEach(row => {
    const cells = Array.from(row.cells).slice(0, 4);
    csv += cells.map(cell => cell.textContent).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'product_order.csv';
  a.click();
}

function showChart() {
  const canvas = document.getElementById('chartCanvas');
  canvas.classList.toggle('hidden');

  const labels = [];
  const data = [];

  document.querySelectorAll('#productTable tbody tr').forEach(row => {
    labels.push(row.cells[0].textContent);
    data.push(parseFloat(row.cells[3].textContent));
  });

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Product Total (₹)',
        data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    }
  });
}

function generateInvoice() {
  alert('Invoice generation feature will be added soon!');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}
