const GradeChart = ({ grades }: any) => {
  const data = {
    labels: grades.map((g: any) => g.subjectName),
    datasets: [
      {
        label: "Оцінки",
        data: grades.map((g: any) => g.value),
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#e2e8f0"
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" }
      },
      y: {
        ticks: { color: "#94a3b8" }
      }
    }
  };

  return <Line data={data} options={options} />;
};