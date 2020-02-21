import { moduleMetadata } from '@storybook/angular';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { SideNavigationComponent, SideNavigationModule } from 'libs/core/src/lib/side-navigation/public_api';


export default {
    title: 'Fd side-navigation',
    component: SideNavigationComponent,
    moduleMetadata: moduleMetadata,
    decorators: [
        withKnobs,
        withA11y,
        moduleMetadata({
            imports: [SideNavigationModule],
            declarations: []
        })
    ]
};

export const SideNavigation = () => ({
    template:
        `<fd-side-nav [condensed]="condensedVar">
        <div fd-side-nav-main>
            <ul fd-nested-list [compact]="compactVar">
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="glyphVar"></span>
                        <span fd-nested-list-title>{{textValue1}}</span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-title>{{textValue2}}</span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-title>{{textValue3}}</span>
                    </a>
                    <ul fd-nested-list>
                        <li fd-nested-list-item>
                            <a fd-nested-list-link>
                                <span fd-nested-list-title>{{textValue4}}</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    
        <div fd-side-nav-utility>
            <ul fd-nested-list [compact]="utilityCompactVar" [textOnly]="utilityTextOnlyVar">
                <li fd-nested-list-item><a fd-nested-list-link>
                <span fd-nested-list-title>{{textValue5}}</span>
                </a></li>
                <li fd-nested-list-item><a fd-nested-list-link>
                    <span fd-nested-list-title>{{textValue6}}</span>
                </a></li>
            </ul>
        </div>
    </fd-side-nav>
    `,
    props: {
        comapctVar: boolean('Compact', false),
        condensedVar: boolean('Condensed', false),
        utilityTextOnlyVar: boolean('Utility text only', false),
        utilityCompactVar: boolean('Utility compact', false),
        glyphVar: text('Glyph', 'home'),
        textValue1: text('Text Value 1', 'Default 1'),
        textValue2: text('Text Value 2', 'Default 2'),
        textValue3: text('Text Value 3', 'Default 3'),
        textValue4: text('Text Value 4', 'Default 4'),
        textValue5: text('Text Value 5', 'Default 5'),
        textValue6: text('Text Value 6', 'Default 6'),
    }
});
