import { $, $$ } from 'protractor';
import { waitForVisible } from '../helper/helper';
import { BaseComponentPo } from './base-component.po';

export class SwitchPo extends BaseComponentPo {
     private url = '/switch';

    root = $('#page-content');
    defaultSwitch = $('#default-switch-input');
    defaultSwitchSize = $('#default-switch .fd-switch');
    defaultSwitchHandel = $('#default-switch .fd-switch__handle');

    defaultCompactSwitch = $('#default-compact-switch-input');
    defaultCompactSwitchSize = $('#default-compact-switch .fd-switch--compact');
    defaultCompactSwitchHandel = $('#default-compact-switch .fd-switch__handle');

    disabledSwitch = $('#switch-disabled-input');
    disabledSwitchHandel = $('#switch-disabled .fd-switch__handle');

    formDisabledSwitch = $('#form-switch-disabled-input');
    formDisabledSwitchHandel = $('#form-switch-disabled .fd-switch__handle');

    semanticSwitch = $('#semantic-switch-input');
    semanticSwitchHandel = $('#semantic-switch .fd-switch__handle');
    semanticSwitchIconOff = $('#semantic-switch .fd-switch__icon--off');
    semanticSwitchIconOn = $('#semantic-switch .fd-switch__icon--on');

    semanticCompactSwitch = $('#semantic-switch-compact-input');
    semanticCompactSwitchHandel = $('#semantic-switch-compact .fd-switch__handle');
    semanticCompactSwitchIconOff = $('#semantic-switch-compact .fd-switch__icon--off');
    semanticCompactSwitchIconOn = $('#semantic-switch-compact .fd-switch__icon--on');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');


    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    };
}
