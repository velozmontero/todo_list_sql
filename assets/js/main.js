$(document).ready(function(){
  const scroll = () => $('#todos_container').scrollTop($('#todos_container')[0].scrollHeight);

  const createTodo = function() {
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

  const removeTodo = function(e) {
    let id = $(this).parent()[0].id;

    $.post("/delete-todo", {
      id: id
    }, function (response) {
      if (response.success) {
        $('#' + response.id).remove();
      }
      else {
        alert(response.message);
      }
    });
  }

  const updateTodo = function (e) {

    let id = $(this).parent()[0].id;
    let complete = $(this).data('complete');

    console.log('complete ', complete);

    if (complete === false) {
      $.post("/update-todo", {
        id: id
      }, function (response) {
        if (response.success) {
          $('#' + response.id).addClass('checked');
        }
        else {
          alert(response.message);
        }
      });
    }

  }

  $('.remove').on('click', removeTodo);

  $('.todo').on('click', updateTodo);

  $('#btn').on('click', createTodo);

  $('#todo_input').on('keyup', function (e) {
    if(e.keyCode === 13){
      createTodo();
    }
  });
});