export default function checkEmail(emailInput) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(emailInput)){
        return []
    }else{
        return [{type:'invalidFormate', message:'not valid format'}]

    }    
}
