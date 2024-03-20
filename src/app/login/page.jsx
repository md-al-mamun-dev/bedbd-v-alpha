'use client'
import styles from './page.module.css'
import Image from 'next/image'

const Login = () => {
  return (
    <div className={styles.access_page}>
        <div className={`${styles.access_container} box-shadow-gray`}>
            <div className={styles.decoration}>
                <div className={styles.logo_wrapper}>
                    <Image src={'logo.svg'} fill/>
                </div>

                <div className={`${styles.login_register_aid}`}> 
                    <h3 className={`${styles.q_txt}`}></h3>Not a member yet? 
                    <a href='#' className={`${styles._link}`}>Register Now</a>
                </div>
            </div>

            <div className={styles.entrance}>
                <div className={styles.content}>
                    <h1 className={`capitalize ${styles.title}`}>{`log in`}</h1>
                    <form className={`${styles.login_register_form}`}>
                        <div className={`${styles.form_input_item}`}>
                            <label className={`${styles.label}`}>Phone</label>
                            <input type='text' className={`${styles.input}`}/>
                        </div>
                        <buttom className={`${styles.submit_btn}`}> continue </buttom>
                    </form>

                    <p> or Connect with</p>

                    <div className={`${styles.social_login_link}`}>
                        <button>Google</button>
                        <button>Facebook</button>
                        <button>Linkedin</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login