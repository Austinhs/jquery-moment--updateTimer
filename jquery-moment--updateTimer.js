function updateTimer() {
	//Times
	var currentTime = moment();
	var testTime    = moment(currentTime.format('hh:mm A'), 'hh:mm a');
	var startWork   = moment("08:00:00 am", 'hh:mm a');
	var endWork     = moment('05:00:00 pm', 'hh:mm a');
	
	//Diff hours and minutes for display above progres bar
	var totalHours   = endWork.diff(testTime, 'hours');
	var totalMinutes = endWork.diff(testTime, 'minutes') % 60;
	
	
	//Used to calculate percentage
	var decimalMins   = parseFloat((totalMinutes / 60).toFixed(2));
	var totalTime     = totalHours + decimalMins;
	var diffWorkHours = endWork.diff(startWork, 'hours');
	var diffWorkMins  = parseFloat(((endWork.diff(startWork, 'minutes') % 60) / 60).toFixed(2));
	var diffWorkTotal = diffWorkHours + diffWorkMins;
	var percentage    = parseInt(100 - ((totalTime / diffWorkTotal) * 100));
	
	//Percentage can be way greater or way more negative
	//Because the range is only from work start to work end times
	if(percentage > 100) {
		percentage = 100;
	} else if(percentage < 0) {
		percentage = 0;
	}
	
	//Prevents NaN from showing up
	if(testTime.isBefore(endWork)) {
		$('#tlh').html(totalHours);
		$('#tlm').html(totalMinutes);
	} else {
		$('#tlh').html(0);
		$('#tlm').html(0);
		
		//create automatic punchout if its endWork
	}
	
	$('#timeProgressBar').progress({
		percent: percentage,
		showActivity: false
	});
	 
	$('#punchTimer').html(testTime.format('h:mm A'));
}

setInterval(updateTimer, 1000);
