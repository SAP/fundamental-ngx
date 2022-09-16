const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const monthName = new Date().toLocaleString('en-us', { month: 'short' });
const currentMonthWithZero = ('0' + `${currentMonth}`).slice(-2);
export const currentDay = new Date().getDate();
export const testText = 'test';
export const button = 'button';
export const input = 'input';
export const i18n = ['fd-option-0', 'fd-option-1', 'fd-option-2', 'fd-option-3', 'fd-option-4', 'fd-option-5'];
export const year2030 = 2030;
export const date = `${currentMonth}/1/${currentYear}, 11:01 PM`;
export const date2 = `${currentMonth}/${currentDay}/${currentYear}, 11:01 PM`;
export const date3 = '10/5/2018, 3:30 PM';
export const date4 = `${monthName} ${currentDay}, ${currentYear}, 11:01`;
export const dates = [
    `${currentYear}-${currentMonthWithZero}-${currentDay}`,
    `${currentDay}/${currentMonthWithZero}/${currentYear}`,
    `${currentDay}.${currentMonth}.${currentYear}`,
    `${currentDay}.${currentMonthWithZero}.${currentYear}`,
    `${currentDay}/${currentMonth}/${currentYear}`,
    `${currentYear}/${currentMonth}/${currentDay}`
];
