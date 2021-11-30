$(document).ready(function () {
  // Getting references to our form and input
  const signupForm = $("form#signup");
  const emailInput = $("input#userEmail");
  const passwordInput = $("input#userPassword");
  const emailHelp = $("small#emailHelp");
  const passwordError = $("small#passwordError");

  // When the signup button is clicked, we validate the email and password are not blank
  signupForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    // Throw errors if information is missing
    if (!userData.email) {
      emailInput.attr("style", "border-color: red");
      emailHelp.attr("class", "error");
      emailHelp.text("Please enter an email");
      if (!userData.password) {
        passwordInput.attr("style", "border-color: red");
        passwordError.text("Please enter a password");
      }
      return;
    }

    // If we have an email and password, run the signUpUser function
    signupUser(userData.email, userData.password);
    emailInput.val("");
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

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signupUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password,
    })
      .then(function (data) {
        location.replace("/gym");
      })
      // If there's an error, handle it with the error function
      .catch(handleSignupErr);
  }

  function handleSignupErr(err) {
    alert(`Error code ${err.status}: ${err.statusText}`);
  }
});
