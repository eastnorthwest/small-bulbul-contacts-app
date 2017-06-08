"use strict"
const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://east-northwest:1234@localhost:5433/east-northwest';
const client = new pg.Client(connectionString)
client.connect();

let db = function() {};

db.prototype.query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)
  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', result.rows.length)
      callback(error, result.rows)
    }
  });
}

db.prototype.getContacts = function(callback){
  db.prototype.query(`SELECT * FROM contacts`, [], callback)
}

db.prototype.getContactsByName = function(params, callback){
  db.prototype.query(`SELECT * FROM contacts WHERE LOWER(name) LIKE LOWER($1::text)`, ['%' + params.name + '%'], callback)
}

db.prototype.getContactById = function(params, callback){
  db.prototype.query(`SELECT * FROM contacts WHERE id = $1::integer`, [params.id], callback)
}

db.prototype.addContact = function(params, callback){
  params.city = "Anytown";
  params.state = "CA";
  params.zip = "94444";
  params.country="United States";
  db.prototype.query(`INSERT INTO contacts 
        (name, email, phone, street, city, state, zip, country, birthday, website) 
        VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text, $8::text, $9::timestamp, $10::text)`
      , [params.name, params.email, params.phone, params.address, params.city, params.state, params.zip, params.country, params.birthday, params.website],
      callback)
}

db.prototype.getLastAddedContact = function(callback){
  db.prototype.query(`SELECT id FROM contacts ORDER BY id DESC LIMIT 1`, [], callback)
}

db.prototype.deleteContactById = function(params, callback){
  db.prototype.query(`DELETE FROM contacts WHERE id = $1::integer`, [params.id], callback)
}

module.exports = new db();
