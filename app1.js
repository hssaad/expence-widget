let transactions = [];

document.getElementById('transactionForm').addEventListener('submit', e => {
    e.preventDefault();
    addTransaction();
});

function addTransaction() {
    const transaction = {
        type: document.getElementById('typeSelect').value,
        name: document.getElementById('nameInput').value,
        amount: parseFloat(document.getElementById('amountInput').value),
        date: document.getElementById('dateInput').value
    };
    transactions.push(transaction);
    updateDisplay();
    document.getElementById('transactionForm').reset();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateDisplay();
}

function filterByDate() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);

    const filtered = transactions.filter(t => {
        const txDate = new Date(t.date);
        return (!isNaN(startDate) ? txDate >= startDate : true) &&
               (!isNaN(endDate) ? txDate <= endDate : true);
    });

    renderTable(filtered);
}

function renderTable(data) {
    const tbody = document.querySelector('#transactionTable tbody');
    tbody.innerHTML = data.map((t, i) => `
        <tr>
            <td>${t.date}</td>
            <td>${t.type}</td>
            <td>${t.name}</td>
            <td>${t.amount.toFixed(2)}</td>
            <td><button onclick="deleteTransaction(${i})" class="del-btn">❌</button></td>
        </tr>
    `).join('');
}

function updateDisplay() {
    renderTable(transactions);

    const expenses = transactions.filter(t => t.type === 'expense')
                                 .reduce((sum, t) => sum + t.amount, 0);
    const income = transactions.filter(t => t.type === 'income')
                               .reduce((sum, t) => sum + t.amount, 0);

    document.getElementById('totalExpenses').textContent = expenses.toFixed(2);
    document.getElementById('totalIncome').textContent = income.toFixed(2);
    document.getElementById('netBalance').textContent = (income - expenses).toFixed(2);
}
