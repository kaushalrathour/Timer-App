export default function convertToSeconds  (duration: number, remainingTime: number, unit: string)  {
    let durationInSec = 0;
    let remainingTimeInSec = 0;

    if (unit === "Seconds") {
        durationInSec = duration
        remainingTimeInSec = remainingTime
    } else if (unit === "Minutes") {
        durationInSec = parseFloat(duration) * 60;
        remainingTimeInSec = parseFloat(remainingTime) * 60;
    } else if (unit === "Hours") {
        durationInSec = parseFloat(duration) * 3600;
        remainingTimeInSec = parseFloat(remainingTime) * 3600;
    }

    return { durationInSec, remainingTimeInSec };
};
