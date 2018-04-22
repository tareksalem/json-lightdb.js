/*
* **********************************************************
* file for storing and editing the data
* */

// Dependencies

const fs = require("fs");
const path = require("path");
//container lib module to export it


const db = {};

//determine the directory of the data folder

db.baseDir = path.join(__dirname, "/../.data/");
fs.readdir(db.baseDir, function (err, dir) {
    if (!dir) {
        fs.mkdirSync(db.baseDir)
    }
})

// function write a data to .data folder
db.createDocument = function (dir, fileName, data, cb) {
    if (Array.isArray(data)) {
        data.forEach(function (index, i) {
            index._id = '_' + Math.random().toString(36).substr(2, 9);
        });
    }
    if (typeof data === "object") {
        data._id = '_' + Math.random().toString(36).substr(2, 9);
    }

    //    function to create a db file
    function createFile(file) {
        var stringDataObj = JSON.stringify(data);
        if (file) {
            // convert data to strong
            fs.writeFile(file, stringDataObj, function (err) {
                if (err) {
                    return cb("could not create new file", false)
                } else {
                    fs.close(file, function (err) {
                        if (err) {
                            return cb("could not create new file", false)
                        } else {
                            cb(false, stringDataObj);
                        }
                    })
                }
            });
        } else {
            fs.writeFile(`${db.baseDir}${dir}/${fileName}.json`, stringDataObj, function (err) {
                if (err) {
                    return cb("could not create new file", false)
                } else {
                    return cb(false, stringDataObj)
                }
            });
        }
    }

    //open the data file
    fs.open(`${db.baseDir}${dir}/${fileName}.json`, "wx", function (err, file) {
        if (err) {
            fs.readdir(db.baseDir + dir, function (err, dire) {
                if (!dire) {
                    fs.mkdirSync(db.baseDir + dir);

                    createFile(file)
                } else {
                    return null;
                }
            })
        }
        if (file) {
            createFile(file);
        }
    });



};


// read a data from db
db.readDocument = function (dir, file, callback) {
    fs.readFile(`${db.baseDir}${dir}/${file}.json`, "utf8", function (err, data) {
        return callback(err, data);
    });
};

// update data of db
db.updateDocument = function (dir, file, callback) {
    var file = `${db.baseDir}${dir}/${file}.json`;
    var fileData = require(file);

    callback(!fileData ? "no file or data with this path" : false, fileData)
    fs.writeFile(file, JSON.stringify(fileData), function (err) {
        if (err) {
            callback("could not modify the data", fileData);
        }
    })
}

//******************************************


//******************************************

// method to delete a document of database
db.deleteDocument = function (dir, file, callback) {
    fs.unlink(`${db.baseDir}${dir}/${file}.json`, callback)
};
//end delete method
//******************************************


// method to find a specific index inside the document
//******************************************

db.findIndex = function (dir, file, get, callback) {
    fs.readFile(`${db.baseDir}${dir}/${file}.json`, function (err, data) {
        if (err) {
            return callback(new Error("could not grap the data"), false);
        } else {
            data = JSON.parse(data);
            var indexesArr = [];
            var error = false;
            var exist = false;
            data.forEach(function (index, i) {
                if (get.way === "index") {
                    if (get.index === i) {
                        return callback(false, index);
                    }
                } else if (get.way === "prop") {
                    var props = get.props;
                    Object.keys(props).forEach(function (prop) {
                        if (props[prop] === index[prop]) {
                            exist = true
                            if (indexesArr.indexOf(index) === -1) {
                                indexesArr.push(index);
                            }

                        }
                        if (props[prop] !== index[prop] && indexesArr.indexOf(index) !== -1) {
                            if (exist === true) {
                                var indexNumber = indexesArr.indexOf(index);
                                indexesArr.splice(indexNumber, 1);
                            } else {
                                error = true;
                            }
                        }
                    });
                } else {
                    indexesArr.push(index)
                }
            });
            if (get.arrange) {
                if (get.arrange === "new") {
                    indexesArr.reverse();
                } else if (get.arrange === "random") {
                    var randomArr = [];
                    var limit = get.limit ? get.limit : indexesArr.length;
                    for (var i = 0; i < limit; i++) {
                        var rand = indexesArr[Math.floor(Math.random() * indexesArr.length)]
                        if (randomArr.indexOf(rand) === -1) {
                            randomArr.push(rand);
                        }

                    }
                    return callback(false, randomArr)
                }
            } else if (error) {
                return callback(new Error("no data"), false);
            }
            else if (get.limit) {
                if (indexesArr.length >= get.limit) {
                    indexesArr.length = get.limit;
                } else {
                    get.limit = indexesArr.length;
                }
                return callback(false, indexesArr)
            } else {
                if (indexesArr.length > 1) {
                    return callback(false, indexesArr);
                } else if (indexesArr.length === 1) {
                    return callback(false, indexesArr[0]);
                }
            }
        }
    });
}

//end find method
//******************************************

//end container db module to export it



//export the db module

module.exports = db;