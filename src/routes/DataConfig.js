
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
function getDuration(event) {
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

  let diffHours = endHour - startHour;
  let diffMinutes = endMinute - startMinute;
  let totalMinutes = (diffHours * 60) - diffMinutes;
  return totalMinutes;
}

// Adds up all the total hours in action
function totalActionMinutes(date) {
  let totalTime = 0;
  date.actions.forEach(element => totalTime += getDuration(element));
  return totalTime;
}


// Sets 
export function setPercentages(date)  {
  let data = {
    labels: [""],
    datasets: {
      data: [0,],
      backgroundColor: [""],
      hoverBackgroundColor: [""],
    }
  };

  if (totalActionMinutes(date) <= 1440) {
    for (let i = 0; i <= date.actions.length; i++) {
      let singleEvent = date.actions[i];
      data.labels.push(singleEvent.name);
      data.datasets.data.push(getDuration(singleEvent));
      data.datasets.backgroundColor.push(singleEvent.color);
      data.datasets.hoverBackgroundColor.push(singleEvent.hover_color);
    }

    // remove first elements of array
    data.labels.shift();
    data.datasets.data.shift();
    data.datasets.backgroundColor.shift();
    data.datasets.hoverBackgroundColor.shift();
  }

  return data;
}