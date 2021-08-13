import { AvatarPo } from '../pages/avatar.po';

describe('Avatar test suite', function() {
    const avatarPage = new AvatarPo();

    beforeAll(() => {
        avatarPage.open();
    }, 1);

    xit('should check visual regression for all examples', () => {
        avatarPage.saveExampleBaselineScreenshot();
        expect(avatarPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check orientation', () => {
        avatarPage.checkRtlSwitch();
    });
});
