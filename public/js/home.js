$(document).ready(function () {
  const customaryButton = $("button#customary");
  const metricButton = $("button#metric");
  const heightMeasure = $("input#bmi-height");
  const weightMeasure = $("input#bmi-weight");
  const inches = $("input#bmi-height-us");
  const calculate = $("button#bmi-calculate");
  const result = $("h6#bmi");

  customaryButton.on("click", function (event) {
    event.preventDefault();

    customaryButton.addClass("active");
    heightMeasure.prop("placeholder", "Feet");
    weightMeasure.prop("placeholder", "Pounds");
    inches.removeAttr("style");
    metricButton.removeClass("active");
  });

  metricButton.on("click", function (event) {
    event.preventDefault();

    metricButton.addClass("active");
    heightMeasure.prop("placeholder", "Meters");
    weightMeasure.prop("placeholder", "Kilograms");
    inches.attr("style", "display: none");
    customaryButton.removeClass("active");
  });

  calculate.on("click", function (event) {
    event.preventDefault();

    result.removeAttr("style");

    if (!heightMeasure.val() || !weightMeasure.val()) {
      result.attr("style", "color:red");
      result.text("Please fill out all fields");
      return;
    }

    if (customaryButton.hasClass("active")) {
      if (!inches.val()) {
        result.attr("style", "color:red");
        result.text("Please fill out all fields");
        return;
      }

      const allInches =
        parseInt(heightMeasure.val()) * 12 + parseInt(inches.val());

      const bmi = (weightMeasure.val() / Math.pow(allInches, 2)) * 703;
      result.text(`Your BMI is ${bmi.toFixed(2)}`);
      return;
    }

    const bmi = weightMeasure.val() / Math.pow(heightMeasure.val(), 2);
    result.text(`Your BMI is ${bmi.toFixed(2)}`);
    return;
  });
});
