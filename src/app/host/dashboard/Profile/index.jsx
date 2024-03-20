import styles from './index.module.css'
import Image from 'next/image'
import BrowseBtn from './BrowseBtn'
import ProfileImg from './HostImg'
import CoverImg from './CoverImg'
import DeleteAccountBtn from './DeleteAccountBtn'
import CopyBtn from './CopyBtn'
import VarificationBadge from './VarificationBadge'
import SaveBtn from './SaveBtn'


// import DummyProfileImage from '@/../public/images/sample_host_img.jpeg'

const Profile = async () => {

  const userId = 'BD-CTG-156513235'

  return (
    <div className={`w-100 ${styles.profile}`}>
        <div className={`${styles.cover_img_wrapper}`}>
          <BrowseBtn type='cover'/>
        </div>
        <div className={`relative grid justify-items-center gap-16 br-8 bg-secondary-100 p-132-24-8-24 w-fit-content ${styles.about_host_section}`}>
            <ProfileImg/>
            <BrowseBtn type='host'/>
            <textarea className={`border-none ${styles.about_host_txt}`} id="aboutTxt" name="aboutTxt" placeholder='Say something about yourself'/>
            <DeleteAccountBtn/>
        </div>

        <div className={`${styles.profile_info_details}`}>
          <form className={`${styles.user_info_form}`}>
            <div className={`${styles.form_item} ${styles.form_id} relative `}>
              User Id: {userId}
              <CopyBtn/>
            </div>
            <div className={`${styles.form_item} ${styles.form_first_name}`}>
              <input type='text' readOnly name='firstName' placeholder='First Name'/> 
            </div>

            <div className={`${styles.form_item} ${styles.form_last_name}`}>
              <input type='text' readOnly name='lastName' placeholder='Last Name'/> 
            </div>

            <div className={`${styles.form_item} ${styles.form_phone} relative`}>
              <input type='text' readOnly name='phone' placeholder='Phone'/> 
              {/* <LucidIcon name='badge-check' color='green'/> */}
              {/* <LucidIcon name='x-circle' color='red'/> */}
              <VarificationBadge data={{isVarified:true}}/>

            </div>

            <div className={`${styles.form_item} ${styles.form_email} relative`}>
              <input type='text' readOnly name='email' placeholder='Email'/> 
              <VarificationBadge data={{isVarified:false}}/>
              {/* <LucidIcon name='x-circle' color='red'/> */}
              {/* <LucidIcon name='badge-check' color='green'/> */}
            </div>

            <div className={`${styles.form_item} ${styles.form_id_no}`}>
              <input type='text' readOnly name='idNo' placeholder='ID No.'/> 
            </div>

            <div className={`${styles.form_item} ${styles.form_present_address}`}>
              <input type='text' readOnly name='Present Address' placeholder='Present Address'/> 
            </div>

            <div className={`${styles.form_item} ${styles.form_parmanent_address}`}>
              <input type='text' readOnly name='Permanent Address' placeholder='Permanent Address'/> 
            </div>


          </form>
          <SaveBtn data={{isActive:true}} />
        </div>
    </div>
  )
}

export default Profile