import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';

const IMPLICITLY_WAIT = 8000;

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

export async function waitForElementToBeClickable(element: ElementFinder): Promise<void> {
    await browser.wait(EC.elementToBeClickable(element), 5000);
}

export async function getText(element: ElementFinder): Promise<string> {
    await waitForElementToBeClickable(element);
    return element.getText();
}


export async function getValueOfAttribute(element: ElementFinder, attributeName): Promise<string> {
    return await element.getAttribute(attributeName);
}

export async function clickByMouseMove(element: ElementFinder): Promise<void> {
    await browser.actions().mouseMove(await element).click().perform();
}
