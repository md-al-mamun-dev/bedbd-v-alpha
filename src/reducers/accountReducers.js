export default function accountReducers(initialData, {type, data}) {
    switch (type) {
        case "login": {
            return {...initialData, ...data}
          }
        case 'update':{
            if(data['prefs'])
                return { 
                            ...initialData, 
                            ...data,
                            prefs: {
                                ...initialData['prefs'],
                                ...data['prefs']
                            }
                        }
            return { ...initialData, ...data }
        }

        // case 'update-preferences':{
        //     return {
        //         ...initialData,
        //         prefs:{  
        //             ...initialData['prefs'],
        //             ...data
        //             }, 
        //         }
        // }
        
        // case 'update-user-pref':{
        //     return { 
        //             ...initialData, 
        //                    ...data,
        //             prefs: {
        //                 ...initialData['prefs'],
        //                 ...data['prefs']
        //             }                        
        //         }
        // }
        // case "update": {
        //     return tasks.map(t => {
        //       if (t.id === action.task.id) {
        //         return action.task;
        //       } else {
        //         return t;
        //       }
        //     });
        //   }
        case "logout": {
            return {}
        }

        default: {
            throw Error(`No action matched with ${type}`);
        }
    }
}