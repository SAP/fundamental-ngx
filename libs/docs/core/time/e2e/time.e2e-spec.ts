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

    beforeAll(async () => {
        await timePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(timePage.root);
        await waitForElDisplayed(timePage.title);
    }, 2);

    it('Should check that change time by arrows works correct', async () => {
        for (let i = 0; i < sections.length; i++) {
            if (sections[i] !== noSpinnersExample) {
                await checkClockMoving(sections[i], 'arrowClick');
            }
        }
    });

    it('Should check that time changing by clicking on another digit', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkClockMoving(sections[i], 'buttonClick');
        }
    });

    it('Should check if the button Set Hours to 11 works correctly', async () => {
        await click(set11HoursBtn);
        await expect((await getText(programmaticallyExample + currentHour)).trim()).toEqual(
            '11',
            'Current hour is not 11'
        );
    });

    it('should check that Enabled time to equal chosen time', async () => {
        const chosenHourValue = (await getText(formExample1Hour)).trim();
        await click(formExample1Hour);

        await click(formExample + minutesColumn);
        const chosenMinuteValue = (await getText(formExample2Minute)).trim();
        await click(formExample2Minute);

        await click(formExample + secondsColumn);
        const chosenSecondValue = (await getText(formExample3Second)).trim();
        await click(formExample3Second);

        await expect((await getText(enableTimeRow)).trim()).toEqual(
            chosenHourValue + 'h ' + chosenMinuteValue + 'm ' + chosenSecondValue + 's',
            'Current value is not equal chosen value'
        );
    });

    it('should check that no-spinner example does not have up/down arrows', async () => {
        await expect(await doesItExist(noSpinnersExample + hoursColumn + UpArrow)).toBe(false, 'Up Arrow exists');
        await expect(await doesItExist(noSpinnersExample + hoursColumn + downArrow)).toBe(false, 'Down arrow exists');
        await click(noSpinnersExample + minutesColumn);
        await expect(await doesItExist(noSpinnersExample + minutesColumn + UpArrow)).toBe(false, 'Up Arrow exists');
        await expect(await doesItExist(noSpinnersExample + minutesColumn + downArrow)).toBe(false, 'Down arrow exists');
        await click(noSpinnersExample + secondsColumn);
        await expect(await doesItExist(noSpinnersExample + secondsColumn + UpArrow)).toBe(false, 'Up Arrow exists');
        await expect(await doesItExist(noSpinnersExample + secondsColumn + downArrow)).toBe(false, 'Down arrow exists');
    });

    it('Should check that click and drag works', async () => {
        // method not working on FF
        if (await browserIsFirefox()) {
            return;
        }
        for (let i = 0; i < sections.length; i++) {
            await checkScroll(sections[i], 'down');
            await refreshPage();
            await checkScroll(sections[i], 'up');
        }
    });

    it('should check orientation', async () => {
        await timePage.checkRtlSwitch();
    });

    xdescribe('Visual regression', () => {
        it('should check examples except dinamyc changes example', async () => {
            const actionSheetCount = await getElementArrayLength(exampleAreaContainersArr);
            for (let i = 0; actionSheetCount > i; i++) {
                if (i !== 3) {
                    await scrollIntoView(exampleAreaContainersArr, i);
                    await saveElementScreenshot(
                        exampleAreaContainersArr,
                        `time-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                        await timePage.getScreenshotFolder()
                    );
                    await expect(
                        await checkElementScreenshot(
                            exampleAreaContainersArr,
                            `time-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                            await timePage.getScreenshotFolder()
                        )
                    ).toBeLessThan(5);
                }
            }
        });
    });

    async function checkClockMoving(section: string, action: 'arrowClick' | 'buttonClick'): Promise<void> {
        const nextHourValue = await getNextElementText(section + currentHour);
        if (action === 'arrowClick') {
            await click(section + downArrow);
        }
        if (action === 'buttonClick') {
            await clickNextElement(section + currentHour);
        }
        await expect(await getText(section + currentHour)).toEqual(
            nextHourValue,
            'Current hour is not equal chosen value'
        );

        if (section !== onlyHoursExample) {
            await click(section + minutesColumn);
            const previousMinuteValue = await getPreviousElementText(section + currentMinute);
            if (action === 'arrowClick') {
                await click(section + UpArrow);
            }
            if (action === 'buttonClick') {
                await clickPreviousElement(section + currentMinute);
            }
            await expect(await getText(section + currentMinute)).toEqual(
                previousMinuteValue,
                'Current hour is not equal chosen value'
            );
        }

        if (section !== withoutSecondsExample && section !== onlyHoursExample) {
            await click(section + secondsColumn);
            const previousSecondValue = await getPreviousElementText(section + currentSec);
            if (action === 'arrowClick') {
                await click(section + UpArrow);
            }
            if (action === 'buttonClick') {
                await clickPreviousElement(section + currentSec);
            }
            await expect(await getText(section + currentSec)).toEqual(
                previousSecondValue,
                'Current hour is not equal chosen value'
            );
        }
    }

    async function checkScroll(section: string, direction: 'up' | 'down'): Promise<void> {
        let scrollStep, scrollToHour, scrollToMinute, scrollToSec;

        if (direction === 'up') {
            if ((await getElementClass(section + clockArea)) === 'fd-time is-compact') {
                scrollStep = 50;
            } else {
                scrollStep = 100;
            }
        } else if (direction === 'down') {
            if ((await getElementClass(section + clockArea)) === 'fd-time is-compact') {
                scrollStep = -50;
            } else {
                scrollStep = -100;
            }
        }

        if (direction === 'up') {
            scrollToHour = await getText(section + upperhour);
        }
        if (direction === 'down') {
            scrollToHour = await getText(section + lowerHour);
        }
        await clickAndMoveElement(section + hoursColumn, 0, scrollStep);
        await expect(await getText(section + currentHour)).toEqual(
            scrollToHour,
            'The current hour is not equivalent to the hour to which you have scrolled'
        );

        if (section !== onlyHoursExample) {
            await click(section + minutesColumn);
            if (direction === 'up') {
                scrollToMinute = await getText(section + upperMinute);
            }
            if (direction === 'down') {
                scrollToMinute = await getText(section + lowerMinute);
            }
            await clickAndMoveElement(section + minutesColumn, 0, scrollStep);
            await expect(await getText(section + currentMinute)).toEqual(
                scrollToMinute,
                'The current hour is not equivalent to the hour to which you have scrolled'
            );
        }
        if (section !== withoutSecondsExample && section !== onlyHoursExample) {
            await click(section + secondsColumn);
            if (direction === 'up') {
                scrollToSec = await getText(section + upperSec);
            }
            if (direction === 'down') {
                scrollToSec = await getText(section + lowerSec);
            }
            await clickAndMoveElement(section + secondsColumn, 0, scrollStep);
            await expect(await getText(section + currentSec)).toEqual(
                scrollToSec,
                'The current hour is not equivalent to the hour to which you have scrolled'
            );
        }
    }
});
