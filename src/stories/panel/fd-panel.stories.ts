import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import { ButtonModule } from 'libs/core/src/lib/button/public_api';
import { PanelComponent, PanelModule } from 'libs/core/src/lib/panel/public_api';

export default {
    title: 'Fd panel',
    component: PanelComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [ButtonModule, PanelModule],
            declarations: []
        })
    ]
};

export const Panel = () => ({
    template: `
    <div fd-panel [compact]="compact">
        <div fd-panel-header>
            <div fd-panel-expand [ariaLabel]="ariaLabel" [compact]="compact"></div>
            <h5 fd-panel-title>{{title}}</h5>
        </div>
        <div fd-panel-content [ariaLabel]="ariaLabelContent" [id]="'fdC2'">
            {{content}}
        </div>
    </div>

    <br>

    <div fd-panel [fixed]="true">
        <div fd-panel-header>
            <h5 fd-panel-title>{{title}}</h5>
        </div>
        <div fd-panel-content [ariaLabel]="ariaLabelContent" [id]="'fdC3'" [height]="height">
            {{content}}
        </div>
    </div>
  `,
    props: {
        compact: boolean('compact', false),
        title: text('title', 'Panel Header'),
        content: text(
            'content',
            ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut laoreet lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean sagittis aliquam justo et suscipit. Nam molestie, magna at elementum pulvinar, nisi enim venenatis ante, id convallis mi neque nec risus. Cras blandit sagittis augue at facilisis. Mauris egestas nunc nec diam mollis auctor. Vestibulum sed euismod elit, eget accumsan quam. Donec eleifend porttitor viverra. Nunc porttitor dictum erat at molestie. Sed quis velit dolor. Vestibulum et turpis eget enim gravida gravida vitae at massa. Suspendisse facilisis elit ut dolor posuere consectetur. Morbi ac nibh sit amet dolor lobortis tincidunt in ornare erat. Vestibulum tristique euismod enim, ac volutpat odio cursus sit amet.Vestibulum sed euismod elit, eget accumsan quam. Donec eleifend porttitor viverra. Nunc porttitor dictum erat at molestie. Sed quis velit dolor. Vestibulum et turpis eget enim gravida gravida vitae at massa. Suspendisse facilisis elit ut dolor posuere consectetur. Morbi ac nibh sit amet dolor lobortis tincidunt in ornare erat. Vestibulum tristique euismod enim, ac volutpat odio cursus sit amet.Vestibulum sed euismod elit, eget accumsan quam. Donec eleifend porttitor viverra. Nunc porttitor dictum erat at molestie. Sed quis velit dolor. Vestibulum et turpis eget enim gravida gravida vitae at massa. Suspendisse facilisis elit ut dolor posuere consectetur. Morbi ac nibh sit amet dolor lobortis tincidunt in ornare erat. Vestibulum tristique euismod enim, ac volutpat odio cursus sit amet.Vestibulum sed euismod elit, eget accumsan quam. Donec eleifend porttitor viverra. Nunc porttitor dictum erat at molestie. Sed quis velit dolor. Vestibulum et turpis eget enim gravida gravida vitae at massa. Suspendisse facilisis elit ut dolor posuere consectetur. Morbi ac nibh sit amet dolor lobortis tincidunt in ornare erat. Vestibulum tristique euismod enim, ac volutpat odio cursus sit amet.`
        ),
        ariaLabel: text('ariaLabel', 'expand-button'),
        ariaLabelContent: text('ariaLabel', 'panel-content'),
        height: text('height', '100px')
    }
});
