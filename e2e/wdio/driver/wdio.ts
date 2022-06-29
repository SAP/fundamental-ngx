declare const $$: any;
declare const $: any;

export function defaultWaitTime(): number {
    return browser.options.waitforTimeout;
}

export function currentPlatformName(): string {
    return browser.capabilities.platformName;
}

export function currentBrowserName(): string {
    return browser.capabilities.browserName;
}

export function getImageTagBrowserPlatform(): string {
    return `${currentBrowserName()}-${currentPlatformName()}`;
}

export function getBaseURL(): string {
    return browser.options.baseUrl;
}

export function open(path: string = ''): void {
    browser.url(path);
}

export function pause(waitTime: number = defaultWaitTime()): void {
    browser.pause(waitTime);
}

export function execute(source): void {
    browser.execute(source);
}

export function isBrowser(browserName: string): boolean {
    return browser.capabilities.browserName === browserName;
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

export function goBack(): void {
    browser.back();
}

export function refreshPage(isFullRefresh = false): void {
    try {
        // alerts block any interactions with the page
        browser.dismissAlert();
    } catch {}
    if (!isFullRefresh) {
        const url = browser.getUrl();
        try {
            click(`#toolbar-home-btn`);
        } catch {}
        if (browser.getUrl().includes(`/home`)) {
            goBack();
        } else {
            // failed to navigate, reset the url and perform full page refresh
            browser.url(url);
            if (browserIsSafari()) {
                pause();
            }
        }
    } else {
        browser.refresh();
        if (browserIsSafari()) {
            pause();
        }
    }
}

export function getAlertText(): string {
    return browser.getAlertText();
}

export function acceptAlert(): void {
    browser.acceptAlert();
}

export function isAlertOpen(): boolean {
    return browser.isAlertOpen();
}

export function click(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].click();
}

export function clickRightMouseBtn(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].click({ button: 'right' });
}

export function clickWithOption(
    selector: string,
    index: number = 0,
    waitTime: number = defaultWaitTime(),
    options: Record<string, any>
): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].click(options);
}

export function doubleClick(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].doubleClick();
}

// Clear value before set new
export function setValue(selector: string, value: string, index: number = 0, waitTime = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].clearValue();
    $$(selector)[index].setValue(value);
}

export function addValueWithDelay(
    selector: string,
    value: string,
    delay: number = 100,
    index: number = 0,
    waitTime = defaultWaitTime()
): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    const valueArray = Array.from(value);
    for (const symbol of valueArray) {
        $$(selector)[index].addValue(symbol);
        browser.pause(delay);
    }
}

// add value to existing one
export function addValue(selector: string, value: string, index: number = 0, waitTime = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].addValue(value);
}

export function getValue(selector: string, index: number = 0, waitTime = defaultWaitTime()): string {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].getValue();
}

export function getArrValues(selector: string, sliceStart?: number, sliceEnd?: number): string[] {
    checkSelectorExists(selector);
    return $$(selector)
        .slice(sliceStart, sliceEnd)
        .map((element) => element.getValue());
}

export function getText(selector: string, index: number = 0, waitTime = defaultWaitTime()): string {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].getText();
}

export function getTextArr(selector: string, sliceStart?: number, sliceEnd?: number): string[] {
    checkSelectorExists(selector);
    return $$(selector)
        .slice(sliceStart, sliceEnd)
        .map((element) => element.getText().trim());
}

export function waitForElDisplayed(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    waitForPresent(selector, index);
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitForDisplayed({ timeout: waitTime });
}

export function waitForInvisibilityOf(selector: string, index: number = 0): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitForDisplayed({ reverse: true });
}

export function waitForNotDisplayed(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitForDisplayed({ timeout: waitTime, reverse: true });
}

export function waitForClickable(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitForClickable({ timeout: waitTime });
}

export function waitForUnclickable(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitForClickable({ timeout: waitTime, reverse: true });
}

export function waitForElDisappear(selector: string, waitTime = defaultWaitTime()): boolean {
    return $(selector).waitForExist({ timeout: waitTime, reverse: true });
}

export function waitForPresent(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitForExist({ timeout: waitTime });
}

export function waitForNotPresent(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForExist({ timeout: waitTime, reverse: true });
}

export function isEnabled(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].isEnabled();
}

// Waits to be empty if text is not passed
export function waitTextToBePresentInValue(
    selector: string,
    text: string = '',
    index: number = 0,
    waitTime = defaultWaitTime()
): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].waitUntil(
        function (): boolean {
            return this.getValue() === text;
        },
        { timeout: waitTime, timeoutMsg: `${text} is not present in element ${selector}` }
    );
}

// Sends to the active element
export function sendKeys(keys: string | string[]): void {
    browser.keys(keys);
}

export function uploadFile(selector: string, pathToFile: string, index: number = 0): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].setValue(pathToFile);
}

export function getAttributeByName(selector: string, attrName: string, index: number = 0): string {
    checkSelectorExists(selector, index);
    return $$(selector)[index].getAttribute(attrName);
}

export function getElementClass(selector: string, index: number = 0): string {
    checkSelectorExists(selector, index);
    return $$(selector)[index].getAttribute('class');
}

export function getElementTitle(selector: string, index: number = 0): string {
    checkSelectorExists(selector, index);
    return $$(selector)[index].getAttribute('title');
}

export function getElementAriaLabel(selector: string, index: number = 0): string {
    checkSelectorExists(selector, index);
    return $$(selector)[index].getAttribute('aria-label');
}

export function getElementPlaceholder(selector: string, index: number = 0): string {
    checkSelectorExists(selector, index);
    return $$(selector)[index].getAttribute('placeholder');
}

export function getAttributeByNameArr(
    selector: string,
    attrName: string,
    sliceStart?: number,
    sliceEnd?: number
): string[] {
    checkSelectorExists(selector);
    return $$(selector)
        .slice(sliceStart, sliceEnd)
        .map((element) => element.getAttribute(attrName));
}

// Returns object (assertions needs to be adapted)
export function getCSSPropertyByName(selector: string, propertyName: string, index: number = 0): any {
    // TODO: returns WebdriverIO.CSSProperty
    checkSelectorExists(selector, index);
    return $$(selector)[index].getCSSProperty(propertyName);
}

export function mouseHoverElement(selector: string, index: number = 0, waitTime = defaultWaitTime()): any {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForExist({ timeout: waitTime });
    $$(selector)[index].moveTo();
}

export function clearValue(selector: string, index: number = 0, waitTime = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].clearValue();
}

export function getElementSize(selector: string, index?: number): any; // TODO: returns WebdriverIO.SizeReturn;
export function getElementSize(selector: string, index: number, prop: 'width' | 'height'): number;
export function getElementSize(selector: string, index: number = 0, prop?: 'width' | 'height'): number {
    // TODO: number | WebdriverIO.SizeReturn;
    checkSelectorExists(selector, index);
    return $$(selector)[index].getSize(prop || void 0);
}

export function executeScriptBeforeTagAttr(selector: string, attrName: string, index: number = 0): string {
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

export function executeScriptAfterTagAttr(selector: string, attrName: string, index: number = 0): string {
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

export function getElementArrayLength(selector: string): number {
    return $$(selector).length;
}

export function elementArray(selector: string): any {
    // TODO: returns WebdriverIO.ElementArray
    return $$(selector);
}

export function elementDisplayed(selector: string, index: number = 0): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].isDisplayed();
}

export function clickAndHold(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].moveTo();
    return browser.buttonDown();
}

export function scrollIntoView(selector: string, index: number = 0): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].scrollIntoView();
}

export function isElementClickable(selector: string, index: number = 0): boolean {
    checkSelectorExists(selector, index);
    return $$(selector)[index].isClickable();
}

export function isDisplayedInViewport(selector: string, index: number = 0): boolean {
    return $$(selector)[index].isDisplayedInViewport();
}

export function waitElementToBeClickable(selector: string, index: number = 0): void {
    browser.waitUntil((): boolean => $$(selector)[index].isClickable(), { timeout: defaultWaitTime() });
}

export function doesItExist(selector: string): boolean {
    return $(selector).isExisting();
}

export function getCurrentUrl(): string {
    return browser.getUrl();
}

export function dragAndDrop(
    elementToDragSelector: string,
    index: number = 0,
    targetElementSelector: string,
    targetIndex: number = 0
): void {
    checkSelectorExists(elementToDragSelector, index);
    checkSelectorExists(targetElementSelector, index);
    $$(elementToDragSelector)[index].scrollIntoView();
    $$(elementToDragSelector)[index].dragAndDrop($$(targetElementSelector)[targetIndex]);
}

export function clickAndMoveElement(selector: string, offsetX: number, offsetY: number, index: number = 0): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].scrollIntoView();
    $$(selector)[index].dragAndDrop({ x: offsetX, y: offsetY });
}

export function isElementDisplayed(selector: string, index: number = 0): boolean {
    checkSelectorExists(selector, index);
    $$(selector)[index].scrollIntoView();
    return $$(selector)[index].isDisplayed();
}

export function focusElement(selector: string, index: number = 0): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].scrollIntoView();
    $$(selector)[index].focus();
}

export function mouseButtonDown(button: 0 | 1 | 2 = 0): void {
    browser.buttonDown(button);
}

export function mouseButtonUp(button: 0 | 1 | 2 = 0): void {
    browser.buttonUp(button);
}

export function clickNextElement(selector: string, index: number = 0): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].nextElement().click();
}

export function clickPreviousElement(selector: string, index: number = 0): void {
    checkSelectorExists(selector, index);
    $$(selector)[index].previousElement().click();
}

export function getElementLocation(selector: string, index?: number): any; // TODO: returns WebdriverIO.LocationReturn
export function getElementLocation(selector: string, index: number, prop: 'x' | 'y'): number;
export function getElementLocation(selector: string, index: number = 0, prop?: 'x' | 'y'): number {
    // TODO: returns WebdriverIO.LocationReturn | number
    return $$(selector)[index].getLocation(prop || void 0);
}

export function getParentElementCSSProperty(selector: string, prop: string, index: number): string {
    checkSelectorExists(selector, index);
    return $$(selector)[index].parentElement().getCSSProperty(prop).value;
}

export function addIsActiveClass(selector: string, index: number = 0): void {
    $$(selector)[index].addIsActiveClass();
}

export function clickAndDragElement(
    locationX: number,
    locationY: number,
    newLocationX: number,
    newLocationY: number
): void {
    browser.performActions([
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

export function selectOptionByAttribute(
    selector: string,
    attribute: string,
    attributeValue: string,
    index: number = 0
): void {
    click(selector, index);
    waitForElDisplayed(`${selector} option[${attribute}="${attributeValue}"]`);
    $(`${selector} option[${attribute}="${attributeValue}"]`).click();
}

export function selectOptionByValueAttribute(selector: string, attributeValue: string, index: number = 0): void {
    selectOptionByAttribute(selector, 'value', attributeValue, index);
}

export function saveElementScreenshot(
    selector: string,
    tag: string,
    options?: Record<string, any>,
    index: number = 0
): void {
    browser.saveElement($$(selector)[index], tag, options);
}

export function checkElementScreenshot(
    selector: string,
    tag: string,
    options?: Record<string, any>,
    index: number = 0
): any {
    return browser.checkElement($$(selector)[index], tag, options);
}

function checkSelectorExists(selector: string, index: number = 0): void {
    if ($$(selector)[index] === undefined) {
        throw new Error(`Element with index: ${index} for selector: '${selector}' not found.`);
    }
}

export function applyState(state: 'hover' | 'active' | 'focus', selector: string, index: number = 0): void {
    switch (state) {
        case 'hover':
            return mouseHoverElement(selector, index);
        case 'active':
            return addIsActiveClass(selector, index);
        case 'focus':
            return focusElement(selector, index);
    }
}

export function getPreviousElement(selector: string, index: number = 0): any {
    checkSelectorExists(selector, index);
    return $$(selector)[index].previousElement();
}

export function getNextElement(selector: string, index: number = 0): any {
    checkSelectorExists(selector, index);
    return $$(selector)[index].nextElement();
}

export function getPreviousElementText(selector: string, index: number = 0): string {
    return getPreviousElement(selector, index).getText();
}

export function getNextElementText(selector: string, index: number = 0): string {
    return getNextElement(selector, index).getText();
}
