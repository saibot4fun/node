  /**
   * Roberto Tobias Zikert Dalchau
  **/
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
              
                    //create route
                    var stream = fs.createWriteStream("app/config/routes/"+req.params['name']+".js");
                    stream.once('open', function(fd) 
                    {
                        /** Controlers **/
                      stream.write("/* Roberto Tobias Zikert Dalchau;\n");  
                      stream.write("* Crud Basic Routes 2018;\n");
                      stream.write("* sb4fun88@gmail.com\n");
                      stream.write("*/\n");
                      stream.write("\n");
                      stream.write("const passaport  = require('passport');\n");
                      stream.write("const connection = require('../connection.js');\n");
                      stream.write("\n");
                      stream.write("\n");
                      stream.write("module.exports = function(app) {\n");
                      stream.write("\n");
                      /**
                            Listar
                      */
                      stream.write("    app.get('/"+req.params['name']+"', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("        \n");
                      stream.write("           connection.query('SELECT * FROM "+req.params['name']+"',\n");
                      stream.write("           function(err, rows) {\n");
                      stream.write("                res.render('"+req.params['name']+"_list', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    message: 'Module Create "+req.params['name']+"', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage'),\n");
                      stream.write("                    results: rows\n");
                      stream.write("                });\n");                    
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("                });\n");                                              
                      stream.write("     }});\n");
                      /**
                             Adicionar
                      */
                      stream.write("    app.post('/"+req.params['name']+"/add', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      //Monta Insert e parametros
                      var sql           = "INSERT INTO "+req.params['name']+" (";
                      var sqlEdit       = "UPDATE "+req.params['name']+" SET ";
                      var sqlRemove     = "DELETE FROM "+req.params['name'];
                      var parametros    = "[";
                      var pkName        = "";
                      for(var i=0; i< rows.length;i++)
                      {                        
                        if(rows[i]['Key'] != "PRI")
                        {
                            sql         += rows[i]['Field']+",";
                            parametros  += "req.body."+rows[i]['Field']+",";
                            sqlEdit     +=  rows[i]['Field']+" = ?,";
                        }
                        else if(rows[i]['Key'] == "PRI")
                        {
                            pkName      = rows[i]['Field'];
                            pkNameParam = "req.params['"+rows[i]['Field']+"'],";
                        }                        
                      }
                      var parametros2   = parametros.substr(0,(parametros.length - 1));
                      parametros2       = parametros2+']';
                      var sql2          = sql.substr(0,(sql.length - 1));
                      sql2              += " ) VALUES ( ";
                      var sqlEdit2      = sqlEdit.substr(0,(sqlEdit.length - 1));
                      sqlEdit2          +=" WHERE "+pkName+" = '+req.params['"+pkName+"']";
                      sqlRemove         +=" WHERE "+pkName+" = ?";
                      for(var i=0; i< rows.length;i++)
                      {
                        
                        if(rows[i]['Key'] != "PRI")
                        {
                            sql2 += "?,";
                        }
                     
                      }
                      var insert = sql2.substr(0,(sql2.length - 1));
                      insert += " )";
                      stream.write("           connection.query('"+insert+"', "+parametros2+",\n"); 
                      stream.write("           function(err, rows) {\n");
                      stream.write("                connection.query('SELECT * FROM "+req.params['name']+"', function (err, rows2){\n");
                      stream.write("                res.render('"+req.params['name']+"_list', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Inserido com sucesso!', \n");     
                      stream.write("                    userName: req.user.username,\n");                 
                      stream.write("                    results: rows2, \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");                    
                      stream.write("              });\n");  
                      stream.write("            });  \n");                               
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");                         
                     /**
                            EDITAR
                     */ 
                      stream.write("    app.post('/"+req.params['name']+"/:id/save', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      stream.write("           connection.query('"+sqlEdit2+", "+parametros2+",\n"); 
                      stream.write("           function(err, rows) {\n");
                      stream.write("                connection.query('SELECT * FROM "+req.params['name']+"', function (err, rows2){\n");                     
                      stream.write("                res.render('"+req.params['name']+"_list', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Editado com sucesso' , \n");
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    results: rows2, \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");     
                      stream.write("              });  \n")  ;             
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");
                      stream.write("    app.post('/"+req.params['name']+"/:id', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      stream.write("           connection.query('"+sqlEdit2+", "+parametros2+",\n"); 
                      stream.write("           function(err, rows) {\n");
                      stream.write("                res.render('"+req.params['name']+"_add', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    message: 'Editar"+req.params['name']+"', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");                    
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");                      
                      stream.write("    app.get('/"+req.params['name']+"/add', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      stream.write("                res.render('"+req.params['name']+"_add', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Adicionar "+req.params['name']+"', \n");                       
                      stream.write("                    action: '/"+req.params['name']+"/add', \n");  
                      stream.write("                    userName: req.user.username,\n");                   
                      stream.write("                    method: 'POST', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");                      
                      stream.write("    app.get('/"+req.params['name']+"/edit/:id', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      stream.write("           connection.query('SELECT * FROM "+req.params['name']+" WHERE "+pkName+" = ?', [req.params['"+pkName+"']],\n"); 
                      stream.write("           function(err, rows) {\n");
                      stream.write("                res.render('"+req.params['name']+"_add', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Module Create "+req.params['name']+"', \n");                                           
                      stream.write("                    action: '/"+req.params['name']+"/'+req.params['id']+'/save', \n");  
                      stream.write("                    results: rows[0], \n");  
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    method: 'POST', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");                    
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");
                      stream.write("    app.get('/"+req.params['name']+"/view/:id', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      stream.write("           connection.query('"+sqlEdit2+", "+parametros2+",\n"); 
                      stream.write("           function(err, rows) {\n");
                      stream.write("                res.render('"+req.params['name']+"_add', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    message: 'Module Create "+req.params['name']+"', \n");                                                                 
                      stream.write("                    action: '/"+req.params['name']+"/'+req.params['id'], \n");  
                      stream.write("                    method: 'POST', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");                    
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");
                    /**
                            REMOVER
                     */      
                      stream.write("    app.get('/"+req.params['name']+"/delete/:id', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("\n");
                      stream.write("           connection.query('"+sqlRemove+"', "+pkNameParam+"\n"); 
                      stream.write("           function(err, rows) {\n");                      
                      stream.write("              connection.query('SELECT * FROM "+req.params['name']+"', function (err, rows2){\n"); 
                      stream.write("                res.render('"+req.params['name']+"_list', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    message: 'Module Create "+req.params['name']+"', \n");                                        
                      stream.write("                    results: rows2, \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");                    
                      stream.write("                });\n");
                      stream.write("              });\n");                      
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error ', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("            });\n");                                              
                      stream.write("     }\n");
                      stream.write("     });\n");                   
                   
                    /**
                        BUSCAR                                       
                    **/
                      stream.write("    app.get('/"+req.params['name']+"/search', function(req, res,next) \n");                      
                      stream.write("    {\n");
                      stream.write("      if(req.isAuthenticated()) \n");
                      stream.write("      {\n");
                      stream.write("        \n");
                      //stream.write("           connection.query('SELECT * FROM "+req.params['name']+" WHERE LIKE \"%'+req.params['search']+'%\"',\n");
                      stream.write("           connection.query('SELECT * FROM "+req.params['name']+" WHERE ");
                      for(var i=0; i< rows.length;i++)
                        {
                       
                            if(i < (rows.length - 1))
                            {
                                  stream.write(" "+rows[i]['Field']+" LIKE \"%'+req.query.search+'%\" OR ");
                            }
                            else
                            {
                                   stream.write(" "+rows[i]['Field']+" LIKE \"%'+req.query.search+'%\"");
                            }
                        }
                      stream.write("           ',\n");
                      stream.write("           function(err, rows) {\n");
                      stream.write("                res.render('"+req.params['name']+"_list', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    userName: req.user.username,\n");
                      stream.write("                    message: 'Module Create "+req.params['name']+"', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage'),\n");
                      stream.write("                    results: rows\n");
                      stream.write("            });\n");                    
                      stream.write("            });\n");                              
                      stream.write("     } \n");
                      stream.write("     else{ \n");
                      stream.write("                res.render('signup', \n");
                      stream.write("                { \n");
                      stream.write("                    title: req.params['name'],\n");
                      stream.write("                    message: 'Error', \n");
                      stream.write("                    flashMessage: req.flash('flashMessage')\n");
                      stream.write("                });\n");                                              
                      stream.write("     }});\n");                      
                      stream.write("}\n");
                      stream.end();
                      
                    });
                    
                    /**
                    Views List
                    */
                    var stream2 = fs.createWriteStream("app/views/"+req.params['name']+"_list.jade");
                    stream2.once('open', function(fd) 
                    {
                         stream2.write("include ./layouts/header.jade \n");                         
                         stream2.write("div.container-fluid.page-wrap\n");
                         stream2.write(" div.row\n");
                         stream2.write("   div.col-md-1.col-md-offset-1\n");                                    
                         stream2.write("            h1= title\n");
                         stream2.write("            p=JSON.stringify(flashmsg)\n");
                         stream2.write("            p\n");
                         stream2.write("            a(href='/"+req.params['name']+"/add') New\n");                         
                         stream2.write("            form(id=\"form\", name=\""+req.params['name']+"\", action=\"/"+req.params['name']+"/search\", method=\"GET\")\n");
                         stream2.write("                input( \n");
                         stream2.write("                    type=\"text\",\n");
                         stream2.write("                    name=\"search\",\n");
                         stream2.write("                    placeholder=\"search\",\n");
                         stream2.write("                    value=\"search\"\n");                         
                         stream2.write("                )\n");
                         stream2.write("                input( \n");
                         stream2.write("                    type=\"submit\",\n");
                         stream2.write("                    class=\"btn btn-primary\",\n");
                         stream2.write("                    value=\"buscar\"\n");                    
                         stream2.write("                )\n");
                         stream2.write("            table\n");
                         stream2.write("                tr\n");
                        for(var i=0; i< rows.length;i++)
                        {
                         stream2.write("                th "+rows[i]['Field']+"\n");
                        }
                         stream2.write("                th edit\n");                         
                         stream2.write("                - results.forEach(function(v,i){\n");
                         stream2.write("                    tr \n");
                        for(var i=0; i< rows.length;i++)
                        {
                         stream2.write("                        td #{v."+rows[i]['Field']+"}\n");
                            if(rows[i]['Key'] == "PRI")
                            {
                                pkName      = rows[i]['Field'];
                            }
                        }
                         stream2.write("                        td  \n");
                         stream2.write("                            a(href=\"/"+req.params['name']+"/edit/\"+v."+pkName+") Edit \n"); 
                         stream2.write("                              | \n"); 
                         stream2.write("                            a(href=\"/"+req.params['name']+"/delete/\"+v."+pkName+") Delete \n"); 
                         stream2.write("                - }); \n"); 
                         stream2.write("include ./layouts/footer.jade");  
                         stream2.end();
                    });  
                    /**
                    Add Form
                    */
                    var stream3 = fs.createWriteStream("app/views/"+req.params['name']+"_add.jade");
                    stream3.once('open', function(fd) 
                    {
                        stream3.write("include ./layouts/header.jade\n");
                        stream3.write("div.container-fluid.page-wrap\n");
                        stream3.write("  div.row\n");
                        stream3.write("    div.col-md-6.col-md-offset-3\n");
                        stream3.write("       div.Signup-Form\n");
                        stream3.write("          h3.Title!= message\n");
                        stream3.write("          form(id=\"form\", name=\""+req.params['name']+"\", action=\"#{action}\", method=\"#{method}\")\n");
                        stream3.write("           if results\n");   
                        for(var i=0; i< rows.length;i++)
                        {
                            stream3.write("                 p "+rows[i]['Field']+"\n");
                            stream3.write("                 input( \n");
                            stream3.write("                     type=\"text\",\n");
                            stream3.write("                     name=\""+rows[i]['Field']+"\",\n");
                            stream3.write("                     placeholder=\"#{results."+rows[i]['Field']+"}\"\n");
                            stream3.write("                     value=\"#{results."+rows[i]['Field']+"}\"\n");
                            stream3.write("                 ).form-control\n");
                            
                        }
                        stream3.write("             else\n");
                        for(var i=0; i< rows.length;i++)
                        {
                            if(rows[i]['Key'] != "PRI")
                            {
                                stream3.write("                 p "+rows[i]['Field']+"\n");
                                stream3.write("                 input( \n");
                                stream3.write("                     type=\"text\",\n");
                                stream3.write("                     name=\""+rows[i]['Field']+"\",\n");
                                stream3.write("                     placeholder=\"\"\n");
                                stream3.write("                     value=\"\"\n");
                                stream3.write("                 ).form-control\n");
                            }
                            
                            
                        }
                        stream3.write("                \n");
                        stream3.write("             input( \n");
                        stream3.write("                 type=\"submit\",\n");
                        stream3.write("                 class=\"btn btn-primary form-control\",\n");
                        stream3.write("                 value=\"Save\"\n");
                        stream3.write("             )\n");
                        stream3.write("include ./layouts/footer.jade\n");   
                        stream3.end();      

                    });
                    //fs.createWriteStream("app/views/"+req.params['name']+"_add.jade");
                    //fs.readFile("app/views/"+req.params['name']+"_add.jade", function(err, data) {
                    //console.log(data);
                    //});
                    res.render('create_view', 
                    {
                      title: req.params['name'],
                      message: 'Sucesso Modulo Criado '+req.params['name'],
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
