import { AvatarGroupLegacyPo } from './avatar-group-legacy.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
    checkElArrIsClickable,
    click,
    doesItExist,
    getElementSize,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Avatar test suite', () => {
    const avatarGroupPage = new AvatarGroupLegacyPo();
    const {
        firstExampleAvatar,
        usedDetailsPopup,
        secondExampleAvatar,
        usedGroupDetailsPopup,
        popoverUserAvatar,
        individualCard,
        contactLinks
    } = avatarGroupPage;

    beforeAll(async () => {
        await avatarGroupPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(avatarGroupPage.root);
        await waitForElDisplayed(avatarGroupPage.title);
    }, 1);

    it('should have details popup on click', async () => {
        await click(firstExampleAvatar);
        await waitForPresent(usedDetailsPopup);

        await expect(await doesItExist(usedDetailsPopup)).toBe(true, 'user details popup not displayed');

        await scrollIntoView(secondExampleAvatar);
        await click(secondExampleAvatar);
        await waitForPresent(usedGroupDetailsPopup);

        await expect(await doesItExist(usedGroupDetailsPopup)).toBe(true, 'group details popup not displayed');
    });

    it('should have individual details on group popup', async () => {
        await scrollIntoView(secondExampleAvatar);
        await click(secondExampleAvatar);
        await waitForPresent(usedGroupDetailsPopup);
        await click(popoverUserAvatar);

        await expect(await isElementDisplayed(individualCard)).toBe(true, 'user details popup not displayed');
    });

    it('should Individual to be smaller than group', async () => {
        const individualSize = await getElementSize(firstExampleAvatar);
        const groupSize = await getElementSize(secondExampleAvatar);

        await expect(individualSize.height).toBeLessThan(groupSize.height);
        await expect(individualSize.width).toBeLessThan(groupSize.width);
    });

    it('should check clickability contact details links', async () => {
        await click(firstExampleAvatar);
        await checkElArrIsClickable(contactLinks);
        await sendKeys('Escape');

        await scrollIntoView(secondExampleAvatar);
        await click(secondExampleAvatar);
        await waitForPresent(usedGroupDetailsPopup);
        await click(popoverUserAvatar);
        await checkElArrIsClickable(contactLinks);
    });

    it('should check orientation', async () => {
        await avatarGroupPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await avatarGroupPage.saveExampleBaselineScreenshot();
        await expect(await avatarGroupPage.compareWithBaseline()).toBeLessThan(5);
    });
});
