var crimeAddressList = [];
var zipCodeList = [];


/**
 * a function that creates the URL to query the Dallas database
 * @returns {string} 
 */
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://www.dallasopendata.com/resource/qqc2-eivj.json?";

  var queryParams = {};
  //this sets the queries
  if(moment(eventTime).isBefore(moment()))
  {

    queryParams =
    {
      'zipcode': eventZip,
      'year1': eventYear,
      'month1': eventMonth,
      'date1dayofyear': eventDay,
      'state': 'TX'
    };

  }

  else
  {
    queryParams =
    {
      'zipcode': eventZip,
      'year1': 2017,
      'month1': eventMonth,
      'date1dayofyear': eventDay,
      'state': 'TX'
    };
  }



  // Logging the URL so we have access to it for troubleshooting
  console.log(eventYear);
  console.log(eventDay);
  console.log(eventMonth);

  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);

  
}

/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} response - object containing API data from the AJAX call below
 */
function updatePage(response) {
  console.log(response);
  console.log("------------------------------------");

  clear();

  // Loop through and build elements for the defined number of crimes
  for (var i = 0; i < response.length; i++) {

    //this just makes it easier so we're not typing [i] all the time
    var crimeInfo = response[i];

    // Creates a list group for each crime
    var $crimeContent = $("<ul>");
    $crimeContent.addClass("list-group");

    // Add the newly created element to the DOM
    $("#crime-container").append($crimeContent);

    // If there is an address, adds an address
    crimeAddressList.push(crimeInfo.address);
    zipCodeList.push(crimeInfo.zipcode)
    var incidentAddress = crimeInfo.address;
    var $crimeContentItem = $("<li class='list-group-item articleHeadline'>");

    if (incidentAddress) {
      console.log(incidentAddress);
      $crimeContentItem.append(
        "<strong> " +
        incidentAddress +
        "</strong>"
      );
    }

    // Adds the description of the crime
    var crime = crimeInfo.offincident;

    if (crime) {
      //console.log(crime);
      $crimeContentItem.append("<h5>" + crime + "</h5>");
    }

    // Append the article
    $crimeContent.append($crimeContentItem);
  }
}

// Function to empty out the articles
function clear() {
  $("#crime-container").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#crime-trigger").on("click", function (event) {
  event.preventDefault();



  // Build the query URL for the ajax request to the Dallas API
  var queryURL = buildQueryURL();

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function

  $.ajax({
    url: queryURL,
    method: "GET",

    data: {
        "$limit": 1000,
        "$$app_token": "vB2XGapjaEqYry47FPTfd7BMt"
    }
}).then(updatePage);

});
