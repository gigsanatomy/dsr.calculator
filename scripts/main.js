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

// Initialize first tab as active
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tab-active').click();
});
