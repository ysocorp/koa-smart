# Upgrade to V2

Koa-smart v2 is the current release and it introduces some breaking changes. The following guide lists some of the changes to upgrade from v1 to v2.

## Breaking Changes

### Rename the `app` variable in the `App class` by `koaApp`

Rename `app` to `koaApp` to not confuse. Now `app = (instance of App)` and `koaApp = (instance of koa)`

- **Use koa app in App Class**

  - **Old**

    ```js
      export default class App extends AppBase {
        async start() {
          super.addMiddlewares([
            i18n(this.app, { .... }),
          ]);
        }
      }
    ```

  - **New**

    ```js
      export default class App extends AppBase {
        async start() {
          super.addMiddlewares([
            i18n(this.koaApp, { .... }),
          ]);
        }
      }
    ```

- **Route receiving koa app variable**

  - **Old**

    ```js
      Class Route {
        constructor({ app, prefix, routes, models, model, disable }) {
          this.app = app;
          ....
        }
      }
    ```

  - **New**

    ```js
      Class Route {
        constructor({ koaApp, prefix, routes, models, model, disable }) {
          this.koaApp = koaApp;
          ....
        }
      }
    ```

### Body parametter: change `params` key to `bodyType`

- Change param types description by using [Types](https://ysocorp.github.io/koa-smart/manual/type-system.html)

  - **Old**

    ```js
      @Route.Post({
        params: {
          email: true,
          name: false,
        },
      })
      async add(ctx) {
        this.sendCreated(ctx, this.body(ctx));
      }
    ```

  - **New**

    ```js
      @Route.Post({
        bodyType: Types.object().keys({
          email: Types.string().required(),
          name: Types.string().uppercase(),
        }),
      })
      async add(ctx) {
        this.sendCreated(ctx, this.body(ctx));
      }
    ```

### Class Route: change functions

- Change function `sendBadRequest(ctx, data, message)` by `throwBadRequest(error, translate = false)`
- Change function `sendUnauthorized(ctx, data, message)` by `throwUnauthorized(error, translate = false)`
- Change function `sendForbidden(ctx, data, message)` by `throwForbidden(error, translate = false)`
- Change function `sendNotFound(ctx, data, message)` by `throwNotFound(error, translate = false)`
- Remove function `sendInternalServerError(ctx, data, message)`

## New in v2

### Manage query parametter `queryType`

```js
  // call => /view?email=myemail@email.com&name=myName

  @Route.Get({
    queryType: Types.object().keys({
      email: Types.string().required(),
      name: Types.string().uppercase(),
    }),
  })
  async view(ctx) {
    this.sendCreated(ctx, this.queryParam(ctx));
  }
```

### Add new assert functions

- `assertBadRequest`
- `assertUnauthorized`
- `assertForbidden`
- `assertNotFound`

  Example :

  ```js
    @Route.Get({})
    async view(ctx) {
      this.assertUnauthorized(!!ctx.user);
      this.sendCreated(ctx, 'OK');
    }
  ```
