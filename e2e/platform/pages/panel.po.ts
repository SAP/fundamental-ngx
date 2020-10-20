import { BaseComponentPo } from './base-component.po';
import { waitForVisible } from '../helpers/common-helper';
import { $ } from 'protractor';

export class PanelPo extends BaseComponentPo {

    url = '/panel';
    root = $('#page-content');

    expandablePanelRoot = $('#panel-id');
    expandablePanelBtn = this.expandablePanelRoot.$('button');
    expandablePanelTitle = this.expandablePanelRoot.$('h5');
    expandablePanelContent = this.expandablePanelRoot.$('.fd-panel__content');




    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    }
}
