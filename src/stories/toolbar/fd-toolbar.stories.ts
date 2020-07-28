import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ToolbarComponent, ToolbarModule } from 'libs/core/src/lib/toolbar/public_api';
import { ButtonModule } from 'libs/core/src/lib/button/public_api';
import { SegmentedButtonModule } from 'libs/core/src/lib/segmented-button/public_api';
import { SplitButtonModule } from 'libs/core/src/lib/split-button/public_api';
import { MenuModule } from 'libs/core/src/lib/menu/public_api';
import { SelectModule } from 'libs/core/src/lib/select/public_api';
import { CheckboxModule } from 'libs/core/src/lib/checkbox/public_api';
import { FormModule } from 'libs/core/src/lib/form/public_api';
import { DatetimePickerModule } from 'libs/core/src/lib/datetime-picker/public_api';

export default {
    title: 'Fd toolbar',
    component: ToolbarComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [
                ToolbarModule,
                ButtonModule,
                SegmentedButtonModule,
                SplitButtonModule,
                MenuModule,
                SelectModule,
                CheckboxModule,
                FormModule,
                DatetimePickerModule
            ],
            declarations: []
        })
    ]
};

export const Toolbar = () => ({
    template: `
    <fd-toolbar [shouldOverflow]="shouldOverflow" [fdType]="type" [size]="size" [hasTitle]="hasTitle">
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <fd-toolbar-spacer fd-toolbar-item></fd-toolbar-spacer>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
    </fd-toolbar>
  `,
    props: {
        shouldOverflow: boolean('Should Overflow', false),
        type: select('Type', ['solid', 'transparent', 'auto', 'info'], 'solid'),
        size: select('Size', ['cozy', 'compact'], 'compact'),
        hasTitle: boolean('Has Title', false)
    }
});

export const ToolbarWithSegmentedButtonAndMenuButton = () => ({
    template: `
    <fd-toolbar [shouldOverflow]="shouldOverflow" [fdType]="type" [size]="size" [hasTitle]="hasTitle">
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>

        <fd-datetime-picker fd-toolbar-item [compact]="true"></fd-datetime-picker>

        <fd-select fd-toolbar-item [compact]="true" placeholder="Select an option" [closeOnOutsideClick]="false">
            <fd-option *ngFor="let option of ['Apple', 'Pineapple', 'Tomato', 'Strawberry']" [value]="option">{{option}}</fd-option>
        </fd-select>
        
        <button fd-toolbar-item fd-button [compact]="true">Button</button>

        <fd-checkbox fd-toolbar-item label="Option 1" [tristate]="true"> </fd-checkbox>

        <button fd-toolbar-item fd-button [compact]="true">Button</button>

        <fd-split-button fd-toolbar-item [compact]="true">
            <ng-template fd-split-button-action-title>
                Action
            </ng-template>
        </fd-split-button>
      
        <label fd-toolbar-item fd-toolbar-label fd-form-label for="input-1">Default Input</label>
        <input [compact]="true" fd-toolbar-item fd-form-control type="text" id="input-1" placeholder="Field placeholder text" style="max-width:200px"/>

        <button fd-toolbar-item fd-button [fdMenu]="true" [compact]="true">Button</button>
        
        <fd-segmented-button fd-toolbar-item>
            <button fd-button [compact]="true">Left</button>
            <button fd-button [compact]="true">Middle</button>
            <button fd-button [compact]="true">Right</button>
        </fd-segmented-button>
        
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <fd-toolbar-spacer fd-toolbar-item [fixed]="true" [width]="'200px'"></fd-toolbar-spacer>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
        <button fd-toolbar-item fd-button [compact]="true">Button</button>
    </fd-toolbar>
  `,
    props: {
        shouldOverflow: boolean('Should Overflow', true),
        type: select('Type', ['solid', 'transparent', 'auto', 'info'], 'solid'),
        size: select('Size', ['cozy', 'compact'], 'compact'),
        hasTitle: boolean('Has Title', false)
    }
});
