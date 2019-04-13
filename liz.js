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

  var database = firebase.database();

  // geolocation === Tasneem
  navigator.geolocation.getCurrentPosition(function (position) {

    // vars to hold coordinates data
    var geoLat = position.coords.latitude;
    var geoLon = position.coords.longitude;
    console.log(geoLat, geoLon);

    // display lat, lon, and chosen-trail in hidden divs
    $("#lat").text(position.coords.latitude);
    $("#lon").text(position.coords.longitude);

    // geolocation ended here

    // hiking API === Liz ===========================================

    // ajax call -- search hiking api function
    // takes vars lat & long, searches hiking api, passes data back up to hiking buttons func
    var searchTrails = function (lat, lon) {
      var lat = `${lat}`;
      var lon = `${lon}`;

      var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=200444715-18e2274b2d33b9a8db21c47ddfab5855";
      // var queryURL = "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200444715-18e2274b2d33b9a8db21c47ddfab5855";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);

        var results = response.trails;

        var trailNames = [];
        var trailLocations = [];
        var trailLengths = [];
        console.log(trailNames);
        console.log(trailLocations);
        console.log(trailLengths);

        for (var i = 0; i < results.length; i++) {
          // console.log(response.trails[i]);
          // console.log(trailsRes);

          trailNames.push(results[i].name);
          trailLocations.push(results[i].location);
          trailLengths.push(results[i].length);

          var trailBtns = $("<button>");
          trailBtns.text(trailNames[i] + " Trail" + " in " + trailLocations[i]);
          trailBtns.addClass("btn btn-sm btn-dark selected");
          trailBtns.attr("data-trail", results[i].name)
          $("#coords").append(trailBtns);
          // console.log(trailBtns);
          // console.log(results[i].name);

        }
        $("#coords").prepend("<h2>Choose a trail to help clean, clear, and preserve!</h2>")
      });
    };
    searchTrails(geoLat, geoLon);

    // hiking api end ===============================================

  }); // geolocation end

  // store last button clicked
  $(document).on("click", ".selected", storeDataVal);

  function storeDataVal() {
    var chosenTrail = $(this).attr("data-trail");

    if (chosenTrail == "" ) {
      return false;
    } else {
      $("#chosen-trail").text(chosenTrail);
      console.log(chosenTrail);
    }
  };
  
  // on-click event for first 2 trail btn clicks
  // stores user's name
  // stores user's 2 clicks's values to Firebase
  // run stateThree();
  $("#submit").on("click", function (event) {
    event.preventDefault();

    userName = $("#user-name").val().trim();
    userLast = $("#user-last-name").val().trim();
    userLocale = $("#user-locale").val().trim();
    userEmail = $("#user-email").val().trim();
    userLat = $("#lat").html().trim();
    userLon = $("#lon").html().trim();
    userTrail = $("#chosen-trail").html().trim();

    // user object
    var addUser = {
      user: userName,
      last: userLast,
      locale: userLocale,
      email: userEmail,
      lat: userLat,
      lon: userLon,
      chosen: userTrail
    };
    // console.log(addUser);

    // push to Firebase
    database.ref().push(addUser);

    // clear the input fields
    $("#user-name").val("");
    $("#user-last-name").val("");
    $("#user-locale").val("");
    $("#user-email").val("");
    $("#lat").val("");
    $("#lon").val("");
    $("#chosen-trail").val("");

  });

  // dynamically generate weather info into a table === Tasneem
  //...

  // stateThree();
  // retrieve Firebase data for current user
  // remove generated tables
  // dynamically generate Firebase data into a table
  // display a hiking gif?

}); // end