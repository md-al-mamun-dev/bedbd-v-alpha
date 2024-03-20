export default function checkPhoneNumber(phoneInput) {
    const phoneRegex = /^(00|\+)\d{1,4}.{1,11}$/;
    const countryCodeRegex = /^(00|\+)\d{1,4}/;
    const minLengthRegex = /^.{1,7}$/

    if(phoneRegex.test(phoneInput)){
        return []
    }else{
        let err = []
        if(!phoneRegex.test(phoneInput)){
            err = [...err, {type:'invalid', message:'invalid Phone number input'}]
        }
        if(!countryCodeRegex.test(phoneInput)){
            err = [...err, {type:'countryCode', message:'phone number not contain country code'}]
        }
        if(!minLengthRegex.test(phoneInput)){
            err = [...err, {type:'min', message:'ple provide full number'}]
        }
        if(phoneInput.length > 18){
            err = [...err, {type:'min', message:'ple re check phone number'}]
        }

        return err
    }
        
    
}
