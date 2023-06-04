document.querySelector('#login').addEventListener('click', () => {
    document.getElementById("login").disabled = true 
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    fetch('https://immobile-pfe.onrender.com/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(res => {
        if(res.ok)  {
            res.json()
            return window.location.href = "home.html"
        }
        else{
            document.getElementById("login").disabled = false 
            document.getElementById("error").style.display = "block"
            console.log(res.json());
        }
    }).then(data => {
        console.log(data)
    })
    .catch(error => console.log(error))

    console.log(email, password);
});

