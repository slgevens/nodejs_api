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

- mysql-server ::

    aptitude install mysql-server 

- curl
- node-js


The following attributes to use your database should be in your home directory ``/home/$USER/.env``:
::

   DB_HOST=<mysql_server>
   DB_USER=<user_bdd>
   DB_PASSWORD=<password_user>
   DB=<bdd_name>
   DB_PORT=<mysql_port>
   
Installation
-------------

Install of node-js and clone of the current repoitory : ::

   curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
   sudo apt-get install -y build-essential
   sudo apt-get install -y nodejs

   mkdir -p /home/$USER/new_node_project/node-js_api
   cd /home/$USER/new_node_project/node-js_api
   git clone https://github.com/slgevens/node-js_api.git
   npm install

Do not forget to import you SQL dump !

Start
----------

Starting node-js : ::

   cd /home/$USER/new_node_project/node-js_api
   npm start

If the install is correct, you should see something similar to this : ::

  > evens_api@1.0.0 start /home/evens/new_node_project/node-js_api
  > node server.js

  <-- HandshakeInitializationPacket
  HandshakeInitializationPacket {
      protocolVersion: 10,
      serverVersion: '5.5.53-0+deb8u1',
      threadId: 94,
      scrambleBuff1: <Buffer 75 35 48 49 75 35 45 3c>,
      filler1: <Buffer 00>,
      serverCapabilities1: 63487,
      serverLanguage: 8,
      serverStatus: 2,
      serverCapabilities2: 32783,
      scrambleLength: 21,
      filler2: <Buffer 00 00 00 00 00 00 00 00 00 00>,
      scrambleBuff2: <Buffer 3e 5f 47 24 79 58 2e 78 36 40 7e 7e>,
      filler3: <Buffer 00>,
      pluginData: 'mysql_native_password',
      protocol41: true }
      
  --> ClientAuthenticationPacket
      ClientAuthenticationPacket {
      clientFlags: 455631,
      maxPacketSize: 0,
      charsetNumber: 33,
      filler: undefined,
      user: 'root',
      scrambleBuff: <Buffer e3 e8 2c 85 b2 56 c8 a7 10 a5 ad 06 48 90 2c cb 9e 85 3a e1>,
      database: 'photo_expresso_v1',
      protocol41: true }

  <-- OkPacket
  OkPacket {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
  
  
Files
======

Server configuration file :

- /node-js_api/server.js
  
Package install :

- /node-js_api/package.json

Node modules :

- /node-js_api/node_modules/

Route files :

- /node-js_api/app/routes/accountRoute
- /node-js_api/app/routes/deleteRoute
- /node-js_api/app/routes/forgetRoute
- /node-js_api/app/routes/maskRoute
- /node-js_api/app/routes/ordersRoute
- /node-js_api/app/routes/paperRoute
- /node-js_api/app/routes/promoRoute
- /node-js_api/app/routes/shippingRoute
- /node-js_api/app/routes/signinRoute
- /node-js_api/app/routes/signupRoute
- /node-js_api/app/routes/supportRoute
  
Play
======

To see the result of every request that you are going to test, I strongly recommend to use a RESTClient, mine is a Google Chrome extention_

.. _extention: https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

After launching your RESTClient you can try the following ``route`` without being authenticate :

- ``signup`` (to sign up)
- ``paper`` (to see available paper)
- ``mask`` (to see available masqs)
- ``promo`` (to see available discounts)
- ``shipping`` (to see shipping prices by country)
- ``signin`` (to sign in) - you previously need to create a account on ``inscription`` 
- ``forget`` (in case you have forgoten your password) - you previously need to create a account on ``inscription``.

Here are the route that you need to be authenticate to use : 

- ``delete`` (to delete your account)
- ``orders`` (to create an order)
- ``support`` (to contact support)
- ``account`` (to see your account information)

  These route need a token to work, to do so you have to copy/paste the returned token in the ``signin`` route in the header section of the RESTClient with the attribut ``Bearer`` + ``space`` before the token like. ::

    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjoyMiwiTUFJTCI6ImV2ZW5zQGxpdmUuZnIiLCJGSVJTVE5BTUUiOm51bGwsIkxBU1ROQU1FIjpudWxsLCJpYXQiOjE0ODEzOTcxMzMsImV4cCI6MTQ4MTQxMTUzM30.kduJALlwNi4PkOYc7jGBey9arNSfy_KF3l1KHnbeTfQ
    
Tests
-------

Let's suppose that you Node-js API is on the following server : ``evens.link``.

You will have to make your request on this address ``https://evens.link:3443/api/hello``. (where hello is the default route that return, ``Hello !``, meaning ? Your Node-js server works!).

Sign up :
::

   POST https://evens.link:3443/api/signup
   BODY
   {
   "email":"eveede@3ii.fr",
   "password":"evens",
   "firstname":"evens",
   "lastname":"solignac",
   "addr_l1":"5 bis rue des glisiiers",
   "addr_l2":"rien",
   "complement":"no complement",
   "postal_code":"95410",
   "city":"groslay",
   "id_paper":"1",
   "id_masque":"1"
   }
   RESPONSE Registred

Sign in :
::

   POST https://evens.link:3443/api/signin
   BODY
   {
   "email":"xxxxxxxx@xxxxxxx.fr",
   "password":"xxxxx"
   }
   RESPONSE eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc

Get you account information:
::

   GET https://evens.link:3443/api/account
   HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
   RESPONSE
   [  
   {
   "ID_USER": 47,
   "MAIL": "evee@3ii.fr",
   "IS_ARCHIVED": 0,
   "FIRSTNAME": "evens",
   "LASTNAME": "solignac",
   "ADDR_L1": "5 bis rue des glisiiers",
   "ADDR_L2": "rien",
   "POSTAL_CODE": 95410,
   "CITY": "groslay",
   "COMPLEMENT": "no complement",
   "ID_PAPER": 1,
   "ID_MASK": 1
   }
   ]
   
Create an order :
::

   POST https://evens.link:3443/api/orders
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
      
Get orders :
::

   GET https://evens.link:3443/api/orders
   HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
   RESPONSE
	[
	  {
	    "ID_ORDER": 44,
	    "ID_USER": 47,
	    "DATE_ORDER": "2016-12-22T11:25:52.000Z",
	    "NUMBER_PHOTO": 23,
	    "PRICE": 99,
	    "STATUS": 0,
	    "FIRSTNAME": "ggggg",
	    "LASTNAME": "eeeeeeeC",
	    "ADDR_L1": "rrrrrrrrrrrrrr",
	    "ADDR_L2": null,
	    "POSTAL_CODE": 99999,
	    "CITY": "xxxxxxxxx",
	    "COMPLEMENT": "nothing",
	    "FILE": "/var/www/photo1.png",
	    "ID_PAPER": 0,
	    "ID_MASK": 0,
	    "NUMBER_ITEMS": 23
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

Get messages sent to support :
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

Get available papers:
::

   GET https://evens.link:3443/api/paper
   RESPONSE
   [
   {
    "ID_PAPER": 1,
    "WIDTH": 9,
    "HEIGHT": 13,
    "STATUS": 0,
    "RATIO": "1.44",
    "PRICE": 0.45
   },
   {
    "ID_PAPER": 2,
    "WIDTH": 10,
    "HEIGHT": 13,
    "STATUS": 0,
    "RATIO": "1.3",
    "PRICE": 0.15
   },
   {
    "ID_PAPER": 3,
    "WIDTH": 10,
    "HEIGHT": 15,
    "STATUS": 0,
    "RATIO": "1.5",
    "PRICE": 0.19
   },
    ...
   ]

Get available masks :
::

   GET https://evens.link:3443/api/mask
   RESPONSE
   [
   {
    "ID_MASK": 1,
    "STATUS": 0,
    "RATIO": "x/y",
    "FILE_MASK": "/var/log/masque/photobooth",
    "NAME": "Pola"
   },
   {
    "ID_MASK": 2,
    "STATUS": 0,
    "RATIO": "2/8",
    "FILE_MASK": "/var/log/masque/cine",
    "NAME": "Cinema"
   },
   {
    "ID_MASK": 7,
    "STATUS": 0,
    "RATIO": "1.36",
    "FILE_MASK": "",
    "NAME": "Super fete"
   },
   ...
   ]

Get shipping costs :
::

   GET https://evens.link:3443/api/shipping
   RESPONSE
   [
   {
    "ID_SETTINGS": 45,
    "ID_TYPE": "SHIPPING_COST",
    "VALUE": "3.49"
   }
   ]

Get available promotion codes :
::

   GET https://evens.link:3443/api/promotion
   RESPONSE
   [
   {
    "ID_CODE_PROMO": 1,
    "STATUS": 0,
    "TYPE": "%",
    "VALUE": 10,
    "DATE_CODE_PROMO": "2016-12-19T16:57:11.000Z",
    "CONDITION": "2",
    "CUMUL": 0
   },
   {
    "ID_CODE_PROMO": 2,
    "STATUS": 0,
    "TYPE": "euro",
    "VALUE": 2,
    "DATE_CODE_PROMO": "2016-12-19T16:38:46.000Z",
    "CONDITION": "0",
    "CUMUL": 1
   },
   ...
   ]

Delete your account :
::

   PUT https://evens.link:3443/api/delete
   HEADERS KEY AUTHORIZATION VALUE BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJPZGV0dGUiLCJMQVNUTkFNRSI6IkNoYXJib25uZWF1IiwiaWF0IjoxNDgyMzE5NzAxLCJleHAiOjE0ODIzMzQxMDF9.ao5ElYdtu0aGKc60C14TLtRRKd4M3VstUTySHW_ztz0
   RESPONSE
   Compte supprimé !
   
Now you know how it works!. For each route that need a authentication you have to use the token in the HEADERS section and for those who don't need it, don't use it.
