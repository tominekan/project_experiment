
export const sampleData = {
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
  datasets: [
    {
      data: [300, 50, 100, 40, 120],
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: [
        '#FF5A5E',
        '#5AD3D1',
        '#FFC870',
        '#A8B3C5',
        '#616774',
      ],
    },
  ],
};



// returns duration of a specific event in minutes
export function getDuration(event) {
  let startMeridian = event.start.split(" ")[1];
  let endMeridian = event.end.split(" ")[1];

  let startHour = parseInt(event.start.split(":")[0]);
  let endHour = parseInt(event.end.split(":")[0]);

  if (startMeridian === "PM") {
    startHour += 12;
  }
  if (endMeridian === "PM") {
    endHour += 12;
  }
  let startMinute = parseInt(event.start.split(":")[1]);
  let endMinute = parseInt(event.end.split(":")[1]);

  let startTime = new Date(2000, 0, 1, startHour, startMinute);
  let endTime = new Date(2000, 0, 1, endHour, endMinute);
  

  // Times are on different sides of midnight (7:00 PM - 8:00 AM)
  if (endTime < startTime) {
    endTime.setDate(endTime.getDate()+1); // sets the later time to a newer day
  }

  // returns difference in milliseconds, convert that to minutes
  return (endTime - startTime) / (60000)
}

// Adds up all the total hours in action
function totalActionMinutes(date) {
  let totalTime = 0;
  date.actions.forEach(element => totalTime += getDuration(element));
  return totalTime;
}


// Sets 
export function setChartData(date)  {
  let dataChart = {
    labels: [""],
    datasets: [
      {
        label: "Minutes",
        data: [0,],
        backgroundColor: [""],
        hoverBackgroundColor: [""],
      }
    ]
  };

  if (totalActionMinutes(date) <= 1440) {
    for (let i = 0; i < date.actions.length; i++) {
      let singleEvent = date.actions[i];
      dataChart.labels.push(singleEvent.name);
      dataChart.datasets[0].data.push(getDuration(singleEvent));
      dataChart.datasets[0].backgroundColor.push(singleEvent.color);
      dataChart.datasets[0].hoverBackgroundColor.push(singleEvent.hover_color);
    }

    // remove first elements of array
    dataChart.labels.shift();
    dataChart.datasets[0].data.shift();
    dataChart.datasets[0].backgroundColor.shift();
    dataChart.datasets[0].hoverBackgroundColor.shift();

    if (totalActionMinutes(date) != 1440) {
      dataChart.labels.push("Free Time :)");
      dataChart.datasets[0].data.push(1440 - totalActionMinutes(date));
      dataChart.datasets[0].backgroundColor.push("#949FB1");
      dataChart.datasets[0].hoverBackgroundColor.push("#A8B3C5");
    }
  }

  return dataChart;
}

export function formatDuration(d) {
  let durationInMinutes = getDuration(d);

  // less than 1 minute
  if (durationInMinutes < 1) {
      let seconds = Math.round(durationInMinutes * 60);
      return seconds + (seconds === 1 ? " second" : " seconds");
  }

  if (durationInMinutes >= 60) { // 1 hour or greater
      let numHours = Math.floor(durationInMinutes / 60);
      let numMinutes = durationInMinutes - (60 * numHours);

      // If it's exactly 1 hour (or 1 hour X minutes)
      if (numHours === 1) {
          if (numMinutes > 0) {
              return `1 hour ${numMinutes}` + (numMinutes === 1 ? " minute" : " minutes");
          } 
          return "1 hour";
      }

      // 2 bours or greater
      if (numMinutes > 0) {
          return `${numHours} hours ${numMinutes}` + (numMinutes === 1 ? " minute" : " minutes"); // X hours X minutes
      } else {
          return numHours + " hours"; // X hours flat
      }
  }

  // exactly 1 minute
  if (durationInMinutes === 1) {
      return "1 minute";
  } else {
      // x minutes
      return durationInMinutes + "minutes";
  }

}
