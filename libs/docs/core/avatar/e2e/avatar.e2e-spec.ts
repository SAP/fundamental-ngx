// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { getElementArrayLength, getElementClass, getText, isElementDisplayed } from '../../../../../e2e';
import { AvatarPo } from './avatar.po';

describe('Avatar test suite', () => {
    const avatarPage = new AvatarPo();
    const {
        avatarInitials,
        circleAvatar,
        borderAvatar,
        zoomAvatar,
        zoomIcon,
        avatarTile,
        placeholderAvatar,
        transparentAvatar,
        colorAvatar
    } = avatarPage;
    beforeAll(() => {
        avatarPage.open();
    }, 1);

    it('should check color avatars', () => {
        for (let i = 0; i < getElementArrayLength(colorAvatar); i++) {
            expect(getElementClass(colorAvatar, i)).toContain('accent-color');
        }
    });

    it('should check placeholder avatars', () => {
        for (let i = 0; i < getElementArrayLength(transparentAvatar); i++) {
            expect(getElementClass(transparentAvatar, i)).toContain('transparent');
        }
    });

    it('should check placeholder avatars', () => {
        for (let i = 0; i < getElementArrayLength(placeholderAvatar); i++) {
            expect(getElementClass(placeholderAvatar, i)).toContain('placeholder');
        }
    });

    it('should check tile avatars', () => {
        for (let i = 0; i < getElementArrayLength(avatarTile); i++) {
            expect(getElementClass(avatarTile, i)).toContain('tile');
        }
    });

    it('should check that avatar in zoom example have zoom icon inside', () => {
        for (let i = 0; i < getElementArrayLength(zoomAvatar); i++) {
            expect(isElementDisplayed(zoomAvatar + zoomIcon)).toBe(true);
        }
    });

    it('should check border avatars', () => {
        for (let i = 0; i < getElementArrayLength(borderAvatar); i++) {
            expect(getElementClass(borderAvatar, i)).toContain('border');
        }
    });

    it('should check circle avatars', () => {
        for (let i = 0; i < getElementArrayLength(circleAvatar); i++) {
            expect(getElementClass(circleAvatar, i)).toContain('circle');
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/7025
    xit('should check that avatar with 1 char as initial is present', () => {
        let j, k, n;
        for (let i = 0; i < getElementArrayLength(avatarInitials); i++) {
            if (getText(avatarInitials, i).length === 1) {
                j = 1;
            }
            if (getText(avatarInitials, i).length === 2) {
                k = 2;
            }
            if (getText(avatarInitials, i).length === 3) {
                n = 3;
            }
        }
        expect(j).toBe(1);
        expect(k).toBe(2);
        expect(n).toBe(3);
    });

    xit('should check visual regression for all examples', () => {
        avatarPage.saveExampleBaselineScreenshot();
        expect(avatarPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check orientation', () => {
        avatarPage.checkRtlSwitch();
    });
});
