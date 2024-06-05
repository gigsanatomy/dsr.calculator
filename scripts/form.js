document.getElementById('ic-number').addEventListener('input', function() {
    var ic = this.value;
    if (ic.length >= 6) {
        var year = ic.substring(0, 2);
        var month = ic.substring(2, 4);
        var day = ic.substring(4, 6);
        var dob = new Date((year < 50 ? '20' : '19') + year, month - 1, day);
        document.getElementById('dob').value = dob.toISOString().split('T')[0];
    }
});

document.getElementById('spouse-ic-number').addEventListener('input', function() {
    var ic = this.value;
    if (ic.length >= 6) {
        var year = ic.substring(0, 2);
        var month = ic.substring(2, 4);
        var day = ic.substring(4, 6);
        var dob = new Date((year < 50 ? '20' : '19') + year, month - 1, day);
        document.getElementById('spouse-dob').value = dob.toISOString().split('T')[0];
    }
});

function toggleJointApplicant() {
    var jointApplicant = document.getElementById('single-joint').value;
    var jointFields = document.getElementById('joint-applicant-fields');
    var spouseFields = document.getElementById('spouse-salary-info');
    if (jointApplicant === 'joint') {
        jointFields.classList.remove('hidden');
        spouseFields.classList.remove('hidden');
    } else {
        jointFields.classList.add('hidden');
        spouseFields.classList.add('hidden');
    }
}

document.getElementById('single-joint').addEventListener('change', toggleJointApplicant);


function calculateOTandAllowance(carumanTetap, otInputs, allowanceInputs, totalOTField, totalAllowanceField) {
    var totalOT = 0;
    var totalAllowance = 0;

    otInputs.forEach(function(input) {
        totalOT += parseFloat(input.value) || 0;
    });

    allowanceInputs.forEach(function(input) {
        totalAllowance += parseFloat(input.value) || 0;
    });

    var divider = carumanTetap === 'yes' ? 6 : 3;
    var resultOT = (totalOT / divider) * 0.7;
    var resultAllowance = (totalAllowance / divider) * 0.7;

    document.getElementById(totalOTField).value = resultOT.toFixed(2);
    document.getElementById(totalAllowanceField).value = resultAllowance.toFixed(2);
}

function updateDeductionTotals(carumanTetap) {
    var deductionRows = document.querySelectorAll('#deduction-table tbody tr');
    deductionRows.forEach(function(row) {
        var total = 0;
        var inputs = row.querySelectorAll('input[type="number"]');
        inputs.forEach(function(input) {
            total += parseFloat(input.value) || 0;
        });
        var divider = carumanTetap === 'yes' ? 6 : 3;
        var result = total / divider;
        var totalCell = row.querySelector('.deduction-total');
        totalCell.textContent = result.toFixed(2);
    });
}

document.getElementById('caruman-tetap').addEventListener('change', function() {
    var carumanTetap = this.value;
    var otInputs = document.querySelectorAll('input[name^="monthly-ot"]');
    var allowanceInputs = document.querySelectorAll('input[name^="variable-allowance"]');
    calculateOTandAllowance(carumanTetap, otInputs, allowanceInputs, 'total-ot', 'total-variable-allowance');
    updateDeductionTotals(carumanTetap);
});

document.getElementById('spouse-caruman-tetap').addEventListener('change', function() {
    var carumanTetap = this.value;
    var otInputs = document.querySelectorAll('input[name^="spouse-monthly-ot"]');
    var allowanceInputs = document.querySelectorAll('input[name^="spouse-variable-allowance"]');
    calculateOTandAllowance(carumanTetap, otInputs, allowanceInputs, 'spouse-total-ot', 'spouse-total-variable-allowance');
});

function calculateEATotals() {
    var eaRows = document.querySelectorAll('#ea-form-table tbody tr');
    eaRows.forEach(function(row) {
        var total = 0;
        var inputs = row.querySelectorAll('input[type="text"]');
        inputs.forEach(function(input) {
            total += parseFloat(input.value) || 0;
        });
        var result = (total / 2) / 12;
        var totalCell = row.querySelector('.ea-total');
        totalCell.textContent = result.toFixed(2);
    });
}

function calculateASBTotal() {
    var asbRows = document.querySelectorAll('#asb-dividen-table tbody tr');
    asbRows.forEach(function(row) {
        var total = 0;
        var inputs = row.querySelectorAll('input[type="text"]');
        inputs.forEach(function(input) {
            total += parseFloat(input.value) || 0;
        });
        var result = total / 12;
        var totalCell = row.querySelector('.asb-total');
        totalCell.textContent = result.toFixed(2);
    });
}

function calculateHousingLoanBal() {
    var houseMonthly = parseFloat(document.getElementById('house-monthly').value) || 0;
    var housingLoanBal = parseFloat(document.getElementById('housing-loan-balance').value) || 0;
    var actualLoanBal = (houseMonthly * 3) + housingLoanBal;
    document.getElementById('actual-housing-loan-bal').textContent = actualLoanBal.toFixed(2);
}

function calculateSpouseHousingLoanBal() {
    var houseMonthly = parseFloat(document.getElementById('spouse-house-monthly').value) || 0;
    var housingLoanBal = parseFloat(document.getElementById('spouse-housing-loan-balance').value) || 0;
    var actualLoanBal = (houseMonthly * 3) + housingLoanBal;
    document.getElementById('spouse-actual-housing-loan-bal').textContent = actualLoanBal.toFixed(2);
}

function addRow(tableId) {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
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
}

function submitForm() {
    var form = document.getElementById('form-data');
    var formData = new FormData(form);
    console.log('Nama:', formData.get('nama'));
    console.log('IC Number:', formData.get('ic-number'));
    console.log('Phone Number:', formData.get('phone-number'));
    console.log('Date of Birth:', formData.get('dob'));
    console.log('Joint Applicant:', formData.get('joint-applicant'));
    console.log('Spouse Name:', formData.get('spouse-name'));
    console.log('Spouse IC Number:', formData.get('spouse-ic-number'));
    console.log('Spouse Date of Birth:', formData.get('spouse-dob'));
    console.log('Spouse Salary Type:', formData.get('spouse-salary-type'));
    console.log('Spouse Basic Salary:', formData.get('spouse-basic-salary'));
    console.log('Spouse Fix Allowance:', formData.get('spouse-fix-allowance'));
    console.log('Spouse Caruman Tetap:', formData.get('spouse-caruman-tetap'));
    console.log('Salary Type:', formData.get('salary-type'));
    console.log('Basic Salary:', formData.get('basic-salary'));
    console.log('Fix Allowance:', formData.get('fix-allowance'));
    console.log('Caruman Tetap:', formData.get('caruman-tetap'));
    calculateHousingLoanBal();
    calculateSpouseHousingLoanBal();
    calculateEATotals();
    calculateASBTotal();
    // Logik untuk hantar data tambahan jika diperlukan
}

// Initialize first tab as active
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tab-active').click();
});
