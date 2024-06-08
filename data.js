function handleSubmit(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const subject = document.getElementById('subject').value;

    localStorage.setItem("name",name)
    localStorage.setItem("email",email)
    localStorage.setItem("address",address)
    localStorage.setItem("subject",subject)
}