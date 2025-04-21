// Sync slider and input box for project size
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('projectSizeSlider');
    const input = document.getElementById('projectSizeInput');
    const sizeLabel = document.getElementById('sizeLabel');

    if (slider && input) {
        slider.oninput = function() {
            input.value = this.value;
        };
        input.oninput = function() {
            slider.value = this.value;
        };
    }

    const projectTypeField = document.getElementById('projectType');
    if (projectTypeField && sizeLabel) {
        projectTypeField.addEventListener('change', function() {
            const projectType = this.value;
            if (projectType.includes('Sunroom')) {
                sizeLabel.innerText = "(Measured in Linear Feet)";
            } else {
                sizeLabel.innerText = "(Measured in Square Feet)";
            }
        });
    }

    const emailField = document.querySelector('input[name="Email"]');
    const replyToField = document.getElementById('hiddenReplyTo');
    if (emailField && replyToField) {
        emailField.addEventListener('input', function() {
            replyToField.value = this.value;
        });
    }

    const form = document.getElementById('estimateForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            generateEstimate();
            sendFormData();
        });
    }
});

// Function to generate estimate and redirect
function generateEstimate() {
    const projectType = document.getElementById('projectType').value;
    const finishQuality = document.getElementById('finishQuality').value;
    const size = document.getElementById('projectSizeInput').value;

    if (!projectType || !finishQuality || size <= 0) {
        alert("Please complete all required fields and select a valid project size.");
        return;
    }

    let pricePerUnit = 0;

    switch (projectType) {
        case "Custom Home":
            pricePerUnit = 160;
            break;
        case "Custom Garage":
            pricePerUnit = 150;
            break;
        case "Custom Home Addition":
            pricePerUnit = 200;
            break;
        case "Glass Sunroom (Walls Only)":
            pricePerUnit = 350;
            break;
        case "Eze-Breeze Sunroom (Walls Only)":
            pricePerUnit = 250;
            break;
    }

    let baseEstimate = pricePerUnit * size;

    if (finishQuality === "High-End") {
        baseEstimate *= 1.2; // +20% for high-end finishes
    }

    const lowEstimate = Math.round(baseEstimate * 0.95);
    const highEstimate = Math.round(baseEstimate * 1.10);

    const formattedEstimate = `$${lowEstimate.toLocaleString()} – $${highEstimate.toLocaleString()}`;

    // Save into localStorage
    localStorage.setItem('estimateAmount', formattedEstimate);
    localStorage.setItem('projectType', projectType);

    // 🆕 Fill hidden fields for emailing
    document.getElementById('estimateTotalField').value = formattedEstimate;
    
    let timeline = "";

    switch (projectType) {
        case "Custom Home":
            timeline = "Typical Build Timeline: 8–12 months.";
            break;
        case "Custom Garage":
            timeline = "Typical Build Timeline: 4–6 months.";
            break;
        case "Custom Home Addition":
            timeline = "Typical Build Timeline: 6–9 months.";
            break;
        case "Glass Sunroom (Walls Only)":
            timeline = "Typical Build Timeline: 3–5 months.";
            break;
        case "Eze-Breeze Sunroom (Walls Only)":
            timeline = "Typical Build Timeline: 2–4 months.";
            break;
        default:
            timeline = "Timeline varies based on project type.";
    }

    document.getElementById('estimatedTimelineField').value = timeline;

    // Mini confirmation message
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.style.display = 'block';
    }

    // Delay slightly then redirect to Thank You page
    setTimeout(() => {
        window.location.href = `thank-you.html`;
    }, 1500);
}

// Background Send to Formspree
function sendFormData() {
    const formData = new FormData(document.getElementById('estimateForm'));

    fetch('https://formspree.io/f/xzzelklv', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log("Form successfully submitted to Formspree.");
        } else {
            console.error("Error submitting form to Formspree.");
        }
    }).catch(error => {
        console.error("Fetch error:", error);
    });
}

// On Thank You Page: Load stored estimate and timeline
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('estimateAmount')) {
        const estimate = localStorage.getItem('estimateAmount');
        const projectType = localStorage.getItem('projectType');

        if (estimate) {
            document.getElementById('estimateAmount').innerText = estimate;
        }

        let timeline = "";

        switch (projectType) {
            case "Custom Home":
                timeline = "Typical Build Timeline: 8–12 months.";
                break;
            case "Custom Garage":
                timeline = "Typical Build Timeline: 4–6 months.";
                break;
            case "Custom Home Addition":
                timeline = "Typical Build Timeline: 6–9 months.";
                break;
            case "Glass Sunroom (Walls Only)":
                timeline = "Typical Build Timeline: 3–5 months.";
                break;
            case "Eze-Breeze Sunroom (Walls Only)":
                timeline = "Typical Build Timeline: 2–4 months.";
                break;
            default:
                timeline = "Timeline varies based on project type.";
        }

        if (document.getElementById('projectTimeline')) {
            document.getElementById('projectTimeline').innerText = timeline;
        }
    }
});
