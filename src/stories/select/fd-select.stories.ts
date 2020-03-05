import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text, object } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { SelectComponent, SelectModule } from 'libs/core/src/lib/select/public_api';
import { stringToFileBuffer } from '@angular-devkit/core/src/virtual-fs/host';

export default {
    title: 'Fd select',
    component: SelectComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [SelectModule],
            declarations: []
        })
    ]
};

export const Select = () => ({
    template:
        `
        <fd-select
        class="fd-select-example"
        [compact]="compactVar"
        [disabled]="isDisabledVar"
        [maxHeight]="maxHeightVar"
        [glyph]="glyphVar"
        [isOpen]="isOpenVar"
        [loading]="loadingVar"
        [placeholder]="placeholderVar"
        [fillControlMode]="fillControlModeVar"
        [selectType]="selectTypeVar"
        >
        <div *ngFor="let value of values">
            <fd-option id="value"  role="button" value="value">{{ value }}</fd-option>
        </div>
        </fd-select>
  `,
    props: {
        selectTypeVar: select('Button Border Type', {
            none: 'noborder',
            split: 'splitborder',
        }, 'splitborder'),
        fillControlModeVar: select('Fill control mode', {
            standard: '',
            equal: 'equal',
            atLeast: 'at-least',
        }, ''),
        unselectMissingOptionVar: boolean('Unselect missing option', true),
        maxHeightVar: text('Max Height', '500px'),
        compactVar: boolean('Compact', false),
        isOpenVar: boolean('Is Button Selected', false),
        loadingVar: boolean('Is Loading', false),
        placeholderVar: text('Placeholder', 'Default placeholder'),
        glyphVar: text('Glyph', ''),
        selectVar: text('ARIA title', 'Select'),
        buttonFocusableVar: boolean('Button Focusable', true),
        isDisabledVar: boolean('Disabled', false),
        values: object('Objects',
            ['value1', 'value2', 'value3', 'value4']
        ),

    }
});
