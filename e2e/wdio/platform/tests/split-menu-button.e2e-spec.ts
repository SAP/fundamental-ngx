import { SplitMenuButtonPo } from '../pages/split-menu-button.po';
import SMBData from '../fixtures/appData/split-menu-button-page-contents';
import { webDriver } from '../../driver/wdio';

describe('Split menu button test suite', () => {
    const spMenuBtnPage = new SplitMenuButtonPo();

    beforeAll(() => {
        spMenuBtnPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('should check drop-down arrow menu functionality', async () => {
        const dropdownArrowBtnArr = webDriver.elementArray(spMenuBtnPage.arrowBtnArr);

        for (let i = 0; i < dropdownArrowBtnArr.length; i++) {
            webDriver.click(spMenuBtnPage.arrowBtnArr, i);
            expect(webDriver.waitForDisplayed(spMenuBtnPage.menuOverlay));
            webDriver.click(spMenuBtnPage.arrowBtnArr, i);
        }

    });

    it('should check each split btn has main and arrow btns', async () => {
        const dropdownArrowBtnCount = webDriver.getElementArrayLength(spMenuBtnPage.arrowBtnArr);
        const mainBtnCount = webDriver.getElementArrayLength(spMenuBtnPage.mainBtnArr);

        await expect(dropdownArrowBtnCount).toEqual(mainBtnCount);
    });

    it('should check that menu closed after making one selection', () => {
        webDriver.click(spMenuBtnPage.behaviorsExArrowBtnArr);
        webDriver.waitForDisplayed(spMenuBtnPage.menuOverlay);

        webDriver.click(spMenuBtnPage.behaviorsExArrowBtnArr);
        webDriver.waitForNotDisplayed(spMenuBtnPage.menuOverlay);
    });

    it('should check split menu button behaviors examples', () => {
        const behaviorArrowBtnArr = webDriver.elementArray(spMenuBtnPage.behaviorsExArrowBtnArr);
        spMenuBtnPage.checkBtnSelectionChange(behaviorArrowBtnArr, spMenuBtnPage.behaviorsExSelectionBtnArr, SMBData.behaviorBtnTextArr);
    });

    it('should check split menu button type examples', () => {
        const typesArrowBtnArr = webDriver.elementArray(spMenuBtnPage.typesExArrowBtnArr);

        spMenuBtnPage.checkBtnSelectionChange(typesArrowBtnArr, spMenuBtnPage.typesExSelectionBtnArr, SMBData.typesBtnTextArr);
    });

    it('should check btn selections', () => {
        webDriver.click(spMenuBtnPage.typesExSelectionBtnArr);
        spMenuBtnPage.checkSelectionOutput(spMenuBtnPage.typesOutput, SMBData.standardBtnText);

        webDriver.click(spMenuBtnPage.typesExArrowBtnArr);
        webDriver.click(spMenuBtnPage.menuItemArr, 1);
        spMenuBtnPage.checkSelectionOutput(spMenuBtnPage.typesOutput, SMBData.standardBtnText2);
    });

    it('should check split menu buttons with icon examples', () => {
        const iconArrowBtnArr = webDriver.elementArray(spMenuBtnPage.iconExArrowBtnArr);
        const iconBtnArr = webDriver.elementArray(spMenuBtnPage.iconBtnAttrArr);

        spMenuBtnPage.checkBtnSelectionChange(iconArrowBtnArr, spMenuBtnPage.iconExSelectionBtnArr, SMBData.iconBtnTextArr);
        for (let i = 0; i < iconBtnArr.length; i++) {
            expect(webDriver.getAttributeByName(spMenuBtnPage.iconBtnAttrArr, SMBData.iconAttr, i)).toContain(SMBData.iconLabel);
        }
    });

    it('should check compact btn styles', () => {
        expect(webDriver.getAttributeByName(spMenuBtnPage.iconBtnAttrArr, SMBData.compactAttr, 1)).toContain(SMBData.compactValue);
    });

    it('should check default hover state', () => {
        const behaviorBtnArr = webDriver.elementArray(spMenuBtnPage.behaviorsExSelectionBtnArr);
        const behaviorArrowBtnArr = webDriver.elementArray(spMenuBtnPage.behaviorsExArrowBtnArr);

        for (let i = 0; i < behaviorBtnArr.length; i++) {
            webDriver.scrollIntoView(spMenuBtnPage.behaviorsExSelectionBtnArr, i);
            webDriver.mouseHoverElement(spMenuBtnPage.behaviorsExSelectionBtnArr,  i);
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.behaviorsExSelectionBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.defaultHvrColor);
        }

        for (let i = 0; i < behaviorArrowBtnArr.length; i++) {
            webDriver.scrollIntoView(spMenuBtnPage.behaviorsExArrowBtnArr, i);
            webDriver.mouseHoverElement(spMenuBtnPage.behaviorsExArrowBtnArr,  i);
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.behaviorsExArrowBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.defaultHvrColor);
        }
    });

    xit('should check default active state', () => {
        const behaviorBtnArr = webDriver.elementArray(spMenuBtnPage.behaviorsExSelectionBtnArr);
        const behaviorArrowBtnArr = webDriver.elementArray(spMenuBtnPage.behaviorsExArrowBtnArr);

        for (let i = 0; i < behaviorBtnArr.length; i++) {
            webDriver.mouseHoverElement(spMenuBtnPage.behaviorsExSelectionBtnArr,  i);
            webDriver.mouseButtonDown();
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.behaviorsExSelectionBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.defaultBtnColor);
            webDriver.mouseButtonUp();
        }

        for (let i = 0; i < behaviorArrowBtnArr.length; i++) {
            webDriver.mouseHoverElement(spMenuBtnPage.behaviorsExArrowBtnArr,  i);
            webDriver.mouseButtonDown();
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.behaviorsExArrowBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.defaultBtnColor);
            webDriver.mouseButtonUp();
        }
    });

    it('should check split btn types example colors', () => {
        const typesBtnArr = webDriver.elementArray(spMenuBtnPage.typesExSelectionBtnArr);
        const typesArrowBtnArr = webDriver.elementArray(spMenuBtnPage.typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.typesExSelectionBtnArr, SMBData.textColorAttr, i).value)
                .toContain(SMBData.typesBtnColorArr[i]);
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.typesExArrowBtnArr, SMBData.textColorAttr, i).value)
                .toContain(SMBData.typesBtnColorArr[i]);
        }
    });

    it('should check split btn type examples hover colors', async () => {
        const typesBtnArr = webDriver.elementArray(spMenuBtnPage.typesExSelectionBtnArr);
        const typesArrowBtnArr = webDriver.elementArray(spMenuBtnPage.typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            webDriver.scrollIntoView(spMenuBtnPage.typesExSelectionBtnArr, i);
            webDriver.mouseHoverElement(spMenuBtnPage.typesExSelectionBtnArr,  i);
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.typesExSelectionBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.typesBtnHvrColorArr[i]);
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            webDriver.scrollIntoView(spMenuBtnPage.typesExArrowBtnArr, i);
            webDriver.mouseHoverElement(spMenuBtnPage.typesExArrowBtnArr,  i);
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.typesExArrowBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.typesBtnHvrColorArr[i]);
        }
    });

    xit('should check split btn type examples active state', async () => {
        const typesBtnArr = webDriver.elementArray(spMenuBtnPage.typesExSelectionBtnArr);
        const typesArrowBtnArr = webDriver.elementArray(spMenuBtnPage.typesExArrowBtnArr);

        for (let i = 0; i < typesBtnArr.length; i++) {
            webDriver.mouseHoverElement(spMenuBtnPage.typesExSelectionBtnArr,  i);
            webDriver.mouseButtonDown();
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.typesExSelectionBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.typesBtnActiveColorArr[i]);
            webDriver.mouseButtonUp();
        }

        for (let i = 0; i < typesArrowBtnArr.length; i++) {
            webDriver.mouseHoverElement(spMenuBtnPage.typesExArrowBtnArr,  i);
            webDriver.mouseButtonDown();
            expect(webDriver.getCSSPropertyByName(spMenuBtnPage.typesExArrowBtnArr, SMBData.bgColorAttr, i).value)
                .toContain(SMBData.typesBtnActiveColorArr[i]);
            webDriver.mouseButtonUp();
        }

    });

    it('should check tooltips', async () => {
        const menuBtnArr = webDriver.elementArray(spMenuBtnPage.mainBtnArr);

        for (let i = 0; i < menuBtnArr.length; i++) {
            expect(webDriver.getAttributeByName(spMenuBtnPage.mainBtnArr, SMBData.tooltipAttr, i))
                .not.toEqual(null);
        }
    });

    it('should check RTL orientation', async () => {
        spMenuBtnPage.checkRtlSwitch();
    it('should check RTL orientation', () => {
        spMenuBtnPage.checkRtlSwitch(spMenuBtnPage.rtlSwitcherArr, spMenuBtnPage.exampleAreaContainersArr);
    });
});

