import React, { useRef, useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const eyeIconRef = useRef();
    const togglePasswordvisibility = () => {
        if (showPassword) {
            alert("Hide password");
        }
        else {
            alert("Show password");
        }
        setShowPassword(prevState => !prevState);
    };

    const savePassword = () => {
        console.log(form)
        // Store in local database
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // console.log(passwordArray);
        console.log([...passwordArray, form]);

    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div> */}

            <div className="mycontainer  ">
                <h1 className='text-4xl font-bold text-center min-w-32'>
                    <span className='text-green-800'> &lt;</span>
                    Pass

                    <span className='text-green-800'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center min-w-32 '>Your Own Password Manager</p>

                <div className=' flex flex-col p-4 text-black gap-4 justify-center min-w-32 items-center min-w-32'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border-2 border-green-900 p-2 py-1 w-full' type="text" name="site" id="" />
                    <div className="flex w-full gap-2 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-green-900 p-4 py-1 w-full' type="text" name="username" id="" />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-green-900 p-4 py-1 w-full' name="password" id="" type={showPassword ? "text" : "password"} />
                            <span className='absolute right-2 top-[10px] cursor-pointer' onClick={togglePasswordvisibility} ref={eyeIconRef}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center min-w-32 items-center min-w-32 gap-4 bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-green-400 border-2 border-green-950 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold py-4 text-2xl'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>UserName</th>
                                <th className='py-2'>Passwords</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                        {passwordArray.map((item,index)=>{
                            return (<tr key={index}>
                                <td className='text-center min-w-32 py-2 border border-white'><a href={item.site} target='_blank'>{item.site}</a> </td>
                                <td className='text-center min-w-32 py-2 border border-white'>{item.username}</td>
                                <td className='text-center min-w-32 py-2 border border-white'>{item.password}</td>
                            </tr>)
                        })}
                            

                        </tbody>
                    </table>
                    }

                </div>

            </div>
        </>
    )
}

export default Manager
