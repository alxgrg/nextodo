import { useState } from 'react';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: session, status } = useSession();

  return (
    <nav className='z-40 w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between text-white items-center'>
      <div className=' text-3xl underline'>
        <Link href='/'>
          <a>Nextodo!</a>
        </Link>
      </div>
      {session && (
        <div className='flex'>
          <div className='hidden sm:block mr-3'>
            {session.user.name ? (
              <button
                onClick={() => setShowDropdown((prevState) => !prevState)}
              >
                {session.user.name}
              </button>
            ) : (
              <button
                onClick={() => setShowDropdown((prevState) => !prevState)}
              >
                {session.user.email}
              </button>
            )}

            {showDropdown && (
              <div
                className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
                tabIndex='-1'
              >
                <div className='py-1' role='none'>
                  <Link href='/me'>
                    <a
                      className='text-gray-700 block px-4 py-2 text-sm'
                      onClick={() => setShowDropdown(false)}
                    >
                      Account settings
                    </a>
                  </Link>
                  <button
                    className='text-gray-700 block w-full text-left px-4 py-2 text-sm'
                    role='menuitem'
                    tabIndex='-1'
                    id='menu-item-3'
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* <a href='#' onClick={() => signOut()}>
            Sign out
          </a> */}
        </div>
      )}
      {!session && (
        <div className=''>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
