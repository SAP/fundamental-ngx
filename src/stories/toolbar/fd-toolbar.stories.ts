import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { ToolbarComponent, ToolbarModule } from 'libs/core/src/lib/toolbar/public_api';
import { ButtonModule } from 'libs/core/src/lib/button/public_api';

export default {
    title: 'Fd toolbar',
    component: ToolbarComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ToolbarModule, ButtonModule],
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
        <fd-toolbar-spacer></fd-toolbar-spacer>
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
