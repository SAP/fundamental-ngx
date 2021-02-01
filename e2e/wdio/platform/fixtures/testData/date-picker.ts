const currentMonth = new Date().getMonth() + 1;
export default
{
    date: '1/1/1990',
    date1: `${currentMonth}/1/2021`,
    date2: '5/1/2020 - 5/15/2020',
    date3: `${currentMonth}/1/2021 - ${currentMonth}/15/2021`,
    date4: `0${currentMonth}/01/21 // 0${currentMonth}/15/21`,
    date5: `0${currentMonth}/01/21`,
    date6: `1.0${currentMonth}.2021 г.`,
    date7: `01/0${currentMonth}/2021`,
    date8: `1.${currentMonth}.2021`,
    date9: '1/2/1990',
    text: 'test',
    highlightedColor: ['rgb(8,84,160)', 'rgba(8,84,160,1)'],
    year2000: 2000,
}
