import { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';

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
    // copy text
    const copyText = (text) => {
        // alert(text +" copied to clipboard ")
        toast(text + ' copied to clipboard ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
        navigator.clipboard.writeText(text);
    }
    const eyeIconRef = useRef();
    //show password
    const togglePasswordvisibility = () => {
        if (showPassword) {
            alert("Hide password");
        }
        else {
            alert("Show password");
        }
        setShowPassword(prevState => !prevState);
    };
    //Save password
    const savePassword = () => {
        console.log(form)
        // Store in local database
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log(passwordArray);
        console.log([...passwordArray, form]);

        // clearing the form
        setform({ site: "", username: "", password: "" })

        toast('Password Saved SuccessFully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }

    // Delete password
    const deletePassword = (id) => {
        console.log("Deleting password with id", id)
        let confirmation = confirm("do you really want to delete?")
        if (confirmation) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            
        }
        toast('Password Deleted SuccessFully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
    }

    //Edit
    // const editPassword = (id) => {
    //     console.log("Editing password with id", id)

    //     let c=confirm("Do you really want to edit?")
    //     if(c){
    //         // retreivind data to form
    //         setform(passwordArray.filter(item=>item.id===id)[0])
    //         // removing from saved password
    //         setPasswordArray(passwordArray.filter(item=>item.id!==id)) 
    //     }
    //     // setform(passwordArray.filter(i => i.id === id)[0])
    //     // setPasswordArray(passwordArray.filter(item => item.id !== id))
    // }
    const editPassword = (id) => {
        if (confirm("Do you really want to edit?")) {
            const passwordToEdit = passwordArray.find(item => item.id === id);
            setform(passwordToEdit);
            deletePassword(id);
        }
    };


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"  //transition:Bounce,-->ise change karna hai
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className="md:mycontainer py-24 px-2 md:px-0">
                <h1 className='text-4xl font-bold text-center min-w-32 '>
                    <span className='text-green-800'> &lt;</span>
                    Pass

                    <span className='text-green-800'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center min-w-32 '>Your Own Password Manager</p>

                <div className=' flex flex-col p-4 text-black gap-4 justify-center min-w-32 items-center '>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border-2 border-green-900 p-2 py-1 w-full' type="text" name="site" id="" />
                    <div className="flex w-full gap-2 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-green-900 p-4 py-1 w-full' type="text" name="username" id="" />
                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-green-900 p-4 py-1 w-full' name="password" id="" type={showPassword ? "text" : "password"} />
                            <span className='absolute right-2 top-[10px] cursor-pointer' onClick={togglePasswordvisibility} ref={eyeIconRef}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center min-w-32 items-center  gap-4 bg-green-600 rounded-full px-4 py-2 w-fit hover:bg-green-400 border-2 border-green-950 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
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
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return (<tr key={index}>
                                    <td className='text-center min-w-32 py-2 border border-white '>
                                        <div className='flex justify-center items-center'>
                                            <span><a href={item.site} target='_blank'>{item.site}</a></span>
                                            <div className="size-7 cursor-pointer flex justify-center items-center lordiconcopy" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px" }} //javascript
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='text-center  py-2 border border-white '>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.username}</span>
                                            <div className="size-7 cursor-pointer flex justify-center items-center lordiconcopy" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px" }} //javascript
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white '>
                                        <div className='flex justify-center items-center'>
                                            <span>{item.password}</span>
                                            <div className="size-7 cursor-pointer flex justify-center items-center lordiconcopy" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px" }} //javascript
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Acttions */}
                                    <td className='text-center py-2 border border-white '>
                                        {/* Edit */}
                                        <span className=' cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                style={{ "width": "20px", "height": "20px" }}
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        {/* delete */}
                                        <span className=' cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                style={{ "width": "20px", "height": "20px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                    </td>
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
