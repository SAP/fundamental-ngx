import { InfoLabelPo } from '../pages/info-label.po';

xdescribe('Info Label component test suite', () => {
    const infoLabelPage = new InfoLabelPo();

    beforeEach(() => {
        infoLabelPage.open();
    }, 2);

    it('should check LTR and RTL orientation', () => {
        infoLabelPage.checkRtlSwitch();
    });

    it('should check examples basic visual regression', () => {
        infoLabelPage.saveExampleBaselineScreenshot();
        expect(infoLabelPage.compareWithBaseline()).toBeLessThan(5);
    });

});
