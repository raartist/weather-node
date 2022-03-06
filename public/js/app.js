console.log("client side javascript file");

var form = document.querySelector("form");
var searchString = document.querySelector("input");
var msg1 = document.getElementById("message-1");
var msg2 = document.getElementById("message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchString.value;
  msg1.textContent = "loading..." + value + " forecast";
  msg2.textContent = "";
  fetch("/weather?address=" + value)
    .then((res) => res.json())
    .then((result) => {
      if (result.message) {
        msg1.textContent = "";
        return (msg2.textContent = result.message);
      }
      msg1.textContent = result.geocodeRes.location;
      msg2.textContent = result.forecast;
    })
    .catch((err) => {
      msg2.textContent = err.message;
      msg1.textContent = "";
    });
});
