import { ObjectMarkerPo } from '../pages/object-marker.po';
import {
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    ariaLabelAttribute,
    iconStatusesList,
    textDecorationAttribute,
    textDecorationValues,
    titleAttribute
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
            expect(getAttributeByName(iconOnlyMarkers, titleAttribute, i)).toBe(iconStatusesList[i][0]);
            expect(getAttributeByName(iconOnlyMarkers, ariaLabelAttribute, i)).toBe(iconStatusesList[i][1]);
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
