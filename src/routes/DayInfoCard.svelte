<script>
    import { Doughnut } from 'svelte-chartjs';
    import { sampleData } from './DataConfig';
    export let dateInfo;
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
    console.log(dateInfo);
    console.log(sampleData)
  </script>
  
  <Doughnut {sampleData} options={{ responsive: true }} />
  