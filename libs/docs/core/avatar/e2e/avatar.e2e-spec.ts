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
    beforeAll(async () => {
        await avatarPage.open();
    }, 1);

    it('should check color avatars', async () => {
        for (let i = 0; i < (await getElementArrayLength(colorAvatar)); i++) {
            await expect(await getElementClass(colorAvatar, i)).toContain('accent-color');
        }
    });

    it('should check placeholder avatars', async () => {
        for (let i = 0; i < (await getElementArrayLength(transparentAvatar)); i++) {
            await expect(await getElementClass(transparentAvatar, i)).toContain('transparent');
        }
    });

    it('should check placeholder avatars', async () => {
        for (let i = 0; i < (await getElementArrayLength(placeholderAvatar)); i++) {
            await expect(await getElementClass(placeholderAvatar, i)).toContain('placeholder');
        }
    });

    it('should check tile avatars', async () => {
        for (let i = 0; i < (await getElementArrayLength(avatarTile)); i++) {
            await expect(await getElementClass(avatarTile, i)).toContain('tile');
        }
    });

    it('should check that avatar in zoom example have zoom icon inside', async () => {
        for (let i = 0; i < (await getElementArrayLength(zoomAvatar)); i++) {
            await expect(await isElementDisplayed(zoomAvatar + zoomIcon)).toBe(true);
        }
    });

    it('should check border avatars', async () => {
        for (let i = 0; i < (await getElementArrayLength(borderAvatar)); i++) {
            await expect(await getElementClass(borderAvatar, i)).toContain('border');
        }
    });

    it('should check circle avatars', async () => {
        for (let i = 0; i < (await getElementArrayLength(circleAvatar)); i++) {
            await expect(await getElementClass(circleAvatar, i)).toContain('circle');
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/7025
    xit('should check that avatar with 1 char as initial is present', async () => {
        let j, k, n;
        for (let i = 0; i < (await getElementArrayLength(avatarInitials)); i++) {
            if ((await getText(avatarInitials, i)).length === 1) {
                j = 1;
            }
            if ((await getText(avatarInitials, i)).length === 2) {
                k = 2;
            }
            if ((await getText(avatarInitials, i)).length === 3) {
                n = 3;
            }
        }
        await expect(j).toBe(1);
        await expect(k).toBe(2);
        await expect(n).toBe(3);
    });

    xit('should check visual regression for all examples', async () => {
        await avatarPage.saveExampleBaselineScreenshot();
        await expect(await avatarPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check orientation', async () => {
        await avatarPage.checkRtlSwitch();
    });
});
