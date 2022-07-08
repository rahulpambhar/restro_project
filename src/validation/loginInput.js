
import validator from "validator";

const loginInput = (LogInData) => {

    let errors = {};

    const { email, password } = LogInData

    // email 
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

    return {
        isInvalid: Object.keys(errors).length > 0,
        errors: errors,
    }
}

export default loginInput