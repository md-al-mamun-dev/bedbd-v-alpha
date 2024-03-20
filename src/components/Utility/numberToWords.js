export function numberToWords(number) {
    var units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    var tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    function convertToWordsLessThanThousand(num) {
        if (num === 0) {
            return "";
        } else if (num < 10) {
            return units[num];
        } else if (num < 20) {
            return teens[num - 10];
        } else if (num < 100) {
            return tens[Math.floor(num / 10)] + " " + units[num % 10];
        } else {
            return units[Math.floor(num / 100)] + " hundred " + convertToWordsLessThanThousand(num % 100);
        }
    }

    if (number === 0) {
        return "zero";
    } else {
        return convertToWordsLessThanThousand(number);
    }
}