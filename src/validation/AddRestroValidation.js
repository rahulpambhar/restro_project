import validator from "validator";


// this Valideation is for both addRestro. and updateRestro.

const AddRestroValidationInput = (data) => {
    let addRestroErr = {};
    const { name, address, contact } = data;
     
    // name  

    if (validator.isEmpty(name)) {
        addRestroErr.name = "Restaurant Name require"
    }
 
    // address 

    if (validator.isEmpty(address)) {
        addRestroErr.address = "Address require"
    }

    // contact

    if (!validator.isNumeric(contact)) {

        addRestroErr.contact = "should Numaric Value"
    } else {
        if (contact.length <= 6) {
            addRestroErr.contact = "eg.+0918000555268(14 charactors)"
        }
    }
 

    if (validator.isMobilePhone(contact)) {
        addRestroErr.contact = "eg.+0918000555268(14 charactors.)"
    }
    if (validator.isEmpty(contact)) {
        addRestroErr.contact = "Mobile Number Require"
    }
    return {
        isInvalid: Object.keys(addRestroErr).length > 0,
        addRestroErr: addRestroErr
    }

}

export default AddRestroValidationInput