import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { ToggleComponent, ToggleModule } from 'libs/core/src/lib/toggle/public_api';

export default {
    title: 'Fd toggle',
    component: ToggleComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ToggleModule],
            declarations: []
        })
    ]
};

const size = {
    xs: 'xs',
    s: 's',
    l: 'l',
    default: 'default'
}

export const Toggle = () => ({
    template:
        `
        <br>
        <fd-toggle 
            [size]="size"
            [semantic]="semantic"
            [checked]="checked"
            [compact]="compact"
            [ariaLabel]="ariaLabel"
            [ariaLabelledby]="ariaLabelledby"
            (checkedChange)="onCheckedChange($event)"
            >
            {{message}}

        </fd-toggle>
  `,
    props: {
        size: select('size', size, 'default'),
        semantic: boolean('semantic', false),
        checked: boolean('checked', false),
        compact: boolean('compact', false),
        ariaLabel: text('ariaLabel', null),
        ariaLabelledby: text('ariaLabelledby', null),
        message: text('message', 'Toggle'),

        onCheckedChange: (event: boolean) => action('checkedChange')(event)
    }
});

