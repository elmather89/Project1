$(document).ready(function () {

    // global variables

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB4VyTmaU_5FIQNcfpY0OcZxAdCb4ZuOZg",
        authDomain: "project1-b74ea.firebaseapp.com",
        databaseURL: "https://project1-b74ea.firebaseio.com",
        projectId: "project1-b74ea",
        storageBucket: "project1-b74ea.appspot.com",
        messagingSenderId: "1097252927851"
    };
    firebase.initializeApp(config);

    // geolocation === Tasneem
      // need geolocation to show lat & long response in 2 divs
      // ... 

    // on-click event for first 2 trail btn clicks
      // stores user's name
      // stores user's 2 clicks's values to Firebase
      // run stateThree();
      $("#submit").on("click", function(event) {
        event.preventDefault();

        // get value from input fields
        var userName = $("#user-name").val().trim();
        var userLast = $("#user-last-name").val().trim();
        var userLocale = $("#user-locale").val().trim();
        var userEmail = $("#user-email").val().trim();

        // user object
        var addUser = {
            user: userName,
            last: userLast,
            locale: userLocale,
            email: userEmail
        };
        console.log(addUser.user);

        // push to Firebase
        database.ref().push(addUser);

        // clear the input fields
        $("#user-name").val("");
        $("#user-locale").val("");
        $("#user-email").val("");

    });

    // remove form 
    // ...

    // dynamically generate weather info into a table
    //...

    // hiking API === Liz ===========================================
      // hiking buttons function to take data from hiking api and generate buttons
      var hikingBtns = function(data) {
          var trailBtn = $("<button>");

          var trailName = (data.name);
          var trailLocation = (data.location);
          var trailLength = (data.length);

          trailBtn.append(trailName, trailLocation, trailLength);

          // append trailBtn to corresponding div
          $(".row").append(trailBtn);

      };

    // ajax call -- search hiking api function
      // takes vars lat & long, searches hiking api, passes data back up to hiking buttons func
      var lat = "";
      var lon = "";

      var searchTrails = function(lat, lon) {
          var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=200444715-18e2274b2d33b9a8db21c47ddfab5855";

          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function(response) {
              hikingBtns(response);
          });
      };

    // hiking api end ===============================================

    // stateThree();
    // retrieve Firebase data for current user
    // remove generated tables
    // dynamically generate Firebase data into a table
    // display a hiking gif?
      var database = firebase.database();

      // retrieve from Firebase
      database.ref().on("value", function(instance) {
          var newUser = instance.val().userName;
          var newLocale = instance.val().userLocale;
          var newEmail = instance.val().userEmail;
      });
      
}); // end