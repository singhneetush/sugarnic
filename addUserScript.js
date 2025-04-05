document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  const pristine = new Pristine(form, {
    classTo: "space-y-3",
    errorClass: "text-red-600",
    successClass: "text-green-600",
    errorTextParent: "space-y-3",
    errorTextTag: "div",
    errorTextClass: "text-sm text-red-600 mt-1",
  });

  const firstName = form.querySelector('input[placeholder="First Name"]');
  const lastName = form.querySelector('input[placeholder="Last Name"]');
  const role = form.querySelector("select[name=role]");
  const email = form.querySelector('input[type="email"]');
  const phone = form.querySelector('input[type="tel"]');
  const password = form.querySelector('input[placeholder="Enter password"]');
  const confirmPassword = form.querySelector(
    'input[placeholder="Confirm password"]'
  );
  const phoneInput = document.querySelector("#phone");

  pristine.addValidator(
    firstName,
    (value) => value.trim().length >= 2,
    "First name must be at least 2 characters."
  );
  pristine.addValidator(
    lastName,
    (value) => value.trim().length >= 2,
    "Last name must be at least 2 characters."
  );
  pristine.addValidator(
    role,
    (value) => value !== "select-role",
    "Please select roles"
  );
  pristine.addValidator(
    email,
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Invalid email address."
  );
  pristine.addValidator(
    phone,
    (value) => /^\+?[1-9][0-9]{7,14}$/.test(value),
    "Invalid mobile number."
  );
  pristine.addValidator(
    password,
    (value) => value.length > 0,
    "Please enter password",
    1
  );

  pristine.addValidator(
    confirmPassword,
    (value) => value.length > 0,
    "Please enter your confirmed password",
    1
  );
  pristine.addValidator(
    confirmPassword,
    (value) => value === password.value,
    "Passwords do not match.",
    2
  );

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      const formData = new FormData(form);
      const data = {};

      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      console.log("Form Data:", data);
      form.reset();
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(data);
      localStorage.setItem("users", JSON.stringify(users));

      window.location.href = "index.html";
    }
  });
});
