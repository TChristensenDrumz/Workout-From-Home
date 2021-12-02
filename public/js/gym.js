$(document).ready(function () {
  const inputs = $("input[type='checkbox']");
  const submit = $("#submit");
  const equipmentError = $("small#equipment-error");

  loadEquipment();

  submit.on("click", function (event) {
    event.preventDefault();

    $.get("/api/userData").then(function (data) {
      console.log(data);
      let count = 0;
      let equipment = [];
      for (let i = 0; i < inputs.length; i++) {
        if ($(inputs[i]).is(":checked")) {
          equipment.push($(inputs[i]).val());
          count++;
        }
      }

      if (equipment.indexOf("None") > 0) {
        equipmentError.attr("class", "error");
        equipmentError.text(
          "Please only select 'None' if no other equipment is selected"
        );
        return;
      }

      if (count === 0) {
        equipmentError.attr("class", "error");
        equipmentError.text("Please select one or more equipment options");
        return;
      }

      equipment = JSON.stringify(equipment);
      data.equipment = equipment;
      updateUser(data);
    });
  });

  function loadEquipment() {
    $.get("/api/userData").then(function (data) {
      if (data.equipment === "N/A") {
        return;
      }

      let equipment = JSON.parse(data.equipment);

      for (let i = 0; i < inputs.length; i++) {
        if (equipment.includes($(inputs[i]).val())) {
          $(inputs[i]).prop("checked", true);
        }
      }
    });
  }

  function updateUser(request) {
    $.ajax({
      url: "/api/userData",
      data: request,
      method: "PUT",
    }).then(() => {
      equipmentError.attr("class", "success");
      equipmentError.text("Equipment updated!");
    });
  }
});
