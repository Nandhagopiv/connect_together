import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Chat = ()=>{
    const user = useLocation()
    const[input,setInput] = useState()
    const[chats,setChats] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/refresh').then((data)=>{
            setChats([...data.data])
        })
    },[])

    const handleChange = (e)=>{
        setInput(e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1))
    }

    const handleclick = ()=>{
        axios.get(`http://localhost:5000/addchat?sender=${user.state.username}&msg=${input}`).then((data)=>{
            setChats([...data.data])
        })
    }
    return(
        <Fragment>
            <header>
                <h1 className="text-center text-xl font-semibold">{
                    chats.length === 0 ?'Loading Chats...':''
                }</h1>
            </header>
            <section>
                {
                    chats.map((data)=>{
                        return <div className="hover:bg-zinc-100 gap-2 flex p-2"><h1 className="text-xl font-bold">{`${data.sender.charAt(0).toUpperCase()+data.sender.slice(1)}:`}</h1><h1 className="text-xl">{data.msg}</h1></div>
                    })
                }
            </section>
            <footer className="fixed bottom-0 p-2 gap-2 flex w-[100%]">
                <input onChange={handleChange} value={input} className="bg-slate-950 shadowAround flex-grow text-white outline-none px-5 py-2 w-[50%] rounded-[50px]" type="text" placeholder="Enter Message to Everyone"></input>
                <button onClick={handleclick} className="bg-cyan-600 shadowAround font-bold rounded-[50px] text-white px-5 py-2">Send</button>
            </footer>
        </Fragment>
    )
}

export default Chat