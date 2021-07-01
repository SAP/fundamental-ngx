import { AvatarGroupPo } from '../pages/avatar-group.po';
import { click, doesItExist, getElementSize, isElementDisplayed, refreshPage, scrollIntoView, waitForPresent } from '../../driver/wdio';

describe('Avatar test suite', function() {
    const avatarGroupPage = new AvatarGroupPo();
    const {
        firstExampleAvatar,
        usedDetailsPopup,
        secondExampleAvatar,
        usedGroupDetailsPopup,
        popoverUserAvatar,
        individualCard
    } = avatarGroupPage;

    beforeAll(() => {
        avatarGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(avatarGroupPage.title);
    }, 1);

    it('should have details popup on click', () => {
        click(firstExampleAvatar);
        waitForPresent(usedDetailsPopup);

        expect(doesItExist(usedDetailsPopup)).toBe(true, 'user details popup not displayed');

        scrollIntoView(secondExampleAvatar);
        click(secondExampleAvatar);
        waitForPresent(usedGroupDetailsPopup);

        expect(doesItExist(usedGroupDetailsPopup)).toBe(true, 'group details popup not displayed');
    });

    it('should have individual details on group popup', () => {
        scrollIntoView(secondExampleAvatar);
        click(secondExampleAvatar);
        waitForPresent(usedGroupDetailsPopup);
        click(popoverUserAvatar);

        expect(isElementDisplayed(individualCard)).toBe(true, 'user details popup not displayed');
    });

    it('should Individual to be smaller than group', () => {
        const individualSize = getElementSize(firstExampleAvatar);
        const groupSize = getElementSize(secondExampleAvatar);

        expect(individualSize.height).toBeLessThan(groupSize.height);
        expect(individualSize.width).toBeLessThan(groupSize.width);
    });

    it('should check orientation', () => {
        avatarGroupPage.checkRtlSwitch();
    });
});
