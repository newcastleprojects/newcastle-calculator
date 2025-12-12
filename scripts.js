// scripts.js — Final Fixed Version

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('estimateForm');
  const projectTypeSelect = document.getElementById('projectType');
  const sizeLabel = document.getElementById('sizeLabel');
  const sizeSlider = document.getElementById('projectSizeSlider');
  const sizeInput = document.getElementById('projectSizeInput');

  // Sync size slider and input box
  sizeSlider.addEventListener('input', () => sizeInput.value = sizeSlider.value);
  sizeInput.addEventListener('input', () => sizeSlider.value = sizeInput.value);

  // Change label based on project type
  projectTypeSelect.addEventListener('change', function () {
    const project = this.value;
    if (project.includes('Sunroom')) {
      sizeLabel.innerText = '(Lin. Ft.)';
    } else {
      sizeLabel.innerText = '(Sq. Ft.)';
    }
  });

  // Form submit listener
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmit(e);
    });
  }

  // On thank-you.html page, show estimate from localStorage
  if (document.getElementById('estimateAmount')) {
    const estimate = localStorage.getItem('estimateAmount');
    const projectType = localStorage.getItem('projectType');

    if (estimate) {
      document.getElementById('estimateAmount').innerText = estimate;
    }

    let timeline = '';
    switch (projectType) {
      case 'Custom Home':
        timeline = 'Typical Build Timeline: 8–12 months.';
        break;
      case 'Custom Garage':
        timeline = 'Typical Build Timeline: 4–6 months.';
        break;
      case 'Custom Home Addition':
        timeline = 'Typical Build Timeline: 6–9 months.';
        break;
      case 'Glass Sunroom (Walls Only)':
        timeline = 'Typical Build Timeline: 3–5 months.';
        break;
      case 'Eze-Breeze Sunroom (Walls Only)':
        timeline = 'Typical Build Timeline: 2–4 months.';
        break;
      default:
        timeline = 'Timeline varies based on project type.';
    }

    if (document.getElementById('projectTimeline')) {
      document.getElementById('projectTimeline').innerText = timeline;
    }

    const saveEstimateBtn = document.getElementById('saveEstimateButton');
    if (saveEstimateBtn && estimate) {
      saveEstimateBtn.href = `mailto:?subject=Your New Castle Estimate & Next Steps&body=Hi,%0D%0A%0D%0AThank you for using the New Castle Estimate Calculator!%0D%0AHere’s your personalized project estimate range:%0D%0A${estimate}%0D%0A%0D%0ASchedule your free consultation here:%0D%0Ahttps://newcastleremodel.com/make-an-appointment%0D%0A%0D%0AThank you for choosing New Castle!`;
    }
  }
});

// Handle calculation + sending
function handleFormSubmit(e) {
  const projectType = document.getElementById('projectType').value;
  const finishQuality = document.getElementById('finishQuality').value;
  const size = parseFloat(document.getElementById('projectSizeInput').value);

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

  let baseEstimate = pricePerUnit * size;
  if (finishQuality === "High-End") baseEstimate *= 1.2;

  const lowEstimate = Math.round(baseEstimate * 0.95);
  const highEstimate = Math.round(baseEstimate * 1.10);
  const formattedEstimate = `$${lowEstimate.toLocaleString()} – $${highEstimate.toLocaleString()}`;

  // Save to localStorage
  localStorage.setItem('estimateAmount', formattedEstimate);
  localStorage.setItem('projectType', projectType);

  // Send to Formspree
  const formData = new FormData(document.getElementById('estimateForm'));

  fetch('https://formspree.io/f/xzzelklv', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      // Redirect to thank you after short delay
      setTimeout(() => {
        window.location.href = 'thank-you.html';
      }, 500);
    } else {
      alert("There was an issue sending your Estimate. Please try again.");
    }
  }).catch(error => {
    console.error("Form submission error:", error);
    alert("There was an issue sending your Estimate. Please try again.");
  });
}
