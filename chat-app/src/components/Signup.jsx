import { Fragment, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Signup = ()=>{
    const Navigate = useNavigate()
    const handleSignUp = (e)=>{
        e.preventDefault()
        axios.get(`http://localhost:5000/newuser?username=${newUser}&password=${newPassword}&email=${email}&phone=${phone}`).then((data)=>{
            console.log(data.data);
            if (data.data === false) {
                setExistingUser(true)
            } else {
                setExistingUser(false)
                Navigate('/')
            }
        })
    }
    const[existingUser,setExistingUser] = useState(false)
    const[newUser,setNewUser] = useState('')
    const[newPassword,setNewPassword] = useState('')
    const[email,setemail] = useState('')
    const[phone,setphone] = useState('')

    const handleUsername = (e)=>{
        setNewUser(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))
    }

    const handlePassword = (e)=>{
        setNewPassword(e.target.value)
    }

    const handleEmail =(e)=>{
        setemail(e.target.value)
    }

    const handlePhone = (e)=>{
        setphone(e.target.value)
    }
    return(
        <Fragment>
            <div className="flex justify-center m-24">
                <form onSubmit={handleSignUp} className="flex flex-col gap-5 w-80">
                    <h1 className="text-5xl font-bold">Sign up</h1>
                    <p style={{color:existingUser?'red':'black'}} className="text-2xl">{existingUser?'Enter Email or Phone is already Existed':'You can Sign up Here:)'}</p>
                    <input type="text" onChange={handleUsername} value={newUser} required className="bg-slate-200 p-2 rounded-md outline-none" placeholder="Username"></input>
                    <input type="password" onChange={handlePassword} value={newPassword} required className="bg-slate-200 p-2 rounded-md outline-none" placeholder="Password"></input>
                    <input type="email" onChange={handleEmail} value={email} className="bg-slate-200 p-2 rounded-md outline-none" placeholder="Email"></input>
                    <input type="number" onChange={handlePhone} value={phone} required className="bg-slate-200 p-2 rounded-md outline-none" placeholder="Phone Number"></input>
                    <button type="submit" className="bg-cyan-600 text-white p-2 rounded-md font-bold">Sign up</button>
                    <p>Already have an account? <Link className="underline" to={'/'}>Login</Link></p>
                </form>
            </div>
        </Fragment>
    )
}

export default Signup