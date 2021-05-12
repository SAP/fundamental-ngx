import { ObjectMarkerPo } from '../pages/object-marker.po';
import {
    getAttributeByName,
    getCSSPropertyByName, getElementAriaLabel,
    getElementArrayLength, getElementTitle,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    iconStatusesList,
    textDecorationAttribute,
    textDecorationValues,
} from '../fixtures/appData/object-marker-contents';
import { checkElArrIsClickable } from '../../helper/assertion-helper';

describe('Object marker test suite', function() {
    const objectMarkerPage = new ObjectMarkerPo();
    const {
        marker,
        iconOnlyMarkers,
        clickableMarkers
    } = objectMarkerPage;

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

    it('Verify marker hover state', () => {
        const objectMarkerCount = getElementArrayLength(clickableMarkers);
        for (let i = 0; i < objectMarkerCount; i++) {
            scrollIntoView(clickableMarkers, i);
            mouseHoverElement(clickableMarkers, i);
            expect(textDecorationValues).toContain(getCSSPropertyByName(clickableMarkers, textDecorationAttribute, i).value);
        }
    });

    it('Verify RTL and LTR orientation', () => {
        objectMarkerPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        refreshPage();
        waitForPresent(marker);
        objectMarkerPage.saveExampleBaselineScreenshot();
        expect(objectMarkerPage.compareWithBaseline()).toBeLessThan(3);
    });
});
