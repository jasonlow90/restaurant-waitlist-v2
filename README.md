# Restaurant Waitlist App - Backend Repository

### Home Page
---
![Alt text](screengrabs/01_home.png?raw=true "Home Page")

### Public queue view
---
![Alt text](screengrabs/02_public.png?raw=true "Public queue view")

### Registration
---
![Alt text](screengrabs/03_reg.png?raw=true "Registration")

### Restaurant admin
---
![Alt text](screengrabs/04_admin.png?raw=true "Restaurant admin")
---

## Explanations of the Technologies Used

- NodeJS - [an open-source, cross-platform runtime environment for developing server-side Web applications.] (<https://en.wikipedia.org/wiki/Node.js>)
- ExpressJS - [a minimal and flexible Node.js web application framework](http://expressjs.com/) that provides a robust set of features for web and mobile applications.
- jQuery - [a fast, small, and feature-rich JavaScript library.](https://jquery.com/) It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
- momentJS - [Parse, validate, manipulate, and display dates](http://momentjs.com/) in JavaScript.
- MongoDB - [A free and open-source cross-platform document-oriented database.](https://www.mongodb.com/) Classified as a NoSQL database, MongoDB avoids the traditional table-based relational database structure in favor of JSON-like documents with dynamic schemas (MongoDB calls the format BSON), making the integration of data in certain types of applications easier and faster.]
- Mongoose - A [straight-forward, schema-based solution](http://mongoosejs.com/) to model application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Installation Instructions

There are two repositories:

- This one - a backend app serves up an API
- A front end jQuery/AJAX app that consumes the API

### How to install

1. Install node: <https://nodejs.org/en/download/>
2. Install Node Package Manager:
3. git clone both repositories:

  - Backend: <https://github.com/jasonlow90/restaurant-waitlist-v2.git>
  - Frontend: <https://github.com/peterdaniel-fewd/restaurant-waitlist-frontend>

4. Inside the backend app, run command `npm install` to download the most appropriate node_modules for your system.

5. Run a server on port 3000 for the backend. Then you may simply visit `home.html` to get started.

## General approach

-

## Unsolved Problems

- VIP - allowing a customer to have additional functionality - ie:

  - being able to delete themselves from the list
  - being able to update there ETA

- Incorporate the ability to send a text url to users phones private monitoring:

  - When the Restaurant adds a customer to the queue - a text message will be sent to the user with a url (using their mobile phone number as the authentication) - the customer will then be able to monitor their progress in the queue as a highlighted item.
  - If the user is a VIP then this view would allow them to access their added functionality

- We wanted to implement a global add ETA to all customers, in the event of a delay happening in the kitchen etc.

# Known Bugs

- Cannot log in from anywhere other than the home page
- When editing any customer on a list, the ETA of the final person in the list is the value that is always passed into the 'edit' form.
- Phone numbers can't have spaces for frontend CRUD. Can be fixed with a pre.save in the model that replaces spaces with dashes '-'
-

# Improvements

- Make it a single page app
- Use a frontend Framework
- Improved slug names (`index.html`, `admin.html`, `restaruant-name/waitinglist.html` etc.)
- Sitemap
- Restaurant name to allow for more than 1 space
- CSS styling for when more than 9 people are in a booking

--------------------------------------------------------------------------------

# User Stories

2 Types of users

- Restaurant Owners/Waiter - person taking table bookings
- Customers looking to visit a Restaurant

## Restaurant Owner/Waiter - No app

- Once upon a time there was a Restaurant Owner / Waiter.
- Every day, people turned up to their restaurant for brunch. It was really busy on weekends especially, so much so that people would often need to queue outside to get a table. Customers would give their names to the waiting staff upon arrival. The waiting staff would add the customers name to a paper list on a clipboard. The customer would stand around outside the restaurant until called in to be seated. They would be given a rough estimate of how long it would take to be seated.
- One day the restaurant owner decided that an app would be a more appropriate way to track their customers waiting. The customers would give the restaurant staff their name, number and party size. The restaurant owner would give the customer a rough estimate of how long it would take to be seated. The customer would be given a link so that they could see the waiting list on their phone. If they entered in their phone number, the list would highlight their position in the queue. As a customer became seated, the restaurant owner would tick them off the list, and the waiting list would shrink.
- Because of that, customers would enjoy the ability to 'remain' in the queue but not have to wait around the restaurant until they are called.
- Because of that, customers were very happy to visit the restaurant, because (a) they have a guaranteed place in the queue and (b) they can wander off for say 20-30mins to do some shopping without having to wait around in the rain/heat.
- Finally the restaurant owner is able to see all customers waiting and give more accurate ETA's for seating each customer.

--------------------------------------------------------------------------------

## Customer - No app

- Once upon a time there was a Customer.
- Every weekend, the customer went out for brunch.
- One day, the customer tried to go to their favourite cafe but had to wait a long time in the rain before they could be seated. The popular cafe had a 'no-phone-bookings' policy and only took bookings on the spot when people turned up. The customer was asked to wait 30minutes to be seated. The customer had to wait around outside the cafe in the rain for fear of losing their place in the queue.
- Because of that, the customer decided to go elsewhere for brunch.
- Finally, the restaurant lost some business.

## Customer - With app

- Once upon a time there was a Customer.
- Every weekend, the customer went out for brunch.
- One day, the customer went to their favourite cafe. The popular cafe had a 'no-phone-bookings' policy, but had a useful app that took bookings on the spot. The customer was asked to wait 30minutes to be seated. The customer was given a personalised link to the restaurant waiting list, showing their position in relation to the rest of the people waiting.
- Because of that, the customer was able to go off for 30minutes to do their shopping, out of the rain. They regularly checked in on their waiting list and made a move to return to the cafe with 5 minutes to go.
- Finally, the customer was seated on time and the restaurant maintained a happy customer experience.
