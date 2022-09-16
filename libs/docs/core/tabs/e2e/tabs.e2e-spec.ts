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

    beforeAll(() => {
        tabsPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(tabsPage.root);
        waitForElDisplayed(tabsPage.title);
    }, 1);

    it('should check tabs selecting', () => {
        expect(checkTabsSelect(tabsExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(IconOnlyExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(ProcessExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(FilterExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(AddExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(collapsibleOverflowExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(collapsibleExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(SelectionExample)).toBe(true, 'One of the tabs is not selected');
        expect(checkTabsSelect(stackendContentExample)).toBe(true, 'One of the tabs is not selected');
    });

    it('should check adding-removing tab', () => {
        const originalLength = getElementArrayLength(AddExample + fdTab);
        click(addBtn);
        let newLength = getElementArrayLength(AddExample + fdTab);
        expect(newLength).toBeGreaterThan(originalLength);
        click(removeBtn);
        click(removeBtn);
        newLength = getElementArrayLength(AddExample + fdTab);
        expect(originalLength).toBeGreaterThan(newLength);
        for (newLength; newLength !== 1; newLength--) {
            click(removeBtn);
        }
        click(removeBtn);
        const lengthAfterRemoving = getElementArrayLength(AddExample + fdTab);
        // Check that the last tab can not be removed
        expect(lengthAfterRemoving).toEqual(1);
    });

    it('should check choosing tabs via buttons', () => {
        if (browserIsFirefox() && currentPlatformName() === 'macOS') {
            return;
        }
        click(chooseTabsBtn, 1);
        expect(getAttributeByName(SelectionExample + fdTab, 'aria-selected', 1)).toEqual('true');
        click(chooseTabsBtn);
        expect(getAttributeByName(SelectionExample + fdTab, 'aria-selected', 0)).toEqual('true');
        expect(getAttributeByName(SelectionExample + fdTab, 'aria-selected', 1)).toEqual('false');
    });

    it('check collapsible overflow', () => {
        if (browserIsFirefox() && currentPlatformName() === 'macOS') {
            return;
        }
        scrollIntoView(collapsibleOverflowExample);
        const length = getElementArrayLength(collapsibleOverflowExample + collapsibleTab);
        const lastPointOfMainList = getText(collapsibleOverflowExample + collapsibleTab, length - 1);
        click(moreBtn);
        const firstPointOfExpandedList = getText(expandedListItem);
        click(expandedListItem);
        expect(getText(expandedListItem)).toEqual(lastPointOfMainList);
        expect(getText(collapsibleOverflowExample + collapsibleTab, length - 1)).toEqual(firstPointOfExpandedList);
    });

    it('should check collapsible tabs', () => {
        scrollIntoView(collapsibleExample);
        clickOnTab(collapsibleExample, 2);
        expect(getAttributeByName(collapsibleExample + ' ' + fdTabFF, 'aria-selected', 2)).toEqual('true');
    });

    it('should check that tabs change according to chosen filter and compact modes', () => {
        click(modeSelect);
        click(filterMode);
        click(compactCheckBox);
        expect(getElementClass(threeTabsGroup)).toContain('compact');
        expect(getElementClass(threeTabsGroup)).toContain('filter');
    });

    it('should check that icon changes according to chosen', () => {
        click(modeSelect);
        click(iconOnlyMode);
        click(compactCheckBox);
        click(iconSelect);
        click(acceleratedIcon);
        expect(getElementClass(fdIcon)).toContain('accelerated');
    });

    it('should check set custom title in playground', () => {
        const customTitle = 'Battle';
        scrollIntoView(playGroundExample);
        setValue(titleField, customTitle);
        expect(getText(playGroundExample + tabTitle)).toBe(customTitle);
    });

    it('should check set custom title in playground', () => {
        const customCount = '123';
        scrollIntoView(playGroundExample);
        setValue(counterField, customCount);
        expect(getText(playGroundExample + tabCount)).toBe(customCount);
    });

    it('should check choosing icon for tab without icon mode', () => {
        scrollIntoView(playGroundExample);
        click(iconSelect);
        click(acceleratedIcon);
        // icon should not exist cz by default tabs mode is not icon
        expect(doesItExist(fdIcon)).toBe(false);
        click(modeSelect);
        click(iconOnlyMode);
        expect(isElementDisplayed(fdIcon)).toBe(true);
    });

    it('should check RTL and LTR orientation', () => {
        tabsPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        tabsPage.saveExampleBaselineScreenshot();
        expect(tabsPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkTabsSelect(section: string): boolean {
        let length;
        if (section === collapsibleOverflowExample) {
            length = getElementArrayLength(section + fdTab) - 3;
        }
        if (section !== collapsibleOverflowExample) {
            length = getElementArrayLength(section + fdTab);
        }
        for (let i = 0; i < length; i++) {
            if (section === collapsibleExample && i === 0) {
                click(section + fdTab, i);
                if (getAttributeByName(section + fdTab, 'aria-selected', i) === 'true') {
                    return false;
                }
            }
            if (section === stackendContentExample && i === 0) {
                expect(getAttributeByName(section + fdTab, 'aria-selected', i)).toEqual('true');
            }
            if (section !== collapsibleExample && section !== stackendContentExample && i !== 0) {
                click(section + fdTab, i);
                if (getAttributeByName(section + fdTab, 'aria-selected', i) !== 'true') {
                    return false;
                }
            }
        }
        return true;
    }

    function clickOnTab(section: string, index: number = 0): void {
        return browserIsFirefox() ? click(section + fdTabFF, index) : click(section + fdTab, index);
    }
});
