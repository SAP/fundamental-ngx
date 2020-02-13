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
            <ul fd-nested-list [compact]="compactVar" [textOnly]="textOnlyVar">
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="glyphVar"></span>
                        <span fd-nested-list-title>Link 1</span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-title>Link 2</span>
                    </a>
                </li>
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-title>Link 3</span>
                    </a>
                    <ul fd-nested-list>
                        <li fd-nested-list-item>
                            <a fd-nested-list-link>
                                <span fd-nested-list-title>Link 1</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    
        <div fd-side-nav-utility>
            <ul fd-nested-list [compact]="utilityCompactVar" [textOnly]="utilityTextOnlyVar">
                <li fd-nested-list-item><a fd-nested-list-link>
                    <span fd-nested-list-title>Link 4</span>
                </a></li>
            </ul>
        </div>
    </fd-side-nav>
    `,
    props: {
        comapctVar: boolean('Compact', false),
        condensedVar: boolean('Condensed', false),
        textOnlyVar: boolean('Text Only', false),
        utilityTextOnlyVar: boolean('Utility text only', false),
        utilityCompactVar: boolean('Utility compact', false),
        glyphVar: text('Glyph', 'home'),
    }
});
