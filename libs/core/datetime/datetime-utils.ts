/**
 * Converts a given time string to a desired format.
 *
 * @param {string} inputStr - The input time string to be converted.
 * @returns {string} - The converted time string in the desired format.
 */
export function convertToDesiredFormat(inputStr: string): string {
    const dayPeriodMapping = {
        morning: 0,
        afternoon: 12,
        evening: 12,
        night: 0
    };

    const dayPeriodPattern = /\b(morning|afternoon|evening|night)\b/;
    const amPmPattern = /\b(AM|PM)\b/i;

    const convertDayPeriod = (input: string): string => {
        const match = input.match(dayPeriodPattern);
        if (match) {
            const period = match[0].toLowerCase();
            const timeShift = dayPeriodMapping[period];
            input = input.replace(dayPeriodPattern, '').trim();
            const timeMatch = input.match(/\d{1,2}:\d{2}/);
            if (timeMatch) {
                const [hoursStr, minutesStr] = timeMatch[0].split(':');
                let hours = Number(hoursStr);
                const minutes = Number(minutesStr);
                hours = (hours % 12) + timeShift;
                input = input.replace(
                    timeMatch[0],
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                );
            }
        }
        return input;
    };

    const convertAmPm = (input: string): string => {
        const match = input.match(amPmPattern);
        if (match) {
            const period = match[0].toUpperCase();
            input = input.replace(amPmPattern, '').trim();
            const timeMatch = input.match(/\d{1,2}:\d{2}/);
            if (timeMatch) {
                const [hoursStr, minutesStr] = timeMatch[0].split(':');
                let hours = Number(hoursStr);
                const minutes = Number(minutesStr);
                if (period === 'PM' && hours < 12) {
                    hours += 12;
                }
                if (period === 'AM' && hours === 12) {
                    hours = 0;
                }
                input = input.replace(
                    timeMatch[0],
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
                );
            }
        }
        return input;
    };

    inputStr = convertDayPeriod(inputStr);
    inputStr = convertAmPm(inputStr);

    return inputStr.replace(/\bat\b/i, '').trim();
}
