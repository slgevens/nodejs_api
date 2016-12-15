NodeJs API for PhotoExpresso
###############################
.. sectnum::
   
Context
=========

For the purpose of our school project we were asked to do a mobile app (iOS & Android). With this app you can send some pictures on your phone to a printer, he would print them and send them to you printed on some special pictures papers.
This app is suppose to handle some specific functionality, like :

- Sign up
- Sign ip
- Order
- Manage account
- etc...

We decided that we needed an API. I have chosen (e) to use ``Nodejs`` because of it fast implementation and readytouse framework.
No more talking, the code and how it works...

Environment
=============

Requirements
-------------

This package is required :

- mysql-server

The following attributes to use your database should be in your home directory ``/home/$USER/.env``:
::

   DB_HOST=localhost
   DB_USER=user_bdd
   DB_PASSWORD=xxxxxxx
   DB=bdd_name
   DB_PORT=3306
   

Installation
-------------

Install of node-js and clone of the current repoitory : ::

   curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
   sudo apt-get install -y build-essential
   sudo apt-get install -y nodejs

   mkdir -p /home/$USER/new_node_project
   cd /home/$USER/new_node_project
   git clone https://github.com/slgevens/node-js_api.git
   npm install

Start
----------

Starting node-js : ::

   cd /home/$USER/new_node_project
   npm start

Files
======

Server configuration file :

- /node-js_api/server.js
  
Package install :

- /node-js_api/package.json

Node modules :

- /node-js_api/node_modules/

Route files :

- /node-js_api/app/routes/commandesRoute.js
- /node-js_api/app/routes/connexionRoute.js
- /node-js_api/app/routes/masqueRoute.js
- /node-js_api/app/routes/papierRoute.js
- /node-js_api/app/routes/supportRoute.js
- /node-js_api/app/routes/compteRoute.js
- /node-js_api/app/routes/fraisRoute.js
- /node-js_api/app/routes/inscriptionRoute.js
- /node-js_api/app/routes/oublieRoute.js
- /node-js_api/app/routes/promoRoute.js
- /node-js_api/app/routes/suppressionRoute.js
   
Play
======

To see the result of every request that you are going to test, I strongly recommend to use a RESTClient, mine is a Google Chrome extention_

.. _extention: https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

After launching your RESTClient you can try the following ``route`` without being authenticate :

- ``inscription`` (to sign up)
- ``papier`` (to see available paper)
- ``masque`` (to see available masqs)
- ``promo`` (to see available discounts)
- ``frais`` (to see shipping prices by country)
- ``connexion`` (to sign in) - you previously need to create a account on ``inscription`` 
- ``oublie`` (in case you have forgoten your password) - you previously need to create a account on ``inscription``.

Here are the route that you need to be authenticate to use : 

- ``suppression`` (to delete your account)
- ``commandesRoute`` (to create an order)
- ``supportRoute`` (to contact support)
- ``compteRoute`` (to see your account information)
- ``suppressionRoute`` (to delete your account)

  These route need a token to work, to do so you have to copy/paste the returned token in the header section of the RESTClient with the attribut ``Bearer`` + ``space`` before the token like. ::

    ``Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjoyMiwiTUFJTCI6ImV2ZW5zQGxpdmUuZnIiLCJGSVJTVE5BTUUiOm51bGwsIkxBU1ROQU1FIjpudWxsLCJpYXQiOjE0ODEzOTcxMzMsImV4cCI6MTQ4MTQxMTUzM30.kduJALlwNi4PkOYc7jGBey9arNSfy_KF3l1KHnbeTfQ``
    
Tests
-------
.. role:: strike
	  :class: strike
		  
Let's suppose that you Node-js API is on the following server : ``evens.link``. You will have to make your request on this address ``https://evens.link:3443/api/hello``. (where hello is the default route that return, ``Hello !``, meaning ? Your Node-js server :strike:`rocks` works!).

Sign up :
::

   POST https://evens.link:3443/api/inscription
   BODY
   {
   "email":"xxxxxxx@xxxxxxxx",
   "password":"xxxxxx",
   "firstname":"yyyyyy",
   "lastname":"ttttttt",
   "addr_l1":"33 xxxxxxyyyyy",
   "addr_l2":"ddddddd",
   "complement":"ccccccccccc",
   "postal_code":"99999",
   "city":"xxxxxxx",
   "id_paper":"paper_01",
   "id_masque":"masque_01"
   }
   RESPONSE Registred

Sign in :
::

   POST https://evens.link:3443/api/connexion
   BODY
   {
   "email":"xxxxxxx@xxxxxxxx",
   "password":"xxxxxx"
   }
   RESPONSE eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc

Create an order :
::

   POST https://evens.link:3443/api/commandes
   HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
   BODY
   {
   "nbr_photo":"23",
   "price":"99",
   "content":"3 photo",
   "id_masque":"masque_41",
   "id_paper":"paper_41",
   "firstname":"ggggg",
   "lastname":"eeeeeeeC",
   "addr_l1":"rrrrrrrrrrrrrr",
   "addr_l2":"eeeeeeeeeee",
   "postal_code":"99999",
   "city":"xxxxxxxxx",
   "code_promo":"welcomepp"
   }
   RESPONSE Order created !
      
Get command :
::

   GET https://evens.link:3443/api/commandes
   HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
   RESPONSE
   [
    {
     "ID_COMMAND": 35,
     "ID_USER": 44,
     "DATE_COMMAND": "2016-12-15T10:25:39.000Z",
     "NOMBRE_PHOTO": 23,
     "PRICE": 99,
     "CONTENT": "3 photo",
     "STATUS": 0,
     "COMMAND_FILES": null,
     "ID_MASQUE": 0,
     "ID_PAPER": 0,
     "CODE_PROMO": "welcomepp",
     "FIRSTNAME": "ggggg",
     "LASTNAME": "eeeeeeeC",
     "ADDR_L1": "rrrrrrrrrrrrrr",
     "ADDR_L2": null,
     "POSTAL_CODE": 99999,
     "CITY": "xxxxxxxxx",
     "COMPLEMENT": null
    }
   ]
   
Contact support :
::

   POST https://evens.link:3443/api/support
   HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
   BODY
   {
   "type":"Complaint !!!",
   "content":"Complain"
   }
   RESPONSE Message sent !

Get last send message send to support :
::

   GET https://evens.link:3443/api/support
   HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
   RESPONSE
   [
    {
     "ID_DEMANDE": 6,
     "ID_USER": 44,
     "TYPE": "Complaint !!!",
     "STATUS": "Ouvert",
     "CONTENT": "Complain",
     "RESPONSE": null
    }
   ]

Now you know how it :strike:`rocks` works!. For each route that need a authentication you have to use the token in the HEADERS section and for those who don't need it, don't use it.
