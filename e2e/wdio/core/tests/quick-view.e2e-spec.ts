import {
    getText,
    waitForElDisplayed,
    click, scrollIntoView, waitForClickable, refreshPage
} from '../../driver/wdio';
import { QuickViewPo } from '../pages/quick-view.po';
import { mobile, phone, email, address, companyName, popoverHeaderValue } from '../fixtures/appData/quick-view-content';

const quickViewPage: QuickViewPo = new QuickViewPo();
const {
    openDialogButton, popoverWithHeaderButton, popoverHeader, companyAddressLabel, companyPopoverNameLabel,
    popoverSendReminderButton, popoverWithoutHeaderButton, companyNameLabel, emailLabel, phoneLabel, mobileLabel,
    avatar, emailPopoverLabel, phonePopoverLabel, popoverAvatar, popoverCancelButton,
    mobilePopoverLabel, companyPopoverAddressLabel
} = new QuickViewPo();

describe('Quick view  test suite:', function() {

    beforeAll(() => {
        quickViewPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(openDialogButton);
    }, 1);

    it('should check basic quick view', () => {
        checkBasicViewInfo();
    });

    it('should check quick View in popover with heading', () => {
        scrollIntoView(popoverWithHeaderButton);
        click(popoverWithHeaderButton);
        expect(getText(popoverHeader)).toEqual(popoverHeaderValue);
        checkPopoverInfo();
    });

    it('should check quick View in popover without heading', () => {
        scrollIntoView(popoverWithoutHeaderButton);
        click(popoverWithoutHeaderButton);
        expect(popoverHeader).not.toBeDisplayed();
        checkPopoverInfo();
    });

    it('should check quick view in dialog', () => {
        click(openDialogButton);
        checkPopoverInfo();
        waitForClickable(popoverCancelButton);
        click(popoverSendReminderButton);
    });

    describe('check orientation', function() {
        it('should check RTL orientation', () => {
            quickViewPage.checkRtlSwitch();
        });
    });

    fdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            quickViewPage.saveExampleBaselineScreenshot();
            expect(quickViewPage.compareWithBaseline()).toBeLessThan(1);
        });
    });
});

function checkPopoverInfo(): void {
    waitForElDisplayed(popoverAvatar);
    waitForClickable(mobilePopoverLabel);
    waitForClickable(phonePopoverLabel);
    waitForClickable(emailPopoverLabel);
    expect(getText(mobilePopoverLabel)).toEqual(mobile);
    expect(getText(phonePopoverLabel)).toEqual(phone);
    expect(getText(emailPopoverLabel)).toEqual(email);
    expect(getText(companyPopoverNameLabel)).toEqual(companyName);
    expect(getText(companyPopoverAddressLabel)).toEqual(address);
}

function checkBasicViewInfo(): void {
    waitForElDisplayed(avatar);
    waitForClickable(mobileLabel);
    waitForClickable(phoneLabel);
    waitForClickable(emailLabel);
    expect(getText(mobileLabel)).toEqual(mobile);
    expect(getText(phoneLabel)).toEqual(phone);
    expect(getText(emailLabel)).toEqual(email);
    expect(getText(companyNameLabel)).toEqual(companyName);
    expect(getText(companyAddressLabel)).toEqual(address);
}
