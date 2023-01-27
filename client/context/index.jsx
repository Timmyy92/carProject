import { useState, createContext, useEffect,} from "react";
import axios from "axios";
import { useRouter } from "next/router";

const userContext = createContext();

const UserProvider = ({children}) => {
    const [state, setState] = useState({
        user: {},
        token: "",
        message:""
    });
    useEffect(() => {
        setState(JSON.parse(localStorage.getItem("auth")));
    }, [])
    const router = useRouter()
    const token = state && state.token ? state.token : ""
    
    axios.defaults.baseURL = "https://localhost:5000/api"
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    axios.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            let res = error.response
            if (res.status === 401 && res.config && !res.config._isRetryRequest) {
                setState(null)
                localStorage.removeItem('auth')
                router.push("/login")
            }
        }
    )
    return (  
        <userContext.Provider value={[state, setState]} >
            {children}
        </userContext.Provider>

    );
}
 
export {UserProvider, userContext};