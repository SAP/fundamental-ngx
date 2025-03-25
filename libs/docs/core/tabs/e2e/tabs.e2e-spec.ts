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
    pause,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed
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
        accidentalLeaveIcon,
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
        await tabsPage.waitForRoot();
        await waitForElDisplayed(tabsPage.title);
    }, 1);

    it('should check tabs selecting', async () => {
        const context = 'One of the tabs is not selected';
        expect(await checkTabsSelect(tabsExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(IconOnlyExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(ProcessExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(FilterExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(AddExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(collapsibleOverflowExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(collapsibleExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(SelectionExample))
            .withContext(context)
            .toBe(true);
        expect(await checkTabsSelect(stackendContentExample))
            .withContext(context)
            .toBe(true);
    });

    it('should check adding-removing tab', async () => {
        const originalLength = await getElementArrayLength(AddExample + fdTab);
        await click(addBtn);
        let newLength = await getElementArrayLength(AddExample + fdTab);
        expect(newLength).toBeGreaterThan(originalLength);
        await click(removeBtn);
        await click(removeBtn);
        newLength = await getElementArrayLength(AddExample + fdTab);
        expect(originalLength).toBeGreaterThan(newLength);
        for (newLength; newLength !== 1; newLength--) {
            await click(removeBtn);
        }
        await click(removeBtn);
        const lengthAfterRemoving = await getElementArrayLength(AddExample + fdTab);
        // Check that the last tab can not be removed
        expect(lengthAfterRemoving).toEqual(1);
    });

    it('should check choosing tabs via buttons', async () => {
        if (browserIsFirefox() && currentPlatformName() === 'macOS') {
            return;
        }
        await click(chooseTabsBtn, 1);
        const tabLinkSelector = SelectionExample + fdTab + ' ' + fdTabFF;
        expect(await getAttributeByName(tabLinkSelector, 'aria-selected', 1)).toEqual('true');
        await click(chooseTabsBtn);
        expect(await getAttributeByName(tabLinkSelector, 'aria-selected', 0)).toEqual('true');
        expect(await getAttributeByName(tabLinkSelector, 'aria-selected', 1)).toEqual('false');
    });

    it('check collapsible overflow', async () => {
        if (browserIsFirefox() && currentPlatformName() === 'macOS') {
            return;
        }
        await scrollIntoView(collapsibleOverflowExample);
        const length = await getElementArrayLength(collapsibleOverflowExample + collapsibleTab);
        const lastOfMainList = async () => await getText(collapsibleOverflowExample + collapsibleTab, length - 1);
        const lastPointOfMainList = await lastOfMainList();
        await click(moreBtn);
        const firstPointOfExpandedList = await getText(expandedListItem);
        await click(expandedListItem);
        await pause(500);
        const firstItemInDropdown = await getText(expandedListItem);
        expect(firstItemInDropdown).toEqual(lastPointOfMainList);
        expect(await lastOfMainList()).toEqual(firstPointOfExpandedList);
    });

    it('should check collapsible tabs', async () => {
        await scrollIntoView(collapsibleExample);
        await clickOnTab(collapsibleExample, 2);
        expect(await getAttributeByName(collapsibleExample + ' ' + fdTabFF, 'aria-selected', 2)).toEqual('true');
    });

    it('should check that tabs change according to chosen filter and compact modes', async () => {
        await click(modeSelect);
        await click(filterMode);
        await click(compactCheckBox);
        expect(await getElementClass(threeTabsList)).toContain('is-compact');
        expect(await getElementClass(threeTabsGroup)).toContain('filter');
    });

    it('should check that icon changes according to chosen', async () => {
        await click(modeSelect);
        await click(iconOnlyMode);
        await click(compactCheckBox);
        await click(iconSelect);
        await click(accidentalLeaveIcon);
        expect(await getElementClass(fdIcon)).toContain('accidental');
    });

    it('should check set custom title in playground', async () => {
        const customTitle = 'Battle';
        await scrollIntoView(playGroundExample);
        await setValue(titleField, customTitle);
        expect(await getText(playGroundExample + tabTitle)).toBe(customTitle);
    });

    it('should check set custom title in playground', async () => {
        const customCount = '123';
        await scrollIntoView(playGroundExample);
        await setValue(counterField, customCount);
        expect(await getText(playGroundExample + tabCount)).toBe(customCount);
    });

    it('should check choosing icon for tab without icon mode', async () => {
        await scrollIntoView(playGroundExample);
        await click(iconSelect);
        await click(accidentalLeaveIcon);
        // icon should not exist cz by default tabs mode is not icon
        expect(await doesItExist(fdIcon)).toBe(false);
        await click(modeSelect);
        await click(iconOnlyMode);
        expect(await isElementDisplayed(fdIcon)).toBe(true);
    });

    it('should check RTL and LTR orientation', async () => {
        await tabsPage.checkRtlSwitch();
    });

    async function checkTabsSelect(section: string): Promise<boolean> {
        let length = 0;
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
                expect(await getAttributeByName(tabLinkElSelector, 'aria-selected', i)).toEqual('true');
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
        return browserIsFirefox() ? await click(section + fdTabFF, index) : await click(section + fdTab, index);
    }
});
