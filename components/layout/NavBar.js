import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

function NavBar() {
  const { data: session, status } = useSession();

  return (
    <nav className='w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between text-white items-center'>
      <div className=' text-3xl underline'>
        <Link href='/'>
          <h1>Nextodo!</h1>
        </Link>
      </div>
      {session && (
        <div className='flex'>
          <div className='mr-3'>
            {session.user.name ? (
              <p>{session.user.name}</p>
            ) : (
              <p>{session.user.email}</p>
            )}
          </div>
          <a href='#' onClick={() => signOut()}>
            Sign out
          </a>
        </div>
      )}
      {!session && (
        <div className=''>
          <a href='#' onClick={() => signIn()}>
            Sign in
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
