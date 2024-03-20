export function timeStringToMilliseconds(timeString) {
    const [hours, minutes] = timeString.split(':');
  
    const hours24 = parseInt(hours, 10);
    const minutes24 = parseInt(minutes, 10);
  
    const milliseconds = (hours24 * 60 + minutes24) * 60 * 1000;
    return milliseconds;
  }

export function millisecondsToTimeString(milliseconds) {
    const totalMinutes = milliseconds / (60 * 1000);
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes24 = Math.floor(totalMinutes % 60);
  
    const formattedHours = String(hours24).padStart(2, '0');
    const formattedMinutes = String(minutes24).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }


export function timeStringArrayToMilisecondArray(timeArray) {
    if(timeArray.length > 0){
        const time_zero = timeArray[0]
        const time_one = timeArray[1]    
        const startTime = timeStringToMilliseconds(time_zero.split(' ')[0])
        const endTime = timeStringToMilliseconds(time_one.split(' ')[0])
        return [startTime, endTime]    
    }
    else return timeArray
}