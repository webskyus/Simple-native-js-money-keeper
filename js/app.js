'use strict';





// add all let 
let totalCalc = document.querySelector('#start');

// right box date 
let budgetValue     	= document.querySelector('.budget-value'),
		yearInput       	= document.querySelector('.year-value'),
		monthInput      	= document.querySelector('.month-value'),
		levelValueInput 	= document.querySelector('.level-value'),
		expensesItem 			= document.querySelectorAll('.expenses-item'),
		expensesValue 		= document.querySelector('.expenses-value'),
		optionalItem 			= document.querySelectorAll('.optionalexpenses-item'),
		optionalValue			= document.querySelector('.optionalexpenses-value'),
		optionalCalcBtn		= document.querySelector('.optionalexpenses-btn'),
		budgetCountBtn  	= document.querySelector('.count-budget-btn'),
		incomeItem				= document.querySelector('.choose-income'),
		incomeValue				= document.querySelector('.income-value'),
		saving            = document.getElementById('savings'),
		yearSaving        = document.querySelector('.yearsavings-value'),
		monthSaving        = document.querySelector('.monthsavings-value'),
		chooseSumValue 		= document.querySelector('.choose-sum'),
		choosePercntValue = document.querySelector('.choose-percent'),
		dayBudgetValue  	= document.querySelector('.daybudget-value'),
		requiredCalcBtn 	= document.querySelector('.expenses-item-btn'),
		dayInput        	= document.querySelector('.day-value');

// check total calc 
totalCalc.addEventListener('click', function() {

	// ask a question 
	let weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	let time = prompt('Введите дату в формате ГГ-ММ-ДД', ''),
			money = +prompt('Введите ваш бюджет', ''); 
	
			appData.budget = money;

	// question check 
	while (money == '' || isNaN(money) || money == null) {
		money = +prompt('Введите ваш бюджет', ''); 

		appData.budget = money;
	}

	// weekdays name 
	Date.prototype.getMonthName = function() {
		return weekdays[ this.getDay() ];
	};


	// total question add to input 
	appData.budget = money;
	appData.timeDate = time;

	yearInput.value = new Date(Date.parse(time)).getFullYear();
	monthInput.value = new Date(Date.parse(time)).getMonth() + 1;
	dayInput.value = new Date(Date.parse(time)).getMonthName();

	
	budgetValue.textContent = parseInt(money).toFixed() + ' ₽';
});


// daybudget and income level 
budgetCountBtn.addEventListener('click', function() {

	
	// income level 
	if(appData.budget != undefined) {

		// day budget input 
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay + ' ₽';

		if (appData.moneyPerDay > 0 && appData.moneyPerDay < 700) {
			levelValueInput.textContent = 'Low income level';
		} else if (appData.moneyPerDay > 701 && appData.moneyPerDay < 1000) {
			levelValueInput.textContent = 'Middle income level';
		} else if (appData.moneyPerDay > 1001 && appData.moneyPerDay < 2000) {
			levelValueInput.textContent = 'Pre middle income level';
		} else if (appData.moneyPerDay > 2001) {
			levelValueInput.textContent = 'High income level';
		} else {
			levelValueInput.textContent = 'Sorry but your input income date error, please check again';
		}

	}
});



// required expenses
requiredCalcBtn.addEventListener('click', function() {

	let sum = 0;

	for(let i = 0; i < expensesItem.length; i++) {

		let requiredInputName = expensesItem[i].value,
				requiredInputNumb = expensesItem[++i].value;

		if (requiredInputNumb != '' && requiredInputNumb != null && 
				requiredInputName != '' && requiredInputName != null && 
				(typeof(requiredInputName)) === 'string' && requiredInputName.length < 50) {
					appData.expenses[requiredInputName] = requiredInputNumb;
					sum += +requiredInputNumb ;
		} else {
					i = i - 1 ;
		}

		expensesValue.textContent = sum + ' ₽';

	}
	


});

// optional  expenses 
optionalCalcBtn.addEventListener('click', function() {
	for (let i = 0; i < optionalItem.length; i++) {
		let optionalValueResult = optionalItem[i].value;
		appData.optionalExpenses[i] = optionalValueResult;

		optionalValue.textContent += appData.optionalExpenses[i] + '';
	}
});

// possible income 
incomeItem.addEventListener('input', function() {
	let items = incomeItem.value;
	appData.income = items.split(' , ');

	incomeValue.textContent = appData.income;
	
});


// saving 
saving.addEventListener('input', function() {
	if (appData.saving == true) {
		appData.saving = false;
	}
	else {
		appData.saving = true;
	}
});

chooseSumValue.addEventListener('input', function() {
	if(appData.saving == true) {
		let sum = +chooseSumValue.value,
				percent = +choosePercntValue.value;

		appData.monthIncome = (sum / 100 / 12 * percent).toFixed();
		appData.yearIncome = (sum / 100  * percent).toFixed();

		yearSaving.textContent = appData.yearIncome + ' ₽';
		monthSaving.textContent = appData.monthIncome + ' ₽';

	}
});

choosePercntValue.addEventListener('input', function() {
	if(appData.saving == true) {
		let sum = +chooseSumValue.value,
				percent = +choosePercntValue.value;

		appData.monthIncome = (sum / 100 / 12 * percent).toFixed();
		appData.yearIncome = (sum / 100  * percent).toFixed();

		yearSaving.textContent = appData.yearIncome  + ' ₽';
		monthSaving.textContent = appData.monthIncome  + ' ₽';
	}
});



// add global object 
let money,
		time;

let appData = {
	budget: money,
	timeDate: time,
	expenses: {},
	income: {},
	optionalExpenses: {},
	saving: false,
}