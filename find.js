var mongo = require('mongodb').MongoClient;
mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
    //console.log('learnyoumongo is connected !');
    var callback = function() {
        db.close();
        // console.log('db is closed');
    }

    // insertDocument(db, callback)
    findAllDocuments(db, callback);
});

var insertDocument = function(db, callback) {

    db.collection('parrots').insertOne({
        "name": "murugeswari",
        "age": 27
    }, function(err, result) {
        console.log('successfully inserted the document ' + result);
        //  callback();
    });
}


var findAllDocuments = function(db, callback) {
    var docs = [];
    var cursor = db.collection('parrots').find({
        "age": {
            $gt: parseInt(process.argv[2])
        }
    });

    cursor.each(function(err, doc) {

        if (doc !== null) {
            docs.push(doc);

        } else {
            console.log(docs);
            callback();
        }

    });

}
