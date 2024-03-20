export default function previousDay(day) {
    const date = new Date(day * 1000)
    date.setDate(date.getDate() - 1);
    return Math.floor(date.getTime() / 1000);
}