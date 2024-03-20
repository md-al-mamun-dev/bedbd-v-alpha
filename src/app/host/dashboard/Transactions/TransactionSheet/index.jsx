
import TransactionRow from "./TransactionRow"
import styles from './index.module.css'


const TransactionSheet = ({data}) => {
  return (
    <div className={`${styles.data_sheet}`}>
        <div>
            <div>Date</div>
            <div>Property Name</div>
            <div>Details</div>
            <div>Amount</div>
            <div>Status</div>
        </div>

        { data.map(transaction =><TransactionRow data={transaction}/> ) }

    </div>
  )
}

export default TransactionSheet