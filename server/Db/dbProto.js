const mongod = require('mongodb'); 
const mongo = mongod.MongoClient;

function dbConn(collectionName)  {
    this.URL = "mongodb://localhost:27017/lamed";
    this.collection = collectionName;
}

dbConn.prototype.addNewObject = function(objectToAdd, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).insertOne(objectToAdd, function(err,res) {
            if (err) throw err;
            callback(res.ops[0]);
            db.close();
        });
    });
}

dbConn.prototype.getAll= function(callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).find({}).toArray((err, result) => {
            if (err) {
                throw err;
            }

            callback(result);
            db.close();
        });
    });
}

dbConn.prototype.removeObject = function(objId, callback) {
    mongo.connect(this.URL, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(this.collection).remove({_id: new mongod.ObjectID(objId)}, function(err,res) {
            if (err) throw err;
            callback(objId);
            db.close();
        });
    });
}

module.exports = dbConn;