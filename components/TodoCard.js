function TodoCard(props) {
  return (
    <div className='border rounded-lg p-4'>
      <div className='mb-5'>
        <p>{props.todo}</p>
      </div>
      <div>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TodoCard;
