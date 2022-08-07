export default function Profile({ user }) {
  return (
    <div className='flex justify-center'>
      <div className='p-5 flex flex-col text-center'>
        <h1 className='text-3xl'>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
