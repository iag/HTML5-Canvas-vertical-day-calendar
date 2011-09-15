
/*
 *
*
 *
*
 *
*		DUMMY DATA START
 *
*
 *
*
 *
*
 *
*/


		//	Set dimensions to iPhone4 for testing, though this is not live... is here as reminder and to help set rel. dimensions in formulas
			canvasHeight	=	(960);
			canvasWidth		=	(213);
														
		//jk
			driverStart		=	12040000;
			driverEnd		=	15400000;
			

			
			
													
														
		//	For car lookup times
			var		timeSets 		= 	new	Array();
			
					timeSets[6]		=	[21000000, 99931772800000];
					timeSets[19]	=	[-10444174911, -1044414910];

/*
 *
*
 *
*
 *
*		DUMMY DATA END
 *
*
 *
*
 *
*
 *
*/



//	Initialization variables - global

	//	This determines the text style properties
		var				fontHeight;
		var				fontFont = "Helvetica";
			
			if			(canvasWidth > 10)
											{
												fontHeight = Math.floor(canvasWidth / 10);
											}
				else
											{
												fontHeight = 18;
											}
										
		var				textStylings = (fontHeight + "px " + fontFont);	//	Aggregate of size and font

	// 	Use this to make the canvas reprintable to fit any number of situations
		var				canvasHeight;
		var				canvasWidth;
	
	//	User defined time period
		var				driverStart;	// User deterined start time
		var				driverEnd;	 	// User determined end time
		
		var				tripDuration	= (driverEnd - driverStart);	// Total trip length in milliseconds
			
		var				tripDurWeeks	= ( Math.floor(	  tripDuration 				/ 604800000	)	);	
		var				tripDurDays		= ( Math.floor(  (tripDuration % 604800000) / 86000000	)	);
		var				tripDurHours	= ( Math.floor(  (tripDuration % 86000000) 	/ 3600000	)	);
		var				tripDurMins		= ( Math.floor(  (tripDuration % 3600000)	/ 60000		)	);
		
		var				timeSpace;		//	The number of milliseconds that a pixel represents... will likely return a small decimal number
	
	//	Sanitize user time input to 30 minute slots
		var				tripStart		= ( (Math.floor	(driverStart	/ 1800000) ) * 1800000);	//	Round start time to current 30 minute slot
		var				tripEnd			= ( (Math.ceil	(driverEnd		/ 1800000) ) * 1800000);		//	Round start time to current 30 minute slot

	//	Vernier scale attributes & placeholders	
		var				vernierScale;				// 	The amount of time a vernier tick presenents (in milliseconds)
		var				vernierStart;				//	Time at which vernier starts
		var				vernierEnd;					//	Time at which vernier ends
		
		var				tickAbove; 					// The first tick above the start time in that scale
		var				tickTop;					// The topmost tick
		
		var				lastDayPrinted 		= 0;	// Track last day printed
		var				lastDatePrinted 	= 0;	// Track last month & day printed
		var				lastMonthPrinted 	= 0;	// Track last month & day printed
		
		var				textDuration		=	0;



//	Determine vernier scale, &c.
	if			(tripDuration <= 0)					
																				{
																					vernierScale	=	"none";
																					vernierStart 	=	Date(); // FIXME such that this starts at the current half hour slot
																				}
																																						
		else if	( (tripDuration > 0) && (tripDuration <= 16200000) )			// max 4.5 hours (16,200,000 milliseconds), 6 hour window
																				{
																					vernierScale	=	3600000;	
																					timeSpace		=	(canvasHeight / (6 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 16200000) && (tripDuration <= 30600000) )		// max 8.5 hours (30,600,000 milliseconds)
																				{
																					vernierScale	=	7200000;
																					timeSpace		=	(canvasHeight / (12 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 30600000) && (tripDuration <= 61200000) )		// max 17 hours (61,200,000 milliseconds)
																				{
																					vernierScale	=	14400000;
																					timeSpace		=	(canvasHeight / (24 * 60 * 60 * 1000));
																				}
																				
		else if	( (tripDuration > 61200000) && (tripDuration <= 181800000) )		// max 2 days, 2 hours, 30minutes (181,800,000 milliseconds)
																				{
																					vernierScale	=	43200000;
																					timeSpace		=	(canvasHeight / (3 * 24 * 60 * 60 *1000));
																				}
																			
		else if	( (tripDuration > 181800000) && (tripDuration <= 302400000) )		// max 3.5 days (302,400,000 milliseconds)
																			{
																					vernierScale	=	86400000;
																					timeSpace		=	(canvasHeight / (5 * 24 * 60 * 60 *1000));
																				}
																			
		else if	( (tripDuration > 302400000) && (tripDuration <= 432000000) )		// max 5 days (432,000,000 milliseconds)
																				{
																					vernierScale	=	86400000;
																					timeSpace		=	(canvasHeight / (7 * 24 * 60 * 60 * 1000));
																				}
	
		else if	( (tripDuration > 432000000) && (tripDuration <= 604800000) )		// max 7 days (604,800,000 milliseconds)
																				{
																					vernierScale	=	172800000;
																					timeSpace		=	(canvasHeight / (10 * 24 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 432000000) && (tripDuration <= 907200000) )		// max 10.5 days (907,200,000 milliseconds)
																				{
																					vernierScale	=	259200000;
																					timeSpace		=	(canvasHeight / (15 * 24 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 907200000) && (tripDuration <= 1814400000) )	// max 21 days (1,814,400,000 milliseconds)
																				{
																					vernierScale	=	432000000;
																					timeSpace		=	(canvasHeight / (30 * 24 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 1814400000) && (tripDuration <= 3628800000) )	// max 42 days (3,628,800,000 milliseconds)
																				{
																					vernierScale	=	864000000;
																					timeSpace		=	(canvasHeight / (60 * 24 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 3628800000) && (tripDuration <= 7257600000) )	// max 84 days (7,257,600,000 milliseconds)
																				{
																					vernierScale	=	2592000000;
																					timeSpace		=	(canvasHeight / (120 * 24 * 60 * 60 * 1000));
																				}
																			
		else if	( (tripDuration > 7257600000) && (tripDuration <= 21772800000) )	// max 252 days (21,772,800,000 milliseconds)
																				{
																					vernierScale	=	5184000000;
																					timeSpace		=	(canvasHeight / (360 * 24 * 60 * 60 * 1000));
																				}
																			
		else if	(tripDuration > 21772800000)								// anything over 252 days
																				{
																					vernierScale	=	"large";
																				}
		


	
//	Macro sort all 1st children of timeSet such that the earlier start times sift to the top
	timeSets.sort(function (a, b) { return a[0] - b[0] } ); // HELP ME!!
		


//	Sanitize data from server
	for	(var i = 0; i < timeSets.length; i++)
												{	
													if	( (timeSets[i] && timeSets[i+1]) !=	(undefined || NaN || null) )
																															{
																																var booking			=	timeSets[i];
																																var bookingPeriod	=	booking[1] - booking[0];
																																
																																if (i != timeSets.length-1) 
																																							{
																																								var	bookingNext = timeSets[i+1];
																																								
																																								var	delta_start = booking[0] - bookingNext[0];
																																								
																																								if	(delta_start > bookingPeriod) 	// Fix overlapping bookings for the same vehicle, so that they get represented as a single block.
																																																	{
																																																		timeSets[i][1] = bookingNext[0];
																																																	}
																																							}
																															}
												}
												
//	now I know that I have no scheduling conflicts (and conflicts simply touch each other), the start time exists at timeSets[x][0], end time at timeSets[x][1], and the timeStes are in ascending order


//	Little rounded rectangle helper function
	function	roundedRect(ctx, x, y, width, height, radius)
																{
																	ctx.beginPath			();
																	ctx.moveTo				(x, 				 y + radius														);
																	ctx.lineTo				(x, 				 y + height - radius											);
																	ctx.quadraticCurveTo	(x, 				 y + height, 			x + radius, 		y + height			);
																	ctx.lineTo				(x + width - radius, y + height														);
																	ctx.quadraticCurveTo	(x + width, 		 y + height, 			x + width, 			y + height - radius	);
																	ctx.lineTo				(x + width, 		 y + radius														);
																	ctx.quadraticCurveTo	(x + width, 		 y, 					x + width - radius, y					);
																	ctx.lineTo				(x + radius, 		 y																);
																	ctx.quadraticCurveTo	(x, 				 y, 					x, 					y + radius			);
																	ctx.stroke				();
																}		

//	Here I want to start drawing...
	function draw()
					{
						if			(canvas.getContext)
														{
	
															var	modo	 		=	this.document.getElementById('canvas'); // Fix drawing surface
															
															var	ctx	 			=	this.canvas.getContext("2d");		// Check for compatability
															
															var	topGlare		=	new Image();
																topGlare.src	=	"topGlare.png";

															var	horizBevel		=	new Image();
																horizBevel.src	=	"horizBevel.png";
															
															var	bkgrd			=	new Image();
																bkgrd.src		=	"testimage.jpg";
																

																ctx.fillStyle	=	"rgb(244, 241,238)";
																ctx.fillRect		(0, 0, canvasWidth, canvasHeight);
															
															
															if			(tripDuration > 0 && vernierScale != "large")
																														{
																															bkgrd.onload	=	function ()
																																							{
																																								ctx.drawImage	(bkgrd, 0, 0, canvasWidth, canvasHeight);
																							
																																								//	Apply vernier point values
																																									vernierStart	=	( ((driverStart + driverEnd) / 2) - ((canvasHeight / 2) / timeSpace) );	//	Time value for (0, 0)
																																									vernierEnd		=	( ((driverStart + driverEnd) / 2) + ((canvasHeight / 2) / timeSpace) );	//	Time value for (0, canvasHeight)
																																						
																																								//	Sort within each timeSet[i], such that start times exist at obj[0], and end times at obj[1]
																																									for (var i in timeSets)
																																															{
																																																timeSets[i].sort(function (a,b) {return a - b});
																																															};
																																									
																																									for	(var i in timeSets)
																																															{
																																																if			( (timeSets[i][0] > vernierEnd) || (timeSets[i][1] < vernierStart) )
																																																																					{
																																																																						delete timeSets[i];
																																																																					}
																																																	else if	(timeSets[i][0] < vernierStart)
																																																																					{
																																																																						timeSets[i][0] = vernierStart;
																																																																					}
																																																	else if	(timeSets[i][1] > vernierEnd)
																																																																					{
																																																																						timeSets[i][1] = vernierEnd;
																																																																					}
																																															};
																																									
																																								
																																								//	Start actually drawing!
																																								
																																									ctx.moveTo(0, ( (canvasHeight / 2) - (tripDuration / 2 * timeSpace) ) );	// Find the midpoint of the y-axis, then go up half of relitive the duration-space
																																								
																																									//	Green "selected time" rectangle
																																									
																																									
																																										//	Styles for date selected (green rectangle)
																																										
																																											var	isConflict = 0;
																																											
																																											for	(i in timeSets)	
																																																{
																																																																																		
																																																	//	Styles for booking collisions (or not)
																																																		if			( (driverEnd > timeSets[i][0]) && (driverStart < timeSets[i][1]) )	
																																																																						{
																																																																							isConflict++;
																																																																						}
																																																}
									
											
																																										
																																											if		(isConflict > 0)
																																																		{	
																																																			ctx.fillStyle	=	'rgba(255, 0,0, 0.9)';	//	Conflict rectangles
																																																			ctx.strokeStyle	=	"rgba(255, 0, 0, 0.9)";
																																																			ctx.lineWidth	=	3.5;
																																																		}
																																												else					
																																																		{
																																																			ctx.fillStyle	=	'rgba(139, 197, 63, 1.0)';	//	First Rectagle (solid)
																																																			ctx.strokeStyle	=	"rgba(139, 197, 63, 1.0)";
																																																			ctx.lineWidth	=	3.5;
																																																		}					
																			
																																											
																																											//	Add shadow
																																												ctx.shadowOffsetX	=	2;
																																												ctx.shadowOffsetY	=	2;
																																												ctx.shadowBlur		=	5;
																																												ctx.shadowColor		=	"rgba(0, 0, 0, 0.5)";
																																												
																																										//	Draw the (hopefully ^.~) green rectangle
																																											roundedRect	(ctx, ( (canvasWidth * 0.6) + 1), ( (canvasHeight / 2) - (tripDuration / 2 * timeSpace)), (canvasWidth * 0.45), ((tripDuration * timeSpace)), 10);
																																											ctx.fill	();	// Activate fill style
																																									
																																									//	Times that the vehicle is already booked for
																																										
																																										//	Confligure style
																																											ctx.fillStyle			=	'rgba(0, 0, 0, 0.6)';	//	Conflict rectangles
																																											ctx.strokeStyle			=	"rgba(0, 0, 0, 0)";
																																											ctx.lineWidth			=	0;
											
																																											//	Add shadow
																																												ctx.shadowOffsetX	=	2;
																																												ctx.shadowOffsetY	=	2;
																																												ctx.shadowBlur		=	5;
																																												ctx.shadowColor		=	"rgba(0, 0, 0, 0.3)";
									
																																										for	(i in timeSets)
																																															{
																																																//	Draw times as per styles
																																																ctx.moveTo(0, (Math.floor(timeSpace * (timeSets[i][0] - (vernierStart)) ) + 0.5)); //
																																																
																																																
																																																roundedRect	(ctx, (canvasWidth * 0.6), ( (Math.floor(timeSpace * (timeSets[i][0] - (vernierStart)) )) + 0.5 ), (canvasWidth * 0.45), ( (Math.ceil(timeSpace * (timeSets[i][1] - (vernierStart) ) )) - 0.5 ), 10);
																																																ctx.fill	();	// Apply fill style
																																															}
									
																																									
																																									//	Find the top tick
																																										
																																										//	Apply tick scaling to find the tick above the driver's selected time
																																											tickAbove	=	new Date(driverStart);	//	Begin with driverStart value, and modify as per algorithm defined below...
																																																																																																																							
																																											tickAbove.setSeconds(0, 0);
																																											tickAbove.setMinutes(0);
																																										
																																										
																																										tickTop		=	( (((tickAbove % vernierScale) * timeSpace)) - 10);
																																									
																																									//	Draw vernier ticks & label with corresponding time
																																											//	Line styles & resets
																																												ctx.fillStyle			=	"rgba(0, 0, 0, 1.0)";
																																												ctx.strokeStyle		 	=	"rgba(0, 0, 0, 0.8)";
																																												ctx.lineWidth	 		=	1.5;
																																												
																																												//	Remove shadow
																																													ctx.shadowOffsetX	=	0;
																																													ctx.shadowOffsetY	=	0;
																																													ctx.shadowBlur		=	0;
																																													ctx.shadowColor		=	"rgba(0, 0, 0, 0)";
																																										
																																										
																																									    ctx.beginPath	();
																																									    ctx.moveTo		(0, 			tickTop);
																																									    
																																									    ctx.lineTo		(canvasWidth, 	tickTop);
																																									    ctx.stroke		();
																																										
																																										
																																										var	vernierFitNum	=	Math.floor( (canvasHeight - tickTop) / (vernierScale * timeSpace) );
																																										
																																									    for	(var j = 1; j <= vernierFitNum; j++)	
																																									    											{
																																									    												var	vernierEpoch =	new Date ( (vernierStart + (tickTop / timeSpace) + (j * vernierScale) ) );	//	What time each tick represents
																																																				    												
																																																				    																																																								
																																																						if	(vernierScale >= 7200000)
																																																																	{
																																																																		var	h = vernierEpoch.getHours();
																																																																		
																																																																		vernierEpoch.setHours( ((Math.floor(h / 2) ) * 2) );
																																																																	}
																																																							
																																																						if	(vernierScale >= 14400000)
																																																																	{
																																																																		var	h = vernierEpoch.getHours();
																																																																		
																																																																		vernierEpoch.setHours( ((Math.floor(h / 4) ) * 4) );	
																																																																	}
																																																																	
																																																						if	(vernierScale >= 86400000)
																																																																	{
																																																																		var	d = vernierEpoch.getDate();
																																																																		
																																																																		vernierEpoch.setHours(0);
																																																																	}
																																																															
																																																							
																																																						if	(vernierScale >= 172800000)	
																																																																	{
																																																																		var	d = vernierEpoch.getDate();
																																																																		
																																																																		vernierEpoch.setDate( (Math.floor(d / 2) ) * 2);	
																																																																	}
																																																																
																																																						if	(vernierScale >= 259200000)
																																																																	{
																																																																		var	d = vernierEpoch.getDate();
																																																																		
																																																																		vernierEpoch.setDate( (Math.floor(d / 3) ) * 3);	
																																																																	}
																																																															
																																																						if	(vernierScale >= 432000000)
																																																																	{
																																																																		var	d = vernierEpoch.getDate();
																																																																		
																																																																		vernierEpoch.setMinutes( (Math.floor(d / 5) ) * 5);	
																																																																	}
																																																															
																																																						if	(vernierScale >= 864000000)	
																																																																	{
																																																																		var	d = vernierEpoch.getDate();
																																																																		
																																																																		vernierEpoch.setDate( (Math.floor(d / 10) ) * 10);	
																																																																	}
																																																							
																																																						if	(vernierScale >= 2592000000)
																																																																	{
																																																																		
																																																																		vernierEpoch.setDate(1);
																																																																	}
																																																							
																																																						if	(vernierScale >= 5184000000)
																																																																	{
																																																																		var	m = vernierEpoch.getMonth();
																																																																		
																																																																		vernierEpoch.setMonth( (Math.floor(m / 2) ) * 2);	
																																																																	}
																																																						
																																																						vernierEpoch.setMinutes(0, 0, 0);
																																									    												
																																									    												var	vernierDay			=	vernierEpoch.getDay();
																																									    												var	vernierDayName		=	"";
																																									    												
																																									    												var	vernierMonth		=	vernierEpoch.getMonth();
																																									    												var	vernierMonthName	=	"";
																																									    												
																																									    												var	vernierDate			=	vernierEpoch.getDate();
																																									    												var	vernierDateNum		=	"";
																																									    												
																																									    												var	vernierHours		=	vernierEpoch.getHours();
																																									    												var	vernierHoursNum		=	"";
																																									    												
																																									    												var	vernierMins			=	vernierEpoch.getMinutes();
																																									    												var	vernierMinsNum		=	"";
																																									    												
																																									    												var vernierAMPM			=	"";
																																									    												
																																									    												//	Convert weekday number (starts at 0) to weekday name
																																										    												switch				(vernierDay)	
																																															    																		{
																																															    																			case 0:
																																																    																					vernierDayName	=	"Sunday";
																																																    																					break;
																																																    																					
																																															    																			case 1:
																																																    																					vernierDayName	=	"Monday";
																																																    																					break;
																																																    																				
																																															    																			case 2:
																																																    																					vernierDayName	=	"Tuesday";
																																																    																					break;
																																																    																				
																																															    																			case 3:
																																																    																					vernierDayName	=	"Wednesday";
																																																    																					break;
																																																    																				
																																															    																			case 4:
																																																    																					vernierDayName	=	"Thursday";
																																																    																					break;
																																																    																				
																																															    																			case 5:
																																																    																					vernierDayName	=	"Friday";
																																																    																					break;
																																																    																				
																																															    																		
																																															    																			case 6:
																																																    																					vernierDayName	=	"Saturday";
																																																    																					break;
																																																    																		
																																																    																		default:	vernierDayName	=	"";
																																															    																		}
																																									    												
																																									    												//	Convert month number (starts at 0) to month name
																																										    												switch				(vernierMonth)	
																																															    																		{
																																															    																			case 0:
																																																    																					vernierMonthName	=	"Jan.";
																																																    																					break;
																																																    																					
																																															    																			case 1:
																																																    																					vernierMonthName	=	"Feb.";
																																																    																					break;
																																																    																					
																																															    																			case 2:
																																																    																					vernierMonthName	=	"March";
																																																    																					break;
																																																    																					
																																															    																			case 3:
																																																    																					vernierMonthName	=	"April";
																																																    																					break;
																																																    																																																						    																					
																																															    																			case 4:
																																																    																					vernierMonthName	=	"May";
																																																    																					break;
																																																    																																																						    																					
																																															    																			case 5:
																																																    																					vernierMonthName	=	"June";
																																																    																					break;
																																																    																					
																																															    																			case 6:
																																																    																					vernierMonthName	=	"July";
																																																    																					break;
																																																    																					
																																															    																			case 7:
																																																    																					vernierMonthName	=	"Aug.";
																																																    																					break;
																																																    																					
																																															    																			case 8:
																																																    																					vernierMonthName	=	"Sept.";
																																																    																					break;
																																																    																					
																																															    																			case 9:
																																																    																					vernierMonthName	=	"Oct.";
																																																    																					break;
																																																    																					
																																															    																			case 10:
																																																    																					vernierMonthName	=	"Nov.";
																																																    																					break;
																																																    																					
																																															    																			case 11:
																																																    																					vernierMonthName	=	"Dec.";
																																																    																					break;
																																																    																		
																																																    																		default:	vernierMonthName	=	"";
																																															    																		}						
																																									    												
																																									    												//	Add proper endings to date numbers (st, nd, rd, th...)						
																																										    												if				( /1$/.test(vernierDate) )
																																										    																							{
																																													    																					if			(vernierDate	==	11)
																																															    																												{
																																															    																													vernierDateNum	=	(vernierDate + "th");
																																															    																												}
																																															    																					
																																													    																						else
																																															    																												{
																																															    																													vernierDateNum	=	(vernierDate + "st");
																																															    																												}
																																											    																						}
																																											    																						
																																										    													else if		( /2$/.test(vernierDate) )
																																													    																				{
																																													    																					if			(vernierDate	==	12)
																																															    																												{
																																															    																													vernierDateNum	=	(vernierDate + "th");
																																															    																												}
																																															    																					
																																													    																						else
																																															    																												{
																																															    																													vernierDateNum	=	(vernierDate + "nd");
																																															    																												}
																																													    																				}
																																											    																				
																																										    													else if		( /3$/.test(vernierDate) )
																																													    																				{
																																													    																					if			(vernierDate	==	13)
																																															    																												{
																																															    																													vernierDateNum	=	(vernierDate + "th");
																																															    																												}
																																															    																					
																																													    																						else
																																															    																												{
																																															    																													vernierDateNum	=	(vernierDate + "rd");
																																															    																												}
																																													    																				}
																																													    										
																																													    										else									{
																																													    																					vernierDateNum	=	(vernierDate + "th");
																																													    																				}
									
																																													    								//	Convert 24-hour clock to 12-hour with AM/PM								
																																													    									if				(vernierHours == 0)
																																													    																				{
																																													    																					vernierHoursNum	=	12;
																																													    																					vernierAMPM		=	"AM";
																																													    																				}
									
																																													    										else if		(vernierHours == 12)
																																													    																				{
																																													    																					vernierHoursNum	=	12;
																																													    																					vernierAMPM		=	"PM";
																																													    																				}
																																													    																				
																																													    										else if		(vernierHours >  12)
																																													    																				{
																																													    																					vernierHoursNum	=	(vernierHours - 12);
																																													    																					vernierAMPM		=	"PM";
																																													    																				}
																																													    																				
																																													    										else if		(vernierHours <  12)
																																													    																				{
																																													    																					vernierHoursNum	=	vernierHours;
																																													    																					vernierAMPM		=	"AM";
																																													    																				}
																																													    																			
																																													    								//	Make sure all minutes display in 2-digit
																																													    									if				(vernierMins < 10)
																																													    																				{
																																													    																					vernierMinsNum	=	("0" + vernierMins);
																																													    																				}
																																													    										else
																																													    																				{
																																													    																					vernierMinsNum	=	vernierMins;
																																													    																				}
																																									    												
																																																					    ctx.lineWidth 		= 	1.5;
																																																					    
																																																					    var	yDrawLine		=	( ((vernierEpoch - vernierStart) * timeSpace) ); // is the problem most likely!!
																																																					    
																																																					    ctx.beginPath			();
																																																					    ctx.moveTo				(0, 			yDrawLine);
																																																					    ctx.lineTo				(canvasWidth, 	yDrawLine);
											
																																																					    //	Print the datetime that the tick indicates
																																																    						ctx.font		=	textStylings;
																																																							ctx.fillStyle	=	"#000000";
																																																							
																																																							if			(  vernierScale < 86400000)	//	Only display time when scale is small enough for it to be important
																																																																															{
																																																																																ctx.fillText ( (vernierHoursNum  + ":" + vernierMinsNum	+ vernierAMPM), 2, (yDrawLine + 20)	);
																																																																															} 
																																																										
																																																							if			( (vernierScale < 2592000000) && (vernierDayName != lastDayPrinted) )
																																																																															{
																																																																																ctx.fillText ( (vernierDayName + ","), 2, (yDrawLine - 26)	);
																																																																																
																																																																																if	( yDrawLine > 0)
																																																																																															{
																																																																																																lastDayPrinted	=	vernierDayName;
																																																																																															}
																																																																															}
																																																																												
																																																							if			( (vernierDateNum != lastDatePrinted) || (vernierMonthName != lastMonthPrinted) )
																																																																															{	
																																																																																ctx.fillText ( (vernierMonthName + " " + vernierDateNum), 	2, (yDrawLine - 4)	);
																																																																																			
																																																																																if			( yDrawLine > 0 )
																																																																																																	{
																																																																																																		lastDatePrinted		=	vernierDateNum;
																																																																																																		lastMonthPrinted	=	vernierMonthName;
																																																																																																	}
																																																																																	else
																																																																																																	{
																																																																																																		ctx.fillText (  vernierMonthName, 2, (yDrawLine - 4)	);
																																																																													
																																																																																																	}
																																																																															}
																																																																												
																																																					    ctx.stroke		();
																																									    											}
																																									    											
																																											
																																											//	Add trip duration
																																												//	Style
																																													ctx.font			=	textStylings;
																																													ctx.fillStyle		=	"rgba(0, 0, 0, 1.0)";
																																													ctx.fillStyle		=	"rgba(255, 255, 255, 1.0)";
																																													ctx.lineWidth		=	1.5;
																																												
																																												var	tripDispMin			=	false;
																																												var	tripDispHour		=	false;
																																												var	tripDispDay			=	false;
																																												var	tripDispWeek		=	false;
																																												
																																												
																																												if		(tripDurMins > 0)
																																																			{
																																																				tripDispMin		=	true;
																																																			};
																																																		
																																												if		(tripDurHours > 0)
																																																			{
																																																				tripDispMin		=	true;
																																																				tripDispHour	=	true;
																																																			};
																																												
																																												if		(tripDurDays > 0)
																																																			{
																																																				tripDispMin		=	true;
																																																				tripDispHour	=	true;
																																																				tripDispDay		=	true;
																																																			}
																																												
																																												if		(tripDurWeeks > 0)
																																																			{
																																																				tripDispMin		=	true;
																																																				tripDispHour	=	true;
																																																				tripDispDay		=	true;
																																																				tripDispWeek	=	true;
																																																			}
																																												
																																												//	Trip units display filter
																																													if		(tripDispDay == true)
																																																					{
																																																						textDuration++;
																																																						
																																																						var	plural			=	"s";
																																																						var	anythingElse	=	"";
																																																						
																																																						if	(tripDurMins == 1)
																																																																	{
																																																																		plural	=	"";
																																																																	}
																																																												
																																																						if	( (tripDurMins || tripDurHours) > 0)
																																																																	{
																																																																		var	anythingElse	=	",";
																																																																	}
																																																						ctx.beginPath();
																																																								
																																																						ctx.lineTo		(0.5, (canvasHeight / 2) );
																																																						ctx.fillText	( (tripDurDays + " day" + plural + anythingElse), (canvasWidth * 0.6), ( (canvasHeight / 2) -  (fontHeight * 0.4) ) );
																																																						
																																																						ctx.stroke();
																																																					}
																																																					
																																													if		(tripDispWeek == true)
																																																					{
																																																						textDuration++;
																																																						
																																																						var	plural			=	"s";
																																																						var	anythingElse	=	"";
																																																						
																																																						if	(tripDurMins == 1)
																																																												{
																																																													plural	=	"";
																																																												}
																																																												
																																																						if	( (tripDurMins || tripDurHours || tripDurDays) > 0)
																																																																				{
																																																																					var	anythingElse	=	",";
																																																																				}
																																																					
																																																						ctx.beginPath();
																																																								
																																																						ctx.lineTo		(0.5, ( (canvasHeight / 2) - 80) );
																																																						ctx.fillText	( (tripDurWeeks + " week" + plural + anythingElse), (canvasWidth * 0.6), ( (canvasHeight / 2) - (textDuration / 2 * fontHeight * 1.1) - textDuration) );
																																																					
																																																						ctx.stroke();
																																																					}
																																																		
																																																		
																																													if		(tripDispHour == true)
																																																					{
																																																						textDuration++;
																																																						
																																																						var	plural			=	"s";
																																																						var	anythingElse	=	"";
																																																						
																																																						if	(tripDurMins == 1)
																																																												{
																																																													plural	=	"";
																																																												}
																																																												
																																																						if	(tripDurMins > 0)
																																																												{
																																																													var	anythingElse	=	",";
																																																												}
																																																					
																																																						ctx.beginPath();
																																																					
																																																								
																																																						ctx.lineTo		(0.5, ( (canvasHeight / 2) - 40) );
																																																						ctx.fillText	( (tripDurHours + " hour" + plural + anythingElse), (canvasWidth * 0.6), ( (canvasHeight / 2) + ( (textDuration / 2) * fontHeight) - (fontHeight * 0.6)) );
																																																						
																																																						ctx.stroke();
																																																						
																																																					}
																																																		
																																													if	(tripDispMin == true)
																																																				{	
																																																					var	plural	=	"s";
																																																					
																																																					if	(tripDurMins == 1)
																																																											{
																																																												plural	=	"";
																																																											}
																																																					
																																																					ctx.beginPath();
																																																				
																																																					ctx.lineTo		(0.5, ( (canvasHeight / 2) + 40) );
																																																						
																																																					ctx.fillText	( (tripDurMins + " min" + plural), (canvasWidth * 0.6), ( (canvasHeight / 2) + (fontHeight * (textDuration / 2) + (fontHeight * 0.4)) ));
																																																					
																																																					ctx.stroke();
																																																				}
																																													
																																													ctx.beginPath();
																																																				
																																													ctx.lineTo		(0.5, ( (canvasHeight / 2) + 40) );
																																														
																																													ctx.fillText	( "Duration:", (canvasWidth * 0.6), ( (canvasHeight / 2) - ( fontHeight * (textDuration / 2) ) - (fontHeight * 0.4) - textDuration) );
																																													
																																													ctx.stroke();
																																													
																																								ctx.drawImage (topGlare,   0, 0, canvasWidth, canvasHeight);				
																																								ctx.drawImage (horizBevel, 0, 0, canvasWidth, canvasHeight);

																							

																																							
																																							};
																														}
	
																else if	(vernierScale == "large")
																														{
																														
																															bkgrd.onload	=	function ()
																																							{
																																								ctx.drawImage		(bkgrd, 0, 0, canvasWidth, canvasHeight);
																																								
																																								fontHeight		=	Math.floor( (canvasWidth / 10) * 1.4 );
																																								textStylings	=	(fontHeight + "px " + fontFont);
																																								
																																								var	lineHt		=	(fontHeight * 0.65)
																																								
																																								ctx.font		=	textStylings;
																																								ctx.fillStyle	=	"#000000";
																																								
																																								ctx.fillText		("Date range is", 	(canvasWidth * 0.1), ( (canvasHeight / 2) - lineHt ) );
																																								ctx.fillText		("too large...", 	(canvasWidth * 0.1), ( (canvasHeight / 2) + lineHt ) );
																																								
																																								fontHeight		=	Math.floor(canvasWidth / 10);
																																								textStylings	=	(fontHeight + "px " + fontFont);
																																								ctx.font		=	textStylings;
																																								
																																								ctx.fillText		("Please select a", 	(canvasWidth * 0.1), ( (canvasHeight / 2) + (lineHt * 3) ) );
																																								ctx.fillText		("shorter duration.", 	(canvasWidth * 0.1), ( (canvasHeight / 2) + (lineHt * 5) ) );
																																								
																																								ctx.drawImage		(topGlare,   0, 0, canvasWidth, canvasHeight);
																																								ctx.drawImage		(horizBevel, 0, 0, canvasWidth, canvasHeight);
																																							}
																														}
																					
																else
																														{
																														
																															bkgrd.onload	=	function ()
																																							{
																																								ctx.drawImage		(bkgrd, 0, 0, canvasWidth, canvasHeight);
																																								
																																								var	lineHt		=	(fontHeight * 0.65)
																																								
																																								ctx.font		=	textStylings;
																																								ctx.fillStyle	=	"#000000";
																																								
																																								ctx.fillText		("Please select a", 	(canvasWidth * 0.1), ( 	canvasHeight / 2			 		)	);
																																								ctx.fillText		("start and end time", 	(canvasWidth * 0.1), ( (canvasHeight / 2) + (2 * lineHt) 	) 	);
																																								
																																								ctx.drawImage	(topGlare,   0, 0, canvasWidth, canvasHeight);
																																								ctx.drawImage	(horizBevel, 0, 0, canvasWidth, canvasHeight);
																																							}
																														}					
														}
							else						
														{
															alert('Your browser does not support the left-hand vernier');
														}							
					}
