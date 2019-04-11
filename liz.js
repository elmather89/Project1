$(document).ready(function () {

  // global variables
  // get value from input fields
  var userName = "";
  var userLast = "";
  var userLocale = "";
  var userEmail = "";
  var userLat = "";
  var userLon = "";

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
    navigator.geolocation.getCurrentPosition(function(position) {
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);

      // vars to hold coordinates data
      var geoLat = position.coords.latitude;
      var geoLon = position.coords.longitude;
      console.log(geoLat, geoLon);

      // display lat and long in 2 divs
      $("#lat").text(position.coords.latitude);
      $("#lon").text(position.coords.longitude);

// geolocation ended here previously

    // on-click event for first 2 trail btn clicks
      // stores user's name
      // stores user's 2 clicks's values to Firebase
      // run stateThree();
      $("#submit").on("click", function(event) {
        event.preventDefault();

        userName = $("#user-name").val().trim();
        userLast = $("#user-last-name").val().trim();
        userLocale = $("#user-locale").val().trim();
        userEmail = $("#user-email").val().trim();
        userLat = $("#lat").html().trim();
        userLon = $("#lon").html().trim();

        // user object
        var addUser = {
            user: userName,
            last: userLast,
            locale: userLocale,
            email: userEmail,
            lat: userLat,
            lon: userLon
        };
        console.log(addUser);

        // push to Firebase
        database.ref().push(addUser);

        // clear the input fields
        $("#user-name").val("");
        $("#user-last-name").val("");
        $("#user-locale").val("");
        $("#user-email").val("");
        $("#lat").val("");
        $("#lon").val("");

    });

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
          $("#coords").append(trailBtn);

      };

    // ajax call -- search hiking api function
      // takes vars lat & long, searches hiking api, passes data back up to hiking buttons func
      var searchTrails = function(lat, lon) {
        var lat = $(geoLat).val().trim();
        var lon = $(this).html("data-lon");
  
          var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=200444715-18e2274b2d33b9a8db21c47ddfab5855";
          // var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200444715-18e2274b2d33b9a8db21c47ddfab5855";

          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function(response) {
              hikingBtns(response);

              console.log(response);
          });
      };
      searchTrails();
    }); 
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