export const planetChartData = {
  type: 'doughnut',
  data: {
          labels: ["Vendor Return", "Liquidation", "Insurance", "Others", "Dispatch", "Replacement"],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#2489C7", "#0094FF","#42ADFB","#7FCCFC","#034167","#165F94"],
            data: [2478,5267,734,784,433,582]
          }
        ]
     },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 25,
        }
      }]
    }
  }
}
export default planetChartData;