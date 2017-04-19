/*========================================
=            CALC LIVE SALARY            =
========================================*/

var cls = {};
var salaryValue,
	salaryPerDayValue, 
	workHourValue,
	yearSalary,
	daySalary,
	hourSalary,
	minuteSalary,
	secondSalary;

cls.countSalaryPerSecondFullDay = function(){

	cls.dataNow = new Date($.now());
	
	var totalSeconds = ( cls.dataNow.getHours() * 3600 ) + ( cls.dataNow.getMinutes() * 60 ) + cls.dataNow.getSeconds();
	var liveSalary = cls.salaryPerSecondFullDay * totalSeconds;
	$('#salary-day.container .js-live-salary .js-actual-salary').text(Math.round(liveSalary * 1000) / 1000);

}

cls.countSalaryPerSecondWorkDay = function(){
	
	cls.dataNow = new Date($.now());
	var totalSeconds = ( cls.dataNow.getHours() * 3600 ) + ( cls.dataNow.getMinutes() * 60 ) + cls.dataNow.getSeconds();
	var liveSalary = cls.salaryPerSecondWorkDay * totalSeconds;
	$('#salary-work-day.container .js-live-salary .js-actual-salary').text(Math.round(liveSalary * 1000) / 1000);	
}

cls.calculateData = function(salary, workHour, workMonths){

	$('#salary-day.container .year-salary').text( Math.round( ( $(salary).val() ) * ( $(workMonths).val() ) ) );
	cls.salaryPerDayFullDay = Math.round( ( $(salary).val() ) / 21 );
	$('#salary-day.container .day-salary').text( cls.salaryPerDayFullDay);
	$('#salary-day.container .js-day-salary').text(cls.salaryPerDayFullDay);
	$('#salary-day.container .hour-salary').text( Math.round( ( $(salary).val() / 21 ) / 24 ) );
	$('#salary-day.container .minute-salary').text( Math.round( ( $(salary).val() / ( 21 * 24 * 60) )  * 100000 ) / 100000  );
	cls.salaryPerSecondFullDay = Math.round( $(salary).val() / ( 21 * 24 * 3600) * 100000 ) / 100000;
	$('#salary-day.container .second-salary').text( cls.salaryPerSecondFullDay );

	$('#salary-work-day.container .year-salary').text( Math.round( ( $(salary).val() ) * ( $(workMonths).val() ) ) );
	cls.salaryPerDayWorkDay = Math.round( ( $(salary).val() ) / 21 );
	$('#salary-work-day.container .day-salary').text( cls.salaryPerDayWorkDay );
	$('#salary-work-day.container .js-day-salary').text( cls.salaryPerDayWorkDay );
	$('#salary-work-day.container .hour-salary').text( Math.round( ( $(salary).val() / 21 ) / ( $(workHour).val() ) ) );
	$('#salary-work-day.container .minute-salary').text( Math.round( ( $(salary).val() / ( 21 * $(workHour).val() * 60) )  * 100000 ) / 100000  );
	cls.salaryPerSecondWorkDay = Math.round( $(salary).val() / ( 21 * $(workHour).val() * 3600) * 100000 ) / 100000;
	$('#salary-work-day.container .second-salary').text( cls.salaryPerSecondWorkDay );

	
	secondsSalary = Number($('#salary-day.container .second-salary').text());
	salaryValue = Number($('#salary').val());
	
	setInterval(function() {
		cls.countSalaryPerSecondFullDay();
		/*cls.countSalaryPerSecondWorkDay();*/
	}, 1000);
	
}

cls.getData = function(){
	
	$('.save-change').on('click', function() {

		workHourValue = $('#workHour').val();

		$('.js-work-hour').text(workHourValue);

		cls.calculateData('#salary', '#workHour', '#workMonths');
	});

}

cls.init = function(){

	$('.switcher-view').on('click', function(event) {
		event.preventDefault();
		var idToShow = $(this).attr('href');
		$('.info-container').removeClass('active');
		$('.info-container .container').fadeOut('500');
		$('.info-container'+idToShow).toggleClass('active');
		$('.info-container'+idToShow+' .container').fadeIn('500');
	});

	$('#modalData').modal('show');

	cls.getData();
}

$(document).ready(function() {
	cls.init();

	$('.settings').on('click', function() {
		$('#modalData').modal('show');
	});

	$('.info-container.active .container').fadeIn('500');

});
