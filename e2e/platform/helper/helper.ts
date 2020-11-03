import { browser, By, ElementFinder, ExpectedConditions as EC } from 'protractor';

const IMPLICITLY_WAIT = 8000;

export async function clickAfterWait(element: ElementFinder): Promise<void> {
    await waitForElementToBeClickable(element);
    await element.click();
}

export async function setInput(element: ElementFinder, value: string): Promise<void> {
    await waitForElementToBeClickable(element);
    await element.clear();
    await element.sendKeys(value);
}

export async function selectValueFromDropdown(elementDropdown: ElementFinder, valueToSelect: string, optionSelector = 'option.ng-star-inserted'): Promise<void> {
    await clickAfterWait(elementDropdown);
    await elementDropdown.element(By.cssContainingText(optionSelector, valueToSelect)).click();
}

export async function selectValueFromTypeahead(typeaheadInput: ElementFinder, valueToSelect: string, typeaheadContainer: ElementFinder): Promise<void> {
    await clickAfterWait(typeaheadInput);
    await typeaheadInput.clear();
    await typeaheadInput.sendKeys(valueToSelect);
    await typeaheadContainer.click();
}

export async function hoverMouse(element: ElementFinder): Promise<void> {
    await waitForVisible(element);
    return browser
        .actions()
        .mouseMove(element)
        .perform();
}

export async function waitForVisible(element: ElementFinder, timeout = IMPLICITLY_WAIT): Promise<void> {
    await browser.wait(EC.visibilityOf(element), timeout);
}

export async function waitForPresence(element: ElementFinder, timeout = IMPLICITLY_WAIT): Promise<void> {
    await browser.wait(EC.presenceOf(element), timeout);
}

export async function waitForElementToBeClickable(element: ElementFinder): Promise<void> {
    await browser.wait(EC.elementToBeClickable(element), 5000);
}

export async function isClickable(element: ElementFinder): Promise<boolean> {
    return await browser.wait(EC.elementToBeClickable(element), IMPLICITLY_WAIT);
}

export async function waitForInvisible(element: ElementFinder, timeout = IMPLICITLY_WAIT): Promise<void> {
    await browser.wait(EC.invisibilityOf(element), timeout, `Element ${element} is still visible on the page`);
}

export async function waitForUrl(url: string): Promise<void> {
    await browser.wait(EC.urlContains(url));
}

export async function getText(element: ElementFinder): Promise<string> {
    await waitForElementToBeClickable(element);
    return element.getText();
}

export async function getInputText(element: ElementFinder): Promise<string> {
    await waitForElementToBeClickable(element);
    return getValueOfAttributeValue(element);
}

export async function getNestedElement(parentElement: ElementFinder, nestedElementLocator: string): Promise<ElementFinder> {
    return parentElement.$(nestedElementLocator);
}

export function getValueOfAttributeValue(element: ElementFinder): Promise<string> {
    return getValueOfAttribute(element, 'value');
}

export async function getValueOfAttribute(element: ElementFinder, attributeName): Promise<string> {
    return await element.getAttribute(attributeName);
}

export function getPlaceholderText(element: ElementFinder): Promise<string> {
    return getValueOfAttribute(element, 'placeholder');
}

export async function checkLinkTargetDestination(element, site: string, angular: boolean = false): Promise<void> {
    await browser.waitForAngularEnabled(angular);
    await element.click();
    await waitForUrl(site);
}

export async function clickByMouseMove(element: ElementFinder): Promise<void> {
    await browser.actions().mouseMove(await element).click().perform();
}
export async function clickTwice(element: ElementFinder): Promise<void> {
    await element.click();
    await element.click();
}

export async function waitForTextToBePresentInElementValue(element: ElementFinder, text: string): Promise<boolean> {
    return  browser.wait(EC.textToBePresentInElementValue(element, text), IMPLICITLY_WAIT);
}
