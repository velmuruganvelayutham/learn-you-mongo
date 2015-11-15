var mongo = require('mongodb').MongoClient;
mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
    console.log('learnyoumongo is connected !');
    var callback = function() {
        db.close();
        console.log('db is closed');
    }

    insertDocument(db, callback)
    updateDocument(db, callback)
        //deleteDocument(db, callback)
    findAllDocuments(db, callback);
});

var insertDocument = function(db, callback) {

    db.collection('people').insertOne({
        "name": "murugeswari",
        "age": 27
    }, function(err, result) {
        console.log('successfully inserted the document ' + result);
        //  callback();
    });
}

var updateDocument = function(db, callback) {

    db.collection('people').updateOne({
            "name": "murugeswari"
        }, {
            $set: {
                "age": 44
            }
        },
        function(err, result) {
            console.log('successfully updated the document ' + result);
            //  callback();
        });
}

var deleteDocument = function(db, callback) {

    db.collection('people').removeOne({
            "name": "murugeswari"
        },
        function(err, result) {
            console.log('successfully deleted the document ' + result);
            //  callback();
        });
}

var findAllDocuments = function(db, callback) {
    var cursor = db.collection('people').find(
        /*{
            "age": {
                $gt: 28
            }
        }
        */
    );

    cursor.each(function(err, doc) {

        if (doc !== null)
            console.log(doc);
        else
            callback();

    });

}
