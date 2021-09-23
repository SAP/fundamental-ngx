import { BaseComponent } from './cy-core-base-component.po';

export class ActionBarPo extends BaseComponent {
    pageUrl = '/action-bar';

    arrowButton = '[aria-label="back"]';
    cancelButton = '.fd-button--standard.fd-button--compact';
    saveButton = '.fd-button--emphasized.fd-button--compact';
    moreButton = '[aria-label="More"]';
    menuItem = 'div.fd-menu__link';
    header = '.fd-title.fd-title--h3';
    description = '.fd-action-bar__description';

    navigateTo(): void {
        super.navigateTo(this.pageUrl);
    }
}
