import { FlexibleColumnLayoutPo } from './flexible-column-layout.po';
import {
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    isElementDisplayed,
    pause,
    refreshPage,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Flexible column layout component test', () => {
    const flexibleColumnLayoutPage = new FlexibleColumnLayoutPo();
    const {
        defaultExample,
        dynamicExample,
        button,
        exitExampleBtn,
        column,
        separateButton,
        collapsButton,
        collapsibleHeader,
        pinButton,
        columnButton,
        separator,
        columnButton2
    } = flexibleColumnLayoutPage;

    beforeAll(async () => {
        await flexibleColumnLayoutPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(flexibleColumnLayoutPage.root);
        await waitForElDisplayed(flexibleColumnLayoutPage.title);
    }, 2);

    it('should check open-close example for default example', async () => {
        await checkOpenClose(defaultExample);
    });

    it('should check open-close example for dynamic example', async () => {
        await checkOpenClose(dynamicExample);
    });

    it('should check width of the colums for default example', async () => {
        await checkColumnWidth(defaultExample);
    });

    it('should check width of the columns for dynamic example', async () => {
        await checkColumnWidth(dynamicExample);
    });

    it('should check opening columns for default example', async () => {
        await checkColumnsOpening(defaultExample);
    });

    it('should check opening columns for dynamic example', async () => {
        await checkColumnsOpening(dynamicExample);
    });

    it('should check collapsible area', async () => {
        await click(dynamicExample + button);
        await click(columnButton);
        // pause for animation
        await pause(500);
        await click(collapsButton);
        await expect(await waitForNotDisplayed(collapsibleHeader, 0)).toBe(true, 'collapsible area is not visible');
        await click(collapsButton);
        await expect(await waitForElDisplayed(collapsibleHeader, 0)).toBe(true, 'collapsible area is visible');
    });

    it('should check pin in dynamic example', async () => {
        await click(dynamicExample + button);
        await click(columnButton);
        await expect(await getAttributeByName(pinButton, 'aria-selected')).toBe(
            'false',
            'pin is selected, but should not be'
        );
        await expect(await getAttributeByName(pinButton, 'aria-label')).toBe('Pin Header');
        await expect(await getAttributeByName(pinButton, 'title')).toBe('Pin Header');
        await pause(1000);
        await click(pinButton);
        await expect(await getAttributeByName(pinButton, 'aria-selected')).toBe('true', 'pin is not selected');
        await expect(await getAttributeByName(pinButton, 'aria-label')).toBe('Unpin Header');
        await expect(await getAttributeByName(pinButton, 'title')).toBe('Unpin Header');
    });

    it('should check separator for default example', async () => {
        await checkSeparator(defaultExample);
    });

    it('should check separator for dynamic example', async () => {
        await checkSeparator(dynamicExample);
    });
    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6518
    xit('should check missed separator for default example', async () => {
        await checkExistSeparator(defaultExample);
    });
    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6519
    xit('should check missed separator for default example', async () => {
        await checkExistSeparator(dynamicExample);
    });

    it('should check orientation', async () => {
        await flexibleColumnLayoutPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await flexibleColumnLayoutPage.saveExampleBaselineScreenshot();
        await expect(await flexibleColumnLayoutPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkColumnWidth(section: string): Promise<void> {
        await click(section + button);
        await expect(await getAttributeByName(column, 'style', 0)).toContain('width: 100%');
        await click(columnButton);
        await pause(1000);

        if (section === defaultExample) {
            await expect(await getAttributeByName(column, 'style', 0)).toContain('width: 67%');
            await expect(await getAttributeByName(column, 'style', 1)).toContain('width: 33%');
            await click(columnButton, 1);
        }

        if (section === dynamicExample) {
            await expect(await getAttributeByName(column, 'style', 0)).toContain('width: 33%');
            await expect(await getAttributeByName(column, 'style', 1)).toContain('width: 67%');
            await click(columnButton, 5);
        }

        await pause(1000);
        await expect(await getAttributeByName(column, 'style', 0)).toContain('width: 25%');
        await expect(await getAttributeByName(column, 'style', 1)).toContain('width: 50%');
        await expect(await getAttributeByName(column, 'style', 2)).toContain('width: 25%');
        section === defaultExample ? await click(columnButton, 3) : await click(columnButton, 5);
        await pause(1000);
        await expect(await isElementDisplayed(column, 2)).toBe(false, 'column is visible');
        await expect(await getAttributeByName(column, 'style', 0)).toContain('width: 33%');
        await expect(await getAttributeByName(column, 'style', 1)).toContain('width: 67%');
        section === defaultExample ? await click(columnButton, 1) : await click(columnButton, 5);
        section === defaultExample ? await click(columnButton, 2) : await click(columnButton, 4);
        await pause(1000);
        await expect(await isElementDisplayed(column, 0)).toBe(false, 'column is visible');
        await expect(await isElementDisplayed(column, 1)).toBe(false, 'column is visible');
        await expect(await getAttributeByName(column, 'style', 2)).toContain('width: 100%');
    }

    async function checkSeparator(section: string): Promise<void> {
        await click(section + button);
        await click(columnButton);
        await pause(1000);
        const startFirstColumnWidth = await getAttributeByName(column, 'style', 0);
        await click(separateButton);
        await pause(1000);
        await expect(await getAttributeByName(column, 'style', 0)).not.toContain(startFirstColumnWidth);
        section === dynamicExample ? await click(columnButton, 5) : await click(columnButton, 1);
        await pause(1000);
        await expect(await getElementArrayLength(separateButton)).toEqual(2);
        const startMidColumnWidth = await getAttributeByName(column, 'style', 1);
        await click(separateButton, 1);
        await pause(1000);
        await expect(await getAttributeByName(column, 'style', 1)).not.toContain(startMidColumnWidth);
        await expect(await getElementArrayLength(separateButton)).toEqual(1);
        await click(separateButton);
        await pause(1000);
        await expect(await getAttributeByName(column, 'style', 1)).toContain(startMidColumnWidth);
        await expect(await getElementArrayLength(separateButton)).toEqual(2);
        await click(separateButton);
        await pause(1000);
        await expect(await isElementDisplayed(column, 2)).toBe(false, 'column is visible');
        await click(separateButton);
        await expect(await getElementArrayLength(separateButton)).toEqual(1);
    }

    async function checkColumnsOpening(section: string): Promise<void> {
        await click(section + button);
        await click(columnButton);
        await pause(1000);
        await expect(await isElementDisplayed(column, 1)).toBe(true, 'column is not visible');
        section === dynamicExample ? await click(columnButton, 5) : await click(columnButton, 1);

        await pause(1000);
        await expect(await isElementDisplayed(column, 2)).toBe(true, 'column is not visible');
        section === dynamicExample ? await click(columnButton, 5) : await click(columnButton, 3);
        await pause(1000);
        await expect(await isElementDisplayed(column, 2)).toBe(false, 'column is visible');
    }

    async function checkOpenClose(section: string): Promise<void> {
        await click(section + button);
        await expect(await isElementDisplayed(column)).toBe(true, 'column is not displayed');
        await click(exitExampleBtn);
        await expect(await doesItExist(column)).toBe(false);
    }

    async function checkExistSeparator(section: string): Promise<void> {
        await click(section + button);
        await click(columnButton2);
        await expect(await waitForElDisplayed(separator)).toBe(true, 'separator is not displayed');

        await click(columnButton2, 1);
        await pause(1000);
        await click(separateButton, 1);
        await pause(1000);
        await expect(await isElementDisplayed(separator)).toBe(true, 'separator is not displayed');
        await expect(await isElementDisplayed(separator, 1)).toBe(true, 'separator is not displayed');
    }
});
