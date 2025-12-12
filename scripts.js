// Sync slider and input box for project size
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('projectSizeSlider');
    const input = document.getElementById('projectSizeInput');
    const sizeLabel = document.getElementById('sizeLabel');

    if (slider && input) {
        slider.oninput = function () {
            input.value = this.value;
        };
        input.oninput = function () {
            slider.value = this.value;
        };
    }

    const projectTypeField = document.getElementById('projectType');
    if (projectTypeField && sizeLabel) {
        projectTypeField.addEventListener('change', function () {
            if (this.value.includes('Sunroom')) {
                sizeLabel.innerText = "(Measured in Linear Feet)";
            } else {
                sizeLabel.innerText = "(Measured in Square Feet)";
            }
        });
    }

    const emailField = document.querySelector('input[name="email"]');
    const replyToField = document.getElementById('hiddenReplyTo');
    if (emailField && replyToField) {
        emailField.addEventListener('input', function () {
            replyToField.value = this.value;
        });
    }

    const form = document.getElementById('estimateForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            generateEstimate();
            submitToFormspree();
        });
    }
});

// Generate estimate and store it
function generateEstimate() {
    const projectType = document.getElementById('projectType').value;
    const finishQuality = document.getElementById('finishQuality').value;
    const size = Number(document.getElementById('projectSizeInput').value);

    if (!projectType || !finishQuality || size <= 0) {
        alert("Please complete all required fields and select a valid project size.");
        return;
    }

    let pricePerUnit = 0;

    switch (projectType) {
        case "Custom Home": pricePerUnit = 160; break;
        case "Custom Garage": pricePerUnit = 150; break;
        case "Custom Home Addition": pricePerUnit = 200; break;
        case "Glass Sunroom (Walls Only)": pricePerUnit = 350; break;
        case "Eze-Breeze Sunroom (Walls Only)": pricePerUnit = 250; break;
    }

    let estimate = pricePerUnit * size;
    if (finishQuality === "High-End") estimate *= 1.2;

    const low = Math.round(estimate * 0.95);
    const high = Math.round(estimate * 1.10);
    const formatted = `$${low.toLocaleString()} – $${high.toLocaleString()}`;

    localStorage.setItem('estimateAmount', formatted);
    localStorage.setItem('projectType', projectType);
}

// Send form, then redirect manually
function submitToFormspree() {
    const formData = new FormData(document.getElementById('estimateForm'));

    fetch('https://formspree.io/f/xzzelklv', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).finally(() => {
        window.location.href = 'thank-you.html';
    });
}

// Thank You page loader
document.addEventListener('DOMContentLoaded', function () {
    const estimateEl = document.getElementById('estimateAmount');
    if (!estimateEl) return;

    const estimate = localStorage.getItem('estimateAmount');
    const projectType = localStorage.getItem('projectType');

    if (estimate) {
        estimateEl.innerText = estimate;
    }

    const timelineMap = {
        "Custom Home": "Typical Build Timeline: 8–12 months.",
        "Custom Garage": "Typical Build Timeline: 4–6 months.",
        "Custom Home Addition": "Typical Build Timeline: 6–9 months.",
        "Glass Sunroom (Walls Only)": "Typical Build Timeline: 3–5 months.",
        "Eze-Breeze Sunroom (Walls Only)": "Typical Build Timeline: 2–4 months."
    };

    document.getElementById('projectTimeline').innerText =
        timelineMap[projectType] || "Timeline varies based on project type.";

    const saveBtn = document.getElementById('saveEstimateButton');
    if (saveBtn && estimate) {
        saveBtn.href =
            `mailto:?subject=Your New Castle Estimate&body=Your estimate range is ${estimate}`;
    }
});
