// Warning
// this function is only for Client/frontend component 
// do not use in server component
// it has navigator object which only work on browser
export default function copyToClipboard(textToCopy) {
    async function copy(params) {
        try {
            await navigator.clipboard.writeText(textToCopy);
          } catch (err) {
            console.error('Failed to copy text: ', err);
          }
    }
    copy()    
}
