export default function registrationReducers(initialData, {type, data}) {
    switch (type) {
        // case "login": {
        //     return data
        //   }
        case "registration/update": {
            if(Object(data).hasOwnProperty('prefs'))
                return {
                        ...initialData,
                        ...data,
                        prefs: {
                                ...initialData['prefs'],
                                ...data['prefs']
                            }
                        }
            else
                return { ...initialData, ...data }
                // console.log(initialData)
            // return initialData
            //     return { 
            //                 ...initialData, 
            //                 ...data,
            //                 prefs: {
            //                     ...initialData['prefs'],
            //                     ...data['prefs']
            //                 }                        
            //             }
            // return { ...initialData, ...data }
          }
        case 'registration/update-pref':{
            return {
                ...initialData,
                prefs:{  
                    ...initialData['prefs'],
                    ...data
                    }, 
                }
        }

        // case "logout": {
        //     return {}
        // }

        default: {
            throw Error(`No action matched with ${action.type}`);
        }
    }
}