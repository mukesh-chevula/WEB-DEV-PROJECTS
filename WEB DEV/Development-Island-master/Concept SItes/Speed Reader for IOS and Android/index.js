//index.js
$(function() {
    // Declare variable
    var elementsToShow = [];
    var elementsToHide = [];

    var myArray;
    var inputLength;
    var counter;
    var action;
    var percentage;

    var reading = false;
    var frequency = 200;

    // On page load hides elements we don't need, leave only text area and start button
    elementsToHide = ["#controls",
        "#new",
        "#resume",
        "#pause",
        "#result",
        "#error"
    ];
    showHide(elementsToShow, elementsToHide);

    // Click on Start Reading
    $("#start").click(function() {
        // Get text and split it into words inside an array
        // \s matches spaces, tabs, new lines etc and + means one of them
        myArray = $("#userInput").val().split(/\s+/);

        // Get number of words in array
        inputLength = myArray.length;

        if (inputLength > 1) // Enough input to process
        {
            reading = true;

            // Hide start, error message, user input
            // Show Controls/New/Pause/Resume buttons
            elementsToShow = [
                "#controls",
                "#new",
                "#pause",
                "#result"
            ];

            elementsToHide = [
                "#start",
                "#error",
                "#userInput"
            ];
            showHide(elementsToShow, elementsToHide);

            // Set progress slider max
            $("#progressSlider").attr("max", inputLength - 1);

            // Start the counter at 0
            counter = 0;

            // Show first word in reading box
            $("#result").text(myArray[counter]);

            // Start reading from the first word
            action = setInterval(read, frequency);
        } else {
            // Show not enough words error message
            showHide(["#error"], []);
        }
    });

    // Click on New
    $("#new").click(function() {
        // Reload page
        location.reload();
    });

    // Click on Pause
    $("#pause").click(function() {
        // Stop reading - switch off reading mode
        clearInterval(action);
        reading = false;

        // Hide pause button and show resume button
        showHide(["#resume"], ["#pause"]);
    });

    // Click on Resume
    $("#resume").click(function() {
        // Start reading and enable reading mode
        reading = true;
        action = setInterval(read, frequency);

        // Hide resume button and show pause button
        showHide(["#pause"], ["#resume"]);
    });

    // Change fontSize
    $("#fontSizeSlider").on("slidestop", function(event, ui) {
        // Refresh the fontSize slider
        $("#fontSizeSlider").slider("refresh");

        // Get the value of the slider and apply it
        var sliderValue = parseInt($("#fontSizeSlider").val());
        $("#result").css("fontSize", sliderValue);
        $("#fontSize").text(sliderValue);
    });

    // Change speed
    $("#speedSlider").on("slidestop", function(event, ui) {
        // Refresh the speedSlider slider
        $("#speedSlider").slider("refresh");

        // Get the value of the slider and apply it
        var sliderValue = parseInt($("#speedSlider").val());
        $("#speed").text(sliderValue);

        // Stop reading mode
        clearInterval(action);

        // Change frequency (ms / sliderValue)
        frequency = 60000 / sliderValue;

        // Resume reading if in reading mode
        if (reading) {
            action = setInterval(read, frequency);
        }
    });

    // Progress Slider

    // Change speed
    $("#progressSlider").on("slidestop", function(event, ui) {
        // Refresh the progressSlider slider
        $("#progressSlider").slider("refresh");

        // Get the value of the slider
        var sliderValue = parseInt($("#progressSlider").val());

        // Stop reading mode
        clearInterval(action);

        // Change counter
        counter = sliderValue;

        // Change word
        $("#result").text(myArray[counter]);

        // Change progress percentage value
        percentage = Math.floor(counter / (inputLength - 1) * 100);
        $("#percentage").text(percentage);

        // Resume reading if in reading mode
        if (reading) {
            action = setInterval(read, frequency);
        }
    });

    // Functions

    // Show Hide function
    function showHide(array1, array2) {
        for (i = 0; i < array1.length; i++) {
            $(array1[i]).show();
        }

        for (i = 0; i < array2.length; i++) {
            $(array2[i]).hide();
        }
    }

    // Read
    function read() {
        if (counter == inputLength - 1) {
            // Last word
            clearInterval(action);

            // Move to no reading mode
            reading = false;

            // Hide pause button
            showHide([], ["#pause"]);
        } else {
            // Counter goes up by 1
            counter++;

            // Get next word
            $("#result").text(myArray[counter]);

            // Change value of progress slider and refresh it
            $("#progressSlider").val(counter);
            $("#progressSlider").slider("refresh");

            // Calculate and change frequency percentage
            percentage = Math.floor(counter / (inputLength - 1) * 100);
            $("#percentage").text(percentage);
        }

    }
});