import { ActionBarPo } from '../pages/action-bar.po';
import {
    waitForElDisplayed
} from '../../driver/wdio';


describe('Action Bar Test Suite', function() {
    const actionBarPage = new ActionBarPo();
    const {
        actionBarBackButtonBackButton,
    } = actionBarPage;

    beforeAll(() => {
        actionBarPage.open();
        waitForElDisplayed(actionBarBackButtonBackButton);
    }, 1);

    // todo: check buttons are clickable

    describe('Check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            actionBarPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression basic', function() {
        it('should check examples visual regression', () => {
            actionBarPage.saveExampleBaselineScreenshot();
            expect(actionBarPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

