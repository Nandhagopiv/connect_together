import axios from "axios"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [eUsername, seteUsername] = useState('')
    const [ePassword, setePassword] = useState('')
    const [msgCol, setmsgCol] = useState(false)
    const [msg, setmsg] = useState("I help you manage your daily activities:)")
    const Navigate = useNavigate()

    function handleUsername(e) {
        seteUsername(e.target.value)
    }

    function handlePassword(e) {
        setePassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        let userfound = false
        axios.get('https://connect-together-ymux.onrender.com/getusers').then((users) => {
            users.data.forEach((data) => {
                if (eUsername === data.username && ePassword === data.password) {
                    Navigate("/landing", {state: {username: eUsername}})
                    userfound = true
                } else if (eUsername === data.username && ePassword !== data.password) {
                    setmsg("Incorrect Password")
                    setmsgCol(true)
                    userfound = true
                }

                if (userfound === false) {
                    setmsg("User not Found. Sign up and Login Again")
                    setmsgCol(true)
                }
            })
        })
    }
    return (
        <Fragment>
            <div className="flex justify-center m-24">
                <form onSubmit={handleLogin} className="flex flex-col gap-5 w-80">
                    <h1 className="text-5xl font-bold">Login</h1>
                    {
                        <p style={{ color: msgCol ? "red" : "black" }} className="text-xl">{msg}</p>
                    }
                    <input onChange={handleUsername} type="text" className="bg-slate-200 p-2 rounded-md outline-none" placeholder="username"></input>
                    <input onChange={handlePassword} type="password" className="bg-slate-200 p-2 rounded-md outline-none" placeholder="password"></input>
                    <button type="submit" className="bg-cyan-600 text-white p-2 rounded-md font-bold">Login</button>
                    <p>Don't have an account? <Link className="underline" to={'/signup'}>Signup</Link></p>
                </form>
            </div>
        </Fragment>
    )
}

export default Login