// Update project size when sliding or typing
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('projectSizeSlider');
    const input = document.getElementById('projectSizeInput');

    if (slider && input) {
        slider.oninput = function() {
            input.value = this.value;
        };
        input.oninput = function() {
            slider.value = this.value;
        };
    }

    const form = document.getElementById('estimateForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            generateEstimate();
        });
    }
});

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

    let totalEstimate = pricePerUnit * size;

    if (finishQuality === "High-End") {
        totalEstimate *= 1.2; // +20% for high-end finishes
    }

    const formattedEstimate = `$${totalEstimate.toLocaleString()}`;

    // Save Estimate into localStorage to pass to Thank You page
    localStorage.setItem('estimateAmount', formattedEstimate);
    localStorage.setItem('projectType', projectType);

    // Redirect to Thank You page
    window.location.href = `thank-you.html?estimate=${encodeURIComponent(formattedEstimate)}&type=${encodeURIComponent(projectType)}`;
}

// On Thank You Page: load stored estimate
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

        // Set share buttons
        const emailShare = document.getElementById('shareEmail');
        const facebookShare = document.getElementById('shareFacebook');
        if (emailShare) {
            emailShare.href = `mailto:?subject=Check out this Free Remodeling Estimate Tool!&body=Hi, I just used the New Castle Remodeling Instant Estimate Calculator — it was quick and helpful! You can try it too here: https://newcastleremodel.com/instant-estimate`;
        }
        if (facebookShare) {
            facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=https://newcastleremodel.com/instant-estimate`;
        }
    }
});

