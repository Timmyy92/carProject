import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { userContext } from '../context';
import styles from '../styles/Home.module.css'


const Navbar = () => {
    const router = useRouter()

    const [state, setState] = useContext(userContext)
    const logOut = () => {
        localStorage.removeItem("auth")
        setState(null)
        router.push('/login')
        
    }

    return ( 
<nav className={styles.header1}>
          <ul className={styles.ul}>
            <a href='' className='t-text-black t-no-underline'>OLAMIDE AUTOS</a>
            <a href='' className='t-text-black t-no-underline'>Buy a car</a>
            <a href='' className='t-text-black t-no-underline'>Sell a car</a>
            <a href='' className='t-text-black t-no-underline'>Buy a Truck</a>
            <a href='' className='t-text-black t-no-underline'>Car Loan</a>
          </ul>
            <div className={styles.div1}>
                {state !== null ? 
            <button className='btn btn-danger  t-no-underline' onClick={logOut}>Log out</button>
                    :
                    <>
                      <Link href='/login' className='btn btn-secondary  t-no-underline'>Sign in</Link>
            <Link href='/register' className='btn btn-warning t-no-underline'>Register</Link>
                    </>
            }
          
          </div>
        </nav>

     );
}
 
export default Navbar;