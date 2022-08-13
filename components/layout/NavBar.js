import { useState, useRef, useEffect } from 'react';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import HeroIcon from '../../assets/icons/HeroIcon';

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleOutsideClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, [showDropdown]);

  //create a function in your component to handleOutsideClicks
  const handleOutsideClicks = (event) => {
    if (
      showDropdown &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  const { data: session, status } = useSession();

  return (
    <nav className='z-40 w-full bg-black border-b border-gray-500 p-4 flex justify-between text-white items-center'>
      <div className='w-40 text-3xl underline'>
        <Link href='/'>
          <a className='w-4'>
            <HeroIcon />
          </a>
        </Link>
      </div>
      {session && (
        <div className='flex'>
          <div className='sm:block mr-3'>
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
                ref={dropdownRef}
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
