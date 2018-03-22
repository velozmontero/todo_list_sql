var moment = require('moment');

module.exports = function(app, database) {

  app.get('/', function (req, res) {
    res.render('index.ejs', {
      user: {
        name: 'Frank Veloz',
      }
    });
  });

  app.get('/get-todos', function (req, res) {
    database.query(
      `SELECT * FROM todos`, 
      function (error, results, fields) {

      if (error) throw error;

      // console.log('results: ', results);

      res.render('todos.ejs', {
        todos: results
      });
    });
  });

  app.post('/create-todo', function (req, res) {
    
    console.log('data ', req.body);

    var todo = {
      task: req.body.task,
      date: moment().format(),
      completed: false,
      uid: 'sd9f87sdf76s7d6fsdf67sd',
      due_date: moment().add(7, "days").format('YYYY/MM/DD')
    }

    database.query(
      `INSERT INTO todos(task, date, complete, uid, due_date) 
       VALUES('${todo.task}', '${todo.date}', ${todo.completed}, '${todo.uid}', '${todo.due_date}')`, 
      function (error, result, fields) {

        if (error) {
          console.log('error ', error);

          res.send({
            success: false,
            error: error,
            message: 'The todo was not created sorry :('
          });
        }
        else {
          // console.log('result: ', result);
          todo.id = result.insertId;

          res.send({
            success: true,
            todo: todo
          });
        }
        
    });

  });

  app.post('/update-todo', function (req, res) {

  });

  app.post('/delete-todo', function (req, res) {

  });

  app.get('*', function (req, res) {
    res.render('404.ejs');
  });

}