module.exports = function(app, database) {

  app.get('/', function (req, res) {
    res.render('index.ejs', {
      user: {
        name: 'Frank Veloz',
      }
    });
  });

  app.get('/get-tasks', function (req, res) {
  
    database.query(
      `SELECT * FROM todos`, 
      function (error, results, fields) {

      if (error) throw error;

      console.log('results: ', results);

      res.render('todos.ejs', {
        todos: results
      });
    });

  });

  app.post('/create-task', function (req, res) {
    
    database.query(
      `INSERT INTO todos(task, date, complete, uid, due_date) 
       VALUES('code some good stuff', CURRENT_TIMESTAMP(), false, 'sd9f87sdf76s7d6fsdf67sd', CURDATE())`, 
      function (error, results, fields) {

      if (error) throw error;

      console.log('result: ', results);

    });

  });

  app.post('/update-task', function (req, res) {

  });

  app.post('/delete-task', function (req, res) {

  });

}