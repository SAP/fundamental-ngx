import { ObjectMarkerPo } from './object-marker.po';
import {
    checkElArrIsClickable,
    getElementAriaLabel,
    getElementArrayLength,
    getElementTitle,
    refreshPage,
    waitForPresent
} from '../../../../../e2e';
import { iconStatusesList } from './object-marker-contents';

describe('Object marker test suite', () => {
    const objectMarkerPage = new ObjectMarkerPo();
    const { marker, iconOnlyMarkers } = objectMarkerPage;

    beforeAll(() => {
        objectMarkerPage.open();
        waitForPresent(marker);
    }, 1);

    it('Verify each marker is clickable', () => {
        checkElArrIsClickable(marker);
    });

    it('Verify technical statuses', () => {
        const objectMarkerIconCount = getElementArrayLength(iconOnlyMarkers);
        for (let i = 0; i < objectMarkerIconCount; i++) {
            expect(getElementTitle(iconOnlyMarkers, i)).toBe(iconStatusesList[i][0]);
            expect(getElementAriaLabel(iconOnlyMarkers, i)).toBe(iconStatusesList[i][1]);
        }
    });

    it('Verify RTL and LTR orientation', () => {
        objectMarkerPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        refreshPage();
        waitForPresent(marker);
        objectMarkerPage.saveExampleBaselineScreenshot();
        expect(objectMarkerPage.compareWithBaseline()).toBeLessThan(5);
    });
});
