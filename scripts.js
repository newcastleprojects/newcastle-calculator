document.addEventListener('DOMContentLoaded', function () {

    const slider = document.getElementById('projectSizeSlider');
    const input = document.getElementById('projectSizeInput');
    const sizeLabel = document.getElementById('sizeLabel');

    slider.oninput = () => input.value = slider.value;
    input.oninput = () => slider.value = input.value;

    document.getElementById('projectType').addEventListener('change', function () {
        sizeLabel.innerText = this.value.includes('Sunroom')
            ? "(Measured in Linear Feet)"
            : "(Measured in Square Feet)";
    });

    const emailField = document.querySelector('input[name="email"]');
    const replyToField = document.getElementById('hiddenReplyTo');
    emailField.addEventListener('input', () => {
        replyToField.value = emailField.value;
    });

    document.getElementById('calculateEstimateBtn')
        .addEventListener('click', calculateAndShowEstimate);
});

function calculateAndShowEstimate() {

    const projectType = document.getElementById('projectType').value;
    const finishQuality = document.getElementById('finishQuality').value;
    const size = Number(document.getElementById('projectSizeInput').value);

    if (!projectType || !finishQuality || size <= 0) {
        alert("Please complete all required project details.");
        return;
    }

    let rate = {
        "Custom Home": 160,
        "Custom Garage": 150,
        "Custom Home Addition": 200,
        "Glass Sunroom (Walls Only)": 350,
        "Eze-Breeze Sunroom (Walls Only)": 250
    }[projectType];

    let base = rate * size;
    if (finishQuality === "High-End") base *= 1.2;

    const low = Math.round(base * 0.95);
    const high = Math.round(base * 1.10);

    const estimateBox = document.getElementById('inlineEstimate');
    estimateBox.innerHTML = `
      <h3>Your Estimated Project Cost Range:</h3>
      <strong>$${low.toLocaleString()} – $${high.toLocaleString()}</strong>
      <p style="margin-top:10px;font-size:14px;color:#555;">
        To receive your full estimate by email, continue below.
      </p>
    `;
    estimateBox.style.display = "block";

    document.getElementById('finalSubmitWrapper').style.display = "block";

    estimateBox.scrollIntoView({ behavior: "smooth" });
}
