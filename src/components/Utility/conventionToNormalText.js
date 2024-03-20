export default function conventionToNormalText(text) {
    const words = text.replace(/[_-]/g, ' ').split(/\s+/);  
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return formattedWords.join(' ');
}
