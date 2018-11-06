const client_id = document.getElementById('client_id');
const client_secret = document.getElementById('client_secret');
const connect = document.getElementById('connect');

connect.addEventListener('click', function () {
    // const client_id = document.getElementById('client_id');
    // const client_secret = document.getElementById('client_secret');
    let clientID = client_id.value;
    let clientSecret = client_secret.value;
    console.log(clientID);
    console.log(clientSecret);
})