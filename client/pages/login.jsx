import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { userContext } from "../context";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [state, setState] = useContext(userContext)
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5000/api/login', { email, password })
            if (data.error) {
                toast.error(data.message)

            } else {
                setState({
                    user: data.user,
                    token: data.token,
                    message: data.message
                })
            console.log(state);
                localStorage.setItem('auth', JSON.stringify(data))
                toast.success(data.message)
                router.push("/")
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
        }
    }
    return ( 
        <form onSubmit={handleSubmit}>
  <div className="mx-auto w-50 mt-5">
  <div className="form-outline mb-4">
                    <input type="email"
                        
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
    <label className="form-label" htmlFor="form2Example1">Email address</label>
  </div>
  <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
    <label className="form-label" htmlFor="form2Example2">Password</label>
  </div>
  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" defaultValue id="form2Example31" defaultChecked />
        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
      </div>
    </div>
    <div className="col">
      <a href="#!">Forgot password?</a>
    </div>
  </div>
  <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
  <div className="text-center">
    <p>Not a member? <a href="#!">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f" />
    </button>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google" />
    </button>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter" />
    </button>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github" />
    </button>
  </div>
</div>

</form>
     );
}
 
export default Login;