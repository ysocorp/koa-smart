# **KoaSmart** is a framework base on **Koajs2**, this allow you to develop RESTful json API with : **Class**, **Decorator**, **Params checker**

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
* [What's in this framework ?](#what-s-in-this-framework)
* [Install](#install)
* [Router with decorator](#router-with-decorator)
* [Params checker of POST body](#params-checker-of-post-body)

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
* **change path** http://localhost:3000/my-api/myroute/15

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

## License

  MIT
