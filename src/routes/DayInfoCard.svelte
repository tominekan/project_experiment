<script>
    import { Doughnut } from 'svelte-chartjs';
    import { setChartData } from './DataConfig.js';
    import close_icon from "$lib/assets/icons8-close.svg";
    import edit_icon from "$lib/assets/icons8-edit-24.png";

    export let dateInfo;
    export let chartId;
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale,
    } from 'chart.js';
    import InfoCardLegendContainer from './InfoCardLegendContainer.svelte';
  
    ChartJS.register(Title, Tooltip, ArcElement, CategoryScale);

    function getMonth(monthNumber) {
      const date = new Date(2000, monthNumber-1, 10);  // 2009-11-10
      const month = date.toLocaleString('default', { month: 'long' });
      return month;
    }

    let chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    labelColor: function(context) {
                        return {
                            borderColor: 'rgb(0, 0, 255)',
                            backgroundColor: 'rgb(255, 0, 0)',
                            borderWidth: 2,
                            borderDash: [2, 2],
                            borderRadius: 2,
                        };
                    },
                    labelTextColor: function(context) {
                        return '#543453';
                    }
                }
            }
        }
    }
</script>

<style>
  .chart-container {
    height: 100%;
    width: 40%;
   
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .infocard {
    /* border: 1px solid green; */
    height: 80%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .dialog-container {
    height: 100%;
    /* border: 1px solid orange; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .close-button {
    border: none;
    background-color: white;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    transition: 200ms;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .close-button:hover {
    background-color: #A8B3C5;
  }

  .close-image {
    width: 30px;
  }

  dialog {
    border-radius: 20px;
    width: clamp(500px, 55dvw, 700px);
    height: 40dvh;
    border: none;
    box-shadow: 5px 5px 50px #aaaaaa;
    margin: auto;
  }

  .date-title {
    font-family: "Inter", sans-serif;
    font-size: xx-large;
    margin-bottom: 3vh;
  }

  .info-container {
    height: max-content;

  }

  .dialog-edit {
    width: 75px;
    height: 37px;
    border-radius: 10px;
    border: none;
    background-color: #3b73db;
    color: white;
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    transition: 200ms;
  }

  .dialog-edit:hover {
    background-color: #4f88ef;
  }

</style>

<dialog id={chartId} >
  <div class="dialog-container">
    <button onclick="{chartId}.close()" class="close-button">
        <img src={close_icon} alt="Close" class="close-image">
    </button>


    <div class="infocard">
      <div class="chart-container">
        <Doughnut data={setChartData(dateInfo)} options={chartOptions} class="pie"/>
      </div>
    
      <div class="info-container">
        <h1 class="date-title">{`${getMonth(dateInfo.month)} ${dateInfo.day}, ${dateInfo.year}`}</h1>
        <InfoCardLegendContainer dateActivities={dateInfo.actions} />
      </div>

    </div>
    

    <button class="dialog-edit">
        Edit Card    
    </button>
  </div>
</dialog>