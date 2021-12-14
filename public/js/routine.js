$(document).ready(function () {
  $.get("/api/getExercises").then(function (data) {
    const exercises = data.exercises;
    console.log(exercises);
    for (let i = 0; i < exercises.length; i++) {
      const exercise_name = exercises[i].exercise_name;
      const category = exercises[i].category;
      const equipment = exercises[i].equipment;

      const div = $("<div>");
      const exerciseName = $("<h3>").text(exercise_name);
      const divEquipment = $("<div>").text(`Equipment: ${equipment}`);

      const nameNoSpaces = exercise_name
        .trim()
        .split(" ")
        .join("")
        .toLowerCase();
      const img = $("<img>")
        .attr("src", "../assets/images/gifs/" + nameNoSpaces + ".gif")
        .attr("width", "250px");
      const imgDiv = $("<div>");

      img.appendTo(imgDiv);

      exerciseName.attr("class", "subtitle");
      div.append(exerciseName);
      div.append(divEquipment);
      div.append(imgDiv);
      div.append("_______________________________");

      const bodyPart = $("#" + category);
      bodyPart.append(div);
    }
  });
});
