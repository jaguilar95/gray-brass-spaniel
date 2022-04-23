var currentDate = moment().format("MMMM Do YYYY");
var currentHour = moment().format("H");
var saveDiv = document.getElementsByClassName("save");

// hourly object for text
var schedule = {
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
};

var setCurrentDate = function () {
  $("#currentDay").text(currentDate);
};

// activate form-control when clicking p element
$(".hour-text").on("click", "p", function () {
  // clickable area declaration
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(text);

  // replace p element with form-control
  $(this).replaceWith(textInput);

  // trigger focus for user
  textInput.trigger("focus");
});

// when clicking out of element, update text
$(".hour-text").on("blur", "textarea", function () {
  // get the updated text
  var text = $(this).val().trim();

  // get the parent div id
  var hour = $(this).closest(".hour-text").attr("id");

  // set text to value in schedule object
  schedule[hour] = text;

  saveSchedule();

  // recreate p element and replace
  var hourP = $("<p>").addClass("h-50 text-white").text(text);
  $(this).replaceWith(hourP);
});

// var saveHandler = function (event) {
//   console.log(event.target);
// };

var saveSchedule = function () {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem("schedule"));

  if (!schedule) {
    schedule = {
      8: "",
      9: "",
      10: "",
      11: "",
      12: "",
      13: "",
      14: "",
      15: "",
      16: "",
      17: "",
    };
  }

  Object.keys(schedule).forEach((hour) => {
    var hourTextElement = document.getElementById(hour);

    hourTextElement.firstElementChild.textContent = schedule[hour];
  });
};

var auditHour = function (hourEl) {
  // get hour from hour ID
  var hourBlock = hourEl.id;

  // find difference between current hour and hourBlock
  var hourDifference = hourBlock - currentHour;

  // remove old classes
  $(hourBlock).removeClass("bg-secondary");

  // change background color based on time
  if (hourDifference > 0 && hourDifference) {
    $(hourEl).addClass("bg-success");
  } else if (hourDifference === 0) {
    $(hourEl).addClass("bg-danger");
  } else if (hourDifference < 0) {
    $(hourEl).addClass("bg-secondary");
  }
};

setInterval(setCurrentDate, 1000 * 60);

$(".hour-text").each(function (index, el) {
  auditHour(el);
});

setInterval(function () {
  $(".hour-text").each(function (index, el) {
    auditHour(el);
  });
}, 1000);

// saveDiv.addEventListener("click", saveHandler);
setCurrentDate();
loadSchedule();
