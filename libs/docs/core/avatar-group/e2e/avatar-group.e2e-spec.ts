import { AvatarGroupPo } from './avatar-group.po';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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
    const avatarGroupPage = new AvatarGroupPo();
    const {
        firstExampleAvatar,
        usedDetailsPopup,
        secondExampleAvatar,
        usedGroupDetailsPopup,
        popoverUserAvatar,
        individualCard,
        contactLinks
    } = avatarGroupPage;

    beforeAll(() => {
        avatarGroupPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(avatarGroupPage.root);
        waitForElDisplayed(avatarGroupPage.title);
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

    it('should check clickability contact details links', () => {
        click(firstExampleAvatar);
        checkElArrIsClickable(contactLinks);
        sendKeys('Escape');

        scrollIntoView(secondExampleAvatar);
        click(secondExampleAvatar);
        waitForPresent(usedGroupDetailsPopup);
        click(popoverUserAvatar);
        checkElArrIsClickable(contactLinks);
    });

    it('should check orientation', () => {
        avatarGroupPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        avatarGroupPage.saveExampleBaselineScreenshot();
        expect(avatarGroupPage.compareWithBaseline()).toBeLessThan(5);
    });
});
