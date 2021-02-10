## Live Demo
test the project on: [https://ahmadbenos-jwt-2fa.glitch.me/](https://ahmadbenos-jwt-2fa.glitch.me/)  
or clone the project and run `npm install` then `npm run server`

Note: (glitch.com app load times sometimes takes about 2-3 mins)

**JWT lasts for 60 seconds in this project so that testing it can be done quickly**

# Description
This is a **React js(nodejs)** project that uses **passport.js** for user authentication, **JWT** for protecting and forwarding routes, and **2FA** authentication which is a extra great security layer for users. MongoDB is the database used.

Features in this project:
 - User signup/login 
 - error messages
 - option to enable 2FA in an account
 - if JWT isn't valid, user is redirected to login page
 - used react context API(not very well used since i didn't use a reducer, for testing purposes)
 - if user has 2FA enabled, dashboard page redirects to the page to validate using authenticator first if not validated after login
 - 2FA secret key is generated once the user activates 2FA and not when signing up.
## License
Copyright 2021 Ahmad Tarabein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
