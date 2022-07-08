import validator from "validator";

const ValidateRegisterInput = (data) => {

    let errors = {};

    const { name, email, password, confirm_password } = data

    // NAME
    if (validator.isEmpty(name)) {
        errors.name = "Name field is required"
    }

    // EMAIL 
    if (!validator.isEmail(email)) {
        errors.email = "please Enter valid Email address."
    }
    if (validator.isEmpty(email)) {
        errors.email = "Email field is required"
    }

    // password

    if (!validator.isStrongPassword(password)) {
        errors.password = "password should contain num,CAPS,special char,lower case"
    }
    if (validator.isEmpty(password)) {
        errors.password = "Password field is required"
    }

    // confirm_password   

    if (!validator.equals(password, confirm_password)) {
        errors.confirm_password = "password should match"
    }

    if (validator.isEmpty(confirm_password)) {
        errors.confirm_password = " Confirm password field is required"
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    }
}





export default ValidateRegisterInput

