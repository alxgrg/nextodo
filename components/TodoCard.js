function TodoCard(props) {
  return (
    <div className='border rounded-lg p-4 flex justify-between items-center'>
      <div className='flex flex-col'>
        <div className='mb-5'>
          <p>{props.todo.todo}</p>
        </div>
        <div>
          <p>{props.todo.description}</p>
        </div>
      </div>
      <div>
        <input type='checkbox' name='completed' id='' />
      </div>
    </div>
  );
}

export default TodoCard;
