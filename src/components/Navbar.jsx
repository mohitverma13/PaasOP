import React from 'react'

const Navbar = () => {
    return (
        <nav className=' bg-slate-800 text-white fixed top-0 w-full'>
            <div className="mycontainer flex justify-between items-center px-10 h-14 py-5">
                <div className="logo font-bold text-white text-2xl">
                
                    <span className='text-green-800'> &lt;</span>
                    Pass
                
                    <span className='text-green-800'>OP/&gt;</span>
                </div>
                {/* <ul >
                    <li className='flex justify-center items-center gap-8'>
                        <a className='hover:font-bold' href="">Home</a>
                        <a className='hover:font-bold' href="">About</a>
                        <a className='hover:font-bold' href="">Contact</a>
                        <a className='hover:font-bold' href="">Home</a>
                    </li>

                </ul> */}

                <button className='flex justify-center items-center my-5 h-11 border-green-700 border-2 rounded-lg hover:scale-95 transition-all ease-in-out ring-white ring-2'>
                    <img className='p-6 w-[82px] py-1  filter invert' src="/icons/github.svg" alt="github logo" />
                    <span className="font-semibold px-2">Github</span>
                </button>

        </div>
        </nav>
    )
}

export default Navbar


//npm i uuid--->for unique id