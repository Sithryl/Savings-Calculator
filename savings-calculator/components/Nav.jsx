'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '../public/assets/sc-thin.png';
import Logosmall from '../public/assets/captains-hat.png';
import Image from 'next/image';

const Nav = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <main>
      <nav className="flex-row relative navbar bg-light-blue text-neutral-content justify-between">
        {isSmallScreen ? (
          <div className='flex-1 mx-2'>
            <Image src={Logosmall} alt="Captain's Logo" className='max-w-xs' />
          </div>
        ) : (
          <div className='flex-1 mx-2'>
            <Image src={Logo} alt="Captain's Logo" className='max-w-xs' />
          </div>
        )};

        <div className="flex-1 text-center text-3xl text-black font-bold">
          Savings Calulator
        </div>
        
        <ul className="menu menu-horizontal bg-darker-blue rounded-box">
          <li>
            <Link href="https://www.thesavingscaptain.com/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>
          <li>
            <button className="btn btn-warning pt-4" onClick={()=>window.my_modal_1.showModal()}>Info</button>
            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <form form='true' className="modal-box">
          <h3 className="font-bold text-lg">See how much you can save!</h3>
          <p className="py-4">Add to your list of common expenses to see how much money you could be saving over a certain amount of time.</p>
          <div className="modal-action">
      {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
            </dialog>
          </li>
        </ul>
        </nav>
      </main>  
  )
}

export default Nav