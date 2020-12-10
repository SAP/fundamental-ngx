export class Wdio {

    get defaultWaitTime(): number {
        return browser.options.waitforTimeout;
    }

    get currentPlatformName(): string {
        return browser.capabilities.platformName;
    }

    open(path: string = ''): void {
        browser.url(path);
    }

    pause(waitTime: number = this.defaultWaitTime): void {
        browser.pause(waitTime);
    }

    goBack(): void {
        browser.back();
    }

    refreshPage(): void {
        browser.refresh();
    }

    getAlertText(): string {
        return browser.getAlertText();
    }

    acceptAlert(): void {
        browser.acceptAlert();
    }

    click(selector: string, index: number = 0, waitTime: number = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].click();
    }

    doubleClick(selector: string, index: number = 0, waitTime: number = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].doubleClick();
    }

    // Clear value before set new
    setValue(selector: string, value: string, index: number = 0, waitTime = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].setValue(value);
    };

    addValueWithDelay(selector: string, value: string, delay: number = 100, index: number = 0, waitTime = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        const valueArray = Array.from(value);
        for (const symbol of valueArray) {
            $$(selector)[index].addValue(symbol);
            browser.pause(delay);
        }
    };

    // add value to existing one
    addValue(selector: string, value: string, index: number = 0, waitTime = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].addValue(value);
    };

    getValue(selector: string, index: number = 0,  waitTime = this.defaultWaitTime): string {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].getValue();
    };

    getText(selector: string, index: number = 0, waitTime = this.defaultWaitTime): string {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].getText();
    }

    getTextArr(selector: string, sliceStart?: number, sliceEnd?: number): string[] {
        return $$(selector).slice(sliceStart, sliceEnd).map((element) => element.getText());
    }

    waitForDisplayed(selector: string, index: number = 0, waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    };

    waitForInvisibilityOf(selector: string, index: number = 0): boolean {
        return $$(selector)[index].waitForDisplayed({ reverse: true })
    }

    waitForNotDisplayed(selector: string, waitTime = this.defaultWaitTime): boolean {
        return $(selector).waitForDisplayed({ timeout: waitTime, reverse: true });
    }

    waitForClickable(selector: string, index: number = 0, waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitForClickable({ timeout: waitTime });
    };

    waitForUnclickable(selector: string, index: number = 0, waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitForClickable({ timeout: waitTime, reverse: true });
    };

    waitForPresent(selector: string, index: number = 0, waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitForExist({ timeout: waitTime});
    };

    isEnabled(selector: string, index: number = 0,  waitTime = this.defaultWaitTime): boolean {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].isEnabled();
    };

    // Waits to be empty if text is not passed
    waitTextToBePresentInValue(selector: string, text: string = '',  index: number = 0,  waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitUntil(function(): boolean {
            return this.getValue() === text;
        }, { timeout: waitTime, timeoutMsg: `${text} is not present in element ${selector}` });
    };

    // Sends to the active element
    sendKeys(keys: string | string[]): void {
        browser.keys(keys);
    };

    getAttributeByName(selector: string, attrName: string, index: number = 0): string {
        return $$(selector)[index].getAttribute(attrName);
    }

    // Returns object (assertions needs to be adapted)
    getCSSPropertyByName(selector: string, propertyName: string, index: number = 0 ): { value: string } {
        return $$(selector)[index].getCSSProperty(propertyName);
    }

    mouseHoverElement(selector: string, index: number = 0, waitTime = this.defaultWaitTime): any {
        $$(selector)[index].waitForExist({ timeout: waitTime });
        $$(selector)[index].moveTo();
    }

    clearValue(selector: string,  index: number = 0, waitTime = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].clearValue();
    }

    getElementSize(selector: string, prop?: 'width' | 'height', index: number = 0): number | WebdriverIO.SizeReturn {
        return prop ? $$(selector)[index].getSize() : $$(selector)[index].getSize(prop);
    }

    executeScript(callback): string {
        return browser.execute(callback());
    }

    getElementArrayLength(selector: string): number {
        return $$(selector).length;
    }

    elementArray(selector: string): any {
        return $$(selector);
    }

    elementDisplayed(selector: string): boolean {
        return $(selector).isDisplayed();
    }

    clickAndHold(selector: string,  index: number = 0, waitTime: number = this.defaultWaitTime): void {
        $$(selector)[index].waitForDisplayed({timeout: waitTime});
        $$(selector)[index].moveTo();
        return browser.buttonDown();
    }
    // TODO: add wait 300ms

    waitElementToBePresentInDOM (selector: string,  index: number = 0, waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitForExist({ timeout: waitTime });
    }

    scrollIntoView(selector: string, index: number = 0, waitTime = this.defaultWaitTime): void {
        $$(selector)[index].scrollIntoView();
    }

    isElementClickable(selector: string, index: number = 0): boolean {
        return $$(selector)[index].isClickable();
    }

    getUrl(): string {
        return browser.getUrl();
    }

    dragAndDrop(elementToDragSelector: string, index: number = 0, targetElementSelector: string, targetIndex: number = 0): void {
        $$(elementToDragSelector)[index].scrollIntoView();
        $$(elementToDragSelector)[index].dragAndDrop($$(targetElementSelector)[targetIndex]);
    }

    isElementDisplayed(selector: string, index: number = 0, waitTime = this.defaultWaitTime): boolean {
        $$(selector)[index].scrollIntoView();
        return $(selector)[index].isDisplayed();
    }

    focusElement(selector: string, index: number = 0): void {
        $$(selector)[index].scrollIntoView();
        // @ts-ignore
        $$(selector)[index].focus();
    }

    mouseButtonDown(button: 0 | 1 | 2 = 0): void {
        browser.buttonDown(button);
    }

    mouseButtonUp(button: 0 | 1 | 2 = 0): void {
        browser.buttonUp(button);
    }

    clickNextElement(selector: string, index: number = 0): void {
        $$(selector)[index].nextElement().click();
    }

    getAttributeByNameArr(selector: string, attrName: string, sliceStart?: number, sliceEnd?: number): string[] {
        return $$(selector).slice(sliceStart, sliceEnd).map((element) => element.getAttribute(attrName));
    }
}

export const webDriver = new Wdio();
