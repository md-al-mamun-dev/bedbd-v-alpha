export default function hasCountryCode(phoneNumber) {
    // const countrycodeRegex = /^\+\d{1,4}\s?/;
    const countrycodeRegex = /^\+\d{1,4}\s?/

    return countrycodeRegex.test(phoneNumber);
}
