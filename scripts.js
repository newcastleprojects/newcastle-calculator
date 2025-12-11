// Updated script.js to ensure Thank You page works properly
// v2.3.2 — Forced update to trigger Vercel refresh

document.addEventListener('DOMContentLoaded', function () {
  // Thank You Page Load
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
      saveEstimateBtn.href = `mailto:?subject=Your New Castle Estimate & Next Steps&body=Hi,%0D%0A%0D%0AThank you for using the New Castle Estimate Calculator!%0D%0AHere’s your personalized project estimate range:%0D%0A${estimate}%0D%0A%0D%0ASchedule your free consultation here:%0D%0Ahttps://newcastleremodel.com/make-an-appointment%0D%0A%0D%0AHelpful Resources for Your Project:%0D%0A- Natalie Rose Plan: https://newcastleremodel.com/natalie-rose%0D%0A- Nathan Allen Plan: https://newcastleremodel.com/nathan-allen%0D%0A- Affordable House Plans: https://www.thehouseplancompany.com/%0D%0A- Our Remodeling Process Guide: https://newcastleremodel.com/our-remodeling-process%0D%0A%0D%0AEstimate ranges are based on typical conditions and may vary depending on project specifics.%0D%0A%0D%0AThank you for choosing New Castle!`;
    }
  }
});
