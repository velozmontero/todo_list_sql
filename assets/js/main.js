$(document).ready(function(){
  const scroll = () => $('#todos_container').scrollTop($('#todos_container')[0].scrollHeight);

  const createTodo = () => {
    let task = $('#todo_input').val();
    if (task) {
      $.post("/create-todo", {
        task: task
      }, function (response) {
        if (response.success) {
          console.log('result ', response.todo);

          $('#todos_container').append(`
            <div class="todo">
              ${response.todo.task}
            </div>
          `);

          $('#todo_input').val('');

          scroll();
        }
        else {
          alert(response.message);
        }
      });
    }
    else {
      alert('You must insert a task');
    }
  }

  $('#btn').on('click', function(){
    createTodo();
  });

  $('#todo_input').on('keyup', function (e) {
    if(e.keyCode === 13){
      createTodo();
    }
  });
});