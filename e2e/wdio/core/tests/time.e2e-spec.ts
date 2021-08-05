import { TimePo } from '../pages/time.po';
import {
    click,
    clickNextElement,
    clickPreviousElement,
    getNextElementText,
    getPreviousElementText,
    getText,
    refreshPage,
    doesItExist,
    clickAndMoveElement,
    getElementClass,
    getImageTagBrowserPlatform,
    saveElementScreenshot,
    scrollIntoView,
    checkElementScreenshot,
    getElementArrayLength, browserIsFirefox
} from '../../driver/wdio';
import { sections } from '../fixtures/appData/time-contents'

describe('Time component test', function () {
    const timePage = new TimePo();
    const {
        downArrow,
        UpArrow,
        hoursColumn,
        minutesColumn,
        secondsColumn,
        currentHour,
        currentMinute,
        currentSec,
        noSpinnersExample,
        programmaticallyExample,
        withoutSecondsExample,
        onlyHoursExample,
        set11HoursBtn,
        formExample,
        clockArea,
        enableTimeRow,
        lowerHour,
        upperhour,
        lowerMinute,
        upperMinute,
        lowerSec,
        upperSec,
        exampleAreaContainersArr,
        formExample1Hour,
        formExample2Minute,
        formExample3Second
    } = timePage;

    beforeAll(() => {
        timePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    it('Should check that change time by arrows works correct', () => {
        for (let i = 0; i < sections.length; i++) {
            if (sections[i] !== noSpinnersExample) {
                checkClockMoving(sections[i], 'arrowClick');
            }
        }
    });

    it('Should check that time changing by clicking on another digit', () => {
        for (let i = 0; i < sections.length; i++) {
            checkClockMoving(sections[i], 'buttonClick');
        }
    });

    it('Should check if the button Set Hours to 11 works correctly', () => {
        click(set11HoursBtn);
        expect(getText(programmaticallyExample + currentHour)).toEqual('11', 'Current hour is not 11');
    });

    it('should check that Enabled time to equal chosen time', () => {
        const chosenHourValue = getText(formExample1Hour);
        click(formExample1Hour);

        click(formExample + minutesColumn);
        const chosenMinuteValue = getText(formExample2Minute);
        click(formExample2Minute);

        click(formExample + secondsColumn);
        const chosenSecondValue = getText(formExample3Second);
        click(formExample3Second);
        expect(getText(enableTimeRow)).toEqual(chosenHourValue + 'h ' + chosenMinuteValue + 'm ' + chosenSecondValue + 's', 'Current value is not equal chosen value');
    });

    it('should check that no-spinner example does not have up/down arrows', () => {
        expect(doesItExist(noSpinnersExample + hoursColumn + UpArrow)).toBe(false, 'Up Arrow exists');
        expect(doesItExist(noSpinnersExample + hoursColumn + downArrow)).toBe(false, 'Down arrow exists');
        click(noSpinnersExample + minutesColumn);
        expect(doesItExist(noSpinnersExample + minutesColumn + UpArrow)).toBe(false, 'Up Arrow exists');
        expect(doesItExist(noSpinnersExample + minutesColumn + downArrow)).toBe(false, 'Down arrow exists');
        click(noSpinnersExample + secondsColumn);
        expect(doesItExist(noSpinnersExample + secondsColumn + UpArrow)).toBe(false, 'Up Arrow exists');
        expect(doesItExist(noSpinnersExample + secondsColumn + downArrow)).toBe(false, 'Down arrow exists');
    })

   it('Should check that click and drag works', () => {
       // method not working on FF
       if (browserIsFirefox()) {
           return;
       }
        for (let i = 0; i < sections.length; i++) {
            checkScroll(sections[i], 'down');
            refreshPage();
            checkScroll(sections[i], 'up');
        }
    })

    it('should check orientation', () => {
        timePage.checkRtlSwitch();
    });

    describe('Visual regression', function () {
        it('should check examples except dinamyc changes example', () => {
            const actionSheetCount = getElementArrayLength(exampleAreaContainersArr);
            for (let i = 0; actionSheetCount > i; i++) {
                if (i !== 3) {
                    scrollIntoView(exampleAreaContainersArr, i);
                    saveElementScreenshot(exampleAreaContainersArr,
                        `time-example-${i}-core-${getImageTagBrowserPlatform()}`, timePage.getScreenshotFolder());
                    expect(checkElementScreenshot(exampleAreaContainersArr,
                        `time-example-${i}-core-${getImageTagBrowserPlatform()}`, timePage.getScreenshotFolder()))
                        .toBeLessThan(5);
                }
            }
        });
    });

    function checkClockMoving(section: string, action: 'arrowClick' | 'buttonClick'): void {
        const nextHourValue = getNextElementText(section + currentHour);
        action === 'arrowClick' ? click(section + downArrow) : ''
        action === 'buttonClick' ? clickNextElement(section + currentHour) : ''
        expect(getText(section + currentHour)).toEqual(nextHourValue, 'Current hour is not equal chosen value');

        if (section !== onlyHoursExample) {
            click(section + minutesColumn);
            const previousMinuteValue = getPreviousElementText(section + currentMinute);
            action === 'arrowClick' ? click(section + UpArrow) : ''
            action === 'buttonClick' ? clickPreviousElement(section + currentMinute) : ''
            expect(getText(section + currentMinute)).toEqual(previousMinuteValue, 'Current hour is not equal chosen value');
        }

        if (section !== withoutSecondsExample && section !== onlyHoursExample) {
            click(section + secondsColumn);
            const previousSecondValue = getPreviousElementText(section + currentSec);
            action === 'arrowClick' ? click(section + UpArrow) : ''
            action === 'buttonClick' ? clickPreviousElement(section + currentSec) : ''
            expect(getText(section + currentSec)).toEqual(previousSecondValue, 'Current hour is not equal chosen value');
        }
    }

    function checkScroll(section: string, direction: 'up' | 'down'): void {
        let scrollStep, scrollToHour, scrollToMinute, scrollToSec;

        direction === 'up' ? getElementClass(section + clockArea) === 'fd-time fd-time--compact' ? scrollStep = 50 : scrollStep = 100 : '';
        direction === 'down' ? getElementClass(section + clockArea) === 'fd-time fd-time--compact' ? scrollStep = -50 : scrollStep = -100 : '';

        direction === 'up' ? scrollToHour = getText(section + upperhour) : ''
        direction === 'down' ? scrollToHour = getText(section + lowerHour) : ''
        clickAndMoveElement(section + hoursColumn, 0, scrollStep);
        expect(getText(section + currentHour)).toEqual(scrollToHour, 'The current hour is not equivalent to the hour to which you have scrolled');

        if (section !== onlyHoursExample) {
            click(section + minutesColumn);
            direction === 'up' ? scrollToMinute = getText(section + upperMinute) : '';
            direction === 'down' ? scrollToMinute = getText(section + lowerMinute) : ''
            clickAndMoveElement(section + minutesColumn, 0, scrollStep);
            expect(getText(section + currentMinute)).toEqual(scrollToMinute, 'The current hour is not equivalent to the hour to which you have scrolled');
        }
        if (section !== withoutSecondsExample && section !== onlyHoursExample) {
            click(section + secondsColumn);
            direction === 'up' ? scrollToSec = getText(section + upperSec) : ''
            direction === 'down' ? scrollToSec = getText(section + lowerSec) : ''
            clickAndMoveElement(section + secondsColumn, 0, scrollStep);
            expect(getText(section + currentSec)).toEqual(scrollToSec, 'The current hour is not equivalent to the hour to which you have scrolled');
        }
    }

});
