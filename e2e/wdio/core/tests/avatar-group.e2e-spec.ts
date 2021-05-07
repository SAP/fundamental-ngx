import { AvatarGroupPo } from '../pages/avatar-group.po';
import { click, doesItExist, getElementSize, scrollIntoView, waitForPresent } from '../../driver/wdio';

describe('Avatar test suite', function() {
    const avatarGroupPage = new AvatarGroupPo();

    beforeAll(() => {
        avatarGroupPage.open();
    }, 1);

    it('should have details popup on click', () => {
        click(avatarGroupPage.firstExampleAvatar);
        waitForPresent(avatarGroupPage.usedDetailsPopup);
        expect(doesItExist(avatarGroupPage.usedDetailsPopup)).toBe(true);

        scrollIntoView(avatarGroupPage.secondExampleAvatar);
        click(avatarGroupPage.secondExampleAvatar);
        waitForPresent(avatarGroupPage.usedGroupDetailsPopup);
        expect(doesItExist(avatarGroupPage.usedGroupDetailsPopup)).toBe(true);
    });

    it('should Individual to be smaller than group', () => {
        const individualSize = getElementSize(avatarGroupPage.firstExampleAvatar);
        const groupSize = getElementSize(avatarGroupPage.secondExampleAvatar);

        expect(individualSize.height).toBeLessThan(groupSize.height);
        expect(individualSize.width).toBeLessThan(groupSize.width);

    });

    it('should check orientation', () => {
        avatarGroupPage.checkRtlSwitch();
    });
});
