exports.validateEmail = (email) => {
    if (!email || !email.length) {
        return false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

exports.validatedStatus = (status) => {
    const statusTypes = ['active', 'unsubscribe', 'pending'];

    let validatedStatus = status;
    if (!status || !status.length || !statusTypes.includes(status)) {
        validatedStatus = "pending";
    }

    return validatedStatus;
}