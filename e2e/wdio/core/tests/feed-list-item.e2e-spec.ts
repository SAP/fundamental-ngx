import { FeedListItemPo } from '../pages/feed-list-item.po';
import {
    click, getAlertText,
    refreshPage,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';
import { alertText } from '../fixtures/appData/feed-list-item-contents';

describe('Feed list item test suite:', function() {

    const feedListItemPage = new FeedListItemPo();
    const {
        paragraphs,
        actionSettingsButton,
    } = feedListItemPage;

    beforeAll(() => {
        feedListItemPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(paragraphs);
    }, 1);

    // todo: check links are clickable

    it('verify alert text', () => {
        scrollIntoView(actionSettingsButton);
        click(actionSettingsButton);
        expect(alertText).toContain(getAlertText());
    });

    xdescribe('Check visual regression', function() {
        it('should check basic visual regression', () => {
            feedListItemPage.saveExampleBaselineScreenshot();
            expect(feedListItemPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});


