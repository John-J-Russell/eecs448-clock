/*
** EECS 448 Project #1,2: Clock
** @author: Cesar Avalos 
** @description: Functions that implement the calendar. Most methods are called in the frontEnd.js, Clock.js files
** Last update: March 5, 2016.
*/

var date = " "; // Date string 

var day = 6; // Variable to hold the day 
var month = 6; // Variable to hold the month 

var month_key_value = [1,4,4,0,2,5,0,3,6,1,4,6]; // Used for the set_date function 

var monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Array for holding month names 


/**
     * Function to handle next day transitions. Called in the offsetTime method of the clock.js file. Called in the hourIncrement functon of the Clock object in clock.js
	 *
	 * @author Cesar Avalos, Alec Knutsen 
     * @param 
     * @return 
	 * @see clock.js, setDate()
*/
function nextDay()
{
	//Switch statement for the month 
	switch(month){
		//If February
		case 2:
		//If we reached the 29 day, increment the month, and reset the day 
		if(day == 29)
		{
			month++;
			day = 1;
		}
		//If we have not reached the 29 day, increment the day 
		else {
			day++;
		}
		break;
		//Case: Months with 30 days: April, June, September, and November 
		case 4:
		case 6:
		case 9:
		case 11:
		
		//If we have reached the 30 day, increment the month and reset the day 
		if(day == 30)
		{
			month++;
			day = 1;
		}
		//If we have not reached the 30 day, increment the day 
		else {
			day++;
		}
		break;
		
		//Months with 31 Days: January, March, May, July, August, October, December 
		default:
		
		//If we have reached the last day 
		if(day == 31)
		{
			//If we are in Deember and reached the last day, reset the month to January and reset the day 
			if(month ==12) {
				month=1;
				day = 1;
			}
			//If we have reached the last day and are not in December, increment the month and reset the day 
			else {
				month++;
				day = 1;
			}
		}
		//If we have not reached the last day, increment the day 
		else {
			day++;
		}
	
		break;
	}
	//After changing the day, called the setDate() method  from this file 
	setDate();
}

//Sets the string variable date with the current day of the week
/**
     * Called in the nextDay() method from this file. 
	 * @author Cesar Avalos 
     * @param 
     * @return 
	 * @see nextDay()
*/
function setDate()
{

	//If this is a leap year, compensate by changing jan. and feb. month key value
	var leap = 0;
	if(month == 2 || month == 1)
	{
		leap = -1;
	}

	//Modified Gauss method
	//Source was wikipedia 
	//formula is [(year / 4) + day + month + leap + century + last digits of year] mod 7
	var formula = Math.floor((4 + day + month_key_value[month - 1] + leap + 6 + 16) % 7);
	switch(formula)
	{
		case 1:
		date = "Sunday";
		break;
		case 2:
		date = "Monday";
		break;
		case 3:
		date = "Tuesday";
		break;
		case 4:
		date = "Wednesday";
		break;
		case 5:
		date = "Thursday";
		break;
		case 6:
		date = "Friday";
		break;
		case 0:
		date = "Saturday";
		break;
	}
}


/**
     * Checks if the input day and month are within the appropriate range. Called in the CalendarsetButton() method of the frontEnd.js file 
	 * @author
     * @param {number} inDay - Number of day to check 
     * @return {boolean} - Returns true if the date is valid, false otherwise 
	 * @see frontEnds.js 
*/
function checkValidDay(inDay, inMonth)
{
	// General check: If the day is greater than 0 and the month is between 1 and 12 
	if(inDay > 0 && inMonth <= 12 && inMonth > 0 )
	{
		//Switch statement for checking the appropriate last days for different months 
		switch(inMonth){
		//Case February 
		case 2:
		//If the day is less than 29 (valid), return true 
		if(inDay <= 29)
		{
			return true;
		}
		break;
		//Case: Months with 30 days: April, June, September, and November 
		case 4:
		case 6:
		case 9:
		case 11:
		//If the day is less than 30 (valid), return true 
		if(inDay <= 30)
		{
			return true;
		}
		break;
		//Months with 31 Days: January, March, May, July, August, October, December 
		default:
		//If the day is less than 31 (valid), return true 
		if(inDay <= 31)
		{
			return true;
		}
		break;
	}
		return false; // Return false if we have not return true yet 
		
	}
	
	//If general check does not work, return false 
	else {
		return(false);
	}
}


/**
     * Displays time onto an HTML element. Called in the window.onLoad, tick, and calendarSetButton methods of the frontEnd.js file 
	 * @author - Cesar Avalos 
     * @param {HTML Element} calendarDiv - HTML element to set 
     * @return 
	 * @see frontEnd.js 
*/
function displayDate(calendarDiv)
{
	calendarDiv.innerHTML = date + ", " + monthText[month - 1]+ ", "+ day; // Set the HTML passed in as a parameter to the date plus that appropriate month from the date array 
}