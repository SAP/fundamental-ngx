import {ObjectMarkerPo} from '../pages/object-marker.po';
import {
    click,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    mouseHoverElement,
    refreshPage,
    scrollIntoView
} from '../../driver/wdio';
import {
    iconStatusesList,
    textDecorationAttribute,
    textDecorationValue
} from '../fixtures/appData/object-marker-content';

describe('Object marker test suite', function() {
    const objectMarkerPage = new ObjectMarkerPo();

    beforeAll(() => {
        objectMarkerPage.open();
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
            expect(getCSSPropertyByName(objectMarkerPage.clickableMarkers, textDecorationAttribute, i).value)
                .toBe(textDecorationValue);
        }
    });
});
