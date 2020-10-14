$(document).ready(() => {
    var mydata = JSON.parse(JSON.stringify(array))
    var choice = ""
    var clientName = ""
    var arrayOfAnswers = []

    //Email Validator
    function ValidateEmail(inputText) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    }


    //This is for the timer
    var minutes = 14;
    var seconds = 59;
    function timer() {
        setInterval(() => {
            if (seconds == 0 && minutes == 0) {
                alert("Time is up!")
                $("#countdown").hide()
            }
            $("#countdown").text("Time Remaining  " + minutes + ":" + seconds)
            seconds--;
            if (seconds == 0) {
                minutes = minutes - 1
                seconds = 59
            }
        }, 1000)
    }

    //This is for the created function
    $("#nextButton").hide()
    $("#submitButton").hide()
    $("#submitAnswers").hide()
    $("form").hide()
    $.fn.showAnswer = function (index, value) {
        $("#submitButton").show()
        choice = mydata[index].answers[value]
    }
    var numberOfQuestion = 0
    var counter = 0




    //This is for showing the questionare
    $("#button").click(() => {
        if (document.getElementById("clientName").value != "") {
            console.log(ValidateEmail(document.getElementById("clientName").value))
            if (ValidateEmail(document.getElementById("clientName").value)) {
                $("#submitAnswers").hide()
                $("#submitButton").hide()
                $("form").show()
                $("#clientName").hide()
                $(".Email").hide()
                $("h1").hide()
                clientName = document.getElementById("clientName").value
                timer()
                $("#button").hide()
                $("#nextButton").show()

                document.getElementById('questions').innerHTML = mydata[numberOfQuestion].question;
                $("#choices").append("<hr>" + "<ul></ul>");
                for (var i in mydata[numberOfQuestion].answers) {
                    counter += 1
                    var li = "<br><br><input id='choice" + counter + "' type='radio' name='choices' onclick=$.fn.showAnswer(" + numberOfQuestion + "," + i + ")>";
                    $("ul").append(li.concat(mydata[numberOfQuestion].answers[i]))
                }
            }else{
                document.getElementById("clientName").value="";
                alert("You've enter an invalid Email!")
            }
        } else {
            alert("Email is required!")
        }
    })



    //This is for showing the next question
    $("#nextButton").click(() => {
        numberOfQuestion += 1
        $("ul").hide()
        document.getElementById('questions').innerHTML = mydata[numberOfQuestion].question
        $("#choices").append("<ul></ul>");
        for (var i in mydata[numberOfQuestion].answers) {
            counter += 1
            var li = "<br><br><input id='choice" + counter + "' type='radio' name='choices' onclick=$.fn.showAnswer(" + numberOfQuestion + "," + i + ")>";
            $("ul").append(li.concat(mydata[numberOfQuestion].answers[i]))
        }
        console.log(arrayOfAnswers)
    })



    //Getting all the answers from user
    $("#submitButton").click(() => {
        $("#submitButton").hide()
        arrayOfAnswers.push(choice)
        choice = ""
        numberOfQuestion += 1
        $("ul").hide()
        var mydata = JSON.parse(JSON.stringify(array))
        document.getElementById('questions').innerHTML = mydata[numberOfQuestion].question
        $("#choices").append("<ul></ul>");
        for (var i in mydata[numberOfQuestion].answers) {
            counter += 1
            var li = "<br><br><input id='choice" + counter + "' type='radio' name='choices' onclick=$.fn.showAnswer(" + numberOfQuestion + "," + i + ")>";
            $("ul").append(li.concat(mydata[numberOfQuestion].answers[i]))
        }
        var numbersOfAnswers = arrayOfAnswers.length + 1
        $("#numberToAnswer").text(numbersOfAnswers + " out of 50")
        if (arrayOfAnswers.length == 50 || (minutes == 0 && seconds == 0) ) {
            alert("Thank you for answering all the exams!")
            $("form").hide()
            $("#submitAnswers").show()
            $("#nextButton").hide()
            $(".time").hide()
        }
    })



    //Submit answers
    $("#submitAnswers").click(() => {
        $.ajax({
            type: 'POST',
            url: 'https://msquestions.herokuapp.com/addAnswers',
            data: JSON.stringify({ name: clientName, answers: arrayOfAnswers }), // or JSON.stringify ({name: 'jonas'}),
            success: (data) => {
                alert("Thank you for taking the exam, just wait for the result, we will call you about the result of your exam!");
                $("p").hide()
                $("#nextButton").hide()
                $("#submitButton").hide()
                $("#button").show()
                $("#clientName").show()
                $("#submitAnswers").hide()
                $("h1").show()
            },
            contentType: "application/json",
            dataType: 'json'
        });
    })
})
