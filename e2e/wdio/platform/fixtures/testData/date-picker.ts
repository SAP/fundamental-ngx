export default
{
    date: '1/1/1990',
    date1: `${new Date().getMonth() + 1}/1/2021`,
    date2: '5/1/2020 - 5/15/2020',
    date3: `${new Date().getMonth() + 1}/1/2021 - ${new Date().getMonth() + 1}/15/2021`,
    date4: `0${new Date().getMonth() + 1}/01/21 // 0${new Date().getMonth() + 1}/15/21`,
    date5: `0${new Date().getMonth() + 1}/01/21`,
    date6: `1.0${new Date().getMonth() + 1}.2021 г.`,
    date7: `01/0${new Date().getMonth() + 1}/2021`,
    date8: `1.${new Date().getMonth() + 1}.2021`,
    date9: '1/2/1990',
    text: 'test',
    highlightedColor: ['rgb(8,84,160)', 'rgba(8,84,160,1)'],
    year2000: 2000,
}
