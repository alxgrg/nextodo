function TodoCard(props) {
  const { todo, description, completed } = props.todo;

  return (
    <div className='relative border rounded-lg p-4 flex justify-between items-center'>
      <div className='flex flex-col'>
        <div className='mb-5'>
          <p className='text-2xl'>{todo}</p>
        </div>
        {description && (
          <div>
            <p>{description}</p>
          </div>
        )}
      </div>
      <div>
        <label htmlFor='completed'>Completed: </label>
        <input type='checkbox' name='completed' id='' />
      </div>
      <div className='absolute top-2 right-2'>X</div>
    </div>
  );
}

export default TodoCard;
