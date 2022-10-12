export function defaultWaitTime(): number {
    return browser.options.waitforTimeout as number;
}

export function currentPlatformName(): string {
    return browser.capabilities['platformName'];
}

export function currentBrowserName(): string {
    return browser.capabilities['browserName'];
}

export function getImageTagBrowserPlatform(): string {
    return `${currentBrowserName()}-${currentPlatformName()}`;
}

export function getBaseURL(): string | undefined {
    return browser.options.baseUrl;
}

export async function open(path: string = ''): Promise<void> {
    await browser.url(path);
}

export async function pause(waitTime: number = defaultWaitTime()): Promise<void> {
    await browser.pause(waitTime);
}

export async function execute(source): Promise<void> {
    await browser.execute(source);
}

export function isBrowser(browserName: string): boolean {
    return browser.capabilities['browserName'] === browserName;
}

export function browserIsIEorSafari(): boolean {
    return browserIsSafari() || browserIsIE();
}

export function browserIsFirefox(): boolean {
    return isBrowser('firefox');
}

export function browserIsIE(): boolean {
    return isBrowser('internet explorer');
}

export function browserIsSafari(): boolean {
    return isBrowser('Safari') || isBrowser('safari');
}

export function browserIsSafariorFF(): boolean {
    return browserIsSafari() || browserIsFirefox();
}

export async function goBack(): Promise<void> {
    await browser.back();
}

export async function refreshPage(isFullRefresh = false): Promise<void> {
    try {
        // alerts block any interactions with the page
        await browser.dismissAlert();
    } catch {}
    if (!isFullRefresh) {
        const url = await browser.getUrl();
        try {
            await click(`#toolbar-home-btn`);
        } catch {}
        if ((await browser.getUrl()).includes(`/home`)) {
            await goBack();
        } else {
            // failed to navigate, reset the url and perform full page refresh
            await browser.url(url);
            if (await browserIsSafari()) {
                await pause();
            }
        }
    } else {
        await browser.refresh();
        if (await browserIsSafari()) {
            await pause();
        }
    }
}

export async function getAlertText(): Promise<string> {
    return browser.getAlertText();
}

export async function acceptAlert(): Promise<void> {
    await browser.acceptAlert();
}

export async function isAlertOpen(): Promise<boolean> {
    return browser.isAlertOpen();
}

export async function click(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].click();
}

export async function clickRightMouseBtn(
    selector: string,
    index: number = 0,
    waitTime: number = defaultWaitTime()
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].click({ button: 'right' });
}

export async function clickWithOption(
    selector: string,
    index: number = 0,
    waitTime: number = defaultWaitTime(),
    options: Record<string, any>
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].click(options);
}

export async function doubleClick(
    selector: string,
    index: number = 0,
    waitTime: number = defaultWaitTime()
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].doubleClick();
}

// Clear value before set new
export async function setValue(
    selector: string,
    value: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    await (await $$(selector))[index].clearValue();
    await (await $$(selector))[index].setValue(value);
}

export async function addValueWithDelay(
    selector: string,
    value: string,
    delay: number = 100,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    const valueArray = Array.from(value);
    for (const symbol of valueArray) {
        await (await $$(selector))[index].addValue(symbol);
        await browser.pause(delay);
    }
}

// add value to existing one
export async function addValue(
    selector: string,
    value: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    await (await $$(selector))[index].addValue(value);
}

export async function getValue(selector: string, index: number = 0, waitTime = defaultWaitTime()): Promise<string> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].getValue();
}

export async function getArrValues(selector: string, sliceStart?: number, sliceEnd?: number): Promise<string[]> {
    await checkSelectorExists(selector);
    return Promise.all(
        (await $$(selector)).slice(sliceStart, sliceEnd).map(async (element) => await element.getValue())
    );
}

export async function getText(selector: string, index: number = 0, waitTime = defaultWaitTime()): Promise<string> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].getText();
}

export async function getTextArr(selector: string, sliceStart?: number, sliceEnd?: number): Promise<string[]> {
    await checkSelectorExists(selector);
    return Promise.all(
        (await $$(selector)).slice(sliceStart, sliceEnd).map(async (element) => (await element.getText()).trim())
    );
}

export async function waitForElDisplayed(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    await waitForPresent(selector, index);
    await checkSelectorExists(selector, index);
    return await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
}

export async function waitForInvisibilityOf(selector: string, index: number = 0): Promise<true | void> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].waitForDisplayed({ reverse: true });
}

export async function waitForNotDisplayed(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].waitForDisplayed({ timeout: waitTime, reverse: true });
}

export async function waitForClickable(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].waitForClickable({ timeout: waitTime });
}

export async function waitForUnclickable(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].waitForClickable({ timeout: waitTime, reverse: true });
}

export async function waitForElDisappear(selector: string, waitTime = defaultWaitTime()): Promise<true | void> {
    return $(selector).waitForExist({ timeout: waitTime, reverse: true });
}

export async function waitForPresent(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    await checkSelectorExists(selector, index);
    return await (await $$(selector))[index].waitForExist({ timeout: waitTime });
}

export async function waitForNotPresent(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    return (await $$(selector))[index].waitForExist({ timeout: waitTime, reverse: true });
}

export async function isEnabled(selector: string, index: number = 0, waitTime = defaultWaitTime()): Promise<boolean> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    return (await $$(selector))[index].isEnabled();
}

// Waits to be empty if text is not passed
export async function waitTextToBePresentInValue(
    selector: string,
    text: string = '',
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<true | void> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].waitUntil(
        async function (): Promise<boolean> {
            return (await this.getValue()) === text;
        },
        { timeout: waitTime, timeoutMsg: `${text} is not present in element ${selector}` }
    );
}

// Sends to the active element
export async function sendKeys(keys: string | string[]): Promise<void> {
    await browser.keys(keys);
}

export async function uploadFile(selector: string, pathToFile: string, index: number = 0): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].setValue(pathToFile);
}

export async function getAttributeByName(selector: string, attrName: string, index: number = 0): Promise<string> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].getAttribute(attrName);
}

export async function getElementClass(selector: string, index: number = 0): Promise<string> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].getAttribute('class');
}

export async function getElementTitle(selector: string, index: number = 0): Promise<string> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].getAttribute('title');
}

export async function getElementAriaLabel(selector: string, index: number = 0): Promise<string> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].getAttribute('aria-label');
}

export async function getElementPlaceholder(selector: string, index: number = 0): Promise<string> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].getAttribute('placeholder');
}

export async function getAttributeByNameArr(
    selector: string,
    attrName: string,
    sliceStart?: number,
    sliceEnd?: number
): Promise<string[]> {
    await checkSelectorExists(selector);
    return Promise.all(
        (await $$(selector)).slice(sliceStart, sliceEnd).map(async (element) => await element.getAttribute(attrName))
    );
}

// Returns object (assertions needs to be adapted)
export async function getCSSPropertyByName(selector: string, propertyName: string, index: number = 0): Promise<any> {
    // TODO: returns WebdriverIO.CSSProperty
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].getCSSProperty(propertyName);
}

export async function mouseHoverElement(
    selector: string,
    index: number = 0,
    waitTime = defaultWaitTime()
): Promise<any> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForExist({ timeout: waitTime });
    await (await $$(selector))[index].moveTo();
}

export async function clearValue(selector: string, index: number = 0, waitTime = defaultWaitTime()): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    await (await $$(selector))[index].clearValue();
}

export async function getElementSize(selector: string, index: number = 0): Promise<{ width: number; height: number }> {
    // TODO: number | WebdriverIO.SizeReturn;
    await checkSelectorExists(selector, index);
    return {
        width: await (await $$(selector))[index].getSize('width'),
        height: await (await $$(selector))[index].getSize('height')
    };
}

export async function executeScriptBeforeTagAttr(
    selector: string,
    attrName: string,
    index: number = 0
): Promise<string> {
    return browser.execute(
        (projectedSelector, projectedAttrName, projectedIndex) =>
            window.getComputedStyle(document.querySelectorAll(projectedSelector)[projectedIndex], ':before')[
                projectedAttrName
            ],
        selector,
        attrName,
        index
    );
}

export async function executeScriptAfterTagAttr(
    selector: string,
    attrName: string,
    index: number = 0
): Promise<string> {
    return browser.execute(
        (projectedSelector, projectedAttrName, projectedIndex) =>
            window.getComputedStyle(document.querySelectorAll(projectedSelector)[projectedIndex], ':after')[
                projectedAttrName
            ],
        selector,
        attrName,
        index
    );
}

export async function getElementArrayLength(selector: string): Promise<number> {
    return (await $$(selector)).length;
}

export async function elementArray(selector: string): Promise<any> {
    // TODO: returns WebdriverIO.ElementArray
    return $$(selector);
}

export async function elementDisplayed(selector: string, index: number = 0): Promise<boolean> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].isDisplayed();
}

export async function clickAndHold(
    selector: string,
    index: number = 0,
    waitTime: number = defaultWaitTime()
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].waitForDisplayed({ timeout: waitTime });
    await (await $$(selector))[index].moveTo();
    return browser.buttonDown();
}

export async function scrollIntoView(selector: string, index: number = 0): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].scrollIntoView();
}

export async function isElementClickable(selector: string, index: number = 0): Promise<boolean> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].isClickable();
}

export async function isDisplayedInViewport(selector: string, index: number = 0): Promise<boolean> {
    return (await $$(selector))[index].isDisplayedInViewport();
}

export async function waitElementToBeClickable(selector: string, index: number = 0): Promise<void> {
    await browser.waitUntil(async (): Promise<boolean> => await (await $$(selector))[index].isClickable(), {
        timeout: defaultWaitTime()
    });
}

export async function doesItExist(selector: string): Promise<boolean> {
    return $(selector).isExisting();
}

export async function getCurrentUrl(): Promise<string> {
    return browser.getUrl();
}

export async function dragAndDrop(
    elementToDragSelector: string,
    index: number = 0,
    targetElementSelector: string,
    targetIndex: number = 0
): Promise<void> {
    await checkSelectorExists(elementToDragSelector, index);
    await checkSelectorExists(targetElementSelector, index);
    await (await $$(elementToDragSelector))[index].scrollIntoView();
    await (await $$(elementToDragSelector))[index].dragAndDrop((await $$(targetElementSelector))[targetIndex]);
}

export async function clickAndMoveElement(
    selector: string,
    offsetX: number,
    offsetY: number,
    index: number = 0
): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].scrollIntoView();
    await (await $$(selector))[index].dragAndDrop({ x: offsetX, y: offsetY });
}

export async function isElementDisplayed(selector: string, index: number = 0): Promise<boolean> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].scrollIntoView();
    return (await $$(selector))[index].isDisplayed();
}

export async function focusElement(selector: string, index: number = 0): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await $$(selector))[index].scrollIntoView();
    await (await $$(selector))[index]['focus']();
    await browser.pause(10);
}

export async function mouseButtonDown(button: 0 | 1 | 2 = 0): Promise<void> {
    await browser.buttonDown(button);
}

export async function mouseButtonUp(button: 0 | 1 | 2 = 0): Promise<void> {
    await browser.buttonUp(button);
}

export async function clickNextElement(selector: string, index: number = 0): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await (await $$(selector))[index].nextElement()).click();
}

export async function clickPreviousElement(selector: string, index: number = 0): Promise<void> {
    await checkSelectorExists(selector, index);
    await (await (await $$(selector))[index].previousElement()).click();
}

export function getElementLocation(selector: string, index?: number): any; // TODO: returns WebdriverIO.LocationReturn
export function getElementLocation(selector: string, index: number, prop: 'x' | 'y'): Promise<number>;
export async function getElementLocation(selector: string, index: number = 0, prop?: 'x' | 'y'): Promise<number> {
    // TODO: returns WebdriverIO.LocationReturn | number
    if (!prop) {
        return 0;
    }
    return (await $$(selector))[index].getLocation(prop);
}

export async function getParentElementCSSProperty(
    selector: string,
    prop: string,
    index: number
): Promise<string | undefined> {
    await checkSelectorExists(selector, index);
    return (await (await (await $$(selector))[index].parentElement()).getCSSProperty(prop)).value;
}

export async function addIsActiveClass(selector: string, index: number = 0): Promise<void> {
    await (await $$(selector))[index]['addIsActiveClass']();
}

export async function clickAndDragElement(
    locationX: number,
    locationY: number,
    newLocationX: number,
    newLocationY: number
): Promise<void> {
    await browser.performActions([
        {
            type: 'pointer',
            id: 'pointer1',
            parameters: { pointerType: 'mouse' },
            actions: [
                { type: 'pointerMove', duration: 600, x: locationX, y: locationY },
                { type: 'pointerDown', button: 0 },
                { type: 'pointerMove', duration: 600, x: locationX, y: locationY },
                { type: 'pointerMove', duration: 1000, x: newLocationX, y: newLocationY },
                { type: 'pointerUp', button: 0 },
                { type: 'pause', duration: 500 }
            ]
        }
    ]);
}

export async function selectOptionByAttribute(
    selector: string,
    attribute: string,
    attributeValue: string,
    index: number = 0
): Promise<void> {
    await click(selector, index);
    await waitForElDisplayed(`${selector} option[${attribute}="${attributeValue}"]`);
    await $(`${selector} option[${attribute}="${attributeValue}"]`).click();
}

export async function selectOptionByValueAttribute(
    selector: string,
    attributeValue: string,
    index: number = 0
): Promise<void> {
    await selectOptionByAttribute(selector, 'value', attributeValue, index);
}

export async function saveElementScreenshot(
    selector: string,
    tag: string,
    options?: Record<string, any>,
    index: number = 0
): Promise<void> {
    await browser.saveElement((await $$(selector))[index], tag, options);
}

export async function checkElementScreenshot(
    selector: string,
    tag: string,
    options?: Record<string, any>,
    index: number = 0
): Promise<any> {
    return browser.checkElement((await $$(selector))[index], tag, options);
}

export async function checkSelectorExists(selector: string, index: number = 0): Promise<void> {
    if ((await $$(selector))[index] === undefined) {
        throw new Error(`Element with index: ${index} for selector: '${selector}' not found.`);
    }
}

export async function applyState(
    state: 'hover' | 'active' | 'focus',
    selector: string,
    index: number = 0
): Promise<void> {
    switch (state) {
        case 'hover':
            return mouseHoverElement(selector, index);
        case 'active':
            return addIsActiveClass(selector, index);
        case 'focus':
            return focusElement(selector, index);
    }
}

export async function getPreviousElement(selector: string, index: number = 0): Promise<any> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].previousElement();
}

export async function getNextElement(selector: string, index: number = 0): Promise<any> {
    await checkSelectorExists(selector, index);
    return (await $$(selector))[index].nextElement();
}

export async function getPreviousElementText(selector: string, index: number = 0): Promise<string> {
    return (await getPreviousElement(selector, index)).getText();
}

export async function getNextElementText(selector: string, index: number = 0): Promise<string> {
    return (await getNextElement(selector, index)).getText();
}
