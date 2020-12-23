export function defaultWaitTime(): number {
    return browser.options.waitforTimeout;
}

export function currentPlatformName(): string {
    return browser.capabilities.platformName;
}

export function open(path: string = ''): void {
    browser.url(path);
}

export function pause(waitTime: number = defaultWaitTime()): void {
    browser.pause(waitTime);
}

export function isBrowser(browserName: string): boolean {
    return browser.capabilities.browserName === browserName;
}

export function browserIsIEorSafari(): boolean {
    if (browserIsSafari()) {
        return true;
    } else if (browserIsIE) {
        return true;
    }
    return false;
}

export function browserIsFirefox(): boolean {
    return this.isBrowser('firefox');

}

export function browserIsIE(): boolean {
    return this.isBrowser('internet explorer');

}

export function browserIsSafari(): boolean {
    return this.isBrowser('Safari');
}

export function goBack(): void {
    browser.back();
}

export function refreshPage(): void {
    browser.refresh();
}

export function getAlertText(): string {
    return browser.getAlertText();
}

export function acceptAlert(): void {
    browser.acceptAlert();
}

export function click(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].click();
}

export function doubleClick(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].doubleClick();
}

// Clear value before set new
export function setValue(selector: string, value: string, index: number = 0, waitTime = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].clearValue();
    $$(selector)[index].setValue(value);
};

export function addValueWithDelay(selector: string, value: string, delay: number = 100, index: number = 0, waitTime = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    const valueArray = Array.from(value);
    for (const symbol of valueArray) {
        $$(selector)[index].addValue(symbol);
        browser.pause(delay);
    }
}

// add value to existing one
export function addValue(selector: string, value: string, index: number = 0, waitTime = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].addValue(value);
}

export function getValue(selector: string, index: number = 0, waitTime = defaultWaitTime()): string {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].getValue();
}

export function getArrValues(selector: string, sliceStart?: number, sliceEnd?: number): string[] {
    return $$(selector).slice(sliceStart, sliceEnd).map((element) => element.getValue());
}

export function getText(selector: string, index: number = 0, waitTime = defaultWaitTime()): string {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].getText();
}

export function getTextArr(selector: string, sliceStart?: number, sliceEnd?: number): string[] {
    return $$(selector).slice(sliceStart, sliceEnd).map((element) => element.getText());
}

export function waitForElDisplayed(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForDisplayed({ timeout: waitTime });
}

export function waitForInvisibilityOf(selector: string, index: number = 0): boolean {
    return $$(selector)[index].waitForDisplayed({ reverse: true });
}

export function waitForNotDisplayed(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForDisplayed({ timeout: waitTime, reverse: true });
}

export function waitForClickable(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForClickable({ timeout: waitTime });
}

export function waitForUnclickable(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForClickable({ timeout: waitTime, reverse: true });
}

export function waitForPresent(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForExist({ timeout: waitTime });
}

export function isEnabled(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    return $$(selector)[index].isEnabled();
}

// Waits to be empty if text is not passed
export function waitTextToBePresentInValue(selector: string, text: string = '', index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitUntil(function(): boolean {
        return this.getValue() === text;
    }, { timeout: waitTime, timeoutMsg: `${text} is not present in element ${selector}` });
}

// Sends to the active element
export function sendKeys(keys: string | string[]): void {
    browser.keys(keys);
}

export function uploadFile(selector: string, pathToFile: string, index: number = 0): void {
    $$(selector)[index].setValue(pathToFile);
}

export function getAttributeByName(selector: string, attrName: string, index: number = 0): string {
    return $$(selector)[index].getAttribute(attrName);
}

export function getAttributeByNameArr(selector: string, attrName: string, sliceStart?: number, sliceEnd?: number): string[] {
    return $$(selector).slice(sliceStart, sliceEnd).map((element) => element.getAttribute(attrName));
}

// Returns object (assertions needs to be adapted)
export function getCSSPropertyByName(selector: string, propertyName: string, index: number = 0): { value: string | number } {
    return $$(selector)[index].getCSSProperty(propertyName);
}

export function mouseHoverElement(selector: string, index: number = 0, waitTime = defaultWaitTime()): any {
    $$(selector)[index].waitForExist({ timeout: waitTime });
    $$(selector)[index].moveTo();
}

export function clearValue(selector: string, index: number = 0, waitTime = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].clearValue();
}
export function getElementSize(selector: string, index?: number):  WebdriverIO.SizeReturn;
export function getElementSize(selector: string, index: number, prop: 'width' | 'height'): number;
export function getElementSize(selector: string, index: number = 0, prop?: 'width' | 'height'): number | WebdriverIO.SizeReturn {
    return prop ? $$(selector)[index].getSize() : $$(selector)[index].getSize(prop);
}

export function executeScript(callback): string {
    return browser.execute(callback());
}

export function executeScript2(selector): string {
    const attrName = browser.capabilities.browserName === 'firefox' ? 'border-left-style' : 'border';
    return browser.execute(function(selector, attrName) {
        return window.getComputedStyle(
            document.querySelector(selector), ':after')[attrName];
    }, selector, attrName);
}

export function executeScriptBeforeTagAttr(selector, attrName): string {
    return browser.execute(function(selector, attrName) {
        return (window.getComputedStyle(document.querySelector(selector), ':before')[attrName]);
    }, selector, attrName);
}

export function executeScriptAfterTagAttr(selector, attrName): string {
    return browser.execute(function(selector, attrName) {
        return (window.getComputedStyle(document.querySelector(selector), ':after')[attrName]);
    }, selector, attrName);
}

export function getElementArrayLength(selector: string): number {
    return $$(selector).length;
}

export function elementArray(selector: string): WebdriverIO.ElementArray {
    return $$(selector);
}

export function elementDisplayed(selector: string, index: number = 0): boolean {
    return $$(selector)[index].isDisplayed();
}

export function clickAndHold(selector: string, index: number = 0, waitTime: number = defaultWaitTime()): void {
    $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    $$(selector)[index].moveTo();
    return browser.buttonDown();
}

export function waitElementToBePresentInDOM(selector: string, index: number = 0, waitTime = defaultWaitTime()): boolean {
    return $$(selector)[index].waitForExist({ timeout: waitTime });
}

export function scrollIntoView(selector: string, index: number = 0): void {
    $$(selector)[index].scrollIntoView();
}

export function isElementClickable(selector: string, index: number = 0): boolean {
    return $$(selector)[index].isClickable();
}

export function doesItExist(selector: string): boolean {
    return $(selector).isExisting();
}

export function getCurrentUrl(): string {
    return browser.getUrl();
}

export function dragAndDrop(elementToDragSelector: string, index: number = 0, targetElementSelector: string, targetIndex: number = 0): void {
    $$(elementToDragSelector)[index].scrollIntoView();
    $$(elementToDragSelector)[index].dragAndDrop($$(targetElementSelector)[targetIndex]);
}

export function isElementDisplayed(selector: string, index: number = 0): boolean {
    $$(selector)[index].scrollIntoView();
    return $$(selector)[index].isDisplayed();
}

export function focusElement(selector: string, index: number = 0): void {
    $$(selector)[index].scrollIntoView();
    // @ts-ignore
    $$(selector)[index].focus();
}

export function mouseButtonDown(button: 0 | 1 | 2 = 0): void {
    browser.buttonDown(button);
}

export function mouseButtonUp(button: 0 | 1 | 2 = 0): void {
    browser.buttonUp(button);
}

export function  clickNextElement(selector: string, index: number = 0): void {
    $$(selector)[index].nextElement().click();
}
