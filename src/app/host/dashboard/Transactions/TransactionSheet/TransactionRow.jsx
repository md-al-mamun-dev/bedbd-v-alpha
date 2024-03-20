import React from 'react'

const TransactionRow = ({data}) => {
    {
        const date = new Date(data['dateTime'])
        const dayMonth = [...date.toLocaleString('en-US', {day: '2-digit', month: 'short'  }).split(' ')].reverse().join(" ")
        const year =  date.toLocaleString('en-US', { year:'numeric'})

        const propertyName  = data['property']['title']
        const propertyUID = data['property']['uid']
        //
        
        let uid = ''
        
        if(propertyUID){
            if(propertyUID.length>0){
                uid = <span>{'('+ data['property']['uid'] +')'}</span> 
            }
        }


        const amountValue = new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(data['amount']['value'])
        
        let amountSign = ''
        if(data['amount']['type'] === 'addition')
            amountSign = '+'
        else if(data['amount']['type'] === 'deduction')
            amountSign = '-'                                   

        const amount = amountSign + amountValue 

        return <div>
                    <div>{dayMonth + ', ' + year}</div>
                    <div>{propertyName.length>0 ? propertyName : '-' } {uid}</div>
                    <div>{data['details']}</div>
                    <div className={`${amountSign ==='-' && 'clr-red'} ${amountSign ==='+' && 'clr-secondary-400'}`}>{amount}</div>
                    <div>{data['paymentStatus']}</div>
                </div>
        }  
}

export default TransactionRow