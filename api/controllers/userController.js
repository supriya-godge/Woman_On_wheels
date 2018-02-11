var mongoose = require('mongoose');
var User = mongoose.model('User');
var Sugg = mongoose.model('Suggestions');

module.exports.postLoginDetails = function (req,res) {
    console.log("Reached login post ");
    User.create({
        name : req.body.name,
        email : req.body.email,
        isExistingUser : req.body.existingUser,
        password : req.body.password

    },function (err,user) {
        if(err){
            console.log("Error occurred in creation! "+err);
            res
                .status(500)
                .json({"message":"Cannot add the user details because Error occurred in creation!"});

        }
        else{
            console.log("User Added!");
            res
                .status(200)
                .json(user);

        }
    });
};


module.exports.getSuggestions = function (req,res) {

    console.log("Get suggestions for mood");

    //var userId = req.params.userID;
    var res_mood = req.params.mood;

    Sugg
        .find({mood:res_mood}) //mood.find().limit(25);
        .exec(function (err, docs) {
            var response = {
                "status": 200,
                "message": "Success in getting suggested places"
            };

            if (err) {
                console.log("Error in find");
                response.status = 500;
                response.message = {"message": "Error occurred in find"}
            }
            else if (!docs) {
                console.log("Record not found this mood");
                response.status = 404;
                response.message = {"message": "Places not found"}
            }
            else {
                console.log("Locations Found : ", docs);
                response.message=docs;
            }

            res
                .status(response.status)
                .json(response.message)
        })
};


module.exports.saveSuggestions = function (req,res) {

    console.log("Update fav place");

    var userId = req.params.userID;
    var city = req.params.city;

    User
        .find({name:userId}) //mood.find().limit(25);
        .update({$addToSet: { fav_place: city }})
        // update(
        //     {name: userId},
        //     {$addToSet: { fav_place: city } }
        // )
        .exec(function (err, docs) {
            var response = {
                "status": 200,
                "message": "Success in getting suggested places"
            };

            if (err) {
                console.log("Error in find");
                response.status = 500;
                response.message = {"message": "Error occurred in find"}
            }
            else if (!docs) {
                console.log("Record not found this mood");
                response.status = 404;
                response.message = {"message": "Places not found"}
            }
            else {
                console.log("Locations Found : ", docs);
                response.message=docs;
            }

            res
                .status(response.status)
                .json(response.message)
        })
};



module.exports.getLocations = function (req,res) {

    console.log("Get locations for suggested city");

    var userId = req.params.userID;
    var suggestedCity = req.params.suggestionID;

    User
        .find(suggestedCity)
        .exec(function (err, docs) {
            var response = {
                "status": 200,
                "message": docs
            };

            if (err) {
                console.log("Error in find");
                response.status = 500;
                response.message = {"message": "Error occurred in find"}
            }
            else if (!docs) {
                console.log("Record not found this mood");
                response.status = 404;
                response.message = {"message": "Places not found"}
            }
            else {
                console.log("Locations Found : ", docs);
            }

            res
                .status(response.status)
                .json(response.message)
        });
};