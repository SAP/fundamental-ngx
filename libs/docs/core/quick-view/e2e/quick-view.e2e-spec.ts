import {
    click,
    getText,
    refreshPage,
    scrollIntoView,
    waitForClickable,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { QuickViewPo } from './quick-view.po';
import { address, companyName, email, mobile, phone, popoverHeaderValue } from './quick-view-content';

const quickViewPage: QuickViewPo = new QuickViewPo();
const {
    openDialogButton,
    popoverWithHeaderButton,
    popoverHeader,
    companyAddressLabel,
    companyPopoverNameLabel,
    popoverSendReminderButton,
    popoverWithoutHeaderButton,
    companyNameLabel,
    emailLabel,
    phoneLabel,
    mobileLabel,
    avatar,
    emailPopoverLabel,
    phonePopoverLabel,
    popoverAvatar,
    popoverCancelButton,
    mobilePopoverLabel,
    companyPopoverAddressLabel
} = new QuickViewPo();

describe('Quick view  test suite:', () => {
    beforeAll(async () => {
        await quickViewPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(quickViewPage.root);
        await waitForElDisplayed(quickViewPage.title);
    }, 1);

    it('should check basic quick view', async () => {
        await checkBasicViewInfo();
    });

    it('should check quick View in popover with heading', async () => {
        await scrollIntoView(popoverWithHeaderButton);
        await click(popoverWithHeaderButton);
        await expect(await getText(popoverHeader)).toEqual(popoverHeaderValue);
        await checkPopoverInfo();
    });

    it('should check quick View in popover without heading', async () => {
        await scrollIntoView(popoverWithoutHeaderButton);
        await click(popoverWithoutHeaderButton);

        const isDisplayed = await $(popoverHeader).isDisplayed();
        await expect(isDisplayed).toBeFalsy();
        await checkPopoverInfo();
    });

    it('should check quick view in dialog', async () => {
        await click(openDialogButton);
        await checkPopoverInfo();
        await waitForClickable(popoverCancelButton);
        await click(popoverSendReminderButton);
    });

    describe('check orientation', () => {
        it('should check RTL orientation', async () => {
            await quickViewPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await quickViewPage.saveExampleBaselineScreenshot();
            await expect(await quickViewPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

async function checkPopoverInfo(): Promise<void> {
    await waitForElDisplayed(popoverAvatar);
    await waitForClickable(mobilePopoverLabel);
    await waitForClickable(phonePopoverLabel);
    await waitForClickable(emailPopoverLabel);
    await expect(await getText(mobilePopoverLabel)).toEqual(mobile);
    await expect(await getText(phonePopoverLabel)).toEqual(phone);
    await expect(await getText(emailPopoverLabel)).toEqual(email);
    await expect(await getText(companyPopoverNameLabel)).toEqual(companyName);
    await expect(await getText(companyPopoverAddressLabel)).toEqual(address);
}

async function checkBasicViewInfo(): Promise<void> {
    await waitForElDisplayed(avatar);
    await waitForClickable(mobileLabel);
    await waitForClickable(phoneLabel);
    await waitForClickable(emailLabel);
    await expect(await getText(mobileLabel)).toEqual(mobile);
    await expect(await getText(phoneLabel)).toEqual(phone);
    await expect(await getText(emailLabel)).toEqual(email);
    await expect(await getText(companyNameLabel)).toEqual(companyName);
    await expect(await getText(companyAddressLabel)).toEqual(address);
}
