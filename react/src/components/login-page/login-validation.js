const Validation = (initalFields) =>{
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

     if(!emailPattern.test(initalFields.email)){
        error.email = 'Email Does not match'
    }
    else{
        error.email = ''
    }
     if(!passwordPattern.test(initalFields.password)){
        error.password = 'Incorrect password'
    }
    else{
        error.password = ''
    }
    return error
}
export default Validation;