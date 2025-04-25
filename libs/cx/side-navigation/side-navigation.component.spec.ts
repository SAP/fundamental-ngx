/* eslint-disable @nx/enforce-module-boundaries */
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import {
    NestedListExpandIconComponent,
    NestedListIconComponent,
    NestedListPopoverComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/core/nested-list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { I18nModule } from '@fundamental-ngx/i18n';
import { NestedItemComponent } from '../nested-list/nested-item/nested-item.component';
import { NestedLinkComponent } from '../nested-list/nested-link/nested-link.component';
import { NestedListComponent } from '../nested-list/nested-list/nested-list.component';
import { SideNavigationMainComponent } from './side-navigation-main.component';
import { SideNavigationComponent } from './side-navigation.component';

@Component({
    template: `
        <fdx-side-nav>
            <div fdx-side-nav-main>
                <ul fdx-nested-list [textOnly]="false">
                    <li fdx-nested-list-item #popoverNestedItemElement>
                        <fdx-nested-list-popover>
                            <a fdx-nested-list-link>
                                <icon fd-nested-list-icon [glyph]="'settings'"></icon>
                                <span fdx-nested-list-title>Link 1</span>
                            </a>
                            <i fdx-nested-list-expand-icon #iconElementPopover></i>
                            <ul fdx-nested-list>
                                <li fdx-nested-list-item #popoverSubItemElement>
                                    <a fdx-nested-list-link>
                                        <icon fd-nested-list-icon [glyph]="'settings'"></icon>
                                        <span fdx-nested-list-title>Link 1</span>
                                    </a>
                                </li>
                            </ul>
                        </fdx-nested-list-popover>
                    </li>
                    <li fdx-nested-list-item #listNestedItemElement>
                        <a fdx-nested-list-link #linkDirective>
                            <span fdx-nested-list-title>Link 2</span>
                        </a>
                        <ul fdx-nested-list>
                            <li fdx-nested-list-item #subItemElement>
                                <a fdx-nested-list-link>
                                    <icon fd-nested-list-icon [glyph]="'settings'"></icon>
                                    <span fdx-nested-list-title>Link 3</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </fdx-side-nav>
    `,
    standalone: true,
    imports: [
        PopoverModule,
        I18nModule,
        SideNavigationComponent,
        SideNavigationMainComponent,
        NestedListComponent,
        NestedItemComponent,
        NestedListPopoverComponent,
        NestedLinkComponent,
        NestedListIconComponent,
        IconComponent,
        NestedListTitleDirective,
        NestedListExpandIconComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class TestCombinedContainerComponent {
    @ViewChild(SideNavigationComponent)
    sideNav: SideNavigationComponent;

    @ViewChild('popoverNestedItemElement', { read: NestedItemComponent })
    nestedItemPopoverDirective: NestedItemComponent;

    @ViewChild('listNestedItemElement', { read: NestedItemComponent })
    nestedItemListDirective: NestedItemComponent; // Define this with the correct ViewChild annotation

    @ViewChild('subItemElement', { read: NestedItemComponent })
    subItemElement: NestedItemComponent;

    @ViewChild('popoverSubItemElement', { read: NestedItemComponent })
    popoverSubItemElement: NestedItemComponent;

    @ViewChild('iconElementPopover', { read: NestedListExpandIconComponent })
    popoverIconElement: NestedListExpandIconComponent;

    @ViewChild('linkDirective', { read: NestedLinkComponent })
    linkDirective: NestedLinkComponent;

    @ViewChild('iconElement', { read: NestedListExpandIconComponent })
    iconElement: NestedListExpandIconComponent;

    expanded = false;
}

describe('Integrated Component Tests', () => {
    let component: TestCombinedContainerComponent;
    let fixture: ComponentFixture<TestCombinedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCombinedContainerComponent],
            providers: [MenuKeyboardService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA] // Consider NO_ERRORS_SCHEMA for unknown bindings
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCombinedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should handle popover nested items correctly', async () => {
        await fixture.whenStable();
        fixture.detectChanges();
        const nestedItemPopoverDirective = component.nestedItemPopoverDirective;
        expect(nestedItemPopoverDirective.hasChildren).toBeTruthy();
    });

    it('should count items correctly when expanded', async () => {
        component.expanded = true;
        await fixture.whenStable();
        fixture.detectChanges();
        const anyComponent: any = component.sideNav;
        expect(anyComponent._keyboardService._getAllListItems(anyComponent.getLists()[0]).length).toBeGreaterThan(1); // Adjust based on expected environment setup
    });

    it('should handle nested list interactions correctly', async () => {
        fixture.detectChanges();
        const nestedItemListDirective = component.nestedItemListDirective;
        expect(nestedItemListDirective.hasChildren).toBeTruthy();
    });
});
