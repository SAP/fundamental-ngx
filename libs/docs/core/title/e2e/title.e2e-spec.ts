import { TitlePo } from './title.po';
import {
    getAttributeByName,
    getElementClass,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { titleLevels, titleLevelsReversed } from './title-contents';

describe('Wizard component test', () => {
    const titlePage = new TitlePo();
    const { title, semanticExample, visualExample, ellisionExample, wrappingExample, paragraphsBlock } = titlePage;

    beforeAll(() => {
        titlePage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(titlePage.root);
        waitForElDisplayed(titlePage.title);
    }, 2);

    it('should check titles levels from lower to higher in semantic example', () => {
        checkTitlesLevels(semanticExample);
    });

    it('should check titles levels from lower to higher in visual example', () => {
        checkTitlesLevels(visualExample, titleLevelsReversed);
    });

    it('should check titles levels from lower to higher in ellision example', () => {
        checkTitlesLevels(ellisionExample);
    });

    it('should check titles levels from lower to higher in wrapping example', () => {
        checkTitlesLevels(wrappingExample);
    });

    it('should check that long text elided', () => {
        expect(getAttributeByName(ellisionExample + paragraphsBlock, 'style')).toContain('width:');
    });

    it('should check wrap text in wrapping example', () => {
        expect(getAttributeByName(wrappingExample + paragraphsBlock, 'style')).toContain('width:');
        for (let i = 0; i < 6; i++) {
            expect(getElementClass(wrappingExample + title, i)).toContain('--wrap');
        }
    });

    it('should check RTL mode', () => {
        titlePage.checkRtlSwitch();
    });

    function checkTitlesLevels(section: string, lvls: string[] = titleLevels): void {
        for (let i = 0; i < 6; i++) {
            expect(getElementClass(section + title, i)).toContain(lvls[i]);
        }
    }
});
