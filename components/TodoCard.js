function TodoCard(props) {
  const { id, title, description, completed } = props.todo;

  return (
    <div className='relative border rounded-lg p-4 flex justify-between items-center'>
      <div className='flex flex-col'>
        <div className='mb-5'>
          <p className='text-2xl'>{title}</p>
        </div>
        {description && (
          <div>
            <p>{description}</p>
          </div>
        )}
      </div>
      <div>
        <div>
          <label htmlFor='completed'>Completed: </label>
          <input type='checkbox' name='completed' id='' />
        </div>
        <div className=''>
          <button
            className='p-2 rounded bg-red-600 text-white'
            onClick={() => props.onDeleteTodo(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
