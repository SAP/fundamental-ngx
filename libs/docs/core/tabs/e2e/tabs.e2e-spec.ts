import {
    browserIsFirefox,
    click,
    currentPlatformName,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { TabsPo } from './tabs.po';

describe('Tabs test suite', () => {
    const tabsPage = new TabsPo();
    const {
        AddExample,
        tabsExample,
        FilterExample,
        ProcessExample,
        IconOnlyExample,
        SelectionExample,
        collapsibleExample,
        stackendContentExample,
        collapsibleOverflowExample,
        fdTab,
        addBtn,
        removeBtn,
        chooseTabsBtn,
        expandedListItem,
        moreBtn,

        modeSelect,
        iconOnlyMode,
        compactCheckBox,
        threeTabsGroup,
        threeTabsList,
        iconSelect,
        collapsibleTab,
        acceleratedIcon,
        fdIcon,
        filterMode,
        fdTabFF,
        titleField,
        counterField,
        playGroundExample,
        tabCount,
        tabTitle
    } = tabsPage;

    beforeAll(async () => {
        await tabsPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(tabsPage.root);
        await waitForElDisplayed(tabsPage.title);
    }, 1);

    it('should check tabs selecting', async () => {
        await expect(await checkTabsSelect(tabsExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(IconOnlyExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(ProcessExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(FilterExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(AddExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(collapsibleOverflowExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(collapsibleExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(SelectionExample)).toBe(true, 'One of the tabs is not selected');
        await expect(await checkTabsSelect(stackendContentExample)).toBe(true, 'One of the tabs is not selected');
    });

    it('should check adding-removing tab', async () => {
        const originalLength = await getElementArrayLength(AddExample + fdTab);
        await click(addBtn);
        let newLength = await getElementArrayLength(AddExample + fdTab);
        await expect(newLength).toBeGreaterThan(originalLength);
        await click(removeBtn);
        await click(removeBtn);
        newLength = await getElementArrayLength(AddExample + fdTab);
        await expect(originalLength).toBeGreaterThan(newLength);
        for (newLength; newLength !== 1; newLength--) {
            await click(removeBtn);
        }
        await click(removeBtn);
        const lengthAfterRemoving = await getElementArrayLength(AddExample + fdTab);
        // Check that the last tab can not be removed
        await expect(lengthAfterRemoving).toEqual(1);
    });

    it('should check choosing tabs via buttons', async () => {
        if ((await browserIsFirefox()) && (await currentPlatformName()) === 'macOS') {
            return;
        }
        await click(chooseTabsBtn, 1);
        const tabLinkSelector = SelectionExample + fdTab + ' ' + fdTabFF;
        await expect(await getAttributeByName(tabLinkSelector, 'aria-selected', 1)).toEqual('true');
        await click(chooseTabsBtn);
        await expect(await getAttributeByName(tabLinkSelector, 'aria-selected', 0)).toEqual('true');
        await expect(await getAttributeByName(tabLinkSelector, 'aria-selected', 1)).toEqual('false');
    });

    it('check collapsible overflow', async () => {
        if ((await browserIsFirefox()) && (await currentPlatformName()) === 'macOS') {
            return;
        }
        await scrollIntoView(collapsibleOverflowExample);
        const length = await getElementArrayLength(collapsibleOverflowExample + collapsibleTab);
        const lastPointOfMainList = await getText(collapsibleOverflowExample + collapsibleTab, length - 1);
        await click(moreBtn);
        const firstPointOfExpandedList = await getText(expandedListItem);
        await click(expandedListItem);
        await expect(await getText(expandedListItem)).toEqual(lastPointOfMainList);
        await expect(await getText(collapsibleOverflowExample + collapsibleTab, length - 1)).toEqual(
            firstPointOfExpandedList
        );
    });

    it('should check collapsible tabs', async () => {
        await scrollIntoView(collapsibleExample);
        await clickOnTab(collapsibleExample, 2);
        await expect(await getAttributeByName(collapsibleExample + ' ' + fdTabFF, 'aria-selected', 2)).toEqual('true');
    });

    it('should check that tabs change according to chosen filter and compact modes', async () => {
        await click(modeSelect);
        await click(filterMode);
        await click(compactCheckBox);
        await expect(await getElementClass(threeTabsList)).toContain('is-compact');
        await expect(await getElementClass(threeTabsGroup)).toContain('filter');
    });

    it('should check that icon changes according to chosen', async () => {
        await click(modeSelect);
        await click(iconOnlyMode);
        await click(compactCheckBox);
        await click(iconSelect);
        await click(acceleratedIcon);
        await expect(await getElementClass(fdIcon)).toContain('accelerated');
    });

    it('should check set custom title in playground', async () => {
        const customTitle = 'Battle';
        await scrollIntoView(playGroundExample);
        await setValue(titleField, customTitle);
        await expect(await getText(playGroundExample + tabTitle)).toBe(customTitle);
    });

    it('should check set custom title in playground', async () => {
        const customCount = '123';
        await scrollIntoView(playGroundExample);
        await setValue(counterField, customCount);
        await expect(await getText(playGroundExample + tabCount)).toBe(customCount);
    });

    it('should check choosing icon for tab without icon mode', async () => {
        await scrollIntoView(playGroundExample);
        await click(iconSelect);
        await click(acceleratedIcon);
        // icon should not exist cz by default tabs mode is not icon
        await expect(await doesItExist(fdIcon)).toBe(false);
        await click(modeSelect);
        await click(iconOnlyMode);
        await expect(await isElementDisplayed(fdIcon)).toBe(true);
    });

    it('should check RTL and LTR orientation', async () => {
        await tabsPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await tabsPage.saveExampleBaselineScreenshot();
        await expect(await tabsPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkTabsSelect(section: string): Promise<boolean> {
        let length;
        if (section === collapsibleOverflowExample) {
            length = (await getElementArrayLength(section + fdTab)) - 3;
        }
        if (section !== collapsibleOverflowExample) {
            length = await getElementArrayLength(section + fdTab);
        }
        const tabLinkElSelector = section + fdTab + ' ' + fdTabFF;
        for (let i = 0; i < length; i++) {
            if (section === collapsibleExample && i === 0) {
                await click(section + fdTab, i);
                if ((await getAttributeByName(tabLinkElSelector, 'aria-selected', i)) === 'true') {
                    return false;
                }
            }
            if (section === stackendContentExample && i === 0) {
                await expect(await getAttributeByName(tabLinkElSelector, 'aria-selected', i)).toEqual('true');
            }
            if (section !== collapsibleExample && section !== stackendContentExample && i !== 0) {
                await click(section + fdTab, i);
                if ((await getAttributeByName(tabLinkElSelector, 'aria-selected', i)) !== 'true') {
                    return false;
                }
            }
        }
        return true;
    }

    async function clickOnTab(section: string, index: number = 0): Promise<void> {
        return (await browserIsFirefox()) ? await click(section + fdTabFF, index) : await click(section + fdTab, index);
    }
});
