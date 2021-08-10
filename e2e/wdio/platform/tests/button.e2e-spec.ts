import { ButtonPo } from '../pages/button.po';
import {
    getAttributeByName,
    getElementArrayLength,
    getElementTitle,
    isElementClickable,
    scrollIntoView,
} from '../../driver/wdio';

describe('Button test suite:', function() {
    const buttonPage = new ButtonPo();
    const {
        typeButtons, sizeButtons, iconButtons, stateButton, disableStateButtons, truncatedButton  } = buttonPage;

    beforeAll(() => {
        buttonPage.open();
    }, 1);
    
        it('verify clickable buttons types', () => {
            const typeButtonsLength = getElementArrayLength(typeButtons);
            for (let i = 0; i < typeButtonsLength; i++) {
                scrollIntoView(typeButtons, i);
                expect(isElementClickable(typeButtons, i)).toBe(true, 'type button with index ${i} not clickable');
            }
        });

        it('verify clickable size buttons', () => {
            const sizeButtonsLength = getElementArrayLength(sizeButtons);
            for (let i = 0; i < sizeButtonsLength; i++) {
                scrollIntoView(sizeButtons, i);
                expect(isElementClickable(sizeButtons, i)).toBe(true, 'size button with index ${i} not clickable');
            }
        });

        it('verify buttons with icons', () => {
            const iconButtonsLength = getElementArrayLength(iconButtons);
            for (let i = 0; i < iconButtonsLength; i++) {
                scrollIntoView(iconButtons, i);
                expect(isElementClickable(iconButtons, i)).toBe(true, 'icon button with index ${i} not clickable');
            }
        });

        it('verify state buttons', () => {
            scrollIntoView(stateButton);
            expect(isElementClickable(stateButton)).toBe(true, 'state button with index not clickable');
        });

        it('verify disable state buttons', () => {
            expect(getAttributeByName(disableStateButtons, 'aria-disabled')).toEqual('true');
            expect(getAttributeByName(disableStateButtons, 'disabled', 1)).toEqual('true');
        });

        it('should check truncated text button', () => {
            expect(getElementTitle(truncatedButton)).toContain('Looooooooooong Text Button');
            expect(isElementClickable(truncatedButton)).toBe(true);
    });

    describe('Check visual regression basic', function() {

        it('should check examples visual regression', () => {
            buttonPage.saveExampleBaselineScreenshot();
            expect(buttonPage.compareWithBaseline()).toBeLessThan(5);
        });

        describe('Check orientation', function() {
            it('Verify RTL and LTR orientation', () => {
                buttonPage.checkRtlSwitch();
            });
        });
    });
});