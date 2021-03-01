import { AvatarPo } from '../pages/avatar.po';

describe('Avatar test suite', function() {
    const avatarPage = new AvatarPo();

    beforeAll(() => {
        avatarPage.open();
    }, 1);

    it('should check visual regression for all examples', () => {
        avatarPage.saveExampleBaselineScreenshot('avatar');
        expect(avatarPage.compareWithBaseline('avatar')).toBeLessThan(1);
    });

    it('should check orientation', () => {
        avatarPage.checkRtlSwitch();
    });
});
