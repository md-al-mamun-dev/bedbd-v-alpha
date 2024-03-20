import styles from './index.module.css'
import SelectPropertyType from './SelectPropertyType'
import SelectDuration from './SelectDutation'
import WithdrawBtn from './WithdrawBtn'
import TransactionSheet from './TransactionSheet'


const Transactions = () => {

const balance = 5264.00
const availableBalance = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2,
                                                          maximumFractionDigits: 2,
                                                        }).format(balance)
  const propertyType = [
    {
      'id':1,
      'name':'All Property'
    },
    {
      'id':2,
      'name':'apartment'
    },{
      'id':3,
      'name':'Villa'
    },{
      'id':4,
      'name':'cottage'
    }]



    const transactions = [{
                            id:0,
                            dateTime: 1705646096000,
                            property: {
                                        title:'Property A',                                        
                                        uid:'DHK-12546213',
                                      },
                            details: "booked for two night",
                            amount: {
                                      value:2100,
                                      type:'addition',
                                      currency:'BDT'
                                    },
                            paymentStatus:"pending"
                          },{
                            id:1,
                            dateTime: 1705646098000,
                            property: {
                                        title:'',
                                        uid:'',
                                      },
                            details: "withdrawal",
                            amount: {
                                      value:3000,
                                      type:'deduction',
                                      currency:'BDT'
                                    },
                            paymentStatus:"pending"
                          },{
                            id:2,
                            dateTime: 1705646099000,
                            property: {
                                        title:'Property B',
                                        uid:'DHK-12546224',
                                      },
                            details: "book for two night",
                            amount: {
                                      value:1200,
                                      type:'addition',
                                      currency:'BDT'
                                    },
                            paymentStatus:"completed"
                          },{
                            id:3,
                            dateTime: 1705646097000,
                            property: {
                                        title:'Property A',
                                        uid:'DHK-12546213',
                                      },
                            details: "Service Fee + tax",
                            amount: {
                                      value:1200,
                                      type:'deduction',
                                      currency:'BDT'
                                    },
                            paymentStatus:"booking money"
                          },{
                            id:4,
                            dateTime: 1705646008000,
                            property:{
                                      title:'Property c',
                                      uid:'DHK-12546000',
                                    },
                            details: "cancled",
                            amount: {
                                    value:'',
                                    type:'',
                                    currency:''
                                  },
                            paymentStatus:"pending"
                          },{
                            id:5,
                            dateTime: 1705646002000,
                            property:{
                              title:'Property c',
                              uid:'DHK-12546000',
                            },
                            details: "Book for 2 night",
                            amount: {
                              value:1200,
                              type:'addition',
                              currency:'BDT'
                            },
                            paymentStatus:"pending"
                          }]

  return (
    <div className=' w-100 p-48-32-16-32'>
      <div className='bg-secondary-050 w-100 br-8 p-32-24'>
        <div className={`${styles.top_ctrl_bar} min-w-100 flex gap-80 space-between`}>
          <div className='flex-center gap-24'>
            <SelectPropertyType data={propertyType}/> 
            <SelectDuration/>
          </div>


          <div className='flex align-center gap-16'>
            <div className={`${styles.balanceTxt}`}>
                Available Balance:<span>{availableBalance}</span>
            </div>
            <WithdrawBtn/>
          </div>          
        </div>

        <TransactionSheet data={transactions}/>
      </div>
    </div>
  )
}

export default Transactions