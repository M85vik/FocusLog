// Function to calculate difference in different units
export function getTimeDifference(startTime, endTime) {
    // Difference in milliseconds
    const diffMs = endTime - startTime;

    // Convert milliseconds to seconds, minutes, hours, days
    const diffSeconds = diffMs / 1000;
    const diffMinutes = diffMs / (1000 * 60);
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return {
        milliseconds: diffMs,
        seconds: diffSeconds,
        minutes: diffMinutes,
        hours: diffHours,
        days: diffDays
    };
}
