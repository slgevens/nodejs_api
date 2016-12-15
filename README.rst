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
Starting node=js : ::

   cd /home/$USER/new_node_project
   npm start


Play
======

To see the result of every request that you are going to test, I strongly recommend to use a RESTClient, mine is a Google Chrome extention_. 
.. _extention: https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

After launching your RESTClient you can try the following ``route`` without being authenticate :

- ``inscription`` (to sign up)
- ``papier`` (to see available paper)
- ``masque`` (to see available masqs)
- ``promo`` (to see available discounts)
- ``frais`` (to see shipping prices by country)
- ``connexion`` (to sign in) - you previously need to create a account on ``inscription`` 
- ``suppression`` (to delete your account) - you previously need to create a account on ``inscription`` 
- ``oublie`` (in case you have forgoten your password) - you previously need to create a account on ``inscription``.
