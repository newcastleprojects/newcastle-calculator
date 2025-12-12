// Final stable scripts.js — original version with Lin. Ft. label fix added
// v2.4.0

document.addEventListener('DOMContentLoaded', function () {
  // Update label based on project type
  const projectTypeSelect = document.getElementById('projectType');
  const sizeLabel = document.getElementById('sizeLabel');

  if (projectTypeSelect && sizeLabel) {
    projectTypeSelect.addEventListener('change', () => {
      const type = projectTypeSelect.value;
      if (type.includes("Sunroom")) {
        sizeLabel.innerText = "(Linear Feet)";
      } else {
        sizeLabel.innerText = "(Square Feet)";
      }
    });
  }

  // Estimate slider sync
  const sizeSlider = document.getElementById('projectSizeSlider');
  const sizeInput = document.getElementById('projectSizeInput');
  if (sizeSlider && sizeInput) {
    sizeSlider.addEventListener('input', function () {
      sizeInput.value = sizeSlider.value;
    });
    sizeInput.addEventListener('input', function () {
      sizeSlider.value = sizeInput.value;
    });
  }
});
