'use client'
import styles from './index.module.css'
import Image from 'next/image'
// import dummy_profile_img from './images/profile-dummy.svg'


const Sidebar = (props) => {
  const {isOpen} = props
  console.log(props)
  return (
    <div className={`${styles.sidebar} test-red-border ${isOpen ? 'display-block' : 'display-none' }`} id='sidebar'>
       <a href="#" on="closeNav()">Close</a>
        <a href="#">Menu Item 1</a>
        <a href="#">Menu Item 2</a>
        <a href="#">Menu Item 3</a>
    </div>
  )
}

export default Sidebar