
# DigitalServo GUI

## :octocat: What's this?
This is a server-side application to control peripheral devices.  
This apllication provides graphical user interfaces that enables client users to control devices connecting to a server.

## :rocket: How to install
This application is constructed by server-side JavaScripts on Node.js.
You should install Node.js before running this application.
Our development environment uses Node.js v17.1.0.
After that, please take following steps:

1. Get a project in any directory.  
`$ git clone https://github.com/wcrvt/nextjs_sample.git`  

2. Move to the following directory and then install libralies.  
`$ cd Server-Software`  
`$ npm i`

## :hammer: How to use
You can start the application by  
`$ node server` or `$ npm start`  

A vanilla application open a port of 4000, and you can access to the sever using your web browser.
* From a local system: `http://localhost:4000/`
* From other systems: `http://(IPaddress):4000/`  

If you want to use another port, please edit 'server.mjs' on a root directory.  
`const port = XXXX;`

A vanilla application runs in a developer mode for browser rendering.
For migration to a production mode, run  
`npx next build`  
and edit 'server.mjs' on a root directory  
`cosnt nextInDev = false;`  
