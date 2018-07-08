# NodeJs API for PhotoExpresso

## Context

For the purpose of our school project we were asked to do a mobile app (iOS & Android). With this app you can send some pictures on your phone to a printer, he would print them and send them to you printed on some special pictures papers.
This app is suppose to handle some specific functionality, like :

- Sign up
- Sign ip
- Order
- Manage account
- etc...

We decided that we needed an API. I have chosen (e) to use ``Nodejs`` because of it fast implementation and READY-TO-USE framework.
No more talking, the code and how it works...

## Environment
### Requirements

These packages are required on the host:
```console
evens@evens:~/ sudo aptitude install mysql-server curl
evens@evens:~/ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
evens@evens:~/ sudo apt-get install -y build-essential
evens@evens:~/ sudo apt-get install -y nodejs
```

The following attributes to use your database should be in your home directory ``/home/$USER/.env``:
```
DB_HOST=<mysql_server>
DB_USER=<user_bdd>
DB_PASSWORD=<password_user>
DB=<bdd_name>
DB_PORT=<mysql_port>
```

### Start

```console
evens@evens:~/ npm install
```
  
### Files

Server configuration file : `server.js`
  
Package install : `package.json`

Available routes:

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
  
### Play

To see the result of every request that you are going to test, I strongly recommend to use a RESTClient, mine is a Google Chrome [extention](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)

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

These route need a token to work, to do so you have to copy/paste the returned token in the ``signin`` route in the header section of the RESTClient with the attribut ``Bearer`` + ``space`` before the token like.

`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjoyMiwiTUFJTCI6ImV2ZW5zQGxpdmUuZnIiLCJGSVJTVE5BTUUiOm51bGwsIkxBU1ROQU1FIjpudWxsLCJpYXQiOjE0ODEzOTcxMzMsImV4cCI6MTQ4MTQxMTUzM30.kduJALlwNi4PkOYc7jGBey9arNSfy_KF3l1KHnbeTfQ`
    
### Tests

You will have to make your request on this address ``http://server:3000/api/hello``. (where hello is the default route that return, ``Hello !``, meaning ? Your Node-js server works!).

Sign up :
```json
POST http://evens.link:3000/api/signup
BODY
{
"email":"eveede@3ii.fr",
"password":"evens",
"firstname":"evens",
"lastname":"solignac",
"addr_l1":"5 rue des huroit",
"addr_l2":"rien",
"complement":"no complement",
"postal_code":"92810",
"city":"groslay",
"id_paper":"1",
"id_masque":"1"
}
RESPONSE Registred
```

Sign in :
```json
POST http://evens.link:3000/api/signin
BODY
{
"email":"xxxxxxxx@xxxxxxx.fr",
"password":"xxxxx"
}
RESPONSE eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
```
Get you account information
```json
GET http://evens.link:3000/api/account
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
```

Create an order :
```json
POST http://evens.link:3000/api/orders
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
```

Get orders :
```json
GET http://evens.link:3000/api/orders
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
```json
POST http://evens.link:3000/api/support
HEADERS KEY Authorization VALUE Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJ4eHh4eHh4eHh4IiwiTEFTVE5BTUUiOiJkZGRkZGRkYyIsImlhdCI6MTQ4MTc5NzM1MiwiZXhwIjoxNDgxODExNzUyfQ.GR6LNRHbuaxSxB0c5fuOB0vREOfL-w3ozQw1OeFK5qc
BODY
{
"type":"Complaint !!!",
"content":"Complain"
}
RESPONSE Message sent !

Get messages sent to support :
```json
GET http://evens.link:3000/api/support
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
```json
GET http://evens.link:3000/api/paper
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
]
```

Get available masks :
```json
GET http://evens.link:3000/api/mask
RESPONSE
[
{
"ID_MASK": 1,
"STATUS": 0,
"RATIO": "x/y",
"FILE_MASK": "/var/log/masque/photobooth",
"NAME": "Pola"
},
]
```
Get shipping costs :
```json
GET http://evens.link:3000/api/shipping
RESPONSE
[
{
"ID_SETTINGS": 45,
"ID_TYPE": "SHIPPING_COST",
"VALUE": "3.49"
}
]
```

Get available promotion codes :
```json
GET http://evens.link:3000/api/promotion
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
]
```

Delete your account :
```json
PUT http://evens.link:3000/api/delete
HEADERS KEY AUTHORIZATION VALUE BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9VU0VSIjo0NCwiTUFJTCI6Inh4eHh4eHh4QHh4eHh4eHguZnIiLCJGSVJTVE5BTUUiOiJPZGV0dGUiLCJMQVNUTkFNRSI6IkNoYXJib25uZWF1IiwiaWF0IjoxNDgyMzE5NzAxLCJleHAiOjE0ODIzMzQxMDF9.ao5ElYdtu0aGKc60C14TLtRRKd4M3VstUTySHW_ztz0
RESPONSE
Compte supprimé !
```
Now you know how it works!. For each route that need a authentication you have to use the token in the HEADERS section and for those who don't need it, don't use it.
