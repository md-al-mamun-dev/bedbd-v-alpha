
export default function dateToInteger(month, day, year) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    return Math.floor(date.getTime() / 1000);
}
