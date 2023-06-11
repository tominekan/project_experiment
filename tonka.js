import { getDuration } from "./src/routes/DataConfig";

function formatDuration(d) {
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
