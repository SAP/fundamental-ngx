import {
    click,
    elementDisplayed,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    pause,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { SwitchPo } from './switch.po';

describe('Switch test suite', () => {
    const switchPage = new SwitchPo();
    const {
        switchSizesExample,
        toggle,
        toggleInput,
        switchBindingExample,
        switchFormsExample,
        semanticswitchExample,
        playGroundSwitchExample,
        disabledToggle,
        acceptIcon,
        declineIcon,
        semanticSwitch,
        switchBtn,
        checkboxes
    } = switchPage;

    beforeAll(async () => {
        await switchPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(switchPage.root);
        await waitForElDisplayed(switchPage.title);
    }, 1);

    it('Should check turn on/ Turn off switch toggle', async () => {
        await checkSwitchingWork(switchSizesExample);
        await checkSwitchingWork(semanticswitchExample);
        await checkSwitchingWork(switchBindingExample);
        await checkSwitchingWork(playGroundSwitchExample);
    });

    it('Should check icons on semantic toggles', async () => {
        for (let i = 0; i < 2; i++) {
            await expect(await elementDisplayed(declineIcon, i)).toBe(true, 'decline icon is not displayed');
            await click(semanticSwitch, i);
            await pause(1000);
            await expect(await elementDisplayed(declineIcon, i)).toBe(false, 'decline icon is displayed');
            await expect(await elementDisplayed(acceptIcon, i)).toBe(true, 'accept icon is not displayed');
        }
    });

    it('Should check toggle state changes by click on buttons', async () => {
        await click(switchBtn, 1);
        await expect(await checkToggleState(switchBindingExample)).toBe(true, 'toggle is not enabled');
        await click(switchBtn, 1);
        await expect(await checkToggleState(switchBindingExample)).toBe(false, 'toggle not enabled');
        await click(switchBtn, 0);
        await expect(await checkToggleState(switchBindingExample)).toBe(true, 'toggle is not enabled');
    });

    it('should check switch toggle manage by checkboxes', async () => {
        await click(checkboxes, 1);
        await expect(await checkToggleState(playGroundSwitchExample)).toBe(true, 'toggle is not enabled');
        await click(checkboxes, 2);
        await expect(await getElementClass(playGroundSwitchExample + toggle)).not.toContain(
            'is-compact',
            'toggle is compact'
        );
        await click(checkboxes, 0);
        await expect(await getElementClass(playGroundSwitchExample + toggle)).toContain(
            'is-disabled',
            'toggle is not disabled'
        );
        await click(checkboxes, 2);
        await expect(await getElementClass(playGroundSwitchExample + toggle)).toContain(
            'is-compact',
            'toggle is not compact'
        );
    });

    it('should check RTL and LTR orientation', async () => {
        await switchPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await switchPage.saveExampleBaselineScreenshot();
        await expect(await switchPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkSwitchingWork(
        section: string,
        length: number | undefined = undefined,
        switchToggle: string = section + toggle,
        flag: string = section + toggleInput
    ): Promise<void> {
        length = length ?? (await getElementArrayLength(section + toggle));
        for (let i = 0; i < length; i++) {
            if ((await getElementClass(switchToggle, i)) !== disabledToggle) {
                if ((await getAttributeByName(flag, 'aria-checked', i)) === 'true') {
                    await click(switchToggle, i);
                    await expect(await checkToggleState(section, i)).toBe(false, 'toggle is enabled');
                }
                if ((await getAttributeByName(flag, 'aria-checked', i)) === 'false') {
                    await click(switchToggle, i);
                    await expect(await checkToggleState(section, i)).toBe(true, 'toggle is disabled');
                }
            }
        }
    }

    async function checkToggleState(
        section: string,
        i: number = 0,
        flag: string = section + toggleInput
    ): Promise<boolean | undefined> {
        if ((await getAttributeByName(section + toggle, 'class', i)) !== disabledToggle) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            if ((await getAttributeByName(flag, 'aria-checked', i)) === 'true') {
                return true;
            }
            if ((await getAttributeByName(flag, 'aria-checked', i)) !== 'true') {
                return false;
            }
        }
    }
});
