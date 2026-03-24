document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enrollForm");
  const popup = document.getElementById("paymentPopup");
  const closePaymentPopup = document.getElementById("closePaymentPopup");

  const selectedCourse = document.getElementById("selectedCourse");
  const courseNameInput = document.getElementById("courseName");

  const params = new URLSearchParams(window.location.search);
  const course = params.get("course") || "Not selected";

  if (selectedCourse) selectedCourse.textContent = course;
  if (courseNameInput) courseNameInput.value = course;

  const scriptURL = "https://script.google.com/macros/s/AKfycbww91QgPIRuMwEgFtLON_qkhpudzIO4q25ae8XjSRDDJRgc4y8pzkkPR-06V5eNR1bkjQ/exec";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const payload = new FormData();
    payload.append("course", document.getElementById("courseName").value.trim());
    payload.append("fullName", document.getElementById("fullName").value.trim());
    payload.append("location", document.getElementById("location").value.trim());
    payload.append("email", document.getElementById("email").value.trim());
    payload.append("phone", document.getElementById("phone").value.trim());
    payload.append("mode", document.getElementById("mode").value);
    payload.append("comment", document.getElementById("comment").value.trim());

    if (
      !payload.get("fullName") ||
      !payload.get("location") ||
      !payload.get("email") ||
      !payload.get("phone") ||
      !payload.get("mode")
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: payload
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Server did not return valid JSON.");
      }

      if (result.result === "success") {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";
        form.reset();

        if (selectedCourse) selectedCourse.textContent = course;
        if (courseNameInput) courseNameInput.value = course;
      } else {
        console.error(result);
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while submitting the form.");
    }
  });

  function closePopup() {
    popup.style.display = "none";
    document.body.style.overflow = "";
  }

  if (closePaymentPopup) {
    closePaymentPopup.addEventListener("click", closePopup);
  }

  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) closePopup();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });
});