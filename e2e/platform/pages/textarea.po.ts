import { BaseComponentPo } from './base-component.po';
import { $ } from 'protractor';
import { waitForVisible } from '../helpers/common-helper';

export class TextareaPo extends BaseComponentPo {
    url = '/textarea';
    root = $('#page-content');





    async open(): Promise<void> {
        await  super.open(this.url);
        await waitForVisible(await this.root);
    }
}
