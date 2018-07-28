# **KoaSmart** is a framework based on **Koajs2**, which allows you to develop RESTful APIs with : **Class**, **Decorator**, **Params checker**

[![Build Status](https://secure.travis-ci.org/ysocorp/koa-smart.png?branch=master 'Test')](http://travis-ci.org/ysocorp/koa-smart)
[![NPM version](http://badge.fury.io/js/koa-smart.png)](https://npmjs.org/package/koa-smart 'View this project on NPM')

A framework based on [Koajs2](https://github.com/koajs/koa) with **Decorator**, **Params checker** and a **base of modules** ([`cors`](https://www.npmjs.com/package/kcors), [`bodyparser`](https://github.com/koajs/bodyparser), [`compress`](https://github.com/koajs/compress), [`I18n`](https://github.com/koa-modules/i18n), etc... ) to allow you to develop a smart api easily

```sh
  export default class RouteUsers extends Route {

    // get route: http://localhost:3000/users/get/:id
    @Route.Get({
      path: 'get/:id'
    })
    async get(ctx) {
      const user = await this.models.users.findById(ctx.params.id);
      this.assert(user, 404, 'User not found');
      this.sendOk(ctx, user);
    }

    // post route: http://localhost:3000/users/add
    @Route.Post({
      accesses: [Route.accesses.public],
      bodyType: Types.object().keys({
        email: Types.string().required(), // return an 400 if the body doesn't contain email key
        name: Types.string().uppercase(), // optional parameter
      }),
    })
    async add(ctx) {
      const body = this.body(ctx); // or ctx.request.body
      // body can contain only an object with email and name field
      const user = await this.models.user.create(body);
      this.sendCreated(ctx, user);
    }

  }
```

# [Api documentation](https://ysocorp.github.io/koa-smart/)

## Summary

- What's in this framework ?
- [Install](#install)
- [Router with decorator](#router-with-decorator)
- [Params checker of POST body](#params-checker-see-the-doc-of-types-for-more-information)
- [Automatic documention generation](#automatic-documention-generation-see-the-manual-for-more-information)
- [Get Started](#get-started-quick-start-boilerplate)
- [Full example](#full-example)
- [Add treatment on route](#add-treatment-on-route)

## What is in this framework ?

**This framework gives you the tools to use a set of modules: **

- **For routing**
  - [`koajs 2`](https://github.com/koajs/koa) as the main, underlying framework
  - [`kcors`](https://www.npmjs.com/package/kcors) is used to handle cross-domain requests
  - [`koa2-ratelimit`](https://github.com/ysocorp/koa2-ratelimit) To limit bruteforce requests
  - [`koa-helmet`](https://www.npmjs.com/package/koa-helmet) helps you secure your api
  - [`koa-bodyparser`](https://github.com/koajs/bodyparser) to parse request bodies
  - [`koa-compress`](https://github.com/koajs/compress) to compress the response
  - [`koa-i18n`](https://github.com/koa-modules/i18n) for Internationalization (I18n)
- [`@Decorators`](https://babeljs.io/docs/plugins/transform-decorators/) to ensure a better project structure
- [`moment`](https://github.com/moment/moment) Parse, validate, manipulate, and display dates in javascript.
- [`lodash`](https://github.com/lodash/lodash) A modern JavaScript utility library delivering modularity, performance, & extras
- [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) an implementation of [JSON Web Tokens JWT](https://tools.ietf.org/html/rfc7519)

## Install

`npm install koa-smart`

## Router with decorator

**All routes have to extend the `Route` class in order to be mount**

- **Prefix of routes**

  If you have a route class with the name `RouteMyApi`, all the routes inside said class will be **preceded** by **`/my-api/`**

  - How does it work ?

    1.  the `Route` word is removed
    2.  uppercase letters are replaced with '-'. (essentially converting camelCase into camel-case)
        **e.g.**: this will add a get route => http://localhost:3000/my-api/hello

    ```sh
    export default class RouteMyApi extends Route {

        @Route.Get({})
        async hello(ctx) {
            this.sendOk(ctx, 'hello');
        }

    }
    ```

  - Change prefix of all routes in the class: http://localhost:3000/my-prefix/hello

    ```sh
    @Route.Route({
        routeBase: 'my-prefix',
    })
    export default class RouteMyApi extends Route {

        @Route.Get({})
        async hello(ctx) {
            this.sendOk(ctx, 'hello');
        }

    }
    ```

- **Get route** http://localhost:3000/my-api/hello

  ```sh
    @Route.Get({})
    async hello(ctx) {
      this.sendOk(ctx, null, 'hello');
    }
  ```

- **Change path** http://localhost:3000/my-api/myroute/15

  ```sh
    @Route.Get({
      path: '/myroute/:id'
    })
    async hello(ctx) {
      this.sendOk(ctx, 'hello' + ctx.params.id);
    }
  ```

- **Post route** http://localhost:3000/my-api/user-post

  ```sh
    @Route.Post({
      bodyType: Types.object().keys({ // body to allow: all other params will be rejected
        email: Types.string().required(), // return an 400 if the body doesn't contain email key
        name: Types.string().uppercase(), // optional parameter
      }),
    })
    async userPost(ctx) {
      const body = this.body(ctx);
      // body can contain only an object with email and name field
      const user = await this.models.user.create(body);
      this.sendCreated(ctx, user);
    }
  ```

- **Disable route**

  - **Disable all routes in a class**

  to disable all routes in a class you should add `disable` in the content of your decorator class

  ```sh
  @Route.Route({
      disable: true,
  })
  export default class RouteMyApi extends Route {
      // All routes in this class will not be mounted
  }
  ```

  - **Disable a specific route**

  to disable a specific route you can add `disable` in the content of your decorator

  ```sh
  @Route.Get({
      disable: true, // this route will not be mounted
  })
  async hello(ctx) {
    this.sendOk(ctx, null, 'hello');
  }
  ```

- **handle accesses**

Koa smart allows accesses to be handled in a simple and efficient manner.

```sh
function admin() {
  return false;
};

function user(ctx) {
  // work with ctx...
  return ctx.user.id != null;
};

export default class RouteAccess  extends Route {
  constructor(params) {
    super({ ...params });
  }
  @Route.Post({
    accesses: [admin, users], // pass an array of functions
  })
  async myRoute(ctx) {
    this.sendOk(ctx, this.body(ctx));
  }
}
```

Each function passed to `accessers` will be given the koa context as a parameter, and must return a `boolean` to express whether is grants access to the route or not.

If at least one of the function given returns `true`, access to the route will be granted.

* **RateLimit** : For more infos, see the [`koa2-ratelimit`](https://github.com/ysocorp/koa2-ratelimit) module

  * **Configure**

    ```sh
    import { App } from 'koa-smart';
    import { RateLimit, RateLimitStores } from 'koa-smart/middlewares';

    const app = new App({ port: 3000 });

    // Set Default Option
    const store = new RateLimitStores.Memory() OR new RateLimitStores.Sequelize(sequelizeInstance)
    RateLimit.defaultOptions({
        message: 'Too many requests, get out!',
        store: store, // By default it will create MemoryStore
    });

    // limit 100 accesses per min on your API
    app.addMiddlewares([
      // ...
      RateLimit.middleware({ interval: { min: 1 }, max: 100 }),
      // ...
    ]);
    ```

  - **RateLimit On Decorator**

    Single RateLimit

    ```sh
    @Route.Get({ // allow only 100 requests per day to /view
        rateLimit: { interval: { day: 1 }, max: 100 },
    })
    async view(ctx) {
      this.sendOk(ctx, null, 'hello');
    }
    ```

    Multiple RateLimit

    ```sh
    // Multiple RateLimit
    @Route.Get({
        rateLimit: [
            { interval: { day: 1 }, max: 100 }, // allow only 100 requests per day
            { interval: { min: 2 }, max: 40 }, // allow only 40 requests in 2 minutes
        ],
    })
    async hello(ctx) {
      this.sendOk(ctx, null, 'hello');
    }
    ```

- **middlewares**

  - **Of a Class**

    ```sh
    @Route.Route({
        middlewares: [ // Array of middlewares
          async (ctx, next) => {
            console.log('I will be call before all route in this class');
            await next();
          },
        ],
    })
    class RouteMiddlewares extends Route {
        @Route.Get({})
        async view(ctx, next) {
          console.log('I will be call after middlewares of class');
          this.sendOk(ctx, null, 'hello');
        }
    }
    ```

  - **Of a specific route**

    ```sh
    @Route.Get({
        middlewares: [ // Array of middlewares
          async (ctx, next) => {
            console.log('I will be call before the route but after middlewares of class');
            await next();
          },
        ],
    })
    async view(ctx, next) {
        console.log('I will be call after middlewares of the class and route');
        this.sendOk(ctx, null, 'hello');
    }
    ```

- **accesses**
  **`accesses`** shoul be an array of async function that return a boolean. If one of the function return true, it will have access.

  ```sh
    async function isConnected(ctx) {
      // TODO test if the user is connected
      return ctx.state.user;
    }
    async function isUserPremium(ctx) {
      // TODO test if the user is premium
      return ctx.state.user.isPremium;
    }
    async function isAdmin(ctx) {
      // TODO test if the user is a admin
      return ctx.state.user.isAdmin;
    }
  ```

  - **Of a Class**

    ```sh
    @Route.Route({ accesses: [isConnected] })
    class RouteMiddlewares extends Route {
      @Route.Get({})
      async view(ctx, next) {
        console.log('I can be call if the current user is connected');
        this.sendOk(ctx, null, 'OK');
      }
    }
    ```

  - **Of a specific route**

    ```sh
    @Route.Get({})
    async myPublicRoute(ctx, next) {
      console.log('I am a public route, I can be call by any one');
      this.sendOk(ctx, null, 'OK');
    }

    @Route.Get({ accesses: [isConnected] })
    async myConnectedRoute(ctx, next) {
      console.log('I can be call if the current user is connected');
      this.sendOk(ctx, null, 'OK');
    }

    @Route.Get({ accesses: [isUserPremium, isAdmin] })
    async myPremiumRoute(ctx, next) {
      console.log('I can be call if the current user is connected and premium or admin');
      this.sendOk(ctx, null, 'OK');
    }
    ```

## Params checker: [See the doc of Types](https://ysocorp.github.io/koa-smart/manual/type-system.html) for more information

* ### `bodyType` to check body params

  - quick example

    ```sh
      @Route.Post({ // or Put, Patch
        bodyType: Types.object().keys({
          email: Types.string().regex(/\S+@\S+\.\S+/).required(),
          password: Types.string().min(8).required(),
          address: Types.object().keys({
            country: Types.string().required(),
            street: Types.string().required(),
          }).required(),
        }),
      })
      async user(ctx) {
        // this is the body manage by bodyType
        const bodyParams = this.body(ctx);

        // this is the origin body pass
        const originBodyParams = this.body(ctx, true);
      }
    ```

* ### `queryType` to check query params

  - quick example

    ```sh
      @Route.Get({
        queryType: Types.object().keys({
          limit: Types.number().integer().required().default(10),
          offset: Types.number().integer().required().default(10),
        }),
      })
      async users(ctx) {
        // this can contain only limit and offset
        const queryParams = this.queryParam(ctx);

        // this is the origin queryParams pass
        const originQueryParams = this.queryParam(ctx, true);
      }
    ```

## Automatic documention generation: [See the manual](https://ysocorp.github.io/koa-smart/manual/auto-doc.html) for more information

## Get Started ([quick-start boilerplate](https://github.com/ysocorp/koa-smart-light-example))

in order to get started quickly, look at [this boilerplate](https://github.com/ysocorp/koa-smart-light-example), or follow the instructions below:

* import the app and your middlewares

  ```sh
  import { join } from 'path';
  // import the app
  import { App } from 'koa-smart';
  // import middlewares koa-smart give you OR others
  import {
    bodyParser,
    compress,
    cors,
    handleError,
    RateLimit,
    ...
  } from 'koa-smart/middlewares';
  ```

- create an app listening on port 3000

  ```sh
  const myApp = new App({
    port: 3000,
  });
  ```

- add your middlewares

  ```sh
  myApp.addMiddlewares([
    cors({ credentials: true }),
    helmet(),
    bodyParser(),
    handleError(),
    RateLimit.middleware({ interval: { min: 1 }, max: 100 }),
    ...
  ]);
  ```

- add your routes
  mount a folder with a prefix (all file who extends from `Route` will be added and mounted)

  ```sh
      myApp.mountFolder(join(__dirname, 'routes'), '/');
  ```

- Start your app

  ```sh
  myApp.start();
  ```

### Full example

- Basic one

  ```sh
  import { join } from 'path';
  // import the app
  import { App } from 'koa-smart';
  // import middlewares koa-smart give you OR others
  import {
    i18n,
    bodyParser,
    compress,
    cors,
    helmet,
    addDefaultBody,
    handleError,
    logger,
    RateLimit,
  } from 'koa-smart/middlewares';

  const myApp = new App({
    port: 3000,
  });

  myApp.addMiddlewares([
    cors({ credentials: true }),
    helmet(),
    bodyParser(),
    i18n(myApp.app, {
      directory: join(__dirname, 'locales'),
      locales: ['en', 'fr'],
      modes: ['query', 'subdomain', 'cookie', 'header', 'tld'],
    }),
    handleError(),
    logger(),
    addDefaultBody(),
    compress({}),
    RateLimit.middleware({ interval: { min: 1 }, max: 100 }),
  ]);

  // mount a folder with an prefix (all file who extends from `Route` will be add and mount)
  myApp.mountFolder(join(__dirname, 'routes'), '/');

  // start the app
  myApp.start();
  ```

- Other example who Extends class App

  ```sh
  import { join } from 'path';
  // import the app
  import { App } from 'koa-smart';
  // import middlewares koa-smart give you OR others
  import {
    i18n,
    bodyParser,
    compress,
    cors,
    helmet,
    addDefaultBody,
    handleError,
    logger,
    RateLimit,
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
        i18n(this.app, {
          directory: join(__dirname, 'locales'),
          locales: ['en', 'fr'],
          modes: ['query', 'subdomain', 'cookie', 'header', 'tld'],
        }),
        handleError(),
        logger(),
        addDefaultBody(),
        compress({}),
        RateLimit.middleware({ interval: { min: 1 }, max: 100 }),
      ]);

      // mount a folder with an prefix (all file who extends from `Route` will be add and mount)
      super.mountFolder(join(__dirname, 'routes'));
      return super.start();
    }
  }

  // start the app
  const myApp = new MyApp();
  myApp.start();
  ```

## License

MIT © [YSO Corp](http://ysocorp.com/)
