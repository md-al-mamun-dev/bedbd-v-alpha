export default function checkName(nameInput) {
    const nameRegex = /^[A-Za-z\s'\-a-zA-Z]+$|^.{1,120}$/;
    const formateRegex = /^[A-Za-z\s'\-a-zA-Z]+$/u;
    const lengthRegex = /^.{1,120}$/;
    if(nameRegex.test(nameInput)){
        return []
    } else {
        let err = []
        if(formateRegex.test(nameInput)){
            err = [...err, {type:'formate', message:'Name formate is not ok!'}]
        }
        if(lengthRegex.test(nameInput)){
            err = [...err, {type:'length', message:'You name maximum 120 character'}]
        }

        return err
    }    
}
