document.addEventListener('DOMContentLoaded', function () {

    const slider = document.getElementById('projectSizeSlider');
    const input = document.getElementById('projectSizeInput');
    if (slider && input) {
        slider.oninput = () => input.value = slider.value;
        input.oninput = () => slider.value = input.value;
    }

    const email = document.querySelector('input[name="email"]');
    const replyTo = document.getElementById('hiddenReplyTo');
    if (email && replyTo) {
        email.addEventListener('input', () => replyTo.value = email.value);
    }

    const form = document.getElementById('estimateForm');
    if (form) {
        form.addEventListener('submit', function () {
            calculateEstimate();
        });
    }
});

function calculateEstimate() {
    const projectType = document.getElementById('projectType').value;
    const finish = document.getElementById('finishQuality').value;
    const size = Number(document.getElementById('projectSizeInput').value);

    if (!projectType || !finish || size <= 0) return;

    let rate = 0;
    switch (projectType) {
        case "Custom Home": rate = 160; break;
        case "Custom Garage": rate = 150; break;
        case "Custom Home Addition": rate = 200; break;
        case "Glass Sunroom (Walls Only)": rate = 350; break;
        case "Eze-Breeze Sunroom (Walls Only)": rate = 250; break;
    }

    let total = rate * size;
    if (finish === "High-End") total *= 1.2;

    const low = Math.round(total * 0.95);
    const high = Math.round(total * 1.10);
    const estimate = `$${low.toLocaleString()} – $${high.toLocaleString()}`;

    document.getElementById('estimateField').value = estimate;
    document.getElementById('projectTypeField').value = projectType;
}
