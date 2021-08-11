import { ObjectMarkerPo } from '../pages/object-marker.po';
import {
    click,
    getElementAriaLabel,
    getElementArrayLength,
    getElementTitle,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    iconStatusesList,
} from '../fixtures/appData/object-marker-content';

describe('Object marker test suite', function() {
    const objectMarkerPage = new ObjectMarkerPo();
    const {
        marker,
        iconOnlyMarkers,
    } = objectMarkerPage;

    beforeAll(() => {
        objectMarkerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(marker);
    }, 1);

    it('Verify each marker is clickable', () => {
        const arr = getElementArrayLength(marker);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(marker, i);
            click(marker, i);
        }
    });

    it('Verify technical statuses', () => {
        const arr = getElementArrayLength(iconOnlyMarkers);
        for (let i = 0; i < arr; i++) {
            expect(getElementTitle(iconOnlyMarkers, i)).toBe(iconStatusesList[i][0]);
            expect(getElementAriaLabel(iconOnlyMarkers, i)).toBe(iconStatusesList[i][1]);
        }
    });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            objectMarkerPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objectMarkerPage.saveExampleBaselineScreenshot();
            expect(objectMarkerPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
