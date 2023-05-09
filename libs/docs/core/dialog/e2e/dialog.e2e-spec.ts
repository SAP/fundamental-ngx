import { DialogPo } from './dialog.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    browserIsFirefox,
    browserIsSafari,
    checkElementScreenshot,
    clearValue,
    click,
    clickAndDragElement,
    clickWithOption,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementLocation,
    getElementSize,
    getImageTagBrowserPlatform,
    getText,
    isElementDisplayed,
    pause,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisappear,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForNotPresent,
    waitForPresent
} from '../../../../../e2e';
import {
    approvedStatus,
    bottomRightPosition,
    canceledStatus,
    classAttribute,
    continueStatus,
    customClass,
    defaultPrice,
    dismissedStatus,
    emptyValuesArr,
    escapeStatus,
    mobileClass,
    mobileProperty,
    noMobileSpacingClass,
    outlineProperty,
    styleAttribute,
    topPaddingProperty
} from './dialog-contents';
import { papayaFruit } from './dialog';
import waitForDisplayed from 'webdriverio/build/commands/element/waitForDisplayed';

describe('dialog test suite', () => {
    const dialogPage = new DialogPo();
    const {
        templateDialog,
        button,
        dialog,
        dialogOutput,
        componentDialog,
        objectDialog,
        stateDialog,
        busyIndicator,
        configurationDialog,
        dialogContainer2,
        resizeHandle,
        positionDialog,
        mobileDialog,
        complexDialog,
        dialogItems,
        searchBar,
        dialogCartOutput,
        stackedDialog,
        playgroundDialog,
        checkboxes,
        inputFields,
        dialogExamples,
        customDialog,
        dialogBody,
        dialogContainer,
        formDialog,
        dialogInput
    } = dialogPage;

    beforeAll(async () => {
        await dialogPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(dialogPage.root);
        await waitForElDisplayed(dialogPage.title);
    }, 1);

    describe('template based dialog example', () => {
        it('should check dialog dismissal and output', async () => {
            const acceptBtn = 0;
            const cancelBtn = 1;

            await checkDialogDismissals(templateDialog, button, acceptBtn, continueStatus);
            await checkDialogDismissals(templateDialog, button, cancelBtn, canceledStatus);
            await checkCloseDialogWithEscapeKey(templateDialog, button);
        });
    });

    describe('component based dialog example', () => {
        it('should check dialog dismissal and output', async () => {
            const acceptBtn = 0;
            const cancelBtn = 1;

            await checkDialogDismissals(componentDialog, button, acceptBtn, continueStatus);
            await checkDialogDismissals(componentDialog, button, cancelBtn, canceledStatus);
            await checkCloseDialogWithEscapeKey(componentDialog, button);
        });
    });

    describe('object based dialog example', () => {
        it('should check dialog dismissal and output', async () => {
            const closeBtn = 0;
            const acceptBtn = 2;
            const cancelBtn = 3;

            await checkDialogDismissals(objectDialog, button, closeBtn, dismissedStatus);
            await checkDialogDismissals(objectDialog, button, acceptBtn, approvedStatus);
            await checkDialogDismissals(objectDialog, button, cancelBtn, canceledStatus);
            await checkCloseDialogWithEscapeKey(objectDialog, button);
        });
    });

    describe('dialog state examples', () => {
        it('should check auto dismissal', async () => {
            const selfDismissingDialogCount = 3;

            for (let i = 0; i < selfDismissingDialogCount; i++) {
                await openDialog(stateDialog, i);
                // expect the dialog to close automatically in 4 seconds
                await expect(await waitForNotPresent(dialog)).toBe(true, 'dialog did not close automatically');
            }
        });

        it('check ability to dismiss alerts', async () => {
            const dialogCount = await getElementArrayLength(stateDialog + button);

            for (let i = 0; i < dialogCount; i++) {
                await openDialog(stateDialog, i);
                await closeDialog();

                await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog did not close');
            }
        });

        it('check the loading icon', async () => {
            await openDialog(stateDialog, 3);

            await expect(await isElementDisplayed(dialog + busyIndicator)).toBe(
                true,
                'busy Indicator is not displayed'
            );
            await closeDialog();
        });
    });

    describe('dialog configuration examples', () => {
        it('should check dialog is draggable', async () => {
            if (!(await browserIsFirefox())) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }

            await openDialog(configurationDialog);
            const dialogStartLocationX = Math.floor(await getElementLocation(dialogContainer, 0, 'x'));
            const dialogStartLocationY = Math.floor(await getElementLocation(dialogContainer, 0, 'y'));

            await clickAndDragElement(
                dialogStartLocationX + 20,
                dialogStartLocationY + 10,
                dialogStartLocationX - 100,
                dialogStartLocationY - 50
            );

            await expect(Math.floor(await getElementLocation(dialogContainer, 0, 'x'))).not.toBe(dialogStartLocationX);
            await expect(Math.floor(await getElementLocation(dialogContainer, 0, 'y'))).not.toBe(dialogStartLocationY);
            await closeDialog();
        });

        it('should check dialog is resizeable', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await openDialog(configurationDialog, 1);

            await waitForElDisplayed(dialog);

            await checkResizingDialog();

            await closeDialog();
        });

        it('should check dialog only closes with footer button click', async () => {
            await openDialog(configurationDialog, 2);
            await clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            await expect(await doesItExist(dialog)).toBe(true, 'dialog is closed when it should be open');
            await closeDialog();

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');
        });
    });

    describe('dialog positioning example', () => {
        it('should check dialog in bottom right', async () => {
            await openDialog(positionDialog);

            await expect(await getAttributeByName(dialogContainer2, styleAttribute)).toContain(bottomRightPosition);
            await closeDialog();
        });
    });

    describe('mobile dialog example', () => {
        it('should check mobile property', async () => {
            await openDialog(mobileDialog);

            await expect(await getAttributeByName(dialogContainer2, classAttribute)).toContain(mobileProperty);
            await closeDialog();
        });
    });

    describe('complex dialog example', () => {
        it('should check dialog selections', async () => {
            await refreshPage();
            await waitForPresent(dialogPage.root);
            await waitForElDisplayed(dialogPage.title);
            await openDialog(complexDialog);
            await pause(5000);
            await waitForElDisplayed(dialogItems);
            const startingPrice = await getText(dialogCartOutput);

            await click(dialogItems, 1);

            await expect(await getText(dialogCartOutput)).not.toEqual(startingPrice);
            await clearAndCloseDialog();
        });

        it('should check ability to clear dialog/cart', async () => {
            await openDialog(complexDialog);
            await pause(5000);
            await waitForElDisplayed(dialogItems);

            await click(dialogItems, 1);
            await click(dialogItems, 3);
            await click(dialog + button);

            await expect((await getText(dialogCartOutput)).trim()).toEqual(defaultPrice);
            await clearAndCloseDialog();
        });

        it('should check dialog search', async () => {
            if (await browserIsFirefox()) {
                // skip FF due to unknown issue where FF tries to run openDialog twice
                return;
            }
            await openDialog(complexDialog);
            await pause(5000);

            await click(searchBar);
            await setValue(searchBar, papayaFruit);

            await expect((await getText(dialogItems)).toLowerCase()).toContain(papayaFruit);
            await clearAndCloseDialog();
        });

        it('should check resizing dialog', async () => {
            if ((await browserIsFirefox()) || (await browserIsSafari())) {
                // skip FF due to unknown issue where FF tries to run openDialog twice
                // skip Safari due to dragNdrop does not work
                return;
            }
            await openDialog(complexDialog);
            await pause(5000);
            const startStyle = await getAttributeByName(dialogContainer, styleAttribute);

            await checkResizingDialog(dialogContainer);
            await expect(await getAttributeByName(dialogContainer, styleAttribute)).not.toBe(startStyle);
            await clearAndCloseDialog();
        }, 1);
    });

    describe('stacked dialogs examples', () => {
        it('should check that there can be multiple dialogs', async () => {
            let currentDialogCount = await getElementArrayLength(dialog);
            if (currentDialogCount > 0) {
                for (let i = 1; i++; i <= currentDialogCount) {
                    await click(dialog + button);
                }
            }
            await openDialog(stackedDialog);

            await waitForElDisplayed(dialog);

            currentDialogCount = await getElementArrayLength(dialog);

            await expect(currentDialogCount).toBe(1);
            await click(dialog + button, 1);
            await waitForElDisplayed(dialog, 1);

            currentDialogCount = await getElementArrayLength(dialog);

            await expect(currentDialogCount).toBe(2);
            await click(dialog + button, 3);
            await pause(500);
            // await waitForNotPresent(dialog, 1);
            await closeDialog();

            await pause(500);

            await expect(await doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
        });
    });

    describe('custom backdrop and container examples', () => {
        it('should check custom backdrop dialog dismissal', async () => {
            await openDialog(customDialog);

            await click(dialog + button);

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');
            await openDialog(customDialog);

            await click(dialog + button, 1);

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');
        });

        it('should check custom backdrop class', async () => {
            await openDialog(customDialog);

            await expect(await getAttributeByName(dialog, classAttribute)).toContain(customClass);

            await click(dialog + button);
        });

        it('should check custom container dismissal', async () => {
            await click(customDialog + button, 1);
            await waitForElDisplayed(dialog);
            await click(dialog + button);

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');

            await click(customDialog + button, 1);
            await waitForElDisplayed(dialog);
            await click(dialog + button, 1);

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');
        });

        it('should check static dialog dismissal', async () => {
            await click(customDialog + button, 2);
            await waitForElDisplayed(dialog);
            await click(dialog + button);

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');

            await click(customDialog + button, 2);
            await waitForElDisplayed(dialog);
            await click(dialog + button, 1);

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');
        });
    });

    describe('playground examples', () => {
        afterEach(async () => {
            await refreshPage();
            await waitForElDisplayed(dialogPage.title);
        }, 1);

        it('should check dialog backdropClickCloseable option', async () => {
            await openDialog(playgroundDialog);
            await clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');

            await click(playgroundDialog + checkboxes, 1);
            await openDialog(playgroundDialog);
            await clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            // Just give it a time for dialog to potentially disappear.
            await pause(500);

            await expect(await doesItExist(dialog)).toBe(true, 'dialog is closed when it should be open');
        });

        it('should check dialog escKeyCloseable option', async () => {
            await openDialog(playgroundDialog);
            await sendKeys('Escape');
            await expect(await waitForElDisappear(dialog)).toBe(true, 'dialog is open when it should be closed');

            await scrollIntoView(playgroundDialog + checkboxes, 2);
            await click(playgroundDialog + checkboxes, 2);
            await openDialog(playgroundDialog);
            await sendKeys('Escape');

            // Just give it a time for dialog to potentially disappear.
            await pause(500);

            await expect(await doesItExist(dialog)).toBe(true, 'dialog is closed when it should be open');
        });

        it('should check dialog mobile option', async () => {
            await openDialog(playgroundDialog);

            await waitForElDisplayed(dialog);

            await expect(await getAttributeByName(dialogContainer2, classAttribute)).not.toContain(mobileClass);

            await closeDialog();
            await waitForElDisappear(dialog);
            await click(playgroundDialog + checkboxes, 5);
            await openDialog(playgroundDialog);

            await waitForElDisplayed(dialog);

            await expect(await getAttributeByName(dialogContainer2, classAttribute)).toContain(mobileClass);
        });

        it('should check dialog mobileOuterSpacing option', async () => {
            await click(playgroundDialog + checkboxes, 5);
            await openDialog(playgroundDialog);

            await waitForElDisplayed(dialog);

            await expect(await getAttributeByName(dialogContainer2, classAttribute)).not.toContain(
                noMobileSpacingClass
            );
            await closeDialog();
            await waitForElDisappear(dialog);
            await click(playgroundDialog + checkboxes, 6);
            await openDialog(playgroundDialog);

            await waitForElDisplayed(dialog);

            await expect(await getAttributeByName(dialogContainer2, classAttribute)).toContain(noMobileSpacingClass);
        });

        it('should check dialog draggable option', async () => {
            if (!(await browserIsFirefox())) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }
            await click(playgroundDialog + checkboxes, 7);
            await openDialog(playgroundDialog);
            const dialogStartLocationX = Math.floor(await getElementLocation(dialogContainer, 0, 'x'));
            const dialogStartLocationY = Math.floor(await getElementLocation(dialogContainer, 0, 'y'));

            await clickAndDragElement(
                dialogStartLocationX + 20,
                dialogStartLocationY + 10,
                dialogStartLocationX - 100,
                dialogStartLocationY - 50
            );

            await expect(Math.floor(await getElementLocation(dialogContainer, 0, 'x'))).not.toBe(dialogStartLocationX);
            await expect(Math.floor(await getElementLocation(dialogContainer, 0, 'y'))).not.toBe(dialogStartLocationY);
        });

        it('should check dialog resizable option', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await openDialog(playgroundDialog);

            await expect(await doesItExist(resizeHandle)).toBe(false, 'resize handle exists when it should not');

            await closeDialog();
            await waitForElDisappear(dialog);
            await click(playgroundDialog + checkboxes, 8);
            await openDialog(playgroundDialog);

            await waitForElDisplayed(dialog);

            await checkResizingDialog();
        });

        it('should check dialog width and height options', async () => {
            // skipped due to getElement size works incorrect in Safari
            if (await browserIsSafari()) {
                return;
            }
            await click(playgroundDialog + inputFields);
            await setValue(playgroundDialog + inputFields, '400px');
            await click(playgroundDialog + inputFields, 1);
            await setValue(playgroundDialog + inputFields, '400px', 1);
            await openDialog(playgroundDialog);
            await waitForElDisplayed(dialogContainer2);

            await expect(await (await getElementSize(dialogContainer2, 0)).width).toBe(400);
            await expect(await (await getElementSize(dialogContainer2, 0)).height).toBe(400);
        });

        it('should check dialog min/max width and height options', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await click(playgroundDialog + checkboxes, 8);
            await click(playgroundDialog + inputFields, 2);
            await sendKeys('400px');
            await click(playgroundDialog + inputFields, 3);
            await sendKeys('600px');
            await click(playgroundDialog + inputFields, 4);
            await sendKeys('400px');
            await click(playgroundDialog + inputFields, 5);
            await sendKeys('600px');
            await openDialog(playgroundDialog);
            await waitForElDisplayed(dialog);
            const handleXLocation = Math.floor(await getElementLocation(resizeHandle, 0, 'x'));
            const handleYLocation = Math.floor(await getElementLocation(resizeHandle, 0, 'y'));

            await clickAndDragElement(
                handleXLocation + 1,
                handleYLocation + 1,
                handleXLocation + 250,
                handleYLocation + 250
            );

            await expect(await (await getElementSize(dialogContainer2, 0)).width).toBe(600);
            await expect(await (await getElementSize(dialogContainer2, 0)).width).toBe(600);

            const newHandleXLocation = Math.floor(await getElementLocation(resizeHandle, 0, 'x'));
            const newHandleYLocation = Math.floor(await getElementLocation(resizeHandle, 0, 'y'));

            await clickAndDragElement(
                newHandleXLocation + 1,
                newHandleYLocation + 1,
                newHandleXLocation - 300,
                newHandleYLocation - 300
            );

            await expect(await (await getElementSize(dialogContainer2, 0)).width).toBe(400);
            await expect(await (await getElementSize(dialogContainer2, 0)).width).toBe(400);
        });
    });

    describe('Form dialog example', () => {
        it('should check open-closing', async () => {
            const acceptBtn = 0;
            const cancelBtn = 1;

            await checkDialogDismissals(formDialog, button, acceptBtn, continueStatus);
            await checkDialogDismissals(formDialog, button, cancelBtn, canceledStatus);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7195
        xit('should check required fields validation', async () => {
            await openDialog(formDialog);
            for (let i = 1; i < 4; i++) {
                await clearValue(dialogInput, i);
                await expect(await getElementClass(dialogInput, i)).toContain('is-error');
            }
        });

        it('should check close dialog via escape', async () => {
            await checkCloseDialogWithEscapeKey(formDialog, button);
        });

        it('should check turn off vertical paddings', async () => {
            await click(formDialog + checkboxes, 1);
            await openDialog(formDialog);
            await expect(await getElementClass(dialogBody)).not.toContain('no-vertical-padding');
        });
    });

    xdescribe('visual regression', () => {
        const complexExample = 12;
        const stackedExample = 13;

        beforeEach(async () => {
            await refreshPage();
        }, 1);

        it('should check examples visual regression', async () => {
            await dialogPage.saveExampleBaselineScreenshot();
            await expect(await dialogPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check each dialog', async () => {
            const dialogCount = await getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                if (i === 3 || i === 4 || i === 5 || i === 6) {
                    // skip due to dynamic content
                    continue;
                }
                if (i === complexExample) {
                    await openDialog(dialogExamples, i);
                    await waitForNotDisplayed(busyIndicator);
                    await waitForElDisplayed(dialogItems);
                    await saveElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}-${await getImageTagBrowserPlatform()}-`,
                        await dialogPage.getScreenshotFolder()
                    );
                    await expect(
                        await checkElementScreenshot(
                            dialogContainer2,
                            `dialog-${i}-${await getImageTagBrowserPlatform()}-`,
                            await dialogPage.getScreenshotFolder()
                        )
                    ).toBeLessThan(5, `dialog ${i} screenshot doesn't match baseline`);
                    await click(dialog + button, 2);
                    continue;
                }
                if (i === stackedExample) {
                    await openDialog(dialogExamples, i);
                    await saveElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}a-${await getImageTagBrowserPlatform()}-`,
                        await dialogPage.getScreenshotFolder()
                    );
                    await expect(
                        await checkElementScreenshot(
                            dialogContainer2,
                            `dialog-${i}a-${await getImageTagBrowserPlatform()}-`,
                            await dialogPage.getScreenshotFolder()
                        )
                    ).toBeLessThan(5, `dialog ${i}a screenshot doesn't match baseline`);
                    await click(dialog + button, 1);
                    await waitForElDisplayed(dialog, 1);
                    await saveElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}b-${await getImageTagBrowserPlatform()}-`,
                        await dialogPage.getScreenshotFolder(),
                        1
                    );
                    await expect(
                        await checkElementScreenshot(
                            dialogContainer2,
                            `dialog-${i}b-${await getImageTagBrowserPlatform()}-`,
                            await dialogPage.getScreenshotFolder(),
                            1
                        )
                    ).toBeLessThan(5, `dialog ${i}b screenshot doesn't match baseline`);
                    await click(dialog + button, 3);
                    await closeDialog();
                    continue;
                }
                await openDialog(dialogExamples, i);
                await saveElementScreenshot(
                    dialogContainer2,
                    `dialog-${i}-${await getImageTagBrowserPlatform()}-`,
                    await dialogPage.getScreenshotFolder()
                );
                await expect(
                    await checkElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}-${await getImageTagBrowserPlatform()}-`,
                        await dialogPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5, `dialog ${i} screenshot doesn't match baseline`);
                if ((await waitForElDisappear(dialog)) === true) {
                    continue;
                }
                await click(dialog + button);
            }
        });

        it('should check custom backdrop example', async () => {
            await openDialog(customDialog);

            await saveElementScreenshot(
                dialog,
                `dialog-with-custom-backdrop-${await getImageTagBrowserPlatform()}-`,
                await dialogPage.getScreenshotFolder()
            );
            await expect(
                await checkElementScreenshot(
                    dialog,
                    `dialog-dialog-with-custom-backdrop-${await getImageTagBrowserPlatform()}-`,
                    await dialogPage.getScreenshotFolder()
                )
            ).toBeLessThan(25, `dialog with custom backdrop screenshot doesn't match baseline`);

            await closeDialog();
        });

        it('should check playground dialog hasBackdrop option', async () => {
            await openDialog(playgroundDialog);

            await saveElementScreenshot(
                dialog,
                `dialog-with-hasBackdrop-${await getImageTagBrowserPlatform()}-`,
                await dialogPage.getScreenshotFolder()
            );
            await expect(
                await checkElementScreenshot(
                    dialog,
                    `dialog-dialog-with-hasBackdrop-${await getImageTagBrowserPlatform()}-`,
                    await dialogPage.getScreenshotFolder()
                )
            ).toBeLessThan(25, `dialog with hasBackdrop screenshot doesn't match baseline`);

            await closeDialog();
        });
    });

    async function checkDialogDismissals(
        exampleSelector: string,
        dialogSelector: string,
        dialogButtonIndex: number = 0,
        expectation: string,
        selectorIndex: number = 0
    ): Promise<void> {
        await scrollIntoView(exampleSelector, selectorIndex);
        await click(exampleSelector + dialogSelector, selectorIndex);
        await waitForElDisplayed(dialog);
        await click(dialog + button, dialogButtonIndex);
        await waitForElDisappear(dialog);

        await expect(await getText(exampleSelector + dialogOutput)).toContain(expectation);
    }

    async function checkCloseDialogWithEscapeKey(
        exampleSelector: string,
        dialogSelector: string,
        selectorIndex: number = 0
    ): Promise<void> {
        await scrollIntoView(exampleSelector, selectorIndex);
        await click(exampleSelector + dialogSelector, selectorIndex);
        await waitForElDisplayed(dialog);
        await sendKeys('Escape');
        await waitForElDisappear(dialog);

        await expect(await getText(exampleSelector + dialogOutput)).toContain(escapeStatus);
    }

    async function openDialog(dialogSelector: string, index: number = 0): Promise<void> {
        await scrollIntoView(dialogSelector + button, index);
        await click(dialogSelector + button, index);
        await waitForElDisplayed(dialog);
    }

    async function clearAndCloseDialog(): Promise<void> {
        // clicks on clear btn
        await click(dialog + button);
        // clicks to close dialog
        await click(dialog + button, 2);
    }

    async function closeDialog(): Promise<void> {
        await click(dialog + button);
    }

    async function checkResizingDialog(container: string = dialogContainer2): Promise<void> {
        const elementStartWidth = await (await getElementSize(container, 0)).width;
        const elementStartHeight = await (await getElementSize(container, 0)).height;
        const handleLocationX = Math.floor(await getElementLocation(resizeHandle, 0, 'x'));
        const handleLocationY = Math.floor(await getElementLocation(resizeHandle, 0, 'y'));

        await clickAndDragElement(
            handleLocationX + 1,
            handleLocationY + 1,
            handleLocationX + 110,
            handleLocationY + 100
        );

        await expect(await (await getElementSize(container, 0)).width).not.toBe(elementStartWidth);
        await expect(await (await getElementSize(container, 0)).height).not.toBe(elementStartHeight);
    }
});
