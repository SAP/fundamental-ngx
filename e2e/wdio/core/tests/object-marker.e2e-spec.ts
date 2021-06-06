import { ObjectMarkerPo } from '../pages/object-marker.po';
import {
    click,
    getCSSPropertyByName, getElementAriaLabel,
    getElementArrayLength, getElementTitle,
    mouseHoverElement,
    refreshPage,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';
import {
    iconStatusesList,
    textDecorationAttribute,
    textDecorationValues
} from '../fixtures/appData/object-marker-content';

describe('Object marker test suite', function() {
    const objectMarkerPage = new ObjectMarkerPo();
    const {
        marker,
        iconOnlyMarkers,
        clickableMarkers
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

    it('Verify marker hover state', () => {
        const arr = getElementArrayLength(clickableMarkers);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(clickableMarkers, i);
            mouseHoverElement(clickableMarkers, i);
            expect(textDecorationValues).toContain(getCSSPropertyByName(clickableMarkers, textDecorationAttribute, i).value);
        }
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objectMarkerPage.saveExampleBaselineScreenshot();
            expect(objectMarkerPage.compareWithBaseline()).toBeLessThan(3);
        });
    });
});
