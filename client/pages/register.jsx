import { data } from 'autoprefixer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react'
import { toast } from 'react-toastify';
import styles from '../styles/Home.module.css'
export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        }
        try {
            const { data } = await axios.post('http://localhost:5000/api/register', user)

            if (data.errors) {
                toast.error(errors.message)
                console.log(errors.message);
            } else {
                setEmail("")
                setFirstName("")
                setLastName("")
                setPhoneNumber("")
                setPassword("")
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        }


    }

    return (
        <div className={styles.div2}>
            <h1>Create an account</h1>
            <p>To continue, create an account with us</p>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <label For="Fname">First name</label>
                    <input className="form-control w-100" type="text" name="fname"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                    />
                    <label for="lname">Last name</label>
                    <input className="form-control w-100" type="text" name="lname"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                    />
                    <label for="email">Email Address</label>
                    <input className='form-control w-100' type="text" name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label for="phoneNumber">Phone Number</label>
                    <input className='form-control w-100' type="number" name="number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                    />
                    <label for="password">Password</label>
                    <input className='form-control w-100' type="password" name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button className='btn btn-info mt-5' type='submit'>CREATE ACCOUNT</button>

                </form>
            </div>
        </div>
    )
}