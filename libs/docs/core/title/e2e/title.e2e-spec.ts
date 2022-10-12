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

    beforeAll(async () => {
        await titlePage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(titlePage.root);
        await waitForElDisplayed(titlePage.title);
    }, 2);

    it('should check titles levels from lower to higher in semantic example', async () => {
        await checkTitlesLevels(semanticExample);
    });

    it('should check titles levels from lower to higher in visual example', async () => {
        await checkTitlesLevels(visualExample, titleLevelsReversed);
    });

    it('should check titles levels from lower to higher in ellision example', async () => {
        await checkTitlesLevels(ellisionExample);
    });

    it('should check titles levels from lower to higher in wrapping example', async () => {
        await checkTitlesLevels(wrappingExample);
    });

    it('should check that long text elided', async () => {
        await expect(await getAttributeByName(ellisionExample + paragraphsBlock, 'style')).toContain('width:');
    });

    it('should check wrap text in wrapping example', async () => {
        await expect(await getAttributeByName(wrappingExample + paragraphsBlock, 'style')).toContain('width:');
        for (let i = 0; i < 6; i++) {
            await expect(await getElementClass(wrappingExample + title, i)).toContain('--wrap');
        }
    });

    it('should check RTL mode', async () => {
        await titlePage.checkRtlSwitch();
    });

    async function checkTitlesLevels(section: string, lvls: string[] = titleLevels): Promise<void> {
        for (let i = 0; i < 6; i++) {
            await expect(await getElementClass(section + title, i)).toContain(lvls[i]);
        }
    }
});
