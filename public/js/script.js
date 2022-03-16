function registerForm(){
    function validateEmail(email){
        var regex = /\S+@\S+\.\S+/;
        return regex.test(email)
    }
    
    let email = document.getElementById('email')
    // let button = document.getElementById('regButton');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm_password')
    
    password.addEventListener('keyup', function(e){
        // console.log(e.target.value)
        if(password.value === confirmPassword.value){
            confirmPassword.style.backgroundColor = '#69a832'; //green
        }else{
            confirmPassword.style.backgroundColor = '#d91427'; //red
        }
    
        if(password.value === "" && confirmPassword.value === ""){
            confirmPassword.style.backgroundColor = "#ffffff"
        }
    })
    
    confirmPassword.addEventListener('keyup', function(){
        if(password.value === confirmPassword.value){
                confirmPassword.style.backgroundColor = '#69a832'; //green
        }else{
            confirmPassword.style.backgroundColor = '#d91427'; //red
        }
    
        if(password.value === "" && confirmPassword.value === ""){
            confirmPassword.style.backgroundColor = "#ffffff"
        }
    })
    
    email.addEventListener('focusout', function(e){
        if(!validateEmail(email.value)){
            e.target.style.background = '#d91427';
            document.querySelector('.invalid_email').style.display = 'block';           
        }else{
            e.target.style.background = '#ffffff';
            document.querySelector('.invalid_email').style.display = 'none';
        }
    })
}

registerForm()