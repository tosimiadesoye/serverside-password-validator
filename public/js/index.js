//front end
//bring form into js
//check if name meets requirements
//check if passwords meets the requirements
//backend
//create routes for getting the post request
//create validator
let form = document.getElementById('form');
form.onsubmit = validate;
   function validate (e) {
       e.preventDefault();

        //for getting the data from the form
 let clientSideData = new FormData(form);
        let Params = {
            headers: {
                "Content-Type": 'application/json'
            },
            //where all the data would be sent over
            body: JSON.stringify({
                 username: clientSideData.get('username'),
                gmail:clientSideData.get('email'),
                 password: clientSideData.get('password'),
                 passwordConfirmation: clientSideData.get('passwordConfirmation')
            }),
            method: 'POST'
        }
       fetch('http://localhost:7000/user', Params)
            .then(res => res.json())
           .then(data => {
               console.log(data.errors)
               let error = document.getElementById('error')
               
               return data.errors.map(err => {
                let name = document.createElement('p')
                   error.appendChild(name)
                   name.textContent = err.msg 
                   console.log(name)
               })
        })
    } 
