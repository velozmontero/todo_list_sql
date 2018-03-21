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
    var task = req.body.task;

    database.query(
      `INSERT INTO todos(task, date, complete, uid, due_date) 
       VALUES('${task}', '${moment().format()}', false, 'sd9f87sdf76s7d6fsdf67sd', '${moment().add(7, "days").format('YYYY/MM/DD')}')`, 
      function (error, result, fields) {

        if (error) {
          console.log('error ', error);

          res.send({
            success: false,
            error: error
          });
        }
        else {
          console.log('result: ', result);

          res.send({
            success: true,
            result: result
          });
        }
        
    });

  });

  app.post('/update-todo', function (req, res) {

  });

  app.post('/delete-todo', function (req, res) {

  });

}