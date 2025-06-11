import { checkElementTextValue, getElementArrayLength, isElementClickable, scrollIntoView } from '@fundamental-ngx/e2e';
import { footerTextArr } from './page-footer-contents';
import { PageFooterPo } from './page-footer.po';

describe('Page Footer test suite:', () => {
    const pageFooterPage = new PageFooterPo();
    const { pageFooterClickableLink, pageFooterText } = pageFooterPage;

    beforeAll(async () => {
        await pageFooterPage.open();
    }, 1);

    it('verify links are clickable', async () => {
        const linksLength = await getElementArrayLength(pageFooterClickableLink);
        for (let i = 0; i < linksLength; i++) {
            await scrollIntoView(pageFooterClickableLink, i);
            await expect(await isElementClickable(pageFooterClickableLink, i)).toBe(
                true,
                `link with index ${i} not clickable`
            );
        }
    });

    it('should check page footer text', async () => {
        await checkElementTextValue(pageFooterText, footerTextArr);
    });
});
