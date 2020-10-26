import { BaseComponentPo } from './base-component.po';
import { waitForVisible } from '../helper/helper';
import { $, $$ } from 'protractor';

export class PanelPo extends BaseComponentPo {

    url = '/panel';
    root = $('#page-content');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');

    expandablePanelRoot = $('#panel-id');
    expandablePanelBtn = this.expandablePanelRoot.$('button');
    expandablePanelTitle = this.expandablePanelRoot.$('h5');
    expandablePanelContent = this.expandablePanelRoot.$('.fd-panel__content');

    fixedPanelRoot = $$('#fixed-panel-id').get(0);
    fixedPanelBtn = this.fixedPanelRoot.$('button');

    compactPanelRoot = $('#compact-panel-id');
    compactPanelBtn = this.compactPanelRoot.$('button');

    fixedHeightPanelRoot = $$('#fixed-panel-id').get(1);
    fixedHeightPanelContentRegion = this.fixedHeightPanelRoot.$('[role="region"]');
    fixedHeightPanelContent = this.fixedHeightPanelRoot.$('fdp-panel-content');

    actionPanelRoot = $('#panel-actions-id');
    actionPanelEditBtn = this.actionPanelRoot.$$('button.fd-ellipsis').get(0);
    actionPanelDeleteBtn = this.actionPanelRoot.$$('button.fd-ellipsis').get(1);

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    }
}
