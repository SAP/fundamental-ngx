import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ResizableCardLayoutPo extends CoreBaseComponentPo {
    url = '/resizable-card-layout';

    defaultExample = 'fd-resizable-card-layout-example ';
    configExample = 'fd-resizable-card-layout-example-layoutconfig ';
    itemExample = 'fd-resizable-card-layout-example-itemconfig ';

    button = '.fd-button';

    dynamicPage = '.fd-dynamic-page';
    dynamicHeader = '.fd-dynamic-page__header';
    collapseButton = '.fd-dynamic-page__collapse-button';
    pinButton = '.fd-dynamic-page__pin-button';

    card = '.fd-resizable-card-layout__draw-transition';
    resizableCard = '.fd-resizable-card-layout__item--border-display ';
    horizontalResize = '.fd-resizable-card-layout__resize--horizontal';
    verticalResize = '.fd-resizable-card-layout__resize--vertical';
    resizeIcon = 'fd-resizable-card-layout__icon-wrapper';

    closeButton = this.button + '[title="Close"]';
    exitScreen = this.button + '[title="Exit Fullscreen"]';
    resizeButton = this.button + '[title="Resize"]';
    rejectButton = this.button + '[title="Reject"]';
    acceptButton = this.button + '[title="Accept"]';

    listItem = this.resizableCard + '.fd-list__item';
    collapsibleArea = '.fd-dynamic-page__collapsible-header';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'resizable-card-layout'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'resizable-card-layout'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
