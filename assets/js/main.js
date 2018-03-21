$(document).ready(function(){
  $('#btn').on('click', function(){
    let task = $('#todo_input').val();
    if (task) {
      $.post("/create-todo", {
        task: task
      }, function (result) {
        console.log('result ', result);
      });
    }
    else {
      alert('You must insert a task');
    }
  });
});