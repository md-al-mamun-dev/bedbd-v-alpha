function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

export default function getAllTimeSegment() {
    let timeSegments=[];
  
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
        //   const formattedHour = padZero(hour);
        //   const formattedMinute = padZero(minute);
        //   if(hour<12)
            timeSegments = [...timeSegments,{hour: hour, minute:minute}]
        //   else
        //     timeSegments = [...timeSegments, {hour: hour, minute:minute}]
        }
      }

    return timeSegments
}
