// Function to calculate date of birth from IC number
function calculateDateOfBirth(icNumber) {
    const year = parseInt(icNumber.substring(0, 2));
    const month = icNumber.substring(2, 4);
    const day = icNumber.substring(4, 6);
    const currentYear = new Date().getFullYear();
    const birthYear = year < 100 ? (year > currentYear % 100 ? 1900 + year : 2000 + year) : year;
    
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    
    return `${birthYear}-${paddedMonth}-${paddedDay}`;
}

// Event listener for IC number input
document.getElementById('ic-number').addEventListener('input', function () {
    const icNumber = this.value;
    if (icNumber.length === 12 && !isNaN(icNumber)) {
        const dob = calculateDateOfBirth(icNumber);
        document.getElementById('dob').value = dob;
    } else {
        document.getElementById('dob').value = '';
    }
});

// Function to calculate totals for earnings and deductions
function calculateTotals() {
    const carumanTetap = document.getElementById('caruman-tetap').value;
    const divisor = carumanTetap === 'yes' ? 3 : 6;

    let totalOT = 0;
    let totalVariableAllowance = 0;
    let totalOthers = 0;

    // Sum all OT, Variable Allowance, and Others fields
    for (let month of ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'ogos', 'sep', 'okt', 'nov', 'dis']) {
        const ot = parseFloat(document.querySelector(`[name="monthly-ot-${month}"]`).value) || 0;
        const variableAllowance = parseFloat(document.querySelector(`[name="variable-allowance-${month}"]`).value) || 0;
        const others = parseFloat(document.querySelector(`[name="others-${month}"]`).value) || 0;
        
        totalOT += ot;
        totalVariableAllowance += variableAllowance;
        totalOthers += others;
    }

    const totalOT70 = (totalOT / divisor) * 0.7;
    const totalVariableAllowance70 = (totalVariableAllowance / divisor) * 0.7;
    const totalOthers70 = (totalOthers / divisor) * 0.7;

    document.getElementById('total-ot').value = totalOT70.toFixed(2);
    document.getElementById('total-variable-allowance').value = totalVariableAllowance70.toFixed(2);
    document.getElementById('total-others').value = totalOthers70.toFixed(2);

    // Calculate totals for deductions
    const deductionFields = ['epf', 'eis-socso', 'tax-pcb', 'deduction-others'];
    for (let field of deductionFields) {
        let total = 0;
        for (let month of ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'ogos', 'sep', 'okt', 'nov', 'dis']) {
            total += parseFloat(document.querySelector(`[name="${field}-${month}"]`).value) || 0;
        }
        document.querySelector(`[name="total-${field}"]`).value = total.toFixed(2);
    }

    // Calculate total for each month
    for (let month of ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'ogos', 'sep', 'okt', 'nov', 'dis']) {
        const totalMonth = deductionFields.reduce((acc, field) => {
            return acc + (parseFloat(document.querySelector(`[name="${field}-${month}"]`).value) || 0);
        }, 0);
        document.querySelector(`[name="total-${month}"]`).value = totalMonth.toFixed(2);
    }
}

// Function to calculate total bonus for EA Form
function calculateTotalBonus() {
    const years = ['2023', '2024'];
    const percentages = ['70', '80', '90'];

    percentages.forEach(percent => {
        let total = 0;
        years.forEach(year => {
            total += parseFloat(document.querySelector(`[name="ea-${year}-${percent}"]`).value) || 0;
        });
        total = (total / 2 / 12) * (parseInt(percent) / 100);
        document.querySelector(`[name="total-bonus-${percent}"]`).value = total.toFixed(2);
    });
}

// Function to calculate total ASB Dividen
function calculateTotalASBDividen() {
    const years = ['2023', '2024'];
    const types = ['100', 'others'];

    types.forEach(type => {
        let total = 0;
        years.forEach(year => {
            total += parseFloat(document.querySelector(`[name="asb-${year}-${type}"]`).value) || 0;
        });
        total = total / 12;
        document.querySelector(`[name="total-asb-${type}"]`).value = total.toFixed(2);
    });
}

// Function to calculate Actual Housing Loan Balance
function calculateActualHousingLoanBalance() {
    const houseMonthly = parseFloat(document.getElementById('house-monthly').value) || 0;
    const housingLoanBalance = parseFloat(document.getElementById('housing-loan-balance').value) || 0;
    const actualHousingLoanBalance = (houseMonthly * 3) + housingLoanBalance;
    document.getElementById('actual-housing-loan-bal').value = actualHousingLoanBalance.toFixed(2);
}

// Function to add a new row to a table
function addRow(tableId) {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    if (tableId === 'consolidate-table') {
        newRow.innerHTML = `
            <td><input type="number" name="item-no"></td>
            <td>
                <select name="ccris-item">
                    <option value="pelinfnce">PELNFNCE</option>
                    <option value="crdtcard">CRDTCARD</option>
                    <option value="otlinfnce">OTLNFNCE</option>
                    <option value="pcpascar">PCPASCAR</option>
                    <option value="hslnfnce">HSLNFNCE</option>
                    <option value="stlinfnce">STLNFNCE</option>
                    <option value="ispwnbkg">ISPWNBKG</option>
                </select>
            </td>
            <td>
                <select name="payslip-item">
                    <option value="pelinfnce">PELNFNCE</option>
                    <option value="crdtcard">CRDTCARD</option>
                    <option value="otlinfnce">OTLNFNCE</option>
                    <option value="pcpascar">PCPASCAR</option>
                    <option value="hslnfnce">HSLNFNCE</option>
                    <option value="stlinfnce">STLNFNCE</option>
                    <option value="ispwnbkg">ISPWNBKG</option>
                </select>
            </td>
            <td><input type="number" name="total-outstanding"></td>
            <td><input type="number" name="monthly-payment"></td>
        `;
    } else if (tableId === 'not-consolidate-table') {
        newRow.innerHTML = `
            <td><input type="number" name="not-item-no"></td>
            <td>
                <select name="not-ccris-item">
                    <option value="pelinfnce">PELNFNCE</option>
                    <option value="crdtcard">CRDTCARD</option>
                    <option value="otlinfnce">OTLNFNCE</option>
                    <option value="pcpascar">PCPASCAR</option>
                    <option value="hslnfnce">HSLNFNCE</option>
                    <option value="stlinfnce">STLNFNCE</option>
                    <option value="ispwnbkg">ISPWNBKG</option>
                </select>
            </td>
            <td>
                <select name="not-payslip-item">
                    <option value="pelinfnce">PELNFNCE</option>
                    <option value="crdtcard">CRDTCARD</option>
                    <option value="otlinfnce">OTLNFNCE</option>
                    <option value="pcpascar">PCPASCAR</option>
                    <option value="hslnfnce">HSLNFNCE</option>
                    <option value="stlinfnce">STLNFNCE</option>
                    <option value="ispwnbkg">ISPWNBKG</option>
                </select>
            </td>
            <td><input type="number" name="not-monthly-payment"></td>
        `;
    }
}

// Add event listeners to recalculate totals when values change
document.querySelectorAll('input[name^="monthly-ot"], input[name^="variable-allowance"], input[name^="others"], input[name^="epf"], input[name^="eis-socso"], input[name^="tax-pcb"], input[name^="deduction-others"]').forEach(input => {
    input.addEventListener('input', calculateTotals);
});
document.querySelectorAll('input[name^="ea-"]').forEach(input => {
    input.addEventListener('input', calculateTotalBonus);
});
document.querySelectorAll('input[name^="asb-"]').forEach(input => {
    input.addEventListener('input', calculateTotalASBDividen);
});
document.getElementById('caruman-tetap').addEventListener('change', calculateTotals);
document.getElementById('house-monthly').addEventListener('input', calculateActualHousingLoanBalance);
document.getElementById('housing-loan-balance').addEventListener('input', calculateActualHousingLoanBalance);

// Initial calculation
calculateTotals();
calculateTotalBonus();
calculateTotalASBDividen();
calculateActualHousingLoanBalance();
