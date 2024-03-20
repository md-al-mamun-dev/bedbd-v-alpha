import styles from './page.module.css'
import Sidebar from './Sidebar'
import DashboardBody from './DashboardBody'
import Profile from './Profile'
import Transactions from './Transactions'
import Property from './Property'
import Setting from './Setting'
const HostDashboard = () => {
  return (
    <div className={`dashboard-container flex container`}>
        <Sidebar/>
        {/* <Profile/> */}
        {/* <Transactions/> */}
        {/* <DashboardBody/> */}
        <Property/>
        {/* <Setting/> */}
    </div>
  )
}

export default HostDashboard