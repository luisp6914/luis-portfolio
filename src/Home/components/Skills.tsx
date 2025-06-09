import { Icon } from "@iconify/react/dist/iconify.js";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const skills = [
  { icon: "skill-icons:html", name: 'HTML', value: 2, color: " #e44d26" },
  { icon: "skill-icons:css", name: 'CSS', value: 2, color: " #1572b6" },
  { icon: "skill-icons:javascript", name: 'JavaScript', value: 2, color: " #f7df1e" },
  { icon: "skill-icons:git", name: 'Git', value: 1, color: " #ff6c4e" },
  { icon: "skill-icons:github-dark", name: 'GitHub', value: 2, color: " #7E72FF" },
  { icon: "skill-icons:mongodb", name: 'MongoDb', value: 1, color: " #00ed64" },
  { icon: "skill-icons:mysql-dark", name: 'MySQL', value: 2, color: " #00758f" },
  { icon: "skill-icons:react-dark", name: 'React', value: 1, color: " #61DAFB" },
  { icon: "skill-icons:nodejs-dark", name: 'Node', value: 1, color: " #39a907 " },
  { icon: "skill-icons:java-dark", name: 'Java', value: 3.5, color: " #ED8B00" },
  { icon: "skill-icons:docker", name: 'Docker', value: 1, color: " #2496ed" },
  { icon: "skill-icons:spring-dark", name: 'Spring Boot', value: 1, color: " #6db33f" },
  { icon: "skill-icons:python-dark", name: 'Python', value: 2, color: " #ffde57" },

];

const totalValue = skills.reduce((acc, curr) => acc + curr.value, 0);

const data = {
  labels: skills.map((s) => s.name),
  datasets: [
    {
      data: skills.map((s) => s.value),
      backgroundColor: skills.map((s) => s.color),
      borderWidth: 2,
      borderColor: "black"
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false, 
    },
    datalabels: {
      display: (ctx: any) => ctx.chart.width >= 600,
      formatter: (value: number, ctx: any) => ctx.chart.data.labels[ctx.dataIndex] || value,
      color: 'white',
      align: 'center' as const,
      anchor: 'center' as const,
      font: {
        weight: 'bold' as const,
        size: 14,
      },
    },
    tooltip: {
      callbacks: {
        label: function (ctx: any){
          const value = ctx.raw;
          const percentage = ((value / totalValue) * 100).toFixed(1);
          return `${ctx.chart.data.labels[ctx.dataIndex]} ${percentage}%`
        },
        title: function (){
          return "";
        }
      },
      displayColors: false,
    }
  },
};

const Skills = () => {
  return (
    <div className="align-items-start rounded pie-chart-container">
      {/* Pie Chart */}
      <div className="pie-chart">
        <Pie data={data} options={options} />
      </div>

      {/* Custom Legend */}
      <div className="custom-legend">
        <ul className="list-unstyled ">
          {skills.map((skill, i) => (
            <li key={i} className="d-flex align-items-center gap-2 text-black">
              {/* Colored Bullet */}
              <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: skill.color, }}/>
              {/* Skill Icon */}
              <Icon icon={skill.icon} width={20} height={20} />
              {/* Skill Name */}
              <span className="fs-6 fw-medium">
                {skill.name} - {skill.value}yr. - {Math.round((skill.value / skills.reduce((acc, curr) => acc + curr.value, 0)) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Skills;