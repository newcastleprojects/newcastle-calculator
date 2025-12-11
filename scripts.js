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
        emailField.addEventListener('input', function () {
            replyToField.value = this.value;
        });
    }
});

// Function to generate estimate and save to localStorage
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

    localStorage.setItem('estimateAmount', formattedEstimate);
    localStorage.setItem('projectType', projectType);
}

// Load data on Thank You page
if (document.readyState !== 'loading') {
    loadThankYouPageData();
} else {
    document.addEventListener('DOMContentLoaded', loadThankYouPageData);
}

function loadThankYouPageData() {
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

        const saveEstimateBtn = document.getElementById('saveEstimateButton');
        if (saveEstimateBtn && estimate) {
            saveEstimateBtn.href = `mailto:?subject=Your New Castle Estimate & Next Steps&body=Hi,%0D%0A%0D%0AThank you for using the New Castle Estimate Calculator!%0D%0AHere’s your personalized project estimate range:%0D%0A${estimate}%0D%0A%0D%0ASchedule your free consultation here:%0D%0Ahttps://newcastleremodel.com/make-an-appointment%0D%0A%0D%0AHelpful Resources for Your Project:%0D%0A- Natalie Rose Plan: https://newcastleremodel.com/natalie-rose%0D%0A- Nathan Allen Plan: https://newcastleremodel.com/nathan-allen%0D%0A- Affordable House Plans: https://www.thehouseplancompany.com/%0D%0A- Our Remodeling Process Guide: https://newcastleremodel.com/our-remodeling-process%0D%0A%0D%0AEstimate ranges are based on typical conditions and may vary depending on project specifics.%0D%0A%0D%0AThank you for choosing New Castle!`;
        }
    }
}
