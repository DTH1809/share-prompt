"use client"

import React, { useState, useEffect } from 'react';
import  Link  from "next/link";
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Navbar = () => {

  const { data: session } = useSession()
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response)
    }

    setUpProviders()
  }, [])
  

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={"/"} className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Share Propmts</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href={"/create-prompt"}>
              Create Post            
            </Link>
            <button className='outline_btn' type='button' onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image src={session?.user?.image} alt='profile-logo' width={37} height={37} className='rounded-full' />
            </Link>
          </div>
        ): (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                    Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex'>
              <Image 
                src={session?.user?.image} 
                alt='profile-logo' 
                width={37} height={37} 
                className='rounded-full' 
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link
                    href={"/profile"}
                    className='dropdown_link'
                    onClick={() => setToggleDropdown((prev) => !prev)}

                  >
                    My Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className='dropdown_link'
                    onClick={() => setToggleDropdown((prev) => !prev)}

                  >
                    Create Propmt
                  </Link>
                  <button
                     type='button'
                     onClick={() => {
                       setToggleDropdown(false);
                       signOut();
                     }}
                     className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
          ): (
            <>
              {providers && 
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                      Sign In
                  </button>
                ))
              }
            </>
          )}
      </div>
    </nav>
  )
}

export default Navbar