import {
    click,
    elementDisplayed,
    getAttributeByName,
    getElementArrayLength,
    refreshPage,
    waitForPresent
} from '../../driver/wdio';
import { switchPo } from '../../core/pages/switch.po';

describe('Split-button test suite', () => {

    const switchPage = new switchPo();
    const {
        switchSizes, switchSizesExample, toggle,
        toggleInput, switchBindingExample, switchFormsExample, semanticswitchExample,
        playGroundSwitchExample, disabledToggle, acceptIcon, declineIcon, semanticSwitch,
        switchBtn, checkboxes, disabledAndCompactToggle
    } = switchPage;

    beforeAll(() => {
        switchPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(switchSizes);
    }, 1);

   xit('Should check turn on/ Turn off switch toggle', () => {
        checkSwitchingWork(switchSizesExample)
        checkSwitchingWork(switchFormsExample)
        checkSwitchingWork(semanticswitchExample)
        checkSwitchingWork(switchBindingExample)
        checkSwitchingWork(playGroundSwitchExample)
    });

    xit('Should check icons on semantic toggles', () => {
        for (let i = 0; i < 2; i++) {
            expect(elementDisplayed(declineIcon, i)).toEqual(true)
            click(semanticSwitch, i)
            expect(elementDisplayed(declineIcon, i)).toEqual(false)
            expect(elementDisplayed(acceptIcon, i)).toEqual(true)
        }
    });

    xit('Should check toggle state changes by click on buttons', () => {
        click(switchBtn, 1)
        expect(checkToggleState(switchBindingExample)).toEqual(true)
        click(switchBtn, 1)
        expect(checkToggleState(switchBindingExample)).toEqual(false)
        click(switchBtn, 0)
        expect(checkToggleState(switchBindingExample)).toEqual(true)
        expect(checkToggleState(switchBindingExample)).toEqual(true)
    });

    it('should check switch toggle manage by checkboxes', () => {
        click(checkboxes, 1)
        expect(checkToggleState(playGroundSwitchExample)).toEqual(true)
        
        click(checkboxes, 0) 
        expect(getAttributeByName(playGroundSwitchExample + toggle, 'class')).toEqual(disabledAndCompactToggle)
        click(checkboxes, 2)
        expect(getAttributeByName(playGroundSwitchExample + toggle, 'class')).toEqual(disabledToggle)
    });

    xit('should check examples visual regression', () => {
        switchPage.saveExampleBaselineScreenshot();
        expect(switchPage.compareWithBaseline()).toBeLessThan(1);
    });


    function checkSwitchingWork(section: string, length: number = getElementArrayLength(section + toggle),
        switchToggle: string = section + toggle, flag: string = section + toggleInput): void {
        for (let i = 0; i < length; i++) {
            if (getAttributeByName(switchToggle, 'class', i) != disabledToggle) {
                if (getAttributeByName(flag, 'aria-checked', i) == 'true') {
                    click(switchToggle, i)
                    expect(checkToggleState(section, i)).toEqual(false)
                }
                else {
                    click(switchToggle, i)
                    expect(checkToggleState(section, i)).toEqual(true)
                }
            }
        }
    }
    function checkToggleState(section: string,  i: number = 0, flag: string = section + toggleInput): boolean {
        if (getAttributeByName(section + toggle, 'class', i) != disabledToggle){
            if (getAttributeByName(flag, 'aria-checked', i) == 'true')
                return true;
            else return false;
        }
    }

});
