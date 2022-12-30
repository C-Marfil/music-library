const db = require('../src/db')

    afterEach(async () => {
      await db.query('TRUNCATE Artists CASCADE')
    });

    afterEach(async () => {
      await db.query('TRUNCATE Albums CASCADE')
    });