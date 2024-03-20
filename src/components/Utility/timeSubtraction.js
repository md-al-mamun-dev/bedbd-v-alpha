
export default function timeSubtraction(a, b) {   
    const startTime = new Date()
    startTime.setHours(parseInt(a), 0, 0, 0)
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() - parseInt(b))
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = endTime.toLocaleTimeString(undefined, timeOptions).split(':')
    return timeString[0] + ':' + timeString[1] +  (timeString[0] > 11 ? ' PM' : ' AM' )
}
