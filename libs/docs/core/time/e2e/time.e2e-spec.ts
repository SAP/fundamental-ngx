import { TimePo } from './time.po';
import {
    browserIsFirefox,
    checkElementScreenshot,
    click,
    clickAndMoveElement,
    clickNextElement,
    clickPreviousElement,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getImageTagBrowserPlatform,
    getNextElementText,
    getPreviousElementText,
    getText,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { sections } from './time-contents';

describe('Time component test', () => {
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
        waitForPresent(timePage.root);
        waitForElDisplayed(timePage.title);
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
        expect(getText(programmaticallyExample + currentHour).trim()).toEqual('11', 'Current hour is not 11');
    });

    it('should check that Enabled time to equal chosen time', () => {
        const chosenHourValue = getText(formExample1Hour).trim();
        click(formExample1Hour);

        click(formExample + minutesColumn);
        const chosenMinuteValue = getText(formExample2Minute).trim();
        click(formExample2Minute);

        click(formExample + secondsColumn);
        const chosenSecondValue = getText(formExample3Second).trim();
        click(formExample3Second);

        expect(getText(enableTimeRow).trim()).toEqual(
            chosenHourValue + 'h ' + chosenMinuteValue + 'm ' + chosenSecondValue + 's',
            'Current value is not equal chosen value'
        );
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
    });

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
    });

    it('should check orientation', () => {
        timePage.checkRtlSwitch();
    });

    xdescribe('Visual regression', () => {
        it('should check examples except dinamyc changes example', () => {
            const actionSheetCount = getElementArrayLength(exampleAreaContainersArr);
            for (let i = 0; actionSheetCount > i; i++) {
                if (i !== 3) {
                    scrollIntoView(exampleAreaContainersArr, i);
                    saveElementScreenshot(
                        exampleAreaContainersArr,
                        `time-example-${i}-core-${getImageTagBrowserPlatform()}`,
                        timePage.getScreenshotFolder()
                    );
                    expect(
                        checkElementScreenshot(
                            exampleAreaContainersArr,
                            `time-example-${i}-core-${getImageTagBrowserPlatform()}`,
                            timePage.getScreenshotFolder()
                        )
                    ).toBeLessThan(5);
                }
            }
        });
    });

    function checkClockMoving(section: string, action: 'arrowClick' | 'buttonClick'): void {
        const nextHourValue = getNextElementText(section + currentHour);
        if (action === 'arrowClick') {
            click(section + downArrow);
        }
        if (action === 'buttonClick') {
            clickNextElement(section + currentHour);
        }
        expect(getText(section + currentHour)).toEqual(nextHourValue, 'Current hour is not equal chosen value');

        if (section !== onlyHoursExample) {
            click(section + minutesColumn);
            const previousMinuteValue = getPreviousElementText(section + currentMinute);
            if (action === 'arrowClick') {
                click(section + UpArrow);
            }
            if (action === 'buttonClick') {
                clickPreviousElement(section + currentMinute);
            }
            expect(getText(section + currentMinute)).toEqual(
                previousMinuteValue,
                'Current hour is not equal chosen value'
            );
        }

        if (section !== withoutSecondsExample && section !== onlyHoursExample) {
            click(section + secondsColumn);
            const previousSecondValue = getPreviousElementText(section + currentSec);
            if (action === 'arrowClick') {
                click(section + UpArrow);
            }
            if (action === 'buttonClick') {
                clickPreviousElement(section + currentSec);
            }
            expect(getText(section + currentSec)).toEqual(
                previousSecondValue,
                'Current hour is not equal chosen value'
            );
        }
    }

    function checkScroll(section: string, direction: 'up' | 'down'): void {
        let scrollStep, scrollToHour, scrollToMinute, scrollToSec;

        if (direction === 'up') {
            if (getElementClass(section + clockArea) === 'fd-time fd-time--compact') {
                scrollStep = 50;
            } else {
                scrollStep = 100;
            }
        } else if (direction === 'down') {
            if (getElementClass(section + clockArea) === 'fd-time fd-time--compact') {
                scrollStep = -50;
            } else {
                scrollStep = -100;
            }
        }

        if (direction === 'up') {
            scrollToHour = getText(section + upperhour);
        }
        if (direction === 'down') {
            scrollToHour = getText(section + lowerHour);
        }
        clickAndMoveElement(section + hoursColumn, 0, scrollStep);
        expect(getText(section + currentHour)).toEqual(
            scrollToHour,
            'The current hour is not equivalent to the hour to which you have scrolled'
        );

        if (section !== onlyHoursExample) {
            click(section + minutesColumn);
            if (direction === 'up') {
                scrollToMinute = getText(section + upperMinute);
            }
            if (direction === 'down') {
                scrollToMinute = getText(section + lowerMinute);
            }
            clickAndMoveElement(section + minutesColumn, 0, scrollStep);
            expect(getText(section + currentMinute)).toEqual(
                scrollToMinute,
                'The current hour is not equivalent to the hour to which you have scrolled'
            );
        }
        if (section !== withoutSecondsExample && section !== onlyHoursExample) {
            click(section + secondsColumn);
            if (direction === 'up') {
                scrollToSec = getText(section + upperSec);
            }
            if (direction === 'down') {
                scrollToSec = getText(section + lowerSec);
            }
            clickAndMoveElement(section + secondsColumn, 0, scrollStep);
            expect(getText(section + currentSec)).toEqual(
                scrollToSec,
                'The current hour is not equivalent to the hour to which you have scrolled'
            );
        }
    }
});
