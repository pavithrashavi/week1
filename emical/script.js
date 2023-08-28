const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const timeInput = document.getElementById("time");
const principalRange = document.getElementById("principalRange");
const rateRange = document.getElementById("rateRange");
const timeRange = document.getElementById("timeRange");
const emiDisplay = document.getElementById("emi");

function calculateEMI(principal, rate, time) {
  const monthlyRate = rate / 12 / 100;
  const totalPayments = time * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  return emi.toFixed(2);
}
google.charts.load('current', { 'packages': ['corechart'] });

function drawPieChart(principal, rate, time) {
    const emi = calculateEMI(principal, rate, time);
    const totalPayment = emi * time * 12;
    const totalInterest = totalPayment - principal;
  
    const data = google.visualization.arrayToDataTable([
      ['Type', 'Amount'],
      ['Principal', principal],
      ['Interest', totalInterest]
    ]);
  
    const options = {
      title: 'CHART',
      is3D: true,
    };
  
    const chart = new google.visualization.PieChart(document.getElementById('chartContainer'));
    chart.draw(data, options);
  }
function updateEMI() {
  const principal = parseFloat(principalInput.value);
  const rate = parseFloat(rateInput.value);
  const time = parseFloat(timeInput.value);
  const emi = calculateEMI(principal, rate, time);
  emiDisplay.textContent = emi;
  drawPieChart(principal, rate, time);
}

function updateInputsFromRanges() {
  principalInput.value = principalRange.value;
  rateInput.value = rateRange.value;
  timeInput.value = timeRange.value;
  updateEMI();
}


principalInput.addEventListener("input", updateEMI);
rateInput.addEventListener("input", updateEMI);
timeInput.addEventListener("input", updateEMI);
principalRange.addEventListener("input", updateInputsFromRanges);
rateRange.addEventListener("input", updateInputsFromRanges);
timeRange.addEventListener("input", updateInputsFromRanges);

updateEMI();
