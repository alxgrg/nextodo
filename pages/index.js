import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

import Head from 'next/head';

import AddTodoForm from '../components/AddTodoForm';
import TodoCard from '../components/TodoCard';
// import { PrismaClient } from '@prisma/client';

import { prisma } from '../helpers/db';

// const prisma = new PrismaClient();

export default function Home(props) {
  const [todos, setTodos] = useState(props.todos);

  const { data: session, status } = useSession();

  function addTodoHandler(todo) {
    setTodos([...todos, todo]);
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='flex'>
          <section className='w-1/3 bg-gray-800 h-screen p-8'>
            <div className='mb-3'>
              <h2 className='text-3xl text-white'>Add a Todo, why dont you?</h2>
            </div>
            <AddTodoForm onAddTodo={addTodoHandler} />
          </section>
          <section className='w-2/3 h-screen p-8'>
            <div className='mb-3'>
              <h2 className='text-3xl text-gray-700'>Todo List</h2>
            </div>
            {todos &&
              todos.map((todo) => (
                <div className='mb-3' key={todo.id}>
                  <TodoCard todo={todo} />
                </div>
              ))}
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      Not Signed in...
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      props: {
        todos: [],
      },
    };
  }

  const currentUser = await prisma.user.findFirst({
    where: { email: session.user.email },
  });

  const currentUserId = currentUser.id;

  const todos = await prisma.todo.findMany({
    where: { userId: currentUserId },
  });

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}
