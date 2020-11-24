import { browser } from 'protractor';

export class Wdio {

    get defaultWaitTime(): number {
        return browser.options.waitforTimeout;
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

    click(selector: string, waitTime: number = this.defaultWaitTime): void {
        $(selector).waitForDisplayed({ timeout: waitTime });
        return $(selector).click();
    }

    doubleClick(selector: string, waitTime: number = this.defaultWaitTime): void {
        $(selector).waitForDisplayed({ timeout: waitTime });
        return $(selector).doubleClick();
    }

    // Clear value before set new
    setValue(selector: string, value: string, waitTime = this.defaultWaitTime): void {
        $(selector).waitForDisplayed({ timeout: waitTime });
        $(selector).setValue(value);
    };

    // add value to existing one
    addValue(selector: string, value: string, waitTime = this.defaultWaitTime): void {
        $(selector).waitForDisplayed({ timeout: waitTime });
        $(selector).addValue(value);
    };

    getValue(selector: string, waitTime = this.defaultWaitTime): string {
        $(selector).waitForDisplayed({ timeout: waitTime });
        return $(selector).getValue();
    };

    getText(selector: string, waitTime = this.defaultWaitTime): string {
        $(selector).waitForDisplayed({ timeout: waitTime });
        return $(selector).getText();
    }

    waitForDisplayed(selector: string, waitTime = this.defaultWaitTime): boolean {
        return $(selector).waitForDisplayed({ timeout: waitTime });
    };

    isEnabled(selector: string, waitTime = this.defaultWaitTime): boolean {
        $(selector).waitForDisplayed({ timeout: waitTime });
        return $(selector).isEnabled();
    };

    // Waits to be empty if text is not passed
    waitTextToBePresentInValue(selector: string, text: string = '', waitTime = this.defaultWaitTime): boolean {
        return $(selector).waitUntil(function(): boolean {
            return this.getValue() === text;
        }, { timeout: waitTime, timeoutMsg: `${text} is not present in element ${selector}` });

    };

    // Sends to the active element
    sendKeys(keys: string | string[]): void {
        browser.keys(keys);
    };

    getAttributeByName(selector: string, attrName: string): string {
        return $(selector).getAttribute(attrName);
    }

    // Returns object (assertions needs to be adapted)
    getCSSPropertyByName(selector: string, propertyName: string): { value: string } {
        return $(selector).getCSSProperty(propertyName);
    }

    mouseHoverElement(selector: string, waitTime = this.defaultWaitTime): void {
        $(selector).waitForExist({ timeout: waitTime });
        $(selector).moveTo();

    }

    clearValue(selector: string, waitTime = this.defaultWaitTime): void {
        $(selector).waitForDisplayed({ timeout: waitTime });
        $(selector).clearValue()
    }

    getElementSize(selector: string, prop?: 'width' | 'height'): number | WebdriverIO.SizeReturn {
        return prop ? $(selector).getSize() : $(selector).getSize(prop);

    }

    executeScript(callback): string {
        return browser.execute(callback());
    }
}


export const webDriver = new Wdio();

