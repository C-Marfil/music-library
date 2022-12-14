const { Client } = require('pg');

const path = require('path');

const envName = process.argv.slice(2)[0];

const loadEnv = (envName) => {
    const { NODE_ENV } = process.env
    if (NODE_ENV != 'production') {
    
      const envFile = envName === 'test' ? '../.env.test' : '../.env'
      
      require('dotenv').config({
        path: path.join(__dirname, envFile),
      });

      const databaseName = process.env.PGDATABASE;

      delete process.env.PGDATABASE

      return databaseName
    }
};

const createDatabase = async (databaseName) => {
    // create a new client, it will automatically load the connection details from process.env
    const client = new Client()
    try {
      await client.connect()
    
      console.log(`Creating ${databaseName} database...`)
    
      await client.query(`CREATE DATABASE ${databaseName}`)
    
      console.log('Database created!')
    } catch (err) {
  
      switch (err.code) {
      // this is the postgres error code for when a database already exists. You could store this in a constant to make the code more readable
      case "42P04":
        console.log('Database already exists!')
        break
      default:
        console.log(err)
      }
    } finally {
      client.end()
    }
  }
  
  const databaseName = loadEnv(envName);
  createDatabase(databaseName);




