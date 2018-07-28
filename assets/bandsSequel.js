var eventLat = 0;
var eventLong = 0;
var eventZip = 0;
var eventTime;
var eventYear;
var eventDay;
var eventMonth;
var artist;

function eventSearch() {

    var oArgs = {

        app_key: "HkT6kwMnqChjBctD",

        q: "music",

        where: "Dallas",

        "date": "2016061000-2018092000",

        page_size: 10,

        keywords: artist,

        sort_order: "popularity",

    };

    EVDB.API.call("/events/search", oArgs, function (oData) {

        // Note: this relies on the custom toString() methods below

        console.log(oData)
        var eventData = oData.events.event;


        for (i = 0; i < eventData.length; i++) {


            if (eventData[i].performers != null) {

                if (Array.isArray(eventData[i].performers.performer)) {

                    for (j = 0; j < eventData[i].performers.performer.length; j++) {
                        console.log(oData.events.event[i].performers.performer[j].name)
                        console.log(oData.events.event[i].start_time)
                        eventLat = eventData[i].latitude;
                        eventLong = eventData[i].longitude;
                        eventZip = eventData[i].postal_code;
                        eventTime = eventData[i].start_time;

                        eventYear = moment(eventTime, 'YYYY-MM-DD, h:mm:ss').format("YYYY")
                        eventDay = moment(eventTime, 'YYYY-MM-DD, h:mm:ss').format("DDD")
                        eventMonth = moment(eventTime, 'YYYY-MM-DD, h:mm:ss').format("MMMM")
                    }


                }

                if (eventData[i].performers.performer.name == artist) {
                    console.log(eventData[i].performers.performer.name);
                    eventLat = eventData[i].latitude;
                    eventLong = eventData[i].longitude;
                    eventZip = eventData[i].postal_code;
                    eventTime = eventData[i].start_time;

                    eventYear = moment(eventTime, 'YYYY-MM-DD, h:mm:ss').format("YYYY")
                    eventDay = moment(eventTime, 'YYYY-MM-DD, h:mm:ss').format("DDD")
                    eventMonth = moment(eventTime, 'YYYY-MM-DD, h:mm:ss').format("MMMM")
                }

            }


        }


    });
}

$("#search").on("click", function (event) {
    event.preventDefault();

    artist = $("#search-artist").val();

    eventSearch();
    console.log(eventLat)
    console.log(eventZip)




});