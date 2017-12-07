# **KoaSmart** is a framework base on **Koajs2**, this allow you to develop RESTful API with : **Class**, **Decorator**, **Params checker**

A framework base on [Koajs2](https://github.com/koajs/koa) with **Decorator**, **Params checker** and a **base of modules** ([`cors`](https://www.npmjs.com/package/kcors), [`bodyparser`](https://github.com/koajs/bodyparser), [`compress`](https://github.com/koajs/compress), [`I18n`](https://github.com/alexanderwallin/node-gettext), etc... ) to let you develop smart api easily 
```sh
  export default class RouteUsers extends Route {

    // get route: http://localhost:3000/users/get/:id
    @Route.Get({
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
* What's in this framework ?
* [Install](#install)
* [Router with decorator](#router-with-decorator)
* [Params checker of POST body](#params-checker-of-post-body)
* [Get Started](#get-started)
    * [Full example](#full-example)
* [Add treatment on route](#add-treatment-on-route)

## What is in this framework ?

**This framework give you a tools of modules as : **

* **For routing**
    * [`koajs 2`](https://github.com/koajs/koa) as the main, underlying framework
    * [`kcors`](https://www.npmjs.com/package/kcors) is used to handle cross-domain requests
    * [`koa-helmet`](https://www.npmjs.com/package/koa-helmet) helps you secure your api
    * [`koa-bodyparser`](https://github.com/koajs/bodyparser) to parse request bodies
    * [`koa-compress`](https://github.com/koajs/compress) to compress the response
    * [`node-gettext`](https://github.com/alexanderwallin/node-gettext) for Internationalization (I18n)
* [`@Decorators`](https://babeljs.io/docs/plugins/transform-decorators/) to ensure a better project structure
* [`moment`](https://github.com/moment/moment) Parse, validate, manipulate, and display dates in javascript.
* [`lodash`](https://github.com/lodash/lodash) A modern JavaScript utility library delivering modularity, performance, & extras
* [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) an implementation of [JSON Web Tokens JWT](https://tools.ietf.org/html/rfc7519)


## Install
`npm install koa-smart`

## Router with decorator

**All routes have to extend the `Route` class in order to be mount**

* **Prefix of routes**

    If you have a route class with the name `RouteMyApi`, all the routes inside said class will be **preceded** by **`/my-api/`**

    * How does it work ?
        1) the `Route` word is removed
        2) uppercase letters are replaced with '-'. (essentially converting camelCase into camel-case)
        **e.g.**: this will add a get route => http://localhost:3000/my-api/hello

      ```sh
      export default class RouteMyApi extends Route {

          @Route.Get({})
          async hello(ctx) {
              this.sendOk(ctx, ctx.state.__('hello'));
          }

      }
      ```

    * Change prefix of all routes in the class: http://localhost:3000/my-prefix/hello
      ```sh
      @Route.Route({
          routeBase: 'my-prefix',
      })
      export default class RouteMyApi extends Route {

          @Route.Get({})
          async hello(ctx) {
              this.sendOk(ctx, ctx.state.__('hello'));
          }

      }
      ```

* **Get route** http://localhost:3000/my-api/hello

  ```sh
    @Route.Get({})
    async hello(ctx) {
      this.sendOk(ctx, null, ctx.state.__('hello'));
    }
  ```
* **Change path** http://localhost:3000/my-api/myroute/15

  ```sh
    @Route.Get({
      path: '/myroute/:id'
    })
    async hello(ctx) {
      this.sendOk(ctx, ctx.state.__('hello') + ctx.params.id);
    }
  ```

* **Post route** http://localhost:3000/my-api/user-post
  ```sh
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

* **Disable route**
    * **Disable all routes in a class**

    to disable all routes in class you should add `disable` on contant of your decorator class
    
    ```sh
    @Route.Route({
        disable: true,
    })
    export default class RouteMyApi extends Route {
        // All route in this class will not be mount
    }
    ```
  
    * **Disable a specific route**

    to disable a specific route you can add `disable` on contant of your decorator
    
    ```sh
    @Route.Get({
        disable: true, // this route will not be mount
    })
    async hello(ctx) {
      this.sendOk(ctx, null, ctx.state.__('hello'));
    }
    ```

## Params checker of POST body

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

## Get Started
  * import the app and your middlewares

    ```sh
    import { join } from 'path';
    // import the app
    import { App } from 'koa-smart';
    // import middlewares koa-smart give you OR others
    import { 
      I18n,
      bodyParser, 
      compress,
      cors,
      ...
    } from 'koa-smart/middlewares';
    ```

  * create an app listen on port 3000

    ```sh
    const app = new App({
      port: 3000,
    });
    ```
  
  * add your middlewares

    ```sh
    app.addMiddlewares([
      cors({ credentials: true }),
      helmet(),
      bodyParser(),
      this.i18n.middleware,
      logger,
      ...
    ]);
    ```
  
  * add your routes
    mount a folder with an prefix (all file who extends from `Route` will be add and mount)

    ```sh
        app.mountFolder(join(__dirname, 'routes'), '/');
    ```

  * Start your app

    ```sh
    app.start();
    ```
  
### Full example

  * Basic one

    ```sh
    import { join } from 'path';
    // import the app
    import { App } from 'koa-smart';
    // import middlewares koa-smart give you OR others
    import { 
      I18n,
      bodyParser, 
      compress,
      cors,
      helmet,
      addDefaultBody,
      handleError,
      logger,
    } from 'koa-smart/middlewares';

    conat app = new App({
      port: 3000,
    });

    app.addMiddlewares([
      cors({ credentials: true }),
      helmet(),
      bodyParser(),
      this.i18n.middleware,
      logger,
      handleError,
      addDefaultBody,
      passport.initialize(),
      authentification,
      compress({}),
    ]);
        
    // mount a folder with an prefix (all file who extends from `Route` will be add and mount)
    app.mountFolder(join(__dirname, 'routes'), '/');

    // start the app
    app.start();
    ```
  
  * Other example who Extends class App

    ```sh
    import { join } from 'path';
    // import the app
    import { App } from 'koa-smart';
    // import middlewares koa-smart give you OR others
    import { 
      I18n,
      bodyParser, 
      compress,
      cors,
      helmet,
      addDefaultBody,
      handleError,
      logger,
    } from 'koa-smart/middlewares';

    // create an class who extends from App class
    export default class MyApp extends App {
      constructor() {
        super({ port: 3000 });
      }

      async start() {
        // add your Middlewares
        super.addMiddlewares([
          cors({ credentials: true }),
          helmet(),
          bodyParser(),
          this.i18n.middleware,
          logger,
          handleError,
          addDefaultBody,
          passport.initialize(),
          authentification,
          compress({}),
        ]);

        // mount a folder with an prefix (all file who extends from `Route` will be add and mount)
        super.mountFolder(join(__dirname, 'routes'));
        return super.start();
      }
    }

    // start the app
    const app = new MyApp();
    app.start();
    ```

## Add treatment on route
  **you can add you own treatment and attribute to the route.**

  In this example we will see how you can manage **accesses** to you route in 2 steps  

  1. Extends `Route` Class and overload  `beforeRoute` methode 
    ```sh
      export default class MyRoute extends Route {
        static accesses = {
          public: -1,
          connected: 100,
          admin: GROUPS.ADMIN_ID,
          client: GROUPS.CLIENT_ID,
          // whatever ...
        };
    
        // overload beforeRoute
        async beforeRoute(ctx, infos, next) {
          // infos.options content all the param give to the route

          if (this.mlCanAccessRoute(ctx, infos.options)) { // test if you can access
            this.throw(StatusCode.forbidden, ctx.state.__('Forbidden access')); 
          }
          // call the super methode
          await super.beforeRoute(ctx, infos, next);
        }

        mlCanAccessRoute(ctx, { accesses }) {
          if (accesses && Array.isArray(accesses)) {
            const { user } = ctx.state;
            return accesses.includes(Route.accesses.public) ||
              (!!user && (
                accesses.includes(Route.accesses.connected) ||
                user.usergroup_id === Route.accesses.admin ||
                accesses.includes(user.usergroup_id)
              ));
          }
          return false;
        }
      }

    ```

  2. Create an route with access 

    ```sh
      export default class RouteMyApi extends MyRoute {
        constructor(params) {
          super({ ...params });
        }

        @Route.Get({ accesses: [MyRoute.accesses.public] })
        async publicRoute(ctx) {
          this.sendOk(ctx, ctx.__('I can be call by any one'));
        }

        @Route.Get({ accesses: [MyRoute.accesses.client] })
        async clientRoute(ctx) {
          this.sendOk(ctx, ctx.__('I can be call by only client user'));
        }

        @Route.Get({ accesses: [MyRoute.accesses.admin] })
        async adminRoute(ctx) {
          this.sendOk(ctx, ctx.state.__('I can be call by only admin user'));
        }

        @Route.Get({ accesses: [MyRoute.accesses.client, MyRoute.accesses.admin] })
        async adminRoute(ctx) {
          this.sendOk(ctx, ctx.state.__('I can be call by client and admin user'));
        }

        @Route.Get({ accesses: [MyRoute.accesses.connected] })
        async adminRoute(ctx) {
          this.sendOk(ctx, ctx.state.__('I can be call by all connected users'));
        }
      }
    ```

## License

  MIT
