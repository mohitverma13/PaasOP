import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-10 h-14 py-5">
                <div className="logo font-bold text-white text-2xl">
                
                    <span className='text-green-800'> &lt;</span>
                    Pass
                
                    <span className='text-green-800'>OP/&gt;</span>
                </div>
                <ul >
                    <li className='flex justify-center items-center gap-8'>
                        <a className='hover:font-bold' href="">Home</a>
                        <a className='hover:font-bold' href="">About</a>
                        <a className='hover:font-bold' href="">Contact</a>
                        <a className='hover:font-bold' href="">Home</a>
                    </li>

                </ul>

        </div>
        </nav>
    )
}

export default Navbar
