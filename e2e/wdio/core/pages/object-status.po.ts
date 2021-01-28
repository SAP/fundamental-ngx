import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ObjectStatusPo extends CoreBaseComponentPo {
    private url = '/object-status';
    root = '#page-content';
    pageHeader = 'app-object-status-header h1';

    icons = '.fd-object-status__icon';
    text = '.fd-object-status__text';
    statusAttr = '.fd-object-status';

    iconExamples = 'fd-object-status-default-example ';
    textExamples = 'fd-object-status-text-example ';
    textAndIconExamples = 'fd-object-status-numeric-icon-example ';
    colorsExamples = 'fd-object-status-generic-text-example ';
    clickableExamples = 'fd-object-status-clickable-and-icon-example ';
    invertedExamples = 'fd-object-status-inverted-example ';
    invertedColorExamples = 'fd-object-status-inverted-generic-text-example ';
    largeExamples = 'fd-object-status-object-status-large-example ';

    objIcons = (exampleBlock: string) => {
        return exampleBlock + this.icons;
    };

    objText = (exampleBlock: string) => {
        return exampleBlock + this.text;
    };

    objStatus = (exampleBlock: string) => {
        return exampleBlock + this.statusAttr;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.pageHeader);
    }
}
