console.log("Client-side running");

const button = document.getElementById("searchButton");
button.addEventListener("click", () => {
  console.log("button click");

  // get number
  let selectOption = document.getElementById("numberofstockselect");
  fetch("/clicked", { method: "POST" })
    .then((res) => {
      if (res.ok) {
        console.log("Successful Click");
        return;
      }
      throw new Error("Request Failed");
    })
    .catch((err) => {
      console.log(err);
    });
});
