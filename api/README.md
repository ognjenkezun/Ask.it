# Before starting application, it is necessary to create .env file and install all needed packages <br />
# for successfully running and working.

Execute following command: `npm install`

## Environment Variable

Create a .env file at the root of the app and use <KEY>=<VALUE> pattern to add values for some<br />
variables specified below:

USERNAME=test
PASSWORD=test
DATABASE=ask.it
HOST=127.0.0.1
PORT=5432
DIALECT=postgres

-SECRET=ksasdzjeymio123
-APP_PORT=3200

Copy following line in package.json file in scripts like this: 

"dev": "nodemon --exec babel-node -r dotenv/config index.js"

Now run command `npx sequelize-cli db:migrate` to run migrations and generate tables needed for<br /> 
this application.

Finally execute command `npm run dev` to run application.

### IMPORTANT

If you can't start project, change extension in `config.js` to `config.json` in `db/config`. Open file and <br />
delete existing code and add following code inside:

{
  "development": {
    "username": process.env.USERNAME || "test",
    "password": process.env.PASSWORD || "test",
    "database": process.env.DATABASE || "ask.it",
    "host": process.env.HOST || "127.0.0.1",
    "port": process.env.PORT || "5432",
    "dialect": process.env.DIALECT || "postgres"
  }
}

In folder `db/models` exists file `index.js` and inside instead line 8 change extension <br />
`const config = require(__dirname + '/../config/config.js')[env];` write this code <br />
`const config = require(__dirname + '/../config/config.json')[env];`.

In file `.sequelize` in root of project, in line 4 `'config': path.resolve('./', './db/config/config.js')` <br />
change extension of `config.js` to `config.json`, like this `'config': path.resolve('./', './db/config/config.json')`.



