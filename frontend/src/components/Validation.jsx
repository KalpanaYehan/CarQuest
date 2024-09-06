import React from 'react'

const Validation = (values) => {

    const errors = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if (values.name === ""){
        errors.name = 'Name is required!'
    }

    if (values.email === ""){
        errors.email = 'Name is required!'
    }else if(!email_pattern.test(values.email)){
        errors.email = "Email didn't match"
    }

    if (values.password === ""){
        errors.password = 'password is required!'
    }else if(!password_pattern.test(values.password)){
        errors.password = "The password must be at least 8 characters long, consisting of only letters (uppercase or lowercase) and digits."
    }

  return errors
}
export default Validation
