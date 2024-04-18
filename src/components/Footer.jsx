import React from 'react'

const Footer = () => {
    return (
        <div className=' bg-slate-800 text-white flex flex-col justify-between px-6 items-center w-full fixed bottom-0'  >
            <div className="logo font-bold text-white text-2xl">

                <span className='text-green-800'> &lt;</span>
                Pass

                <span className='text-green-800'>OP/&gt;</span>
            </div>
            <div className='text-sm'>
                Created with ❤ by Mohit
            </div>
        </div>
    )
}

export default Footer
