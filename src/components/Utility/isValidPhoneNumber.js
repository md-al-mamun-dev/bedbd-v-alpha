

export default function isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\+\d{1,4}\s?(\(\d{1,}\)|\d{1,})[ -]?\d{1,}([ -]?\d{1,}){1,}$/;
    return phoneNumberRegex.test(phoneNumber);
}