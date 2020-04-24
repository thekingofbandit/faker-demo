# Mock RESTful Data API’s with JSON-Server and Faker

### Difficulty level: Green (Easy)
### Total Time to Complete:  15 minutes

### Tools Required:
* Node JS 8.1 or higher
* Npm 5.6 or higher
* Postman
* Editor or IDE of your choice (I'm using Visual Studio Code)

----

### Here’s a common problem.  

Your team is starting a new project.  Front end developers are starting to work on the user experience, and the back-end developers are starting to work on the database and the back-end.  The problem is, the front-end designers have to wait until the back-end developers create some endpoints for them to consume, and they have to wait until the back-end developers have the format of the JSON they’re going to be returning pretty much nailed down.

In effect, we’re saying the front-end team can’t do anything until the back-end team is well underway.  You could just stagger the development effort, but wouldn’t it be better if you could mock the API the back-end team is developing?

In this video, I’m going to show you how to use a node packages called json-server to simulate a backend complete with a fake database.  Then we’ll use another package called faker to generate 10 or 10’s of thousands of test records in seconds.

Json-Server is a node package, but there’s no reason you can’t use it to simulate any back-end written in any language.  It doesn’t have to be javascript with express, you could simulate Flask or a C# api just as easily, and it all happens in the front-end developer’s project.  All the back-end team needs to do is to agree to the structure of the data used in your endpoint calls.

If you’re following along, you’re going to need Node version 8.1 or higher, and npm version 5.6 or higher.


## Let’s get started

I’ll start by creating a new project.  I’m going to use create react app, but that doesn’t matter.  This technique will work with vanilla javascript or any framework.  

I’ll open up a terminal window.  On MacOs, this is just called Terminal, and on a PC, you can use either git bash or powershell.

I have a folder called Projects in my home folder just for this purpose, so let me CD into that folder.  And now that I’m in the right place, I’ll type

``` npx create-react-app faker-demo. ```

This will create a folder called faker-demo and set up a new react app within that folder.  This might take a few minutes, so I’ll be right back.

The app is created.  Let’s add json-server and faker.  I normally install json-server globally since I use it in all my front-end projects.

```npm install -g json-server ```

Next, let’s install faker as a dev dependency in our app.

``` npm install —save-dev faker ```

I’m also going to use lodash, which is a library full of useful functions.

``` npm install lodash ```

Finally, I’ll use axios to query my back-end api.

``` npm install axios ```

We’ve got all our dependencies.  So I’m ready to switch to an IDE.  I’ll use Visual Studio Code.

## Two Ways to Use JSON Server

So we’re in code now.  There are two ways to use json server.  The first way is to just create a json file in your project to contain your mock data.

This is easy, but the problem with this approach is you have to type out all those records.  That’s easy if you want 5 entries, but what if you want to generate 500 entries?  That would take quite a while and probably be fairly error prone.

This is where faker comes in.  I need to create a javascript file at the top level of my project.  I usually call this generate.js.

Inside of generate.js, I’ll export a single function.

Next, I’ll import lodash and faker.

I’ll return an object that contains one property for each endpoint I want to simulate.  In my case, I’m simulating a blog application, so I’ll name my endpoint blogPosts.  I’m going to use lodash to execute a function a set number of times.  For now, let’s start with 5.  You can increase it later to any practical number you wish.

The function passed to lodash returns an object structure.  Since we’re simulating a database, which normally produces primary keys or unique ID’s for each record, I’ll start my object with an id property and just set it to n, which is the current iteration.  

Next I’ll add some more fields.

I’ll add a category field for my blog post.  Let’s suppose for our blog, we allow you to post on topics like science, technology, religion, etc.  We want our fake data to generate this category for us from a list of possibilities.

So I’ll use faker.helpers.randomize and pass it a normal javascript array containing the possible categories.  Faker will randomly pick one for each record it generates.

If you’re wondering how I knew to use faker.helpers.randomize(), I promise I’m neither psychic nor omniscient.  I simply RTFM.  The documentation on the projects GitHub page contains a list of all the functions you can use, and it is fairly extensive.

Going back to the code, I’ll add a post date.  I want to make sure the dates that are generated are not too far in the past, so for this one, I’ll use faker.date.recent().  This generates a random but recent date.

Let’s add a field for the author’s name, one for the author’s email address, a subject and finally, some lorem ipsom text for the blog post itself.

Now we’re ready to run this.  Make sure you save your file, then open a terminal.  I’ll just use the built-in terminal in Code.  To start the mock server, type

Json-server -p 3001 generate.js

The p switch sets the port.  By default, json server will run on 3000, which is the same port used by create-react-app, so I need the port to be different.  The second argument is your generate script.

At this point, we can see json-server has started successfully, and we can see the endpoints that it’s serving.  Note the relationship between what we called our object, which was blogPost,  and the location on the endpoint.  If you want this to be a perfect simulation, you should discuss what to call the endpoints, and what the structure of the JSON will be with your back-end team.  

Let’s see this in action using postman to view the faked endpoint data.
 
I’ll point an http get request to the endpoint described in the run messages from json-server.  I’ll get the data back just like I would if there were a real back-end there.

## But wait!  There’s more!

The pattern most widely used in restful api’s is to have one endpoint that lists a bunch of records allowing the user to select one.  It would be nice to simulate this pattern.  As it happens, json-server provides detail endpoints.  You just need to alter your calling route to include an ID.  Our data has ID’s in it just like it would if the data were stored in a database.

So I have a few blog posts in the list.  Let’s retrieve the data for one record.  I’ll open a new tab in postman and I’ll copy in the URL from my earlier get request.  Next, I’ll modify it so it has an id on the end.  This time when I request, I get the one record with that ID.

That’s fine for mocking and testing simple get requests.  How can we simulate inserting, updating, and deleting records?

The current best practice is to use HTTP verbs as the basis for your requests.  So I’ll simulate adding a blog post with a POST, rather than a GET request.

I’ll open a new tab, and this time, I’ll change the verb to POST.  Next I’ll add some json to post.  I guess it shouldn’t be a surprise that json-server accepts JSON data for the post.  I don’t need to add an ID field.  Just like in a real back-end, that gets generated by the database, which in this case is an in-memory database used by json-server.

When I post this data, it gets stored just like it would in a real back-end.  If I switch back to the get request and run it again, I can see the data I just added with the post.

I could also use the HTTP verbs put and delete to update, and delete records by supplying an ID.

Let’s try an update.  I’ll make a new PUT request in postman.  I’ll be changing the first name of this user to something else.  To make this work, I need to add the ID of the record I want to change on the end of the url.  Next, I’ll add my json data payload, with my updated data in the JSON.  I’ll run the request, and I got back a good status code, meaning it worked.  To check, I’ll go back over to the get request and run the detail again.  I can see my change is reflected in the data.

Let’s round out our CRUD work with a delete.  I’ll make a new delete request in postman, and pass in the url with the detail on it.

Again, it gives me a successful status code.  If I switch back to that detail request, and I run it now, I’m going to get a 404 error stating the record can’t be found.

The neat thing here is, that generate script generates new data on every run.  So if I stop and re-run it, and then pull the list again, I’ll get different data allowing me to test with a broad spectrum of different data values.

## Actual Front End Code
So now we’ve got the fake back-end working.  How do we use it in our front-end project.  Let’s go back to Code.  You’d use the exact same method you’d normally use to query from the back-end.  There are a million ways to do this.  I’m going to use axios.

To keep this demo fairly short, I’m just going to make my request in axios.  Create react app has recently switched from generating ES6 class structures to pure functions.  Call me old fashioned, but I like classes better.  So let me convert this function into a class.

Next, I’ll add a constructor and initialize my state.

Now I need my data request with axios.  I’m going to use the onComponentMount life cycle event for this.  Yes, I know it will cause a double render, but I can live with that.

At the end of the axios request, I’ll add a promise which updates the state to the retrieved data.

Next I’ll display it in the render method using a map to generate markup for each element in the master list of records.

Here is my finished file. (pause at least 5 seconds)

Let’s run this project and view the results.  Make sure json-server is still running.  It is, so I’ll start my front-end with

Npm start

After a minute or so of transpiling, I’ll see the results.

## Conclusion
And there you have it.  A fully functional mock back-end.  If you want to add more records, just change the value in the loop in the generate js file and restart json-server.  We used react, but you could have used any framework or just vanilla javascript.  You no longer have to wait on the back-end team to get their endpoints working.  All you have to do is agree on the names of the routes and the structure of the data.

If you’d like the files I created, you can find them on GitHub.  The link is in the video description.

If you enjoyed this video, hit like and subscribe for even more coding and operational how-to videos.  And be sure to visit us online at http://www.maddevskilz.com or on twitter at @maddevskilz

----
This script is copyright 2020 by Bruce M. Van Horn II.

You can use the sample code, but not the audio script you're reading right now in this repo any way you see fit.

For more video tutorials, check out http://www.maddevskilz.com

LinkedIn:  www.linkedin.com/in/brucevanhorn2
Twitter: @maddevskilz

