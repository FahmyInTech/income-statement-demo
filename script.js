function addRGELSection() {
  const dynamicSections = document.getElementById('dynamicSections');

  const newRow = document.createElement('tr');

  const descriptionCell = document.createElement('td');
  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';
  descriptionInput.placeholder = 'Enter name';
  descriptionCell.appendChild(descriptionInput);

  const amountCell = document.createElement('td');
  const amountInput = document.createElement('input');
  amountInput.type = 'number';
  amountInput.placeholder = 'Enter value';
  amountCell.appendChild(amountInput);

  const removeCell = document.createElement('td');
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-btn');
  removeButton.textContent = 'Remove';
  removeButton.onclick = function() {
    newRow.remove();
  };
  removeCell.appendChild(removeButton);

  newRow.appendChild(descriptionCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(removeCell);

  dynamicSections.appendChild(newRow);
}

function calculate() {
  const netSales = parseFloat(document.getElementById("netSales").value) || 0;
  const cogs = parseFloat(document.getElementById("cogs").value) || 0;
  const expenses = parseFloat(document.getElementById("expenses").value) || 0;
  const interestExpense = parseFloat(document.getElementById("interestExpense").value) || 0;
  const taxRate = parseFloat(document.getElementById("taxRate").value) || 20;
  const disco = parseFloat(document.getElementById("disco").value) || 0;

  const ordinaryShares = parseFloat(document.getElementById("ordinaryShares").value) || 1;
  const preferredShares = parseFloat(document.getElementById("preferredShares").value) || 0;
  const preferredDividends = parseFloat(document.getElementById("preferredDividends").value) || 0;

  const dynamicSections = document.getElementById("dynamicSections").children;
  let dynamicSum = 0;

  for (let section of dynamicSections) {
    const inputs = section.querySelectorAll('input');
    const value = parseFloat(inputs[1].value) || 0;
    dynamicSum += value;
  }

  const grossProfit = netSales - cogs;
  const noi = grossProfit - expenses + dynamicSum;
  const incomeBeforeTax = noi - interestExpense;

  const ifco = incomeBeforeTax - (incomeBeforeTax * taxRate / 100);
  const netIncome = ifco - disco;

  const adjustedNetIncome = netIncome - preferredDividends;

  // Calculate EPS
  const eps = ordinaryShares !== 0 ? adjustedNetIncome / ordinaryShares : 0;

  // Update the values in the table
  document.getElementById("grossProfit").textContent = grossProfit.toFixed(2);
  document.getElementById("noi").textContent = noi.toFixed(2);
  document.getElementById("incomeBeforeTax").textContent = incomeBeforeTax.toFixed(2);
  document.getElementById("ifco").textContent = ifco.toFixed(2);
  document.getElementById("netIncome").textContent = netIncome.toFixed(2);
  document.getElementById("epsResult").textContent = eps.toFixed(2);
}

function resetFields() {
  // Reset all inputs to 0
  document.querySelectorAll("input").forEach(input => input.value = 0);

  // Reset the table values
  document.getElementById("grossProfit").textContent = 0;
  document.getElementById("noi").textContent = 0;
  document.getElementById("incomeBeforeTax").textContent = 0;
  document.getElementById("ifco").textContent = 0;
  document.getElementById("netIncome").textContent = 0;
  document.getElementById("epsResult").textContent = 0;

  // Remove dynamic sections
  document.getElementById("dynamicSections").innerHTML = '';
}
