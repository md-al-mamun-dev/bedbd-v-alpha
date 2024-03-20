export default function checkPassword(passwordText) {

    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*\s).{8,120}$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,120}$/;
    const noSpaceRegex = /^[^\s]+$/
    const hasNumberRegex = /.*\d.*/
    const lengthRegex = /^.{8,120}$/
    const loweraseRegex  = /.*[a-z].*/
    const upperaseRegex = /.*[A-Z].*/
    const specialCharacterRegex = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-].*/


    if(passwordRegex.test(passwordText)){
        return []
    }else{
        let err = []
        
        // if(!noSpaceRegex.test(passwordText)){
        //     err = [...err, {type:'blankSpace', message:'password has blank space'}]
        // }
    
        if(!hasNumberRegex.test(passwordText)){
            err = [...err, {type:'number', message:'password must contain number'}]
        }
    
        if(!lengthRegex.test(passwordText)){
            err = [...err, {type:'length', message:'password length is not correct, pls provide at least 8 character'}]
        }
    
        if(!loweraseRegex.test(passwordText)){
            err = [...err, {type:'lowerCase', message:'password must contain lowercase character'}]
        }
    
        if(!upperaseRegex.test(passwordText)){
            err = [...err, {type:'uppercase', message:'password must contain UPPERCASE character'}]
        }
    
        // if(!specialCharacterRegex.test(passwordText)){
        //     err = [...err, {type:'specialCharacter', message:'password must contain special character'}]
        // }
        return err
    }    
}
