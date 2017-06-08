const db = require('./database');
const os = require("os");
const bodyParser = require('body-parser');

module.exports = function(app, express)
{
  app.use(express.static('public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set('view engine', 'ejs');

  app.get('/', (request, response) => {
    db.getContacts((error, contacts) => {
      if (error) {
        response.status(500).render('error', {
          error: error,
        })
      } else {
        response.render('index', {
          contacts: contacts,
        })
      }
    })
  })

  app.get('/contacts/search', (request, response) => {
    db.getContactsByName(request.query, (error, contacts) => {
      if (error) {
        response.status(500).render('error', {
          error: error,
        })
      } else {
        if (!request.query.name) {
          response.redirect('/');
          return;
        }
        response.render('search', {
          contacts: contacts,
          name: request.query.name
        })
      }
    })
  })

  app.get('/contacts/new', (request, response) => {
    response.render('new')
  })

  app.get('/contacts/add', (request, response) => {
    db.addContact(request.query, (error, contact) => {
      if (error) {
        response.status(500).render('error', {
          error: error,
        })
      } else {
        db.getLastAddedContact((error, contact) => {
          response.redirect('/contacts/' + contact[0].id);
        })
      }
    })
  })

  app.get('/contacts/delete/:id', (request, response) => {
    db.deleteContactById(request.params, (error, contact) => {
      if (error) {
        response.status(500).render('error', {
          error: error,
        })
      } else {
        response.redirect('/');
      }
    })
  })

  app.get('/contacts/:id', (request, response) => {
    db.getContactById(request.params, (error, contact) => {
      if (error) {
        response.status(500).render('error', {
          error: error,
        })
      } else {
        response.render('contact', {
          contact: contact[0]
        })
      }
    })
  })


  app.use((request, response) => {
    response.status(404).render('not_found')
  })
}