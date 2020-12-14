import { InputPo } from '../pages/input.po';
import { webDriver } from '../../driver/wdio';
import { InputGroupPo } from '../pages/input-group.po';

describe('Input Group', function() {

    const inputGroupPage = new InputGroupPo();

    beforeAll(() => {
        inputGroupPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    it('should ', () => {

    });

    // TODO Unxit after merge
    xit('should check RTL', () => {
        // inputGroupPage.checkRtlSwitch();
    });

});
