const passport = require('passport');
const connection    = require('../connection.js');

module.exports = function(app) {
  
  app.get('/create/post/:name', function(req, res,next) 
  {

        if(req.isAuthenticated())
        {
             connection.query('SHOW COLUMNS FROM '+req.params['name']+'',
                  function(err, rows) 
                  {
                    
                    if (err)
                      return done(err);
                      
                      
                    var fs = require('fs');
                    //create view jade 
                 /*   var stream = fs.createWriteStream("app/views/"+req.params['name']+"_view.jade");
                    stream.once('open', function(fd) 
                    {
                     
                      stream.end();
                    });
                    //create add jade
                    var stream = fs.createWriteStream("app/views/"+req.params['name']+"_add.jade");
                    stream.once('open', function(fd) 
                    {
                      stream.write("My first row\n");
                      stream.write("My second row\n");fastream.end();
                    });
                    */
                    
                    //create route
                    var stream = fs.createWriteStream("app/config/routes/"+req.params['name']+".js");
                    stream.once('open', function(fd) 
                    {
                      stream.write("/* Roberto Tobias Zikert Dalchau;\n");  
                      stream.write("* 2018;\n");
                      stream.write("*/\n");
                       stream.write("\n");
                      stream.write("const passaport  = require('passport');\n");
                      stream.write("const connection = require('../connection.js');\n");
                         stream.write("\n");
                    stream.write("\n");
                      stream.write("module.exports = function(app) {\n");
                         stream.write("\n");
                      stream.write("app.get('/"+req.params['name']+"/add', function(req, res,next) \n");                      
                         stream.write("\n");
                              stream.write("if(req.isAuthenticated()) \n");
                                 stream.write("{\n");
                                 stream.write("\n");
                              stream.write("connection.query('SELECT * FROM "+req.params['name']+"',\n");
                              stream.write(" function(err, rows) {\n");
                                  stream.write("  res.render('create_view', \n");
                                  stream.write(" { \n");
                                  stream.write("   title: req.params['name'],\n");
                                  stream.write("    message: 'Module Create '"+req.params['name']+", \n");
                                  stream.write("   flashMessage: req.flash('flashMessage'),\n");
                                  stream.write("        result: rows\n");
                                  stream.write("    });\n");
                       
                              stream.write("}\n");
                              
                              stream.write("} \n");
                              stream.write("else{ \n");
                                              
                                              
                              stream.write("}\n");
                              
                      
                      stream.write("}\n");
                      stream.end();
                    });
                    
                    
                    res.render('create_view', 
                    {
                      title: req.params['name'],
                      message: 'Module Create '+req.params['name'],
                      flashMessage: req.flash('flashMessage'),
                      result: rows
                    });
                    //return done(null, rows);
                  }
              );
              
              
            
        }
        else
        {
            res.render('signup', {
              title: 'Create',
              message: 'Module Create',
              flashMessage: req.flash('flashMessage')
        });
    }
    
  });

  /**
   * Display Tables
  **/
  app.get('/create', function(req, res) {
    
        if(req.isAuthenticated())
        {
             connection.query("SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA <> 'information_schema'",
                  function(err, rows) 
                  {
                    if (err)
                      return done(err);
                   
                  // console.log(rows);
                    res.render('create', {
                      title: 'Create',
                      message: 'Module Create',
                      flashMessage: req.flash('flashMessage'),
                      tables: rows
                    });
                    //return done(null, rows);
                  }
              );
              
              
            
        }
        else
        {
            res.render('signup', {
              title: 'Create',
              message: 'Module Create',
              flashMessage: req.flash('flashMessage')
        });
    }
    
  });

  /**
   * Receive Signup Form Data
  **/
  app.post('/signup',
    passport.authenticate('local-signup', { failureRedirect: '/signup' }),
    function(req, res) {
      res.redirect('/');
  });
}
