import {ObjectMarkerPo} from '../pages/object-marker.po';
import {
    click,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
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

    beforeAll(() => {
        objectMarkerPage.open();
        waitForPresent(objectMarkerPage.marker);
    });

    afterEach(() => {
        refreshPage();
    });

    it('Verify each marker is clickable', () => {
        const arr = getElementArrayLength(objectMarkerPage.marker);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(objectMarkerPage.marker, i);
            click(objectMarkerPage.marker, i);
        }
    });

    it('Verify technical statuses', () => {
        const arr = getElementArrayLength(objectMarkerPage.iconOnlyMarkers);
        for (let i = 0; i < arr; i++) {
            expect(getAttributeByName(objectMarkerPage.iconOnlyMarkers, 'title', i)).toBe(iconStatusesList[i][0]);
            expect(getAttributeByName(objectMarkerPage.iconOnlyMarkers, 'aria-label', i)).toBe(iconStatusesList[i][1]);
        }
    });

    it('Verify RTL and LTR orientation', () => {
        objectMarkerPage.checkRtlSwitch();
    });

    it('Verify marker hover state', () => {
        const arr = getElementArrayLength(objectMarkerPage.clickableMarkers);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(objectMarkerPage.clickableMarkers, i);
            mouseHoverElement(objectMarkerPage.clickableMarkers, i);
            expect(textDecorationValues).toContain(getCSSPropertyByName(objectMarkerPage.clickableMarkers, textDecorationAttribute, i).value);
        }
    });
});
