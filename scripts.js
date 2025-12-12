document.addEventListener('DOMContentLoaded', function () {

    const slider = document.getElementById('projectSizeSlider');
    const input = document.getElementById('projectSizeInput');
    const sizeLabel = document.getElementById('sizeLabel');

    if (slider && input) {
        slider.oninput = () => input.value = slider.value;
        input.oninput = () => slider.value = input.value;
    }

    const projectTypeField = document.getElementById('projectType');
    if (projectTypeField && sizeLabel) {
        projectTypeField.addEventListener('change', function () {
            sizeLabel.innerText = this.value.includes('Sunroom')
                ? "(Measured in Linear Feet)"
                : "(Measured in Square Feet)";
        });
    }

    const emailField = document.querySelector('input[name="email"]');
    const replyToField = document.getElementById('hiddenReplyTo');
    if (emailField && replyToField) {
        emailField.addEventListener('input', () => {
            replyToField.value = emailField.value;
        });
    }

    // Two-step flow: calculate first (no submit)
    const calcBtn = document.getElementById('calculateEstimateBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', function () {
            showInlineEstimateAndRevealSubmit();
        });
    }
});

function showInlineEstimateAndRevealSubmit() {
    const projectTypeEl = document.getElementById('projectType');
    const finishQualityEl = document.getElementById('finishQuality');
    const sizeEl = document.getElementById('projectSizeInput');

    // If this page doesn't have the calculator (e.g., thank-you page), exit safely
    if (!projectTypeEl || !finishQualityEl || !sizeEl) return;

    const projectType = projectTypeEl.value;
    const finishQuality = finishQualityEl.value;
    const size = Number(sizeEl.value);

    if (!projectType || !finishQuality || size <= 0) {
        alert("Please complete all required project details.");
        return;
    }

    let rate = 0;
    switch (projectType) {
        case "Custom Home": rate = 160; break;
        case "Custom Garage": rate = 150; break;
        case "Custom Home Addition": rate = 200; break;
        case "Glass Sunroom (Walls Only)": rate = 350; break;
        case "Eze-Breeze Sunroom (Walls Only)": rate = 250; break;
    }

    let base = rate * size;
    if (finishQuality === "High-End") base *= 1.2;

    const low = Math.round(base * 0.95);
    const high = Math.round(base * 1.10);

    const estimateBox = document.getElementById('inlineEstimate');
    if (!estimateBox) return;

    estimateBox.innerHTML = `
        <h3 style="margin-top:20px;">Your Estimated Project Cost Range:</h3>
        <strong>$${low.toLocaleString()} – $${high.toLocaleString()}</strong>
        <p style="margin-top:10px;font-size:14px;color:#555;">
            To receive your full estimate by email, click the button below.
        </p>
    `;
    estimateBox.style.display = "block";

    const finalWrapper = document.getElementById('finalSubmitWrapper');
    if (finalWrapper) finalWrapper.style.display = "block";

    estimateBox.scrollIntoView({ behavior: "smooth" });
}
