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
    var jointApplicant = document.getElementById('joint-applicant').value;
    var jointFields = document.getElementById('joint-applicant-fields');
    if (jointApplicant === 'joint') {
        jointFields.style.display = 'block';
    } else {
        jointFields.style.display = 'none';
    }
}

function addRow(tableId) {
    var table = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    var isNotConsolidate = tableId === 'not-consolidate-table';
    var ccrisItemName = isNotConsolidate ? 'not-ccris-item' : 'ccris-item';
    var payslipItemName = isNotConsolidate ? 'not-payslip-item' : 'payslip-item';
    var itemNoName = isNotConsolidate ? 'not-item-no' : 'item-no';
    var monthlyPaymentName = isNotConsolidate ? 'not-monthly-payment' : 'monthly-payment';
    newRow.innerHTML = `
        <td><input type="number" name="${itemNoName}"></td>
        <td>
            <select name="${ccrisItemName}">
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
            <select name="${payslipItemName}">
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
        <td><input type="number" name="${monthlyPaymentName}"></td>
    `;
}

function addTenancyRow() {
    var table = document.getElementById('tenancy-agreement-table').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" name="tenancy-row"></td>
        <td>
            <select name="tenancy-column">
                <option value="70%">70%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
                <option value="others">Others</option>
            </select>
        </td>
    `;
}

function addEARow() {
    var table = document.getElementById('ea-form-table').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" name="ea-row"></td>
        <td>
            <select name="ea-column">
                <option value="100%">100%</option>
                <option value="others">Others</option>
            </select>
        </td>
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
    // Logik untuk hantar data tambahan jika diperlukan
}

// Initialize first tab as active
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tab-active').click();
});
