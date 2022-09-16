import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SplitButtonPo extends CoreBaseComponentPo {
    private url = '/split-button';

    buttonBehaviorExample = 'fd-split-button-behaviors-example ';
    iconBehaviorExample = 'fd-split-button-icons-example ';
    buttonTypesExample = 'fd-split-button-types-example ';
    buttonPragmaticalExample = 'fd-split-button-programmatical-example ';
    buttonTemplateExample = 'fd-split-button-template-example ';

    mainBtn = '.fd-button__text';
    arrowDownBtn = 'fd-split-button .fd-button:nth-of-type(2)';
    button = '.fd-button';
    splitMenu = 'div.fd-popover__popper';
    splitMenuItem = '.fd-menu__list li';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'split-button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'split-button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
