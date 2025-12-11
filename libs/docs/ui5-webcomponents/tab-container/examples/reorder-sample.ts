import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { MovePlacement } from '@fundamental-ngx/ui5-webcomponents-base/types';
import { Tab } from '@fundamental-ngx/ui5-webcomponents/tab';
import { TabContainer } from '@fundamental-ngx/ui5-webcomponents/tab-container';

// Import Fundamental Styles
import 'fundamental-styles/dist/layout-grid.css';
import 'fundamental-styles/dist/margins.css';

interface NestedTab {
    id: string;
    text: string;
    content?: string;
}

interface TabData {
    id: string;
    text: string;
    content: string;
    subTabs?: NestedTab[];
}

@Component({
    selector: 'ui5-doc-tab-container-reorder-sample',
    templateUrl: './reorder-sample.html',
    standalone: true,
    imports: [TabContainer, Tab]
})
export class ReorderSample {
    tabs = signal<TabData[]>([
        { id: 'tab1', text: 'Tab 1', content: 'Content for Tab 1' },
        { id: 'tab2', text: 'Tab 2', content: 'Content for Tab 2' },
        {
            id: 'tab3',
            text: 'Tab 3 (with nested)',
            content: 'Tab 3 contains nested tabs',
            subTabs: [
                { id: 'tab3.1', text: 'Nested Tab 3.1', content: 'Nested content 3.1' },
                { id: 'tab3.2', text: 'Nested Tab 3.2', content: 'Nested content 3.2' },
                { id: 'tab3.3', text: 'Nested Tab 3.3', content: 'Nested content 3.3' }
            ]
        },
        { id: 'tab4', text: 'Tab 4', content: 'Content for Tab 4' },
        { id: 'tab5', text: 'Tab 5', content: 'Content for Tab 5' },
        { id: 'tab6', text: 'Tab 6', content: 'Content for Tab 6' },
        { id: 'tab7', text: 'Tab 7', content: 'Content for Tab 7' },
        { id: 'tab8', text: 'Tab 8', content: 'Content for Tab 8' },
        { id: 'tab9', text: 'Tab 9', content: 'Content for Tab 9' },
        { id: 'tab10', text: 'Tab 10', content: 'Content for Tab 10' },
        { id: 'tab11', text: 'Tab 11', content: 'Content for Tab 11' },
        { id: 'tab12', text: 'Tab 12', content: 'Content for Tab 12' },
        { id: 'tab13', text: 'Tab 13', content: 'Content for Tab 13' },
        { id: 'tab14', text: 'Tab 14', content: 'Content for Tab 14' },
        { id: 'tab15', text: 'Tab 15', content: 'Content for Tab 15' },
        { id: 'tab16', text: 'Tab 16', content: 'Content for Tab 16' }
    ]);

    onItemMoveOver(event: UI5WrapperCustomEvent<TabContainer, 'ui5MoveOver'>): void {
        const { source } = event.detail;

        if (!(event.target as HTMLElement).contains(source.element)) {
            return;
        }

        event.preventDefault();
    }

    onItemMove(event: UI5WrapperCustomEvent<TabContainer, 'ui5Move'>): void {
        const { destination, source } = event.detail;

        switch (destination.placement) {
            case MovePlacement.Before:
                destination.element.before(source.element);
                break;
            case MovePlacement.After:
                destination.element.after(source.element);
                break;
            case MovePlacement.On:
                destination.element.prepend(source.element);
                break;
        }

        const newParent = source.element.parentElement;

        if (newParent?.hasAttribute('ui5-tab')) {
            source.element.slot = 'items';
        } else {
            source.element.slot = '';
        }
    }
}
