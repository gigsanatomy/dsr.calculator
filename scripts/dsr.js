// Function to toggle visibility of joint fields
function toggleJointFields() {
    const loanType = document.getElementById('single-joint-loan').value;
    const jointFields = document.querySelectorAll('.joint-fields');
    jointFields.forEach(field => {
        field.style.display = loanType === 'joint' ? 'table-row' : 'none';
    });
}

// Function to calculate age based on IC number
function calculateAge(icNumber) {
    const year = parseInt(icNumber.substring(0, 2));
    const month = parseInt(icNumber.substring(2, 4));
    const day = parseInt(icNumber.substring(4, 6));
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = year > currentYear ? 1900 + year : 2000 + year;
    const birthDate = new Date(fullYear, month - 1, day);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Function to pull data from form
function pullDataFromForm() {
    const name = document.querySelector('#form-name').value;
    const icNumber = document.querySelector('#form-ic-number').value;
    const phoneNumber = document.querySelector('#form-phone-number').value;
    const basicSalary = parseFloat(document.querySelector('#form-basic-salary').value) || 0;
    const fixAllowance = parseFloat(document.querySelector('#form-fix-allowance').value) || 0;
    const spouseBasicSalary = parseFloat(document.querySelector('#form-spouse-basic-salary').value) || 0;
    const spouseFixAllowance = parseFloat(document.querySelector('#form-spouse-fix-allowance').value) || 0;
    const netpay = basicSalary + fixAllowance;
    const spouseNetpay = spouseBasicSalary + spouseFixAllowance;
    const totalCommitment = calculateTotalCommitment();

    document.getElementById('name').textContent = name || '0';
    document.getElementById('no-ic').textContent = icNumber || '--';
    document.getElementById('age').textContent = icNumber ? calculateAge(icNumber) : '#VALUE!';
    document.getElementById('no-telephone').textContent = phoneNumber || '0';
    document.getElementById('total-commitment').textContent = totalCommitment || '#VALUE!';
    document.getElementById('netpay').textContent = `RM${netpay.toFixed(2)}`;
    document.getElementById('ndi-before').textContent = calculateNDI(netpay, totalCommitment) || '#VALUE!';
    document.getElementById('spouse-name').textContent = document.querySelector('#form-spouse-name').value || '';
    document.getElementById('spouse-netpay').textContent = `RM${spouseNetpay.toFixed(2)}`;
    document.getElementById('spouse-age').textContent = document.querySelector('#form-spouse-ic-number').value ? calculateAge(document.querySelector('#form-spouse-ic-number').value) : '#VALUE!';
}

// Function to calculate total commitment
function calculateTotalCommitment() {
    const commitments = document.querySelectorAll('.form-commitment');
    let total = 0;
    commitments.forEach(commitment => {
        total += parseFloat(commitment.value) || 0;
    });
    return total;
}

// Function to calculate NDI
function calculateNDI(netpay, totalCommitment) {
    return netpay - totalCommitment;
}

// Add event listener to call toggleJointFields on page load
window.onload = function() {
    toggleJointFields();
    document.getElementById('single-joint-loan').addEventListener('change', toggleJointFields);
    pullDataFromForm();
}
