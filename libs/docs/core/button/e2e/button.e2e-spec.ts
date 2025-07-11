import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { fdTypeOptions, iconOptions, testText } from './button-contents';
import { ButtonPo } from './button.po';

describe('Button test suite:', () => {
    const buttonPage = new ButtonPo();
    const {
        typeButtons,
        menuButtons,
        sizeButtons,
        iconButtons,
        stateButton,
        disableStateButtons,
        playgroundButton,
        inputLabel,
        checkboxMenu,
        checkboxCompact,
        dropDownMenu,
        playgroundButtonText,
        playgroundButtonIcon,
        menuOption,
        dropDownOptionByValue
    } = buttonPage;

    beforeAll(async () => {
        await buttonPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await buttonPage.waitForRoot();
        await waitForElDisplayed(buttonPage.title);
    }, 1);

    describe('Verify all buttons are clickable', () => {
        it('verify clickable buttons types', async () => {
            const typeButtonsLength = await getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                await scrollIntoView(typeButtons, i);
                await expect(await isElementClickable(typeButtons, i)).toBe(
                    true,
                    `type button with index ${i} not clickable`
                );
            }
        });

        it('verify clickable menu buttons', async () => {
            const menuButtonsLength = await getElementArrayLength(menuButtons);
            for (let i = 0; i < menuButtonsLength; i++) {
                await scrollIntoView(menuButtons, i);
                await expect(await isElementClickable(menuButtons, i)).toBe(
                    true,
                    `menu button with index ${i} not clickable`
                );
            }
        });

        it('verify clickable size buttons', async () => {
            const sizeButtonsLength = await getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                await scrollIntoView(sizeButtons, i);
                await expect(await isElementClickable(sizeButtons, i)).toBe(
                    true,
                    `size button with index ${i} not clickable`
                );
            }
        });

        it('verify compact button', async () => {
            await scrollIntoView(sizeButtons);
            const cozySize = await getElementSize(sizeButtons);
            const compactSize = await getElementSize(sizeButtons, 1);
            await expect(compactSize.height).toBeLessThan(cozySize.height);
        });

        it('verify buttons with icons', async () => {
            const iconButtonsLength = await getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                await scrollIntoView(iconButtons, i);
                await expect(await isElementClickable(iconButtons, i)).toBe(
                    true,
                    `icon button with index ${i} not clickable`
                );
            }
        });

        it('verify state buttons', async () => {
            await scrollIntoView(stateButton);
            await expect(await isElementClickable(stateButton)).toBe(true, `state button with index not clickable`);
        });

        it('verify playground button is clickable', async () => {
            await scrollIntoView(playgroundButton);
            await expect(await isElementClickable(playgroundButton)).toBe(
                true,
                `playground button with index not clickable`
            );
        });
    });

    it('verify disable state buttons', async () => {
        await expect(await getAttributeByName(disableStateButtons, 'aria-disabled')).toEqual('true');
        await expect(await getAttributeByName(disableStateButtons, 'ng-reflect-disabled', 1)).toBeDefined();
    });

    describe('Verify playground', () => {
        it('verify changing text in label', async () => {
            await scrollIntoView(inputLabel);
            await setValue(inputLabel, 'test');
            await expect((await getText(playgroundButtonText)).trim()).toEqual(testText);
        });

        it('verify type of dropdown menu', async () => {
            await scrollIntoView(dropDownMenu);
            await click(dropDownMenu);
            for (let i = 1; i < fdTypeOptions.length; i++) {
                await click(menuOption, i);
                await click(playgroundButton);
                await expect(await getElementClass(playgroundButton)).toContain(fdTypeOptions[i - 1]);
            }
        });

        it('verify checkbox fdMenu', async () => {
            await scrollIntoView(checkboxMenu);
            await click(checkboxMenu);
            await expect(await getElementClass(playgroundButton)).toContain('fd-button--menu');
        });

        it('verify checkbox compact', async () => {
            await scrollIntoView(checkboxCompact);
            await click(checkboxCompact);
            await expect(await getElementClass(playgroundButton)).toContain('is-compact');
        });

        it('verify icon of dropdown menu', async () => {
            await scrollIntoView(dropDownMenu, 1);
            await click(dropDownMenu, 1);
            for (let i = 0; i < iconOptions.length; i++) {
                await click(dropDownOptionByValue(iconOptions[i]));
                await click(playgroundButton);
                await expect(await getElementClass(playgroundButtonIcon)).toContain(iconOptions[i]);
                await click(dropDownMenu, 1);
            }
        });
    });
});
