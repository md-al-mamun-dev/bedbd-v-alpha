

export const debounce = (func, delay = 300) => {
    let timeout;
    return function (...args){
        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            func(...args)
        }, delay)
    }
}


export const debounceCount = (func, delay = 300)=> {
    let timeout;
    let clickCount = 0;
    return function (...args) {
        clickCount++;  
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(clickCount, ...args);
            clickCount = 0; 
        }, delay);
    };
  }
export default debounce