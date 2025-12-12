document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('estimateForm');

    if (form) {
        form.addEventListener('submit', function () {

            const projectType = document.getElementById('projectType').value;
            const finishQuality = document.getElementById('finishQuality').value;
            const size = Number(document.getElementById('projectSizeInput').value);

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
            const high = Math.round(estimate * 1.1);
            const formatted = `$${low.toLocaleString()} – $${high.toLocaleString()}`;

            document.getElementById('estimateField').value = formatted;
            document.getElementById('projectTypeFieldHidden').value = projectType;
        });
    }

    if (document.getElementById('estimateAmount')) {
        const params = new URLSearchParams(window.location.search);
        document.getElementById('estimateAmount').innerText =
            params.get('estimate') || "Unavailable";

        const projectType = params.get('projectType');
        const timelineMap = {
            "Custom Home": "8–12 months",
            "Custom Garage": "4–6 months",
            "Custom Home Addition": "6–9 months",
            "Glass Sunroom (Walls Only)": "3–5 months",
            "Eze-Breeze Sunroom (Walls Only)": "2–4 months"
        };

        document.getElementById('projectTimeline').innerText =
            timelineMap[projectType] || "Timeline varies based on project type.";
    }
});
