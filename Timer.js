/*
	JOHN RUSSELL
	j362r647@ku.edu, jjruss2014@gmail.com, jjruss2014@yahoo.com
	timer.js
	29 Feb 2016
	Handles the Timer back-code
*/


//TODO:
//Set time DONE
//Start timer: DONE
//Pause time: DONE?
//Resume timer: DONE KINDA
//Reset timer: RIGHT
//Display remaining time: DONE
//FIX WEIRD STUTTER BUG
//clicking pause/resume twice in rapid succession messes with timer tickdown speed.
//Also rapidly clicking "gib" messes things up.

//Make a timer variable that handles the delay, and activate a clear on each instantiation?
//Lazy option: onClick activates a method that delays 1 second before doing the rest?

//Personal notes:
//undefined var == ""
//

function startTimer()
{
	timer.reset();
	var h=document.getElementById("hourField").value;
	var m=document.getElementById("minField").value;
	var s=document.getElementById("secField").value;
	
	//If empty fields, just use zeros there.
	if(h=='')
	{
		h=0;
	}
	if(m=='')
	{
		m=0;
	}
	if(s=='')
	{
		s=0;
	}
	
	if((m<0||m>59) || (s<0||s>59) || h<0)
	{
		alert("Invalid entry");
		
	}
	
	else
	{
		timer.hour=h;
		timer.min=m;
		timer.sec=s;
		timer.tickTockOrNot=true;
		console.log(timer);
		//start fucking about with a timer countdown
		displayTime();
		
		setTimeout(countdown, 1000);
	}
	
	//console.log(timer);
	
}

//Takes it down a second
function countdown()
{
	if(timer.tickTockOrNot==true)
	{
		
		if(makeTimeString()=="00:00:00")
		{
			//Play a thing if possible
			timer.tickTockOrNot=false;
			alert("It's done, now go save your cake");
		}
		else
		{
			//decrement remaining time by one second
			if(timer.sec==0)
			{
				timer.sec=59;
				if(timer.min==0)
				{
					timer.min=59;
					if(timer.hour==0)
					{
						alert("wait what?");
					}
					else
					{
						timer.hour=timer.hour-1;
					}
				}
				else
				{
					timer.min=timer.min-1;
				}
			}
			else
			{
				timer.sec=timer.sec-1;
			}
			
		}
		displayTime();
		//ticker++;
		//console.log(ticker);
		setTimeout( countdown , 1000 );
	}
	
	
}


//Put that time onto the page
function displayTime()
{
	var out=document.getElementById("timeDisplay");
	//.innerHTML changes content of <p> tag
	out.innerHTML=makeTimeString();
}

//turns the time into a string for easy displayment
function makeTimeString()
{
	//gussy this up later with the extra zeros where applicable
	var tempHour=timer.hour;
	var tempMin=timer.min;
	var tempSec=timer.sec;
	if(timer.hour<10)
	{
		tempHour="0"+timer.hour;
		//console.log(tempHour);
	}
	if(timer.min<10)
	{
		tempMin="0"+timer.min;
		//console.log(tempMin);
	}
	if(timer.sec<10)
	{
		tempSec="0"+timer.sec;
		//console.log(tempSec);
	}
	var prettyTimeString=tempHour+":"+tempMin+":"+tempSec;
	//console.log(prettyTimeString);
	return(prettyTimeString);
}


//Switches if timer should keep decrementing or not
function switchTickTockOrNot()
{
	if(timer.tickTockOrNot==true)
	{
		timer.tickTockOrNot=false;
	}
	else
	{
		timer.tickTockOrNot=true;
		setTimeout(countdown, 1000);
	}
}

//As name implies, resets the timer to zero.
function resetTimer()
{
	timer.reset();
	displayTime();
}

//I'm doing the massive object thing too, fuck it
var timer=
{
	hour:0,
	min:0,
	sec:0,
	//determines whether to decrement or not, subject to change
	tickTockOrNot:false,
	reset:function()
	{
		this.hour=0;
		this.min=0;
		this.sec=0;
		this.tickTockOrNot=false;
	}
}
	