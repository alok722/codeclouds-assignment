# CodeClouds assignment

## feature-list

  - Homepage [URL](http://localhost:3000/api).
  - Admin can only sign-in using pre-defined username and password. Username: `admin` ; Password: `codeclouds`.
  - User can do both signUp and signIn.
  - If `Admin` logs in he/she will be presented with a UI where he/she can add default city.
  - If `User` logs in after signup he/she will be presented with a UI where he/she can check whether his/her city lie in the radius of `100Kms` in comparison to `default` city.
  - Both User and Admin UI have `logout` button.

```js
> Considering Backend assessment, I have implemented `SSR`.
> template engine: `ejs`;
> database: `mongodb`;
> backend: `node & express`;
> UI Library: `bootstrap 4`;
> auth token: `jwt`;
> extract latitude & longitude: `opencage-api-client`
> testing: `mocha & chai`;
```
