export function currentBrowserName(): string {
    return Cypress.browser.name;
}

export function currentPlatformName(): string {
    return Cypress.platform;
}

export function pause(waitTime): void {
    cy.pause(waitTime);
}

export function isBrowser(browserName: string): boolean {
    return Cypress.browser.name === browserName;
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
    return isBrowser('Safari');
}

export function browserIsSafariorFF(): boolean {
    return browserIsSafari() || browserIsFirefox();
}

// doesn't work
export function goBack(): void {
    cy.go('back');
}

export function refreshPage(): void {
    cy.reload();
}

export function click(selector: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).click();
}

export function clickWithOption(selector: string, options: object, index?: number): void {
    cy.get(selector).eq(index ? index : 0).click();
}

export function doubleClick(selector: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).dblclick();
}

export function setValue(selector: string, value: string, index?: number): void {
    cy.get(selector).clear();
    cy.get(selector).eq(index ? index : 0).type(value);
}

export function addValue(selector: string, value: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).type(value);
}

export function checkValue(selector: string, expectedValue: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).should('have.text', expectedValue);
}


export function checkText(selector: string, expectedValue: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).contains(expectedValue);
}

export function checkIsElementDisplayed(selector: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).should('be.visible');
}

export function checkIsElementNotDisplayed(selector: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).should('not.be.visible');
}

export function sendKeys(keys: string): void {
    cy.get('body').trigger('keydown', { keyCode: keys });
}

export function checkAttributeByName(selector: string, attrName: string, expectedValue: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).invoke('attr', attrName).should('contain', expectedValue);
}

export function checkElementClass(selector: string, expectedValue: string, index?: number): void {
    checkAttributeByName(selector, 'class', expectedValue, index);
}

export function checkElementTitle(selector: string, expectedValue: string, index?: number): void {
    checkAttributeByName(selector, 'title', expectedValue, index);
}

export function checkElementPlaceholder( selector: string, expectedValue: string, index?: number): void {
    checkAttributeByName(selector, 'placeholder', expectedValue, index);

}

export function checkCSSPropertyByName(selector: string, propertyName: string, expectedValue: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).invoke('css', propertyName).should('contain', expectedValue);
}

export function mouseHoverElement(selector: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).trigger('mouseover');
}

export function getElementArrayLength(selector: string): number {
    return Cypress.$(selector).length;
}
export function focusElement(selector: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).focus();
}

// no needed
export function checkSelectorExist(selector: string, index?: number): void {
    if (cy.get(selector).eq(index ? index : 0) === undefined) {
        throw new Error(`Element with index: ${index} for selector: '${selector}' not found.`)
    }
}
export function checkNextElementText(selector: string, expectedValue: string, index?: number): void {
    cy.get(selector).eq(index ? index : 0).next().contains(expectedValue)
}


