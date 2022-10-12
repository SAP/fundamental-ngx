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

    beforeAll(async () => {
        await objectMarkerPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(objectMarkerPage.root);
        await waitForElDisplayed(objectMarkerPage.title);
    }, 1);

    it('Verify each marker is clickable', async () => {
        const arr = await getElementArrayLength(marker);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(marker, i);
            await click(marker, i);
        }
    });

    it('Verify technical statuses', async () => {
        const arr = await getElementArrayLength(iconOnlyMarkers);
        for (let i = 0; i < arr; i++) {
            await expect(await getElementTitle(iconOnlyMarkers, i)).toBe(iconStatusesList[i][0]);
            await expect(await getElementAriaLabel(iconOnlyMarkers, i)).toBe(iconStatusesList[i][1]);
        }
    });

    it('Verify changing marker', async () => {
        await scrollIntoView(objectMarkerClickableExample);
        await expect(await getElementClass(objectMarkerClickableExample + icon, 1)).toContain('sap-icon--private');

        await click(objectMarkerClickableExample + link, 1);
        await expect(await getElementClass(objectMarkerClickableExample + icon, 1)).toContain('sap-icon--add-favorite');
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', async () => {
            await objectMarkerPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await objectMarkerPage.saveExampleBaselineScreenshot();
            await expect(await objectMarkerPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
