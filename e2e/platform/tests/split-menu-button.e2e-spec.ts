import { SplitMenuButtonPo } from '../pages/split-menu-button.po';
import { browser } from 'protractor';
import SMBData from '../fixtures/appData/split-menu-button-page-contents';
import { getText, getValueOfAttribute, hoverMouse } from '../../helper/helper';

describe('Split menu button test suite', function() {
    const spMenuBtnPage = new SplitMenuButtonPo();

    beforeAll(async () => {
        await spMenuBtnPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    it('should check drop-down arrow menu functionality', async () => {
        const dropdownArrowBtnArr = await spMenuBtnPage.arrowBtnArr;

        dropdownArrowBtnArr.forEach(async element => {
            await element.click().then( async () => {
                await expect(await spMenuBtnPage.menuOverlay.isDisplayed()).toBe(true);
            });
            await element.click();
        });
    });

    it('should check each split btn has main and arrow btns', async () => {
        const dropdownArrowBtnCount = await spMenuBtnPage.arrowBtnArr.count();
        const mainBtnCount = await spMenuBtnPage.mainBtnArr.count();

        await expect(dropdownArrowBtnCount).toEqual(mainBtnCount);
    });

    it('should check that menu closed after making one selection', async () => {
        const behaviorArrowBtnArr = await spMenuBtnPage.behaviorsExArrowBtnArr;

        await behaviorArrowBtnArr[0].click().then( async () => {
            const menuItemsArr = await spMenuBtnPage.menuItemArr;
            await expect(await spMenuBtnPage.menuOverlay.isDisplayed()).toBe(true);
            await menuItemsArr[1].click().then( async () => {
                await expect(await spMenuBtnPage.menuOverlay.isDisplayed()).toBe(false);
            });
        });
    });

    it('should check split menu button behaviors examples', async () => {
        const behaviorArrowBtnArr = await spMenuBtnPage.behaviorsExArrowBtnArr;

        await checkBtnSelectionChange(behaviorArrowBtnArr, spMenuBtnPage.behaviorsExSelectionBtnArr, SMBData.behaviorBtnTextArr)
    });

    it('should check split menu button type examples', async () => {
        const typesArrowBtnArr = await spMenuBtnPage.typesExArrowBtnArr;

        await checkBtnSelectionChange(typesArrowBtnArr, spMenuBtnPage.typesExSelectionBtnArr, SMBData.typesBtnTextArr);
    });

    it('should check btn selections', async () => {
        const typesBtnArr = await spMenuBtnPage.typesExSelectionBtnArr;
        const typesArrowBtnArr = await spMenuBtnPage.typesExArrowBtnArr;

        await typesBtnArr[0].click();
        await checkSelectionOutput(spMenuBtnPage.typesOutput, SMBData.standardBtnText);

        await typesArrowBtnArr[0].click().then( async () => {
            const menuItemsArr = await spMenuBtnPage.menuItemArr;
            await menuItemsArr[1].click();
        });
        await checkSelectionOutput(spMenuBtnPage.typesOutput, SMBData.standardBtnText2)
    });

    it('should check split menu buttons with icon examples', async () => {
        const iconArrowBtnArr = await spMenuBtnPage.iconExArrowBtnArr;
        const iconBtnArr = await spMenuBtnPage.iconBtnAttrArr;

        await checkBtnSelectionChange(iconArrowBtnArr, spMenuBtnPage.iconExSelectionBtnArr, SMBData.iconBtnTextArr);
        iconBtnArr.forEach(async element => {
            await expect(await getValueOfAttribute(element, SMBData.iconAttr)).toContain(SMBData.iconLabel);
        })
    });

    it('should check compact btn styles', async () => {
        const iconBtnArr = await spMenuBtnPage.iconBtnAttrArr;

        await expect(await getValueOfAttribute(iconBtnArr[1], SMBData.compactAttr)).toContain(SMBData.compactValue)
    });

    it('should check default hover state', async () => {
        const behaviorBtnArr = await spMenuBtnPage.behaviorsExSelectionBtnArr;
        const behaviorArrowBtnArr = await spMenuBtnPage.behaviorsExArrowBtnArr;

        behaviorBtnArr.forEach(async element => {
           await hoverMouse(element).then( async () => {
               await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.defaultHvrColor);
           });
        });
        behaviorArrowBtnArr.forEach(async element => {
            await hoverMouse(element).then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.defaultHvrColor);
            });
        });
    });

    it('should check default active state', async () => {
        const behaviorBtnArr = await spMenuBtnPage.behaviorsExSelectionBtnArr;
        const behaviorArrowBtnArr = await spMenuBtnPage.behaviorsExArrowBtnArr;

        behaviorBtnArr.forEach(async element => {
            await browser.actions().mouseDown(element).perform().then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.defaultBtnColor);
                await browser.actions().mouseUp(element).perform();
            });
        });
        behaviorArrowBtnArr.forEach(async element => {
            await browser.actions().mouseDown(element).perform().then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.defaultBtnColor);
                await browser.actions().mouseUp(element).perform();
                 await element.click();
            });
        });
    });

    it('should check split btn types example colors', async () => {
        const typesBtnArr = await spMenuBtnPage.typesExSelectionBtnArr;
        const typesArrowBtnArr = await spMenuBtnPage.typesExArrowBtnArr;

        typesBtnArr.forEach(async (element, index) => {
            await expect(await element.getCssValue(SMBData.textColorAttr)).toContain(SMBData.typesBtnColorArr[index]);
        });
        typesArrowBtnArr.forEach(async (element, index) => {
            await expect(await element.getCssValue(SMBData.textColorAttr)).toContain(SMBData.typesBtnColorArr[index]);
        });
    });

    it('should check split btn type examples hover colors', async () => {
        const typesBtnArr = await spMenuBtnPage.typesExSelectionBtnArr;
        const typesArrowBtnArr = await spMenuBtnPage.typesExArrowBtnArr;

        typesBtnArr.forEach(async (element, index) => {
            await hoverMouse(element).then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.typesBtnHvrColorArr[index]);
            });
        });
        typesArrowBtnArr.forEach(async (element, index) => {
            await hoverMouse(element).then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.typesBtnHvrColorArr[index]);
            });
        });
    });

    it('should check split btn type examples active state', async () => {
        const typesBtnArr = await spMenuBtnPage.typesExSelectionBtnArr;
        const typesArrowBtnArr = await spMenuBtnPage.typesExArrowBtnArr;

        typesBtnArr.forEach(async (element, index) => {
            await browser.actions().mouseDown(element).perform().then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.typesBtnActiveColorArr[index]);
                await browser.actions().mouseUp(element).perform();
            });
        });
        typesArrowBtnArr.forEach(async (element, index) => {
            await browser.actions().mouseDown(element).perform().then( async () => {
                await expect(element.getCssValue(SMBData.bgColorAttr)).toContain(SMBData.typesBtnActiveColorArr[index]);
                await browser.actions().mouseUp(element).perform();
                await element.click();
            });
        });
    });

    it('should check tooltips', async () => {
       const menuBtnArr = await spMenuBtnPage.mainBtnArr;

       menuBtnArr.forEach(async element => {
          await expect(await getValueOfAttribute(element, SMBData.tooltipAttr)).not.toEqual(null);
       });
    });

    it('should check LTR orientation', async () => {
        const areaContainersArray = await spMenuBtnPage.exampleAreaContainersArr;

        areaContainersArray.forEach(async element => {
            expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
        });
    });

    it('should check RTL orientation', async () => {
        await spMenuBtnPage.exampleAreaContainersArr.each(async (area, index) => {
            expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
            expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
            await spMenuBtnPage.rtlSwitcherArr.get(index).click();
            expect(await area.getCssValue('direction')).toBe('rtl');
            expect(await area.getAttribute('dir')).toBe('rtl');
        });
    });

    async function checkBtnSelectionChange(array, btnArray, expectation): Promise<any> {
        array.forEach(async (element, index) => {
            await element.click().then(async () => {
                const menuItemsArr = await spMenuBtnPage.menuItemArr;
                await menuItemsArr[1].click().then(async () => {
                    const behaviorMainBtnArr = await btnArray;
                    await expect(await getText(behaviorMainBtnArr[index])).toContain(expectation[index]);
                });
            });
        });
    }

    async function checkSelectionOutput(outputSelector, expectation): Promise<any> {
        await expect(await getText(outputSelector)).toEqual(SMBData.outputLabel + expectation);
    }
});
