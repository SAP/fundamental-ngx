import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import {
    NestedListExpandIconComponent,
    NestedListIconComponent,
    NestedListTitleDirective
} from '../nested-list-directives';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemComponent } from './nested-item.component';
import { NestedItemService } from './nested-item.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CommonModule } from '@angular/common';
import { SideNavigationComponent, SideNavigationMainComponent } from '@fundamental-ngx/cx/side-navigation';
import { I18nModule } from '@fundamental-ngx/i18n';
import { NestedListPopoverComponent } from '../nested-list-popover/nested-list-popover.component';
import { NestedListComponent } from '../nested-list/nested-list.component';

@Component({
    template: `
        <fdx-side-nav>
            <div fdx-side-nav-main>
                <ul fdx-nested-list>
                    <li fdx-nested-list-item #popoverNestedItemElement>
                        <fdx-nested-list-popover>
                            <a fdx-nested-list-link>
                                <span fdx-nested-list-icon [glyph]="'settings'"></span>
                                <span fdx-nested-list-title>Link 1</span>
                            </a>
                            <i fdx-nested-list-expand-icon #iconElementPopover></i>
                            <ul fdx-nested-list [textOnly]="false">
                                <li fdx-nested-list-item #popoverSubItemElement>
                                    <a fdx-nested-list-link>
                                        <span fdx-nested-list-icon [glyph]="'settings'"></span>
                                        <span fdx-nested-list-title>Link 1</span>
                                    </a>
                                </li>
                            </ul>
                        </fdx-nested-list-popover>
                    </li>
                    <li fdx-nested-list-item #listNestedItemElement>
                        <a fdx-nested-list-link #linkDirective>
                            <span fdx-nested-list-icon [glyph]="'settings'"></span>
                            <span fdx-nested-list-title>Link 1</span>
                        </a>
                        <i fdx-nested-list-expand-icon #iconElement></i>
                        <ul fdx-nested-list [textOnly]="false">
                            <li fdx-nested-list-item #subItemElement>
                                <a fdx-nested-list-link>
                                    <span fdx-nested-list-icon [glyph]="'settings'"></span>
                                    <span fdx-nested-list-title>Link 1</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li fdx-nested-list-item #emptyItemDirective>
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-icon [glyph]="'settings'"></span>
                            <span fdx-nested-list-title>Link 1</span>
                        </a>
                    </li>
                </ul>
            </div>
        </fdx-side-nav>
    `,
    standalone: true,
    imports: [
        CommonModule,
        PopoverModule,
        SideNavigationComponent,
        SideNavigationMainComponent,
        NestedListComponent,
        NestedItemComponent,
        NestedListPopoverComponent,
        NestedLinkComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListExpandIconComponent,
        I18nModule
    ]
})
class TestNestedContainerComponent {
    @ViewChild('listNestedItemElement', { read: NestedItemComponent })
    nestedItemListDirective: NestedItemComponent;

    @ViewChild('subItemElement', { read: NestedItemComponent })
    subItemElement: NestedItemComponent;

    @ViewChild('popoverNestedItemElement', { read: NestedItemComponent })
    nestedItemPopoverDirective: NestedItemComponent;

    @ViewChild('popoverSubItemElement', { read: NestedItemComponent })
    popoverSubItemElement: NestedItemComponent;

    @ViewChild('emptyItemDirective', { read: NestedItemComponent })
    emptyItemDirective: NestedItemComponent;

    @ViewChild('iconElementPopover', { read: NestedListExpandIconComponent })
    popoverIconElement: NestedListExpandIconComponent;

    @ViewChild('iconElement', { read: NestedListExpandIconComponent })
    iconElement: NestedListExpandIconComponent;

    @ViewChild('linkDirective', { read: NestedLinkComponent })
    linkDirective: NestedLinkComponent;
}

describe('NestedItemComponent', () => {
    let component: TestNestedContainerComponent;
    let nestedItemPopoverDirective: NestedItemComponent;
    let nestedItemListDirective: NestedItemComponent;
    let subItemElement: NestedItemComponent;
    let popoverSubItemElement: NestedItemComponent;
    let emptyItemDirective: NestedItemComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;
    let itemService: NestedItemService;
    let expandIcon: NestedListExpandIconComponent;
    let nestedLink: NestedLinkComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestNestedContainerComponent, CommonModule],
            providers: [NestedListKeyboardService, MenuKeyboardService, NestedListStateService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        fixture.detectChanges();
        nestedItemListDirective = component.nestedItemListDirective;
        emptyItemDirective = component.emptyItemDirective;
        nestedItemPopoverDirective = component.nestedItemPopoverDirective;
        subItemElement = component.subItemElement;
        popoverSubItemElement = component.popoverSubItemElement;
        itemService = (<any>nestedItemPopoverDirective)._itemService;
        expandIcon = component.popoverIconElement;
        nestedLink = component.linkDirective;
        fixture.detectChanges();
    });

    it('Item with popover should have children', () => {
        expect(nestedItemPopoverDirective.hasChildren).toBeTruthy();
    });

    it('Item with popover should react to open change from popover', () => {
        jest.spyOn(nestedItemPopoverDirective, 'triggerOpen');
        expect(itemService.popover).toBeDefined();
        itemService.popover!.handleOpenChange(true);
        expect(nestedItemPopoverDirective.triggerOpen).toHaveBeenCalled();
    });

    it('Item with popover should propagate expanded change event', () => {
        nestedItemPopoverDirective.expanded = false;
        jest.spyOn(nestedItemPopoverDirective as any, 'propagateOpenChange');
        nestedItemPopoverDirective.triggerOpen();
        expect((nestedItemPopoverDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Item with popover, should pass reference to popover child', () => {
        expect(itemService.popover!.parentItemElement).toBe(nestedItemPopoverDirective);
    });

    it('Item with list should have children', () => {
        expect(nestedItemListDirective.hasChildren).toBeTruthy();
    });

    it('Item with list should propagate expanded change event', () => {
        nestedItemListDirective.expanded = false;
        jest.spyOn(nestedItemListDirective as any, 'propagateOpenChange');
        nestedItemListDirective.triggerOpen();
        expect((nestedItemListDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Empty item should not have children', () => {
        expect(emptyItemDirective.hasChildren).toBeFalsy();
    });

    it('Should react to events from icon child', () => {
        fixture.detectChanges();
        jest.spyOn(nestedItemListDirective, 'toggle');
        expandIcon.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(expandIcon.expanded).toBeTruthy();
    });

    it('Popover should react to events from icon child', () => {
        fixture.detectChanges();
        expect(itemService.popover).toBeDefined();
        itemService.popover!.handleOpenChange(true);
        jest.spyOn(nestedItemPopoverDirective, 'toggle');
        expandIcon.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(nestedItemPopoverDirective.toggle).toHaveBeenCalledWith();
    });

    it('Should handle keyboard event from link', () => {
        fixture.detectChanges();
        nestedItemListDirective.ngAfterContentInit();
        jest.spyOn(nestedItemListDirective.keyboardTriggered, 'emit');
        const keyboardEvent = new KeyboardEvent('keyDown');
        nestedLink.onKeyDown(keyboardEvent);
        fixture.detectChanges();
        expect(nestedItemListDirective.keyboardTriggered.emit).toHaveBeenCalledWith(keyboardEvent);
    });

    it('Popover Should handle keyboard event from sub items', () => {
        jest.spyOn(<any>nestedItemPopoverDirective, '_selectedChange');
        nestedItemPopoverDirective.ngAfterContentInit();
        fixture.detectChanges();
        popoverSubItemElement.linkItem.onClick();
        fixture.detectChanges();
        expect((<any>nestedItemPopoverDirective)._selectedChange).toHaveBeenCalledWith(
            (<any>popoverSubItemElement)._elementId
        );
    });

    it('Should handle keyboard event from sub items', () => {
        jest.spyOn(<any>nestedItemListDirective, '_selectedChange');
        nestedItemListDirective.ngAfterContentInit();
        fixture.detectChanges();
        subItemElement.linkItem.onClick();
        fixture.detectChanges();
        expect((<any>nestedItemListDirective)._selectedChange).toHaveBeenCalledWith((<any>subItemElement)._elementId);
    });
});
