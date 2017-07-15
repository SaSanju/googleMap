var database = require('../config/database'); 			// load the database config

var admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(database.serviceAccount),
    databaseURL: database.databaseURL
});

var db = admin.database();
var ref = db.ref("server/saving-data");
var dataRef = ref.child("location");




module.exports = function (app) {


    // api ---------------------------------------------------------------------
    // store all locations
    app.post('/api/store/location', function (req, res) {

        if (req && req.body) {
            dataRef.push().set(req.body, function (error) {
                if (error) {
                    alert("Data could not be saved." + error);
                } else {
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(403);
        }

    });


    // api ---------------------------------------------------------------------
    // get all locations
    app.get('/api/get/location', function (req, res) {

        dataRef.once("value", function (data) {
            var resData = data.val();

            if (resData == null) 
                console.log('No Data Found in DB');

            res.json(resData);

        }, function (errorObj) {
            console.log("The read failed: " + errorObj.code);
        });
    });


};
