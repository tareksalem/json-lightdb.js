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

___

### to read the document

```javascript
jsonDB.readDocument(dir, file, callback);

```

1. **dir**: is the directory which contains the document
2. **file**: is the name of directory
3. **callback**: is a callback function returns with two params the first one is err to check the errors and the second one is the data of the document  if there are no errors.

### to update the document
**with this function you can update the document with inserting a new index or update and edit a current index**
```javascript
jsonDB.updateDocument(dir, file, callback);
```
1. **dir**: is the directory which contains the document
2. **file**: is the name of directory
3. **callback**: is a function has two params the first one is error to check if there are errors while updating the document and the second one is a data which exist on the file included inside array and to update a specific index you can chose the index or make a loop to indexes and choose the index, and the data will be edited automatically, and also you can insert a new index to the document with push function like this:

```javascript
/* to push a new index to document*/
jsonDB.updateDocument(dir, file, function (err, data) {
  data.push({username: "jsondb", "type": "database"});
});
/* end */
/* to update a current index */
  jsonDB.updateDocument(dir, file, function (err, data) {
    // to edit the first index of data array
    data[0].type = "db";
  })
/* end */
```
## to find a specific index and execute it from the document:

#### We allow to you a good feature to access on a specific index inside the document with function contains some methods like find indexes with id or find indexes with property of index and also you can specify the limit of indexes which you want to execute and the arrangement of indexes from new to old and visa versa.

```javascript
jsonDB.findIndex(dir, file, get, callback);
```
**dir**: is the direction of container folder of document
**file**: is the document name
**get**: is an object contains many properties and the get object contains these methods :

**get.way**: with this method you specify the way of calling the data and you can write one property of the following: 
  1. ```javascript
        get.way= "index"
      ```
      it means that you want to call a specific index with his number so for example if you want to call the index number four of document so you write :
      ```javascript
        get.way = "index";
        get.index = 3
      ```
  2. ```javascript
        get.way = "prop"
     ```
     this method you call it when you want to execute index based on its properties.
    for example if you want to extract index contains a property called username = "john", so you can write something like this
    ```javascript
      get.way = "prop"
      get.props = {
        username: "john"
      }
    ```
     and automatically the library will execute all indexes which contain this username, and you can specify multiple properties to search in indexes.

3. if you want to execute all indexes without search you may not need to specify the way method
  
4. if you want to execute the indexes from new to old you write the arrange method like this
    ```javascript
      get.arrange = "new";
    ```
    and the library will execute the data of document from new to old.
 5. the data normally executes from old to new
 6. if you want to execute a random data so you can define the arrange method to "random" like this:
    ```javascript
      get.arrange = "random";
    ```
    and the program will execute a random indexes
    
 7. for all above cases you can specify the limit method to extract a given number of data like this
    ```javascript
      // execute 6 indexes for example
      get.limit = 6;
    ```
### to delete a whole document
you can delete a whole document with this function

```javascript
  jsonDB.deleteDocument(dir, file, callback);
```
**dir**: the name if container folder of document
**file**: the document name whic you wanna delete
**callback**: is a callback function returns with error if there is error while deleting the document and in this function we use the native code of node.js to delete a file with fs.unlink() function.

### to remove a specific index from the document
```javascript
  jsonDB.removeIndex(dir, file, index, callback);
```
**dir**: the name if container folder of document <br>
**file**: the document name whic you wanna delete <br>
**index**:you can specify in this parameters one of the following :

1. you can specify the number of indiex inside the data array for example remove the index number one so you define the index to 0

2. specify a whole objec so the index could be defined as an onject like that {username: "john doe"} and the similar object which exists inside the array only will be deleted.

3. define the id of the index which you want to delete.

**callback**: is a callback function returns with two params: <br>
  error: to check if there is error while removing the index <br>
  success: this param returns with removed message to make sure that the index removed successfully



## Example

```javascript
  const jsonDB = require("json-lightdb");
  
  // create a new document called users in the directory called test
  
  jsonDB.createDocument("test", "users", function (err, data) {
    if (err) {
      console.log(err)
    }
    if (data) {
      // if you didnt passed an array of data to the function the data param returns with an empty array
      console.log(data)
    }
  });
  
  // to update a document with inserting a new index
  jsonDB.updateDocument("test", "users", function (err, data) {
    // check if there are error while uploading the data
    if (err) {
      console.log(err)
    }
    if (data) {
      // returns with array of data indexes
      
      // to push a new index to data array
      var newUser = {
        username: "john doe",
        email: "johnDoe@gmail.com",
        "password": "johnDoe2",
        country: "USA"
      }
      data.push(newUser);
    }
  });
  
  // to update a current index 
  jsonDB.updateDocument("test", "users", function (err, data) {
     // choose the index
    data[0].username = "tarek salem";
    // data saved automatically
  });
  
  // to read a document
  jsonDB.readDocument("test", "users", function (err, data) {
    // check errors
    if (err) {
      console.log(err)
    }
    if (data) {
    
      console.log(data)
    
    // will output an array of data
    }
  })
  
  // to find a specific indexes 
  
  // define an object with methods of execution
  var get = {
  
  // define the way of getting the indexes
  
  way: "prop",
  
  // define the properties of users to search in
  
  props: {
      username: "john",
      email: "johnDoe@gmail.com"
    }
  
  // get 10 indexes of users
  
  limit: 10
  }
  jsonDB.findIndex("test", "users", get, function (err, data) {
    
        // check errors
    if (err) {
      console.log(err)
    }
    if (data) {
    
      console.log(data)
    
    // will output an array of data
    }

  })
  
  // to remove  the whole document
  jsonDB.deleteDocument("test", "users", function (err) {
      // check the error while removing the document
      if (err) {
        console.log(err)
      }
  });
  
  // remove a specific index 
    // we will delete the user based on its index in the array so we will delete the user number one
    
  jsonDB.removeIndex("test", "users", 0, function (err) {
       // check the error while removing the index
      if (err) {
        console.log(err)
      }
  });
  
  // remove the user based on its id, so for example we have the following user
  var user = {username:"john",_id:"_zjlx8trim3c",_index:0};
  jsonDB.removeIndex("test", "users", user._id, function (err) {
       // check the error while removing the index
      if (err) {
        console.log(err)
      }
  });  
  
    // remove the user based on the whole index, so for example we have the following user
  var user = {username:"john",_id:"_zjlx8trim3c",_index:0};
  jsonDB.removeIndex("test", "users", user, function (err) {
       // check the error while removing the index
      if (err) {
        console.log(err)
      }
  });  

```
