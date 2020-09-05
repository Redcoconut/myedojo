/* * Solution from László L. L. on Stack Overflow:
    * https://stackoverflow.com/a/56496854/908059
    */
function showAdvanced(test) {
	console.log("About to show:")
	console.log(test)
	var adv = document.getElementById("js-gcal-event-advanced");
	var yoga = document.getElementById("js-gcal-event-yoga");
	var begi = document.getElementById("js-gcal-event-beginners");
	yoga.style.display = "none";
	begi.style.display = "none";
	adv.style.display = "none";
	document.getElementById("yoga_button").style.borderBottom = "none"
	document.getElementById("advanced_button").style.borderBottom = "none"
	document.getElementById("beginners_button").style.borderBottom = "none"
	if (test == "Advanced") {
		adv.style.display = "block";
		document.getElementById("advanced_button").style.borderBottom = "1px solid grey"
	} else if (test == "Yoga"){
		yoga.style.display = "block";
		document.getElementById("yoga_button").style.borderBottom = "1px solid grey"
	} else if (test == "Beginners") {
		begi.style.display = "block";
		document.getElementById("beginners_button").style.borderBottom = "1px solid grey"

	}

}
function printCalendar () {

  var calendarId = 'p4m8gr97fnskfiqslr4ihhsa88@group.calendar.google.com';
  var apiKey = 'AIzaSyAvq_dKRfcA1PQ75svuE7uoAVRajjlk_nY';


  var userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!userTimeZone) {
    userTimeZone = 'America/New_York';
  }


  gapi.client.init({
    'apiKey': apiKey,

    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
  }).then(function () {

    // Events: list API docs: https://developers.google.com/calendar/v3/reference/events/list
    return gapi.client.calendar.events.list({
      'calendarId': calendarId,
      'timeZone': userTimeZone,
      'singleEvents': true,
      'timeMin': (new Date()).toISOString(), // gathers only events not happened yet
      'maxResults': 30,
      'orderBy': 'startTime'
    });
  }).then(function (response) {
    //console.log(response); // TODO: Remove!
    if (response.result.items) {
      var getNowPlayingDivAdvanced = document.getElementById('js-gcal-event-advanced'); // Make sure your HTML has This ID!
	  var getNowPlayingDivYoga = document.getElementById('js-gcal-event-yoga'); // Make sure your HTML has This ID!
	  var getNowPlayingDivBeginners = document.getElementById('js-gcal-event-beginners'); // Make sure your HTML has This ID!

      // Create a table with events:
      var calendarRowsAdvanced = ['<table id="eventable">'];
	  var calendarRowsYoga = ['<table id="eventable">'];
	  var calendarRowsBeginners = ['<table id="eventable">'];

      response.result.items.forEach(function (entry) {
        var eventDate = dayjs(entry.start.dateTime).format('LL'); // eg: March 26, 2020 6:00 PM
        var eventEndsAt = dayjs(entry.end.dateTime).format('LT'); // eg: 7:00 PM
		temp = '' +
			'<td id="eventd"><div name="viewport" id="evendiv">' +
		      	'<p id="eventitle" style="margin-left: 10px; margin-top: 25px; color: #C81010; max-width: 70%;">' + entry.summary + '</p>' +
					'<div id="datediv">' +
						'<p style="margin:0;color:white;">' + dayjs(entry.start.dateTime).format('ddd') + '</p>' +
						'<p style="margin:0;color:white;">' + dayjs(entry.start.dateTime).format('DD') + '</p>' +
						'<p style="margin:0;color:white;">' + dayjs(entry.start.dateTime).format('HH:mm') + '</p>' +
					'</div>' +
				'<p id="evendate" style="margin-left: 10px; color: grey; margin-bottom: 0;">' + eventDate + '</p>' +
				'<p id="evendate" style=" margin-left: 10px; color: grey; margin-top: 0;">' + dayjs(entry.start.dateTime).format('HH:mm') + ' - ' + dayjs(entry.end.dateTime).format('HH:mm') + '</p>' +
		        '<p id="descrip">' + entry.description + '</p>' +
		        '<a target="_blank" id="evenadd" href="' + entry.htmlLink + '">Add to you calendar<a>' +
			'</div></td>'
		if (entry.summary.includes("Advanced") && calendarRowsAdvanced.length < 6){
			calendarRowsAdvanced.push(temp);
		} else if (entry.summary.includes("Yoga") && calendarRowsYoga.length < 6) {
			calendarRowsYoga.push(temp);
		} else if (entry.summary.includes("Beginners") && calendarRowsBeginners.length < 6) {
			calendarRowsBeginners.push(temp);
		}
      });
      calendarRowsAdvanced.push('</table>');
	  calendarRowsYoga.push('</table>');
	  calendarRowsBeginners.push('</table>');

      getNowPlayingDivAdvanced.innerHTML = calendarRowsAdvanced.join('');
	  getNowPlayingDivYoga.innerHTML = calendarRowsYoga.join('');
	  getNowPlayingDivBeginners.innerHTML = calendarRowsBeginners.join('');

    }
  }, function (reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}
gapi.load('client', printCalendar);
