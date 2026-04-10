import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GradeChart = ({ grades }: any) => {
  const data = {
    labels: grades.map((g: any) => g.subjectName),
    datasets: [
      {
        label: "Оцінки",
        data: grades.map((g: any) => g.value),
      },
    ],
  };

  return <Line data={data} />;
};

export default GradeChart;