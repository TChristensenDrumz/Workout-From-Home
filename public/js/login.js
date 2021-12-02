$(document).ready(function () {
  // Getting references to our form and input
  const loginForm = $("form#login");
  const emailInput = $("input#userEmail");
  const passwordInput = $("input#userPassword");
  const emailHelp = $("small#emailHelp");
  const passwordError = $("small#passwordError");

  // When the signup button is clicked, we validate the email and password are not blank
  loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    emailHelp.text("");
    passwordError.text("");

    // Throw errors if information is missing
    if (!userData.email) {
      emailInput.attr("style", "border-color: red");
      emailHelp.text("Please enter an email");
      if (!userData.password) {
        passwordInput.attr("style", "border-color: red");
        passwordError.text("Please enter a password");
      }
      return;
    }

    if (!userData.password) {
      passwordInput.attr("style", "border-color: red");
      passwordError.text("Please enter a password");
      return;
    }

    // If we have an email and password, run the loginUser function
    loginUser(userData.email, userData.password);
    passwordInput.val("");
  });

  emailInput.on("click", function (event) {
    event.preventDefault();
    emailInput.removeAttr("style");
  });

  passwordInput.on("click", function (event) {
    event.preventDefault();
    passwordInput.removeAttr("style");
  });

  // Does a post to the login route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then(function (data) {
        emailInput.val("");
        location.replace("/home");
      })
      // If there's an error, handle it with the error function
      .catch(handleLoginErr);
  }

  function handleLoginErr() {
    passwordError.text("Incorrect email or password");
  }
});
