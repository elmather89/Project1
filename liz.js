$(document).ready(function () {

    // global variables
    var indexTracker = 0;

    //configure firebase
    // ...

    // geolocation === Tasneem
      // need geolocation to show lat & long response in 2 divs
      // ...
      // geolocation end    

    // on-click event for submit button
    // ...

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
      var searchTrails = function(lat, lon) {
          var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=10&key=200444715-18e2274b2d33b9a8db21c47ddfab5855";

          $.ajax({
              url: queryURL,
              method: "GET"
          }).then(function(response) {
              hikingBtns(response);
          });
      };

    // call search function (to test that response is working)
    //.. searchOMDB("Mr. Nobody");

    // hiking api end ===============================================

    // ajax GET response - weather app

    // on-click event for first 2 trail btn clicks
    // stores user's name
    // stores user's 2 clicks
    // run stateThree();

    // stateThree();
    // retrieve Firebase data for current user
    // remove generated tables
    // dynamically generate Firebase data into a table
    // display a hiking gif?

}); // end