 const { migrate } = require('postgres-migrations')
 const path = require('path')

 const { NODE_ENV } = process.env

 // This code is repeated a few times in our scripts. Can you factor it out into a shared helper function?
 if (NODE_ENV != 'production') {
   const args = process.argv.slice(2)[0]

   const envFile = args === 'test' ? '../.env.test' : '../.env'
   
   require('dotenv').config({
     path: path.join(__dirname, envFile),
   })
 }

 const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env

 const config = {
   database: PGDATABASE,
   user: PGUSER,
   password: PGPASSWORD,
   host: PGHOST,
   port: parseInt(PGPORT),
   ensureDatabaseExists: true,
   defaultDatabase: PGDATABASE
 }

 const migrateDB = async (config) => {

   console.log('Migrating Database...')

   const output = await migrate(config, './migrations')

   if (!output.length) {
     console.log('Database already up to date!')
   } else {
     console.log(output)
   }
 }

 try {
   migrateDB(config)
 } catch (err) {
   console.log(err)
 }