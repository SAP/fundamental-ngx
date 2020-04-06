import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text, object } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { InlineHelpComponent, InlineHelpModule } from 'libs/core/src/lib/inline-help/public_api';

export default {
    title: 'Fd inline-help',
    component: InlineHelpComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [InlineHelpModule],
            declarations: []
        })
    ]
};

export const InlineHelp = () => ({
    template:
        `<div style="display:flex;align-items:center;justify-content:center;margin-top:10%;">
        Inline Help
            <fd-inline-help style="margin-left:2px;" [placement]="placementVar"
            [inlineHelpContentStyle]="inlineHelpContentStyleVar"
            [inlineHelpIconStyle]="inlineHelpIconStyleVar"
            [triggers]="triggersVar">
            {{textValue}}
            </fd-inline-help>
        </div>
  `,
    props: {
        placementVar: select('Placement', {
            bottomStart: 'bottom-start',
            bottomEnd: 'bottom-end',
            right: 'right',
            rightStart: 'right-start',
            rightEnd: 'right-end',
            left: 'left',
            leftStart: 'left-start',
            leftEnd: 'left-end',

        }, 'bottom-start'),
        textValue: text('Text', 'Lorem ipsum'),
        inlineHelpContentStyleVar: object('Inline help paragraph style', { 'width': '250px', 'min-width': '250px', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'color': 'black' }),
        inlineHelpIconStyleVar: object('Inline help icon style', { 'background-color': 'transparent' }),
        triggersVar: object('Triggers', ['click'])

    }
});