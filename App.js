var birthDate = document.querySelector("#birth-date");
var btnCheck = document.querySelector("#check-btn");
var outputDiv = document.querySelector(".show-output");
outputDiv.style.display="none";

// function to reverse a string
function reverseStr(str) {
    var listOfChars = str.split('');
    var reversedListOFChars = listOfChars.reverse();
    var reversedStr = reversedListOFChars.join('');
    return reversedStr;
}

// function to check palindrome
function checkPalindrome(str) {
    var reverse = reverseStr(str);
    if (str === reverse) {
        return true;
    }
    return false;
}

// function to convert date into a string
function convertDateToString(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    }

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;

}

// function which returns different formats of date
function getAllDateFormats(date) {
    var dateString = convertDateToString(date);
    var ddmmyyyy = dateString.day + dateString.month + dateString.year;
    var mmddyyyy = dateString.month + dateString.day + dateString.year;
    var yyyymmdd = dateString.year + dateString.month + dateString.day;
    var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// function to check palindrome for all date formats
function checkPalindromeForAllDateFormats(date) {
    var listOfDateFormats = getAllDateFormats(date);
    var dateIsPalindrome = false;

    for (var i = 0; i < listOfDateFormats.length; i++) {
        if (checkPalindrome(listOfDateFormats[i])) {
            dateIsPalindrome = true;
            break;
        }
    }
    return dateIsPalindrome;
}

// function which tells the nearest palindrome date
function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);
    while (1) {
        counter++;
        var nextDateIsPalindrome = checkPalindromeForAllDateFormats(nextDate);

        if (nextDateIsPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

// function which takes a date, increments a day and returns next date
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } 
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } 
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

// Leap year function
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// adding eventlistener to check button
btnCheck.addEventListener("click", clickHandler);

function clickHandler(e){
    
    var bdayString = birthDate.value;
    if(bdayString == ""){
        displayOutputDiv("Please select a valid birthdate from the input-box");
    }
    else{
        var dateWithoutHyphen = bdayString.split("-");
        var date = {
            day : Number(dateWithoutHyphen[2]),
            month : Number(dateWithoutHyphen[1]),
            year : Number(dateWithoutHyphen[0])
        };

        var dateIsPalindrome = checkPalindromeForAllDateFormats(date);
        if(dateIsPalindrome){
            displayOutputDiv("Hurray! your Birthday is a Palindrome🥳");
            
        }
        else{
            var [ counter, nextDate] = getNextPalindromeDate(date);
            displayOutputDiv(`Uh Ooh, your Birthday is not a Palindrome😐,
            The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you were born ${counter} days earlier.`);
        }
    }
}

//function to show outputDiv
function displayOutputDiv(text){
    outputDiv.style.display="block";
    outputDiv.innerText= text;
}



