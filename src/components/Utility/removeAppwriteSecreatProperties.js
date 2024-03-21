export default function removeAppwriteSecreatProperties(object) {
    function traversThroughArray(arr) {
      return arr.map(item =>{
        if(Array.isArray(item)){
          return traversThroughArray(item)
        }
        else if(item instanceof Object){
          return removeAppwriteSecreatProperties(item)
        }
        else return item
      })
    }
  
    const returnObject = {}
    Object.entries(object).map(([key, value])=>{
      if(!(key === '$permissions' || key ===  '$databaseId' || key ===  '$collectionId') ){
        if(Array.isArray(value)){
          returnObject[key] = traversThroughArray(value)
        }
        else if(value instanceof Object){
          returnObject[key] = removeAppwriteSecreatProperties(value)
        }
        else{
          returnObject[key] = value
        }
      }
    })
  return returnObject
  }