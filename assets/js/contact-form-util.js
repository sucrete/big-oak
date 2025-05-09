(function () {
  emailjs.init("bgPMvjgJ9C-HJ3z9j");
})();

const btn = document.getElementsByClassName("button-text")[0];
const firstName = document.getElementById("name");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btn.textContent = "Sending...";

    const serviceID = "default_service";
    const templateID = 'template_4pmlvtj';

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.textContent = "Send Message";
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        phone.value = "";
        message.value = "";
        alert("Message Sent");
      },
      (err) => {
        btn.textContent = "Send Message";
        alert(JSON.stringify(err));
      }
    );
  });
