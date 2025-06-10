import {
    checkElArrIsClickable,
    getElementAriaLabel,
    getElementArrayLength,
    getElementTitle,
    waitForPresent
} from '@fundamental-ngx/e2e';
import { iconStatusesList } from './object-marker-contents';
import { ObjectMarkerPo } from './object-marker.po';

describe('Object marker test suite', () => {
    const objectMarkerPage = new ObjectMarkerPo();
    const { marker, iconOnlyMarkers } = objectMarkerPage;

    beforeAll(async () => {
        await objectMarkerPage.open();
        await waitForPresent(marker);
    }, 1);

    it('Verify each marker is clickable', async () => {
        await checkElArrIsClickable(marker);
    });

    it('Verify technical statuses', async () => {
        const objectMarkerIconCount = await getElementArrayLength(iconOnlyMarkers);
        for (let i = 0; i < objectMarkerIconCount; i++) {
            await expect(await getElementTitle(iconOnlyMarkers, i)).toBe(iconStatusesList[i][0]);
            await expect(await getElementAriaLabel(iconOnlyMarkers, i)).toBe(iconStatusesList[i][1]);
        }
    });

    it('Verify RTL and LTR orientation', async () => {
        await objectMarkerPage.checkRtlSwitch();
    });
});
