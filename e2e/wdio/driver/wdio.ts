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

    goBack(): void {
        browser.back();
    }

    refreshPage(): void {
        browser.refresh();
    }

    click(selector: string, waitTime: number = this.defaultWaitTime, index: number = 0): void {
        // $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].click();
    }

    doubleClick(selector: string, waitTime: number = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].doubleClick();
    }

    // Clear value before set new
    setValue(selector: string, value: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].setValue(value);
    };

    // add value to existing one
    addValue(selector: string, value: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].addValue(value);
    };

    getValue(selector: string, waitTime = this.defaultWaitTime, index: number = 0): string {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].getValue();
    };

    getText(selector: string, index: number = 0, waitTime = this.defaultWaitTime): string {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].getText();
    }

    waitForDisplayed(selector: string, waitTime = this.defaultWaitTime, index: number = 0): boolean {
        return $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    };
  
    waitForInvisibilityOf(selector: string, index: number = 0): boolean {
        return $$(selector)[index].waitForDisplayed({ reverse: true })
    }

    waitForNotDisplayed(selector: string, waitTime = this.defaultWaitTime): boolean {
        return $(selector).waitForDisplayed({timeout: waitTime, reverse: true});
    };

    waitForClickable(selector: string, index: number = 0, waitTime = this.defaultWaitTime): boolean {
        return $$(selector)[index].waitForClickable({ timeout: waitTime });
    };

    waitForPresent(selector: string, waitTime = this.defaultWaitTime): boolean {
        return $(selector).waitForExist({ timeout: waitTime });
    };


    isEnabled(selector: string, waitTime = this.defaultWaitTime, index: number = 0): boolean {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].isEnabled();
    };

    // Waits to be empty if text is not passed
    waitTextToBePresentInValue(selector: string, text: string = '', waitTime = this.defaultWaitTime, index: number = 0): boolean {
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

    mouseHoverElement(selector: string, waitTime = this.defaultWaitTime, index: number = 0): any {
        $$(selector)[index].waitForExist({ timeout: waitTime });
        $$(selector)[index].moveTo();
    }

    clearValue(selector: string, waitTime = this.defaultWaitTime, index: number = 0): void {
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

    clickAndHold(selector: string, waitTime: number = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({timeout: waitTime});
        $$(selector)[index].moveTo();
        return browser.buttonDown();
    }
    // TODO: add wait 300ms

    waitElementToBePresentInDOM (selector: string, waitTime = this.defaultWaitTime,  index: number = 0): boolean {
        return $$(selector)[index].waitForExist({ timeout: waitTime });
    }

    scrollIntoView(selector: string, waitTime = this.defaultWaitTime,  index: number = 0): void {
        $$(selector)[index].scrollIntoView();
    }

    isElementClickable(selector: string, waitTime = this.defaultWaitTime, index: number = 0): boolean {
       return  $$(selector)[index].isClickable();
    }
    mouseButtonDown(button: 0 | 1 | 2  = 0): void {
        browser.buttonDown(button)
    }

    mouseButtonUp(button: 0 | 1 | 2  = 0): void {
        browser.buttonUp(button)
    }

    isElementClickeble(selector: string, waitTime = this.defaultWaitTime,  index: number = 0): boolean {
        return $$(selector)[index].isClickable();
    }

    getUrl(): string {
        return browser.getUrl();
    }

    dragAndDrop(elementToDragSelector: string, index: number = 0, targetElementSelector: string, targetIndex: number = 0): void {
        $$(elementToDragSelector)[index].scrollIntoView();
        $$(elementToDragSelector)[index].dragAndDrop($$(targetElementSelector)[targetIndex]);
    }

    isElementDisplayed(selector: string, waitTime = this.defaultWaitTime, index: number = 0): boolean {
        $$(selector)[index].scrollIntoView();
        return $(selector)[index].isDisplayed();
    }

    focusElement(selector: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].scrollIntoView();
        // @ts-ignore
        $$(selector)[index].focus();
    }

    mouseButtonDown(button: 0 | 1 | 2  = 0): void {
        browser.buttonDown(button)
    }

    mouseButtonUp(button: 0 | 1 | 2  = 0): void {
        browser.buttonUp(button)
    }
}

export const webDriver = new Wdio();
