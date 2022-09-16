import { ObjectMarkerPo } from './object-marker.po';
import {
    click,
    getElementAriaLabel,
    getElementArrayLength,
    getElementClass,
    getElementTitle,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { iconStatusesList } from './object-marker-content';

describe('Object marker test suite', () => {
    const objectMarkerPage = new ObjectMarkerPo();
    const { marker, iconOnlyMarkers, objectMarkerClickableExample, icon, link } = objectMarkerPage;

    beforeAll(() => {
        objectMarkerPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(objectMarkerPage.root);
        waitForElDisplayed(objectMarkerPage.title);
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

    it('Verify changing marker', () => {
        scrollIntoView(objectMarkerClickableExample);
        expect(getElementClass(objectMarkerClickableExample + icon, 1)).toContain('sap-icon--private');

        click(objectMarkerClickableExample + link, 1);
        expect(getElementClass(objectMarkerClickableExample + icon, 1)).toContain('sap-icon--add-favorite');
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', () => {
            objectMarkerPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            objectMarkerPage.saveExampleBaselineScreenshot();
            expect(objectMarkerPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
