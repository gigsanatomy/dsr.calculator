function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" tab-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " tab-active";
}

function kiraDSR() {
    var gaji = document.getElementById('gaji').value;
    var komitmen = document.getElementById('komitmen').value;
    var dsr = (komitmen / gaji) * 100;
    document.getElementById('hasil-dsr').innerText = dsr.toFixed(2) + '%';
}

function kiraMaxLoan() {
    var gaji = document.getElementById('gaji-max-loan').value;
    var komitmen = document.getElementById('komitmen-max-loan').value;
    var interestRate = document.getElementById('interest-rate').value;
    var loanTerm = document.getElementById('loan-term').value;
    var maxLoan = (gaji - komitmen) * ((1 + (interestRate / 100)) ** loanTerm);
    document.getElementById('hasil-max-loan').innerText = maxLoan.toFixed(2);
}

function kiraRefinance() {
    var balance = document.getElementById('balance').value;
    var newInterestRate = document.getElementById('new-interest-rate').value;
    var newLoanTerm = document.getElementById('new-loan-term').value;
    var monthlyRate = (newInterestRate / 100) / 12;
    var payments = newLoanTerm * 12;
    var newPayment = balance * (monthlyRate * ((1 + monthlyRate) ** payments)) / (((1 + monthlyRate) ** payments) - 1);
    document.getElementById('hasil-refinance').innerText = newPayment.toFixed(2);
}

// Initialize first tab as active
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tab-active').click();
});
