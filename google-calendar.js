/* * Solution from László L. L. on Stack Overflow:
    * https://stackoverflow.com/a/56496854/908059
    */
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
      'maxResults': 5,
      'orderBy': 'startTime'
    });
  }).then(function (response) {
    console.log(response); // TODO: Remove!
    if (response.result.items) {
      var getNowPlayingDiv = document.getElementById('js-gcal-event'); // Make sure your HTML has This ID!
      // Create a table with events:
      var calendarRows = ['<table id="eventable">'];
      response.result.items.forEach(function (entry) {
        var eventDate = dayjs(entry.start.dateTime).format('LL'); // eg: March 26, 2020 6:00 PM
        var eventEndsAt = dayjs(entry.end.dateTime).format('LT'); // eg: 7:00 PM

        console.log("PLEASE")
        console.log(entry.start.dateTime)
        console.log("Alirhgty")
        console.log(dayjs(entry.start.dateTime).format('ddd'))
        calendarRows.push('' +
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
			'</div></td>');
      });

      calendarRows.push('</table>');
      getNowPlayingDiv.innerHTML = calendarRows.join('');
    }
  }, function (reason) {
    console.log('Error: ' + reason.result.error.message);
  });
}
gapi.load('client', printCalendar);
