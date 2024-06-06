document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from form
    let mv = parseFloat(document.getElementById('marketValue').innerText.replace('RM', '')) || 0;
    let bakiHousingLoan = parseFloat(document.getElementById('actualHousingLoanBal').innerText.replace('RM', '')) || 0;
    let totalOutstanding = parseFloat(document.getElementById('totalOutstanding').innerText.replace('RM', '')) || 0;
    let moreThanThreeHouses = document.getElementById('moreThanThreeHouses').innerText.toLowerCase() === 'yes';

    // Calculations
    let loan90 = mv * 0.9;
    let loan70 = mv * 0.7;
    let percent10 = mv * 0.1;
    let percent5 = mv * 0.05;
    let totalCashOut = moreThanThreeHouses ? (loan70 - bakiHousingLoan) : (loan90 - bakiHousingLoan);
    let bakiCashOut = totalCashOut - totalOutstanding;

    // Set values
    document.getElementById('mv').innerText = `RM ${mv.toFixed(2)}`;
    document.getElementById('loan90').innerText = `RM ${loan90.toFixed(2)}`;
    document.getElementById('loan70').innerText = `RM ${loan70.toFixed(2)}`;
    document.getElementById('percent10').innerText = `RM ${percent10.toFixed(2)}`;
    document.getElementById('percent5').innerText = `RM ${percent5.toFixed(2)}`;
    document.getElementById('bakiHousingLoan').innerText = `RM ${bakiHousingLoan.toFixed(2)}`;
    document.getElementById('totalCashOut').innerText = `RM ${totalCashOut.toFixed(2)}`;
    document.getElementById('totalDebtConsolidate').innerText = `RM ${totalOutstanding.toFixed(2)}`;
    document.getElementById('bakiCashOut').innerText = `RM ${bakiCashOut.toFixed(2)}`;

    // Fetch and calculate Gross Pay, Total Deductions, Nett Pay
    let basic = parseFloat(document.getElementById('basicSalary').value) || 0;
    let fixAllowance = parseFloat(document.getElementById('fixAllowance').value) || 0;
    let spouseBasic = parseFloat(document.getElementById('spouseBasicSalary').value) || 0;
    let spouseFixAllowance = parseFloat(document.getElementById('spouseFixAllowance').value) || 0;
    let ot70 = parseFloat(document.getElementById('ot70').innerText.replace('RM', '')) || 0;
    let variableAllowance70 = parseFloat(document.getElementById('variableAllowance70').innerText.replace('RM', '')) || 0;
    let othersEarning = parseFloat(document.getElementById('othersEarning').innerText.replace('RM', '')) || 0;
    let tenancyAgreement = parseFloat(document.getElementById('tenancyAgreement').innerText.replace('RM', '')) || 0;
    let eaForm = parseFloat(document.getElementById('eaForm').innerText.replace('RM', '')) || 0;
    let asbDividen = parseFloat(document.getElementById('asbDividen').innerText.replace('RM', '')) || 0;
    let spouseOt70 = parseFloat(document.getElementById('spouseOt70').innerText.replace('RM', '')) || 0;
    let spouseVariableAllowance70 = parseFloat(document.getElementById('spouseVariableAllowance70').innerText.replace('RM', '')) || 0;
    let spouseOthersEarning = parseFloat(document.getElementById('spouseOthersEarning').innerText.replace('RM', '')) || 0;
    let spouseTenancyAgreement = parseFloat(document.getElementById('spouseTenancyAgreement').innerText.replace('RM', '')) || 0;
    let spouseEaForm = parseFloat(document.getElementById('spouseEaForm').innerText.replace('RM', '')) || 0;
    let spouseAsbDividen = parseFloat(document.getElementById('spouseAsbDividen').innerText.replace('RM', '')) || 0;

    let grossPay = basic + fixAllowance + spouseBasic + spouseFixAllowance + ot70 + variableAllowance70 + othersEarning + tenancyAgreement + eaForm + asbDividen + spouseOt70 + spouseVariableAllowance70 + spouseOthersEarning + spouseTenancyAgreement + spouseEaForm + spouseAsbDividen;

    let epf = parseFloat(document.getElementById('epf').innerText.replace('RM', '')) || 0;
    let eis = parseFloat(document.getElementById('eis').innerText.replace('RM', '')) || 0;
    let pcb = parseFloat(document.getElementById('pcb').innerText.replace('RM', '')) || 0;
    let deductionsOthers = parseFloat(document.getElementById('deductionsOthers').innerText.replace('RM', '')) || 0;
    let spouseEpf = parseFloat(document.getElementById('spouseEpf').innerText.replace('RM', '')) || 0;
    let spouseEis = parseFloat(document.getElementById('spouseEis').innerText.replace('RM', '')) || 0;
    let spousePcb = parseFloat(document.getElementById('spousePcb').innerText.replace('RM', '')) || 0;
    let spouseDeductionsOthers = parseFloat(document.getElementById('spouseDeductionsOthers').innerText.replace('RM', '')) || 0;

    let totalDeductions = epf + eis + pcb + deductionsOthers + spouseEpf + spouseEis + spousePcb + spouseDeductionsOthers;

    let nettPay = grossPay - totalDeductions;

    // Set values
    document.getElementById('grossPay').innerText = `RM ${grossPay.toFixed(2)}`;
    document.getElementById('totalDeductions').innerText = `RM ${totalDeductions.toFixed(2)}`;
    document.getElementById('nettPay').innerText = `RM ${nettPay.toFixed(2)}`;
});
