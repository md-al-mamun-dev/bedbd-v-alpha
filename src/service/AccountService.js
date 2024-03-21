import { ID, Account, Teams, Locale } from "appwrite";
import { AppwriteClientClass } from "./config";
// import { account } from "./config";
// import account from "./config";
import appwriteClient from "./config";
// export const account = new Account(appwriteClient)

// export class AccountService extends AppwriteClientClass{
//     account;
//     teams;
//     locale;

//     constructor(account, database, teams, locale){
//         super(name); 
//         this.account = new Account(appwriteClient)
//         this.teams = new Teams(appwriteClient)
//         this.locale = new Locale(appwriteClient);
//     }

//     async createUserAccout(email, password){
//         // console.log( email )
//         // console.log( password )
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,120}$/;
//         const isEmailValid = emailRegex.test(email)
//         const isPasswordValid = passwordRegex.test(password)

//         if(isEmailValid && isPasswordValid){

//             // console.log(process.env.HOME_URL)
//             try{  
//                 // const promise = account.createMagicURLSession(ID.unique(), email);
//                 const userAccount = await this.account.create(ID.unique(), email, password);
//                 if(userAccount){
//                     try {
//                         const userSession = await this.account.createEmailSession(email, password);
//                         if(userSession){
//                             try {
//                                 const userVerification = this.account.createVerification(process.env.NEXT_PUBLIC_HOME_URL);
//                                 if(userVerification){
//                                     try {
//                                         const logout = await this.account.deleteSession('current')
//                                     } catch (error) {
                                        
//                                     }
//                                 }
//                             } catch (error) {
                                
//                             }
//                         }
//                     } catch (error) {
                        
//                     }
//                 }
                




//                 // userAccount.then(function (response) {
//                 //     console.log(response); // Success
//                 // }, function (error) {
//                 //     console.log(error); // Failure
//                 // });
                
//                 // const signupResult = await account.create(, email, password)
//                 // console.log(email)
//                 // console.log(password)
//                 // const account = account.create(ID.unique(), email, password)
//                 // account.then(function (successAccount) {
//                 //     console.log('account creation successfull')
//                 //     console.log(successAccount);
//                 //     const session = account.createEmailSession(email, password);
//                 //     session.then(function (sessionSuccess) {
//                 //         console.log('session creation successfull')
//                 //         console.log(sessionSuccess); 
//                 //         const mailVerification = account.createVerification(process.env.NEXT_PUBLIC_HOME_URL);
//                 //         mailVerification.then(function (successMailVerification) {
//                 //             console.log('verification mail successfully send')
//                 //             console.log(successMailVerification); 
//                 //             const deleteSession =  account.deleteSession('current')
//                 //             deleteSession.then(function (deleteSuccess) {
//                 //                 console.log('delete Session successfully')
//                 //                 console.log(deleteSuccess); 
//                 //             }, function (error) {
//                 //                 console.log(error);
//                 //             })
//                 //         }, function (error) {
//                 //             console.log(error); 
//                 //         })

//                 //     }, function (error) {
//                 //         console.log(error); 
//                 //     })
//                 // }, function (error) {
//                 //     console.log(error); // Failure
//                 // })

//                 // if(account){
//                 //     const session = await account.createEmailSession(email, password);
//                 //     if(session){
//                 //         const verificationMail = await account.createVerification(process.env.NEXT_PUBLIC_HOME_URL);
//                 //         if(verificationMail){
//                 //             const logout = await this.logout()
                            
//                 //         }
//                 //     }
//                 // }

//                 // promise.then(function (accountCreateSuccess) {
//                 //     console.log(accountCreateSuccess); // Success
//                 //     const promise = account.createEmailSession(email, password);
//                 //         promise.then(function (sessionSuccess) {
//                 //             console.log(sessionSuccess); // Success
//                 //             const emailVerificationpromise =  account.createVerification('http://localhost:3000/');
//                 //                 emailVerificationpromise.then(function (response) {
//                 //                     const logout = account.deleteSession('current')
//                 //                 }, function (error) {
                                    
//                 //                 });

//                 //         }, function (sessionError) {
//                 //             console.log(sessionError); // Failure
//                 //         });
//                 // }, function (accountCreationError) {
//                 //     console.log(accountCreationError); // Failure
//                 // });

                

//                 // return userAccount
//                 //         ? this.login({email, password}) 
//                 //         : userAccount;
//             }catch(err){
//                 return err 
//             }
//         }
                
//     }

//     async login(input, password=''){
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}$/;
        
//         // Email Login 
//         if (emailRegex.test(input)) {
//             const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,120}$/;
//             const isPasswordValid = passwordRegex.test(password)
//             if(isPasswordValid){
//                 try {
//                     const emailSession =  await this.account.createEmailSession(input, password)
//                     if(emailSession){
//                         if(!emailSession['emailVerification']){
//                             const logout = await this.account.deleteSession('current')
//                         }else{
//                             // const { $id, name, email, phone,  prefs } = emailSession
//                             const sessionData = emailSession
//                             // return { resultType:'success', $id, name, email, phone,  prefs }
//                             return { resultType:'success', ...sessionData }
//                         }
//                         // const isVerified = emailSession['emailVerification']
//                     }
//                 } catch (error) {
//                     // return {    resultType:'error',
//                     //             errorType : error.type,
//                     //             code : error.code ,
//                     //             message : error.response.message    }
//                 }
//             }else{
//                 return false
//             }
               
//         }
//         // phone Login 
//         else if(phoneRegex.test(input)){
//             const contryCodeRegex = /^(\+\d{1,4}\s?)?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}$/;
//             if(contryCodeRegex.test(input)){
//                 try {
//                     // return await this.account.createPhoneSession(ID.unique(), input)
//                     return  await this.account.createPhoneSession(ID.unique(), input)
//                     // if(phoneSession){
//                     //     return phoneSession
//                     // }
//                     // if(phoneSession){
//                     //     const userLabels = phoneSession.labels
//                     //     if(userLabels.length < 1 ){
//                     //         const updateUserLabel = await this.account.updateLabels(phoneSession['$id'], ['notFullyVerified'])
//                     //         if(updateUserLabel){
//                     //             console.log(updateUserLabel)
//                     //             return phoneSession
//                     //         }

//                     //     }
//                     // return phoneSession

//                     // }

//                 } catch (err) {
//                     return err
//                 }
//             }
//         }        
//     }

//     async submitOtp(id, otp){
//         const otpRegex = /^\d{6}$/;
//         if (otpRegex.test(otp)) {
//             try {
//                 const phoneSession =  await this.account.updatePhoneSession(id, otp)
//                 if(phoneSession)
//                     console.log(phoneSession)
//                 if(phoneSession){
//                     let label = []
//                     if(phoneSession.userLabels)
//                         label = phoneSession.userLabels
//                     if(label.length < 1){
//                         const d = await this.account.updateLabels(phoneSession['userId'], ['notFullyVerified'])
//                         if(d){
//                             console.log(d)
//                             return phoneSession
//                         }
//                     }
//                 }
//                 return phoneSession
//             } catch (err) {
//                 return err
//             }    
//         }        
//     }
//     async isLoggedIn(){
//         try {
//             const data  = await this.getCurrentUser();
//             return data 
//                     ? true 
//                     : false
//         } catch (error) {
//             return false
//         }
//     }    
//     async getCurrentUser(){
//         try {
//             return await this.account.get()
//         } catch (err) {
//             return false
//         }
//     }
//     async getToken(){
//         try {
//             return await this.account.createJWT()
//         } catch (err) {
//             return false
//         }
//     }    
//     async updateUserName(name){
//         try {
//             return await this.account.updateName(name)
//         } catch (err) {
//             return false
//         }
//     }
//     async updateUserPrefs(data){
//         try {
//             return await this.account.updatePrefs(data)
//         } catch (err) {
//             return false
//         }
//     }
    
//     async logout(){
//         try {
//             return await this.account.deleteSession('current')
//         } catch (err) {
//             console.log('logout Error: ' + err)
//         }
//     }
//     async getUsersLocalInformation(){
//         try {
//             return await this.locale.get()
//         } catch (err) {
//             console.log('logout Error: ' + err)
//         }
//     }

// }

export class AccountService{
    account;
    teams;
    locale;

    constructor(){
        this.account = new Account(appwriteClient)
        this.teams = new Teams(appwriteClient)
        this.locale = new Locale(appwriteClient);
    }

    async createUserAccout(email, password){
        // console.log( email )
        // console.log( password )
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,120}$/;
        const isEmailValid = emailRegex.test(email)
        const isPasswordValid = passwordRegex.test(password)

        if(isEmailValid && isPasswordValid){

            // console.log(process.env.HOME_URL)
            try{  
                // const promise = account.createMagicURLSession(ID.unique(), email);
                const userAccount = await this.account.create(ID.unique(), email, password);
                if(userAccount){
                    try {
                        const userSession = await this.account.createEmailSession(email, password);
                        if(userSession){
                            try {
                                const userVerification = this.account.createVerification(process.env.NEXT_PUBLIC_HOME_URL);
                                if(userVerification){
                                    try {
                                        const logout = await this.account.deleteSession('current')
                                    } catch (error) {
                                        
                                    }
                                }
                            } catch (error) {
                                
                            }
                        }
                    } catch (error) {
                        
                    }
                }
                




                // userAccount.then(function (response) {
                //     console.log(response); // Success
                // }, function (error) {
                //     console.log(error); // Failure
                // });
                
                // const signupResult = await account.create(, email, password)
                // console.log(email)
                // console.log(password)
                // const account = account.create(ID.unique(), email, password)
                // account.then(function (successAccount) {
                //     console.log('account creation successfull')
                //     console.log(successAccount);
                //     const session = account.createEmailSession(email, password);
                //     session.then(function (sessionSuccess) {
                //         console.log('session creation successfull')
                //         console.log(sessionSuccess); 
                //         const mailVerification = account.createVerification(process.env.NEXT_PUBLIC_HOME_URL);
                //         mailVerification.then(function (successMailVerification) {
                //             console.log('verification mail successfully send')
                //             console.log(successMailVerification); 
                //             const deleteSession =  account.deleteSession('current')
                //             deleteSession.then(function (deleteSuccess) {
                //                 console.log('delete Session successfully')
                //                 console.log(deleteSuccess); 
                //             }, function (error) {
                //                 console.log(error);
                //             })
                //         }, function (error) {
                //             console.log(error); 
                //         })

                //     }, function (error) {
                //         console.log(error); 
                //     })
                // }, function (error) {
                //     console.log(error); // Failure
                // })

                // if(account){
                //     const session = await account.createEmailSession(email, password);
                //     if(session){
                //         const verificationMail = await account.createVerification(process.env.NEXT_PUBLIC_HOME_URL);
                //         if(verificationMail){
                //             const logout = await this.logout()
                            
                //         }
                //     }
                // }

                // promise.then(function (accountCreateSuccess) {
                //     console.log(accountCreateSuccess); // Success
                //     const promise = account.createEmailSession(email, password);
                //         promise.then(function (sessionSuccess) {
                //             console.log(sessionSuccess); // Success
                //             const emailVerificationpromise =  account.createVerification('http://localhost:3000/');
                //                 emailVerificationpromise.then(function (response) {
                //                     const logout = account.deleteSession('current')
                //                 }, function (error) {
                                    
                //                 });

                //         }, function (sessionError) {
                //             console.log(sessionError); // Failure
                //         });
                // }, function (accountCreationError) {
                //     console.log(accountCreationError); // Failure
                // });

                

                // return userAccount
                //         ? this.login({email, password}) 
                //         : userAccount;
            }catch(err){
                return err 
            }
        }
                
    }

    async login(input, password=''){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}$/;
        
        // Email Login 
        if (emailRegex.test(input)) {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,120}$/;
            const isPasswordValid = passwordRegex.test(password)
            if(isPasswordValid){
                try {
                    const emailSession =  await this.account.createEmailSession(input, password)
                    if(emailSession){
                        if(!emailSession['emailVerification']){
                            const logout = await this.account.deleteSession('current')
                        }else{
                            // const { $id, name, email, phone,  prefs } = emailSession
                            const sessionData = emailSession
                            // return { resultType:'success', $id, name, email, phone,  prefs }
                            return { resultType:'success', ...sessionData }
                        }
                        // const isVerified = emailSession['emailVerification']
                    }
                } catch (error) {
                    // return {    resultType:'error',
                    //             errorType : error.type,
                    //             code : error.code ,
                    //             message : error.response.message    }
                }
            }else{
                return false
            }
               
        }
        // phone Login 
        else if(phoneRegex.test(input)){
            const contryCodeRegex = /^(\+\d{1,4}\s?)?\(?\d{1,}\)?[-.\s]?\d{1,}[-.\s]?\d{1,}$/;
            if(contryCodeRegex.test(input)){
                try {
                    // return await this.account.createPhoneSession(ID.unique(), input)
                    return  await this.account.createPhoneSession(ID.unique(), input)
                    // if(phoneSession){
                    //     return phoneSession
                    // }
                    // if(phoneSession){
                    //     const userLabels = phoneSession.labels
                    //     if(userLabels.length < 1 ){
                    //         const updateUserLabel = await this.account.updateLabels(phoneSession['$id'], ['notFullyVerified'])
                    //         if(updateUserLabel){
                    //             console.log(updateUserLabel)
                    //             return phoneSession
                    //         }

                    //     }
                    // return phoneSession

                    // }

                } catch (err) {
                    return err
                }
            }
        }        
    }

    async submitOtp(id, otp){
        const otpRegex = /^\d{6}$/;
        if (otpRegex.test(otp)) {
            try {
                const phoneSession =  await this.account.updatePhoneSession(id, otp)
                if(phoneSession)
                    console.log(phoneSession)
                if(phoneSession){
                    let label = []
                    if(phoneSession.userLabels)
                        label = phoneSession.userLabels
                    if(label.length < 1){
                        const d = await this.account.updateLabels(phoneSession['userId'], ['notFullyVerified'])
                        if(d){
                            console.log(d)
                            return phoneSession
                        }
                    }
                }
                return phoneSession
            } catch (err) {
                return err
            }    
        }        
    }
    async isLoggedIn(){
        try {
            const data  = await this.getCurrentUser();
            return data 
                    ? true 
                    : false
        } catch (error) {
            return false
        }
    }    
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (err) {
            return false
        }
    }
    async getToken(){
        try {
            return await this.account.createJWT()
        } catch (err) {
            return false
        }
    }    
    async updateUserName(name){
        try {
            return await this.account.updateName(name)
        } catch (err) {
            return false
        }
    }
    async updateUserPrefs(data){
        try {
            return await this.account.updatePrefs(data)
        } catch (err) {
            return false
        }
    }
    
    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (err) {
            console.log('logout Error: ' + err)
        }
    }
    async getUsersLocalInformation(){
        try {
            return await this.locale.get()
        } catch (err) {
            console.log('logout Error: ' + err)
        }
    }

}

const accountService = new AccountService()
export default accountService