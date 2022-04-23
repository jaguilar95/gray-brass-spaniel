var currentDate = moment().format("MMMM Do YYYY");

// hourly object for text
var schedule = {
  eight: "",
  nine: "",
  ten: "",
  eleven: "",
  twelve: "",
  one: "",
  two: "",
  three: "",
  four: "",
  five: "",
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

  schedule[hour] = text;

  saveSchedule();
});

var saveSchedule = function () {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem("schedule"));

  Object.keys(schedule).forEach((hour) => {
    var hourTextElement = document.getElementById(hour);
    // debugger;
    hourTextElement.firstElementChild.textContent = schedule[hour];
    // hourTextElement.textContent = schedule[hour];
  });
};

setInterval(setCurrentDate, 1000 * 60);

setCurrentDate();
loadSchedule();
