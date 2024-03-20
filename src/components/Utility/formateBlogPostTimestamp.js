export function formateBlogPostTimestamp(timestamp) {
    const monthsName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = Date.now();
    const timeDifference = now - timestamp;
    const seconds = Math.floor(timeDifference / 1000);        
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (seconds < 2592000) {
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (seconds < 31536000) {
        const months = Math.floor(seconds / 2592000);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const dateTime = new Date(timestamp);
        const month = dateTime.getMonth()
        const exectDate = dateTime.getDate()
        const year = dateTime.getFullYear()
        return monthsName[month] + ' ' + exectDate + ', ' + year 
    }
}

export function formateBlogPostFromTimeString(timeString) {
    const monthsName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = Date.now();
    const timestamp = new Date(timeString)
    const timeDifference = now - timestamp;
    const seconds = Math.floor(timeDifference / 1000);        
    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (seconds < 604800) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (seconds < 2592000) {
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (seconds < 31536000) {
        const months = Math.floor(seconds / 2592000);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const dateTime = new Date(timestamp);
        const month = dateTime.getMonth()
        const exectDate = dateTime.getDate()
        const year = dateTime.getFullYear()
        return monthsName[month] + ' ' + exectDate + ', ' + year 
    }
}