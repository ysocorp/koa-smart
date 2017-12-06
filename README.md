# RESTful json API Boilerplate Object with Decorator, Params checker, Koajs 2 and Sequelize

A **RESTful json API** boilerplate with **Koajs 2**, **@ Decorators**, **Node v8!**, **Sequelize**, `async-await`, `babel`, and much more...
```sh
  export default class RouteUsers extends Route {

    // get route: http://localhost:3000/users/get/:id
    @Route.Get({
      accesses: [Route.accesses.public],
      path: 'get/:id'
    })
    async get(ctx) {
      const user = await this.models.users.findById(ctx.params.id);
      this.assert(user, 404, ctx.state.__('User not found'));
      this.sendOk(ctx, user);
    }

    // post route: http://localhost:3000/users/add
    @Route.Post({
      accesses: [Route.accesses.public],
      params: { // params to allow: all other params will be rejected
        email: true, // return an 400 if the body doesn't contain email key
        name: false,
      },
    })
    async add(ctx) {
      const body = this.body(ctx); // or ctx.request.body
      // body can contain only an object with email and name field
      const user = await this.models.user.create(body);
      this.sendCreated(ctx, user);
    }

  }
```

## Summary
* What's in this boilerplate ?
* Get started
* Router with decorator

## What's in this boilerplate ?

* [`cluster`](https://nodejs.org/docs/latest/api/cluster.html) to improve performance by adding workers (fork)
* **For routing**
    * [`koajs 2`](https://github.com/koajs/koa) as the main, underlying framework
    * [`kcors`](https://www.npmjs.com/package/kcors) is used to handle cross-domain requests
    * [`koa-helmet`](https://www.npmjs.com/package/koa-helmet) helps you secure your api
    * [`koa-bodyparser`](https://github.com/koajs/bodyparser) to parse request bodies
    * [`koa-compress`](https://github.com/koajs/compress) to compress the response
    * [`node-gettext`](https://github.com/alexanderwallin/node-gettext) for Internationalization (I18n)
    * [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) an implementation of [JSON Web Tokens JWT](https://tools.ietf.org/html/rfc7519)
* [`babel`](https://babeljs.io/) to use the latest javascript version
* [`@Decorators`](https://babeljs.io/docs/plugins/transform-decorators/) to ensure a better project structure
* [`nodemon`](https://github.com/remy/nodemon) allows to automatically restart your API whenever you change a file during development.
* [`eslint`](https://github.com/eslint/eslint) with ES7 thanks to `babel-eslint`
* [`handlebars`](https://github.com/wycats/handlebars.js/) to build templates view
* **For models / db**
    * [`sequelize 4`](http://docs.sequelizejs.com/) An ORM for Postgres, MySQL, SQLite and Microsoft SQL Server
    * [`sequelize-cli`](https://github.com/sequelize/cli) The sequelize Command Line Interface
    * [`umzug`](https://github.com/sequelize/umzug) Migration tool for sequelize
    * [`uuid`](https://github.com/kelektiv/node-uuid)


## Directory structure
The repository root contains auxiliary files like `package.json`, `.gitignore`, etc.

* `bin`: files that are usually executed by `npm` scripts
* `config`: all your config files (eg: nodemon.json, [`config`][config], ....)
* `src`: the actual app's code is stored here
  * `base`: This is the folder that will normally remain same for all your apps, it includes basic functionalities for your app such as RoutesManager, RouteDecorator, ModelManager, etc.
  * `db`: all files will be executed on startup in order to run [migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html) and seeders.
  * `locales`: all files needed to Internationalize your api (I18n)
  * `models`: all files starting with the name `Table...` will be imported into your sequelize models
  * `routes`: API endpoints go here, all files extending the RouteBase class will be loaded automatically
      * `middleware`: custom middleware for your application, written koa-style.

## Get started
Clone this repository, remove the `.git` directory, run `git init`, and adjust details in `package.json`.

Before installing, [download and install Node.js](https://nodejs.org/en/download/). **Node.js v8.9.1** or higher will be required.

* **Install grunt**
`sudo npm install -g grunt`
* **Install package**
`npm install`
* **DB: this boilerplate is set with [sequelize](http://docs.sequelizejs.com/manual/installation/getting-started) `postgres`, you can replace it with `mysql`, `sqlite` or `MSSQL`**
    * **Change the SGBD**

        ```sh
        // uninstall postgres
        $ npm uninstall --save pg@6 pg-hstore
        // install another db
        $ npm install --save mysql2
        $ npm install --save sqlite3
        $ npm install --save tedious // MSSQL
        ```

        Change configuration `./config/default.js`
        ```sh
        database: {
            ...
            dialect: 'mysql', //mysql, sqlite, postgres, mssql
            ...
        },
        ```

    * **create your database** example with `postgres`
    requires [postgres](https://www.postgresql.org/download/macosx/) being installed on your machine
    ```sh
    psql -U USERNAME -h localhost
    postgres=# create database MY_DATABASE_NAME;
    postgres=# grant all privileges on database MY_DATABASE_NAME to USERNAME;
    // RESTART Terminal
    ```
    * **change the `config` to connect to your database**
        * open `./config/development.js` and set the `database` value
* **Run Dev**
`yarn dev OR npm run dev`
* **Run Test**
`yarn test OR npm run test`
* **Build the Prod**
`yarn build-prod OR npm run build-prod`
* **Run Prod**
`yarn prod OR npm run prod`


## Router with decorator
**All routes have to extend the `Route` class in order to be added, and have to be inside the `routes` folder**

If you have a route class with the name `RouteMyApi`, all the routes inside said class will be preceded by `/my-api/`
* How does it work ?
    1) the `Route` word is removed
    2) uppercase letters are replaced with '-'. (essentially converting camelCase into camel-case)
e.g.: this will add a get route => http://localhost:3000/my-api/hello

  ```sh
  export default class RouteMyApi extends Route {

    @Route.Get({})
    async hello(ctx) {
      this.sendOk(ctx, ctx.state.__('hello'));
    }

  }
  ```

* **Get route**

  ```sh
    // /hello
    @Route.Get({})
    async hello(ctx) {
      this.sendOk(ctx, null, ctx.state.__('hello'));
    }
  ```
* **change path**

  ```sh
    // /myroute/15
    @Route.Get({
      path: '/myroute/:id'
    })
    async hello(ctx) {
      this.sendOk(ctx, ctx.state.__('hello') + ctx.params.id);
    }
  ```

* **Post route**
  ```sh
    // /user-post
    @Route.Post({
        params: { // params to allow: all other params will be rejected
            email: true, // return a 400 error if the body doesn't contain email key
            name: false, // optional parameter
        },
    })
    async userPost(ctx) {
      const body = this.body(ctx);
      // body can contain only an object with email and name field
      const user = await this.models.user.create(body);
      this.sendCreated(ctx, user);
    }
  ```
  * **manager params receive**
      * **all other fields which aren't in the params object will be rejected**
      * simplified writing

        ```sh
          params: ['email', 'name']
          // is equal to
          params: {
            email: false,
            name: false,
          }
          // is equal to
          params: {
            email: {
              __force: false,
            },
            name: false,
          }
        ```
      * **more option:**
          * `__force` [boolean] tells whether a field is required or not
          * `__func` an `Array<Function>` to be executed on the field one by one in order to validate / transform it
          * Eg:

              ```sh
                params: {
                  name: {
                    __force: false,
                    __func: [
                        utils.trim,
                        utilsParam.test(utils.notEmpty), // return 400 if empty
                        utils.capitalize,
                        (elem, route, { ctx, body, keyBody }) => {
                          return elem.trim();
                        },
                        // do whatever you want...
                    ],
                  },
                },
              ```
      * **Eg: object nested inside another object:**

          ```sh
            params: {
              user: {
                __force: true,
                name: {
                  __force: true,
                  __func: [utils.trim],
                },
                password: true,
                address: {
                  __force: true,
                  country: true,
                  street: true,
                }
              },
              date: false,
            },
          ```

## License

  MIT
