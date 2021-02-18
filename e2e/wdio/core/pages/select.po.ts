import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class SelectPo extends CoreBaseComponentPo {
    url = '/select';

    selectModesExapmle = 'fd-select-mode-example';
    selectSemanticStatesExapmle = 'fd-select-mode-example';
    customControlExapmle = 'fd-select-mode-example';
    extendetOptionsExapmle = 'fd-select-mode-example';
    mobileModeExapmle = 'fd-select-mode-example';
    maxHeightExapmle = 'fd-select-mode-example';
    addRemoveOptionExapmle = 'fd-select-mode-example';
    programmaticControlExapmle = 'fd-select-mode-example';
    reactiveExapmle = 'fd-select-mode-example';

    open(): void {
        super.open(this.url);

        waitForElDisplayed(this.selectModesExapmle);
    };

}
