import { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    // const getPassword=async() => {
    //     const req = await fetch("http://localhost:3000/");
    //     console.log(req)
    //     const password=await req.json()
    //     console.log(password);
    //     setPasswordArray(password);

    //     setPasswordArray(password);
    //     console.log( password);
    // }

    const getPassword = async () => {
        try {
            const req = await fetch("http://localhost:3000/");
            if (!req.ok) {
                throw new Error("Failed to fetch passwords");
            }
            const password = await req.json();
            if (Array.isArray(password)) {
                setPasswordArray(password);
            } else {
                throw new Error("Received data is not an array");
            }
        } catch (error) {
            console.error("Error fetching passwords:", error.message);
            // Handle error appropriately, e.g., set default state
            setPasswordArray([]);
        }
    };

    useEffect(() => {
        // let passwords = localStorage.getItem("passwords");
        // if (passwords) {
        //     setPasswordArray(JSON.parse(passwords))
        // }
        getPassword();
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
    // const savePassword = () => {
    //     if(form.site.length >3 && form.username.length >3 && form.password.length >6){

    //     console.log(form)
    //     // Store in local database
    //     setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    //     localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    //     // console.log(passwordArray);
    //     console.log([...passwordArray, form]);

    //     // clearing the form
    //     setform({ site: "", username: "", password: "" })

    //     toast('Password Saved SuccessFully', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //     });
    // }else{
    //         toast('Error: Password not Saved')
    // }

    // }

    // const savePassword = async () => {
    //     let validationError = "";
    //     if (form.site.length <= 3) {
    //         validationError += "Site URL must be more than 3 characters. ";
    //     }
    //     if (form.username.length <= 3) {
    //         validationError += "Username must be more than 3 characters. ";
    //     }
    //     if (form.password.length <= 6) {
    //         validationError += "Password must be more than 6 characters. ";
    //     }

    //     if (!validationError) {
    //         console.log(form);
    //         // Store in local database
    //         // const newPassword = { ...form, id: uuidv4() };
    //         // const newPasswordArray = [...passwordArray, newPassword];
    //         setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

    //         const res = await fetch("https://localhost:3000/save", {
    //             method: "POST",
    //             headers: {
    //                 "content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ ...form, id: uuidv4() }),
    //         })

    //         // localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    //         // console.log(newPasswordArray);

    //         // Clearing the form
    //         setform({ site: "", username: "", password: "" });
    //         if (res.ok) {
    //             toast('Password Saved Successfully', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         }

    //     }
    //     else {
    //         toast.error(validationError, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //         });
    //     }
    // };
    const savePassword = async () => {
        let validationError = "";
        if (form.site.length <= 3) {
            validationError += "Site URL must be more than 3 characters. ";
        }
        if (form.username.length <= 3) {
            validationError += "Username must be more than 3 characters. ";
        }
        if (form.password.length <= 6) {
            validationError += "Password must be more than 6 characters. ";
        }

        if (!validationError) {
            try {
                // Store in local state
                // setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

                // Send data to backend
                const res = await fetch("http://localhost:3000/save", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...form, id: uuidv4() }),
                });
                console.log("Response status:", res.status);
                const responseData = await res.json();
                console.log("Response data:", responseData);
                if (res.ok) {
                    // Clear the form on successful save

                    setPasswordArray([...passwordArray, { ...form, id: responseData._id }]);

                    setform({ site: "", username: "", password: "" });

                    // Show success toast
                    toast.success('Password Saved Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    throw new Error('Failed to save password');
                }
            } catch (error) {
                console.error('Error saving password:', error);

                // Show error toast
                toast.error('Failed to save password', {
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
        } else {
            // Show validation error toast
            toast.error(validationError, {
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
    };




    // Delete password
    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)
        let confirmation = confirm("do you really want to delete?")
        if (confirmation) {
            try {
                setPasswordArray(passwordArray.filter(item => item.id !== id))
                // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

                const res = await fetch("http://localhost:3000/delete", {
                    method: "DELETE",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id: id }),
                })
                if (res.ok) {
                    setPasswordArray(passwordArray.filter(item => item.id !== id));
                    toast.success('Password Deleted Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Failed to delete password');
                }
            } catch (error) {
                console.error('Error deleting password:', error);
                toast.error(`Failed to delete password: ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

    //Edit
    // const editPassword = async(id) => {
    //     console.log("Editing password with id", id)
    //     let c = confirm("Do you really want to edit?")
    //     if (c) {
    //         // retreivind data to form
    //         // setform(passwordArray.filter(item=>item.id===id)[0])
    //         // removing from saved password
    //         // setPasswordArray(passwordArray.filter(item => item.id !== id))
            
    //     }
    //     setform(passwordArray.filter(i => i.id === id)[0])
    //     setPasswordArray(passwordArray.filter(item => item.id !== id))
    // }

    // const editPassword = (id) => {
    //     if (confirm("Do you really want to edit?")) {
    //         const passwordToEdit = passwordArray.find(item => item.id === id);
    //         setform(passwordToEdit);
    //         deletePassword(id);
    //     }
    // };
    const editPassword = async (id) => {
        console.log("Editing password with id", id);
        let c = confirm("Do you really want to edit?");
        if (c) {
            try {
                // Retrieve the password to edit
                const passwordToEdit = passwordArray.find(item => item.id === id);
                if (!passwordToEdit) {
                    throw new Error("Password not found");
                }

                // Set the form with the password to edit
                setform(passwordToEdit);

                // Remove the password from the local state
                setPasswordArray(passwordArray.filter(item => item.id !== id));

                // Delete the old entry from the database
                const deleteRes = await fetch(`http://localhost:3000/delete`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id: id }),
                });

                if (!deleteRes.ok) {
                    const errorData = await deleteRes.json();
                    throw new Error(errorData.message || "Failed to delete old entry");
                }

                // The actual saving of the edited password will happen when the user submits the form
                // You don't need to create a new entry here

                toast.info('Password ready for editing. Save to confirm changes.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            } catch (error) {
                console.error('Error preparing password for edit:', error);
                toast.error(`Failed to prepare password for editing: ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                // Revert local state changes if there was an error
                setPasswordArray([...passwordArray]);
                setform({ site: "", username: "", password: "" });
            }
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
            <div className="flex justify-center items-center min-h-screen">
                <div className="md:mycontainer mycontainer py-24 px-2 md:px-0">
                    <h1 className='text-4xl font-bold text-center min-w-32 '>
                        <span className='text-green-800'> &lt;</span>
                        Pass

                        <span className='text-green-800'>OP/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center min-w-32 '>Your Own Password Manager</p>

                    <div className=' flex flex-col p-4 text-black gap-4 justify-center min-w-32 items-center '>
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border-2 border-green-900 p-2 py-1 w-full' type="text" name="site" id="site" />
                        <div className="flex flex-col md:flex-row w-full gap-2 justify-between">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-green-900 p-4 py-1 w-full' type="text" name="username" id="username" />
                            <div className="relative">
                                <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-green-900 p-4 py-1 w-full' name="password" id="password" type={showPassword ? "text" : "password"} />
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
                                                <span>{"*".repeat(item.password.length)}</span>
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
            </div>
        </>
    )
}

export default Manager
