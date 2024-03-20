
export default function page({params, searchParams }) {

    const searchParamObj = JSON.parse(JSON.stringify(searchParams))



    const data = {};
    Object.keys(searchParams).forEach(key => {
      const cleanedKey = key.trim();
      data[cleanedKey] = searchParams[key];
    });

    console.log(data['userId'])
    console.log(data['secret'])
    console.log(data['expire'])

    // console.log(data['secret'])
    // console.log(data['expire'])
    // const obj = Object.fromEntries(searchParams.searchParams.entries())
    // console.log(obj)
    
    // const { userId, secret, expire } = JSON.parse(searchParams)
    // console.log(userId)
    // console.log(secret)
    // console.log(expire)
  return (
    <div>Email validation page</div>
  )
}
