function submitForm() {
    var form = document.getElementById('form-data');
    var formData = new FormData(form);
    console.log('Nama:', formData.get('nama'));
    console.log('Gaji Bulanan:', formData.get('gaji'));
    console.log('Jumlah Komitmen Bulanan:', formData.get('komitmen'));
    console.log('Kadar Faedah:', formData.get('kadar-faedah'));
    console.log('Tempoh Pinjaman:', formData.get('tempoh-pinjaman'));

    // Logik pengiraan dan penghantaran data ke tab lain
}
