import { DialogPo } from '../pages/dialog.po';
import {
    browserIsFirefox,
    checkElementScreenshot,
    click,
    clickAndDragElement,
    clickWithOption,
    doesItExist,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementLocation,
    getElementSize,
    getImageTagBrowserPlatform,
    getText,
    isElementDisplayed,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForNotPresent
} from '../../driver/wdio';
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
    fullscreenClass,
    mobileClass,
    mobileProperty,
    noMobileSpacingClass,
    outlineProperty,
    styleAttribute,
    topPaddingProperty
} from '../fixtures/appData/dialog-contents';
import { papayaFruit } from '../fixtures/testData/dialog';

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
        dialogContainer
    } = dialogPage;

    beforeAll(() => {
        dialogPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForElDisplayed(dialogPage.title);
    }, 1);

    describe('template based dialog example', () => {
        it('should check dialog dismissal and output', () => {
            const acceptBtn = 0;
            const cancelBtn = 1;

            checkDialogDismissals(templateDialog, button, acceptBtn, continueStatus);
            checkDialogDismissals(templateDialog, button, cancelBtn, canceledStatus);
            checkCloseDialogWithEscapeKey(templateDialog, button);
        });
    });

    describe('component based dialog example', () => {
        it('should check dialog dismissal and output', () => {
            const acceptBtn = 0;
            const cancelBtn = 1;

            checkDialogDismissals(componentDialog, button, acceptBtn, continueStatus);
            checkDialogDismissals(componentDialog, button, cancelBtn, canceledStatus);
            checkCloseDialogWithEscapeKey(componentDialog, button);
        });
    });

    describe('object based dialog example', () => {
        it('should check dialog dismissal and output', () => {
            const closeBtn = 0;
            const acceptBtn = 2;
            const cancelBtn = 3;

            checkDialogDismissals(objectDialog, button, closeBtn, dismissedStatus);
            checkDialogDismissals(objectDialog, button, acceptBtn, approvedStatus);
            checkDialogDismissals(objectDialog, button, cancelBtn, canceledStatus);
            checkCloseDialogWithEscapeKey(objectDialog, button);
        });
    });

    describe('dialog state examples', () => {
        it('should check auto dismissal', () => {
            const selfDismissingDialogCount = 3;

            for (let i = 0; i < selfDismissingDialogCount; i++) {
                openDialog(stateDialog, i);
                // expect the dialog to close automatically in 4 seconds
                expect(waitForNotPresent(dialog)).toBe(true, 'dialog did not close automatically');
            }
        });

        it('check ability to dismiss alerts', () => {
            const dialogCount = getElementArrayLength(stateDialog + button);

            for (let i = 0; i < dialogCount; i++) {
                openDialog(stateDialog, i);
                closeDialog();

                expect(doesItExist(dialog)).toBe(false, 'dialog did not close');
            }
        });

        it('check the loading icon', () => {
            openDialog(stateDialog, 3);

            expect(isElementDisplayed(dialog + busyIndicator)).toBe(true, 'busy Indicator is not displayed');
            closeDialog();
        });
    });

    describe('dialog configuration examples', () => {
        it('should check dialog is draggable', () => {
            if (!browserIsFirefox()) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }

            openDialog(configurationDialog);
            const dialogStartLocationX = Math.floor(getElementLocation(dialogContainer, 0, 'x'));
            const dialogStartLocationY = Math.floor(getElementLocation(dialogContainer, 0, 'y'));

            clickAndDragElement(
                dialogStartLocationX + 20,
                dialogStartLocationY + 10,
                dialogStartLocationX - 100,
                dialogStartLocationY - 50
            );

            expect(Math.floor(getElementLocation(dialogContainer, 0, 'x'))).not.toBe(dialogStartLocationX);
            expect(Math.floor(getElementLocation(dialogContainer, 0, 'y'))).not.toBe(dialogStartLocationY);
            closeDialog();
        });

        it('should check dialog is resizeable', () => {
            openDialog(configurationDialog, 1);

            checkResizingDialog();

            closeDialog();
        });

        it('should check dialog only closes with footer button click', () => {
            openDialog(configurationDialog, 2);
            clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            expect(doesItExist(dialog)).toBe(true, 'dialog is closed when it should be open');
            closeDialog();

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
        });
    });

    describe('dialog positioning example', () => {
        it('should check dialog in bottom right', () => {
            openDialog(positionDialog);

            expect(getAttributeByName(dialogContainer2, styleAttribute)).toContain(bottomRightPosition);
            closeDialog();
        });
    });

    describe('mobile dialog example', () => {
        it('should check mobile property', () => {
            openDialog(mobileDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).toContain(mobileProperty);
            closeDialog();
        });
    });

    describe('complex dialog example', () => {
        it('should check dialog selections', () => {
            if (browserIsFirefox()) {
                refreshPage();
            }
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);
            waitForElDisplayed(dialogItems);
            const startingPrice = getText(dialogCartOutput);

            click(dialogItems, 1);

            expect(getText(dialogCartOutput)).not.toEqual(startingPrice);
            clearAndCloseDialog();
        }, 1);

        it('should check ability to clear dialog/cart', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);

            click(dialogItems, 1);
            click(dialogItems, 3);
            click(dialog + button);

            expect(getText(dialogCartOutput)).toEqual(defaultPrice);
            clearAndCloseDialog();
        }, 1);

        it('should check dialog search', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);

            click(searchBar);
            sendKeys(papayaFruit);

            expect(getText(dialogItems).toLowerCase()).toContain(papayaFruit);
            clearAndCloseDialog();
        }, 1);

        it('should check resizing dialog', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);
            const startStyle = getAttributeByName(dialogContainer, styleAttribute);

            checkResizingDialog(dialogContainer);
            expect(getAttributeByName(dialogContainer, styleAttribute)).not.toBe(startStyle);
            clearAndCloseDialog();
        }, 1);
    });

    describe('stacked dialogs examples', () => {
        it('should check that there can be multiple dialogs', () => {
            openDialog(stackedDialog);

            expect(getElementArrayLength(dialog)).toBe(1);
            click(dialog + button, 1);
            waitForElDisplayed(dialog, 1);

            expect(getElementArrayLength(dialog)).toBe(2);
            click(dialog + button, 3);
            closeDialog();

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
        });
    });

    describe('custom backdrop and container examples', () => {
        it('should check custom backdrop dialog dismissal', () => {
            openDialog(customDialog);

            click(dialog + button);

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
            openDialog(customDialog);

            click(dialog + button, 1);

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
        });

        it('should check custom backdrop class', () => {
            openDialog(customDialog);

            expect(getAttributeByName(dialog, classAttribute)).toContain(customClass);

            click(dialog + button);
        });

        it('should check custom container dismissal', () => {
            click(customDialog + button, 1);
            waitForElDisplayed(dialog);
            click(dialog + button);

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');

            click(customDialog + button, 1);
            waitForElDisplayed(dialog);
            click(dialog + button, 1);

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
        });

        it('should check static dialog dismissal', () => {
            click(customDialog + button, 2);
            waitForElDisplayed(dialog);
            click(dialog + button);

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');

            click(customDialog + button, 2);
            waitForElDisplayed(dialog);
            click(dialog + button, 1);

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');
        });
    });

    describe('playground examples', () => {
        afterEach(() => {
            refreshPage();
            waitForElDisplayed(dialogPage.title);
        }, 1);

        it('should check dialog backdropClickCloseable option', () => {
            openDialog(playgroundDialog);
            clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');

            click(playgroundDialog + checkboxes, 1);
            openDialog(playgroundDialog);
            clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            expect(doesItExist(dialog)).toBe(true, 'dialog is closed when it should be open');
        });

        it('should check dialog escKeyCloseable option', () => {
            openDialog(playgroundDialog);
            sendKeys('Escape');
            expect(doesItExist(dialog)).toBe(false, 'dialog is open when it should be closed');

            scrollIntoView(playgroundDialog + checkboxes, 2);
            click(playgroundDialog + checkboxes, 2);
            openDialog(playgroundDialog);
            sendKeys('Escape');

            expect(doesItExist(dialog)).toBe(true, 'dialog is closed when it should be open');
        });

        it('should check dialog focusTrapped option', () => {
            openDialog(playgroundDialog);

            expect(emptyValuesArr).not.toContain(getCSSPropertyByName(dialog + button, outlineProperty).value);

            closeDialog();
            click(playgroundDialog + checkboxes, 3);
            openDialog(playgroundDialog);

            expect(emptyValuesArr).not.toContain(getCSSPropertyByName(dialog + button, outlineProperty).value);
        });

        it('should check dialog fullScreen option', () => {
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).not.toContain(fullscreenClass);

            closeDialog();
            click(playgroundDialog + checkboxes, 4);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).toContain(fullscreenClass);
        });

        it('should check dialog mobile option', () => {
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).not.toContain(mobileClass);

            closeDialog();
            click(playgroundDialog + checkboxes, 5);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).toContain(mobileClass);
        });

        it('should check dialog mobileOuterSpacing option', () => {
            click(playgroundDialog + checkboxes, 5);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).not.toContain(noMobileSpacingClass);
            closeDialog();
            click(playgroundDialog + checkboxes, 6);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer2, classAttribute)).toContain(noMobileSpacingClass);
        });

        it('should check dialog draggable option', () => {
            if (!browserIsFirefox()) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }
            click(playgroundDialog + checkboxes, 7);
            openDialog(playgroundDialog);
            const dialogStartLocationX = Math.floor(getElementLocation(dialogContainer, 0, 'x'));
            const dialogStartLocationY = Math.floor(getElementLocation(dialogContainer, 0, 'y'));

            clickAndDragElement(
                dialogStartLocationX + 20,
                dialogStartLocationY + 10,
                dialogStartLocationX - 100,
                dialogStartLocationY - 50
            );

            expect(Math.floor(getElementLocation(dialogContainer, 0, 'x'))).not.toBe(dialogStartLocationX);
            expect(Math.floor(getElementLocation(dialogContainer, 0, 'y'))).not.toBe(dialogStartLocationY);
        });

        it('should check dialog resizable option', () => {
            openDialog(playgroundDialog);

            expect(doesItExist(resizeHandle)).toBe(false, 'resize handle exists when it should not');

            closeDialog();
            click(playgroundDialog + checkboxes, 8);
            openDialog(playgroundDialog);

            checkResizingDialog();
        });

        it('should check dialog verticalPadding option', () => {
            openDialog(playgroundDialog);
            // tslint:disable-next-line:radix
            const dialogPaddingValue = parseInt(
                getCSSPropertyByName(dialogBody, topPaddingProperty).value.replace('px', '')
            );

            expect(dialogPaddingValue).toBeGreaterThan(0);

            closeDialog();
            click(playgroundDialog + checkboxes, 9);
            openDialog(playgroundDialog);
            // tslint:disable-next-line:radix
            const newDialogPaddingValue = parseInt(
                getCSSPropertyByName(dialogBody, topPaddingProperty).value.replace('px', '')
            );

            expect(newDialogPaddingValue).toBe(0);
        });

        it('should check dialog width and height options', () => {
            click(playgroundDialog + inputFields);
            sendKeys('400px');
            click(playgroundDialog + inputFields, 1);
            sendKeys('400px');
            openDialog(playgroundDialog);

            expect(getElementSize(dialogContainer2, 0, 'width')).toBe(400);
            expect(getElementSize(dialogContainer2, 0, 'height')).toBe(400);
        });

        it('should check dialog min/max width and height options', () => {
            click(playgroundDialog + checkboxes, 8);
            click(playgroundDialog + inputFields, 2);
            sendKeys('400px');
            click(playgroundDialog + inputFields, 3);
            sendKeys('600px');
            click(playgroundDialog + inputFields, 4);
            sendKeys('400px');
            click(playgroundDialog + inputFields, 5);
            sendKeys('600px');
            openDialog(playgroundDialog);
            const handleXLocation = Math.floor(getElementLocation(resizeHandle, 0, 'x'));
            const handleYLocation = Math.floor(getElementLocation(resizeHandle, 0, 'y'));

            clickAndDragElement(handleXLocation + 1, handleYLocation + 1, handleXLocation + 250, handleYLocation + 250);

            expect(getElementSize(dialogContainer2, 0, 'width')).toBe(600);
            expect(getElementSize(dialogContainer2, 0, 'height')).toBe(600);

            const newHandleXLocation = Math.floor(getElementLocation(resizeHandle, 0, 'x'));
            const newHandleYLocation = Math.floor(getElementLocation(resizeHandle, 0, 'y'));

            clickAndDragElement(
                newHandleXLocation + 1,
                newHandleYLocation + 1,
                newHandleXLocation - 300,
                newHandleYLocation - 300
            );

            expect(getElementSize(dialogContainer2, 0, 'width')).toBe(400);
            expect(getElementSize(dialogContainer2, 0, 'height')).toBe(400);
        });
    });

    xdescribe('visual regression', () => {
        const complexExample = 12;
        const stackedExample = 13;

        beforeEach(() => {
            refreshPage();
        }, 1);

        it('should check examples visual regression', () => {
            dialogPage.saveExampleBaselineScreenshot();
            expect(dialogPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check each dialog', () => {
            const dialogCount = getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                if (i === 3 || i === 4 || i === 5 || i === 6) {
                    // skip due to dynamic content
                    continue;
                }
                if (i === complexExample) {
                    openDialog(dialogExamples, i);
                    waitForNotDisplayed(busyIndicator);
                    waitForElDisplayed(dialogItems);
                    saveElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}-${getImageTagBrowserPlatform()}-`,
                        dialogPage.getScreenshotFolder()
                    );
                    expect(
                        checkElementScreenshot(
                            dialogContainer2,
                            `dialog-${i}-${getImageTagBrowserPlatform()}-`,
                            dialogPage.getScreenshotFolder()
                        )
                    ).toBeLessThan(5, `dialog ${i} screenshot doesn't match baseline`);
                    click(dialog + button, 2);
                    continue;
                }
                if (i === stackedExample) {
                    openDialog(dialogExamples, i);
                    saveElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}a-${getImageTagBrowserPlatform()}-`,
                        dialogPage.getScreenshotFolder()
                    );
                    expect(
                        checkElementScreenshot(
                            dialogContainer2,
                            `dialog-${i}a-${getImageTagBrowserPlatform()}-`,
                            dialogPage.getScreenshotFolder()
                        )
                    ).toBeLessThan(5, `dialog ${i}a screenshot doesn't match baseline`);
                    click(dialog + button, 1);
                    waitForElDisplayed(dialog, 1);
                    saveElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}b-${getImageTagBrowserPlatform()}-`,
                        dialogPage.getScreenshotFolder(),
                        1
                    );
                    expect(
                        checkElementScreenshot(
                            dialogContainer2,
                            `dialog-${i}b-${getImageTagBrowserPlatform()}-`,
                            dialogPage.getScreenshotFolder(),
                            1
                        )
                    ).toBeLessThan(5, `dialog ${i}b screenshot doesn't match baseline`);
                    click(dialog + button, 3);
                    closeDialog();
                    continue;
                }
                openDialog(dialogExamples, i);
                saveElementScreenshot(
                    dialogContainer2,
                    `dialog-${i}-${getImageTagBrowserPlatform()}-`,
                    dialogPage.getScreenshotFolder()
                );
                expect(
                    checkElementScreenshot(
                        dialogContainer2,
                        `dialog-${i}-${getImageTagBrowserPlatform()}-`,
                        dialogPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5, `dialog ${i} screenshot doesn't match baseline`);
                if (doesItExist(dialog) === false) {
                    continue;
                }
                click(dialog + button);
            }
        });

        it('should check custom backdrop example', () => {
            openDialog(customDialog);

            saveElementScreenshot(
                dialog,
                `dialog-with-custom-backdrop-${getImageTagBrowserPlatform()}-`,
                dialogPage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    dialog,
                    `dialog-dialog-with-custom-backdrop-${getImageTagBrowserPlatform()}-`,
                    dialogPage.getScreenshotFolder()
                )
            ).toBeLessThan(25, `dialog with custom backdrop screenshot doesn't match baseline`);

            closeDialog();
        });

        it('should check playground dialog hasBackdrop option', () => {
            openDialog(playgroundDialog);

            saveElementScreenshot(
                dialog,
                `dialog-with-hasBackdrop-${getImageTagBrowserPlatform()}-`,
                dialogPage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    dialog,
                    `dialog-dialog-with-hasBackdrop-${getImageTagBrowserPlatform()}-`,
                    dialogPage.getScreenshotFolder()
                )
            ).toBeLessThan(25, `dialog with hasBackdrop screenshot doesn't match baseline`);

            closeDialog();
        });
    });

    function checkDialogDismissals(
        exampleSelector: string,
        dialogSelector: string,
        dialogButtonIndex: number = 0,
        expectation: string,
        selectorIndex: number = 0
    ): void {
        scrollIntoView(exampleSelector, selectorIndex);
        click(exampleSelector + dialogSelector, selectorIndex);
        waitForElDisplayed(dialog);
        click(dialog + button, dialogButtonIndex);

        expect(getText(exampleSelector + dialogOutput)).toContain(expectation);
    }

    function checkCloseDialogWithEscapeKey(
        exampleSelector: string,
        dialogSelector: string,
        selectorIndex: number = 0
    ): void {
        scrollIntoView(exampleSelector, selectorIndex);
        click(exampleSelector + dialogSelector, selectorIndex);
        waitForElDisplayed(dialog);
        sendKeys('Escape');

        expect(getText(exampleSelector + dialogOutput)).toContain(escapeStatus);
    }

    function openDialog(dialogSelector: string, index: number = 0): void {
        scrollIntoView(dialogSelector + button, index);
        click(dialogSelector + button, index);
        waitForElDisplayed(dialog);
    }

    function clearAndCloseDialog(): void {
        // clicks on clear btn
        click(dialog + button);
        // clicks to close dialog
        click(dialog + button, 2);
    }

    function closeDialog(): void {
        click(dialog + button);
    }

    function checkResizingDialog(container: string = dialogContainer2): void {
        const elementStartWidth = getElementSize(container, 0, 'width');
        const elementStartHeight = getElementSize(container, 0, 'height');
        const handleLocationX = Math.floor(getElementLocation(resizeHandle, 0, 'x'));
        const handleLocationY = Math.floor(getElementLocation(resizeHandle, 0, 'y'));

        clickAndDragElement(handleLocationX + 1, handleLocationY + 1, handleLocationX + 110, handleLocationY + 100);

        expect(getElementSize(container, 0, 'width')).not.toBe(elementStartWidth);
        expect(getElementSize(container, 0, 'height')).not.toBe(elementStartHeight);
    }
});
