1. we use bootstrap in which we already have in built classes for css and javascript

2.we made a folder partial in views because in views we have many pages and in each page using bootstrap cdn is not good so we make 2 files in partials head.ejs and script.ejs in which we put CSS cdn and javascript Cnd so we can use them directly in our different pages and we made nav ffile because in each page we need navBar similary in partials we made files so we can excess them in any pages or multiple pages with out writting same code in every page by using :
"<%- include("./partials/head")  %>" 
this help us to take the codde and execute the code on that page but in code it looks clean but this will paste thee code in our main code you can see this in page source or inspact

3. We only nedd devDependencies in development enviroment means when we are developing our project when we deploy our devDependencies do not deployed 
  a. start script work after deployment and dev work during development from package.json

  4. salt is used to hash password
  5.In Mongoose middleware like pre("save"), we use a normal function instead of an arrow function because we need access to this. In a normal function, this refers to the current document being saved in the database. Arrow functions do not have their own this, so they cannot access the document correctly.

  6.In modern Mongoose versions, pre("save") middleware does not require next() because it supports promise-based execution. If next() is used incorrectly, it can cause the error "TypeError: next is not a function"

  cloud services uses app.js insted of index.js and also script of start they uses that is the reason we use them lioke this 