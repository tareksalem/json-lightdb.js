# json-lightdb.js
this is a light weight database based on json format, for small projects and who want to include a small and local database in his project to make it more faster

## install it with npm from [here](https://www.npmjs.com/package/json-ligjtdb.js)

## How it actually works ?
<p>
  this db works with a concept of no sql database which means that you use something like mongodb or firebase, and this smalldb works with creating a documents and inside this document is a json file contains indexes included inside an array and every index has a primary id.
</p>

### what can you make with this library ?

<p>
  you can make crud with this library, so you can add a new document and you can update the document and insert to it, <br> you can read the data, update the document or the index, delete the document, delete an index from the document.
</p>


## Installation ?

1. open your cmd and run this command from your project folder and write : 

```BASH
npm install json-lightdb --save

```

<p>After that you can now use this light weight database in your project.</p>

## How to use it ?

**require it to your main file of project**
```javascript

const jsonDB = require("json-lightdb");
```
** the library automatically will create a new directory in your project if you didn't create it and will call it as ".data" and this folder will contains the json files of data**
___


### to create a new document use this function 
```javascript

jsonDB.createDocument(direction, folderName, data, callback);
```
1. the first parameter is the directory of document, and the library goes automatically to .data folder and the directory which you write will be created inside the .data folder.

2. the second param is the name of document or json file which you want to create 

3. the third param (optional param) and this param you write the data which you want to put inside the document and it should be n array and inside this array the objects which you want.

4. the fourth param is a callback function returns with the results of creating document with 2 params the first one is the error to check errors and the second is the data if the proccess run successfully.

