import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { NestedItemComponent } from './nested-item.component';
import { Component, ViewChild } from '@angular/core';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import { NestedListExpandIconComponent } from '../nested-list-directives';
import { CxNestedListModule } from '../nested-list.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemService } from './nested-item.service';

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
    `
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
            imports: [CxNestedListModule, PopoverModule, SideNavigationModule],
            declarations: [TestNestedContainerComponent],
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
        spyOn(nestedItemPopoverDirective, 'triggerOpen');
        expect(itemService.popover).toBeDefined();
        itemService.popover!.handleOpenChange(true);
        expect(nestedItemPopoverDirective.triggerOpen).toHaveBeenCalled();
    });

    it('Item with popover should propagate expanded change event', () => {
        nestedItemPopoverDirective.expanded = false;
        spyOn(nestedItemPopoverDirective as any, 'propagateOpenChange');
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
        spyOn(nestedItemListDirective as any, 'propagateOpenChange');
        nestedItemListDirective.triggerOpen();
        expect((nestedItemListDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Empty item should not have children', () => {
        expect(emptyItemDirective.hasChildren).toBeFalsy();
    });

    it('Should react to events from icon child', () => {
        fixture.detectChanges();
        spyOn(nestedItemListDirective, 'toggle');
        expandIcon.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(expandIcon.expanded).toBeTruthy();
    });

    it('Popover should react to events from icon child', () => {
        fixture.detectChanges();
        expect(itemService.popover).toBeDefined();
        itemService.popover!.handleOpenChange(true);
        spyOn(nestedItemPopoverDirective, 'toggle');
        expandIcon.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(nestedItemPopoverDirective.toggle).toHaveBeenCalledWith();
    });

    it('Should handle keyboard event from link', () => {
        fixture.detectChanges();
        nestedItemListDirective.ngAfterContentInit();
        spyOn(nestedItemListDirective.keyboardTriggered, 'emit');
        const keyboardEvent = new KeyboardEvent('keyDown');
        nestedLink.onKeyDown(keyboardEvent);
        fixture.detectChanges();
        expect(nestedItemListDirective.keyboardTriggered.emit).toHaveBeenCalledWith(keyboardEvent);
    });

    it('Popover Should handle keyboard event from sub items', () => {
        spyOn(<any>nestedItemPopoverDirective, '_selectedChange');
        nestedItemPopoverDirective.ngAfterContentInit();
        fixture.detectChanges();
        popoverSubItemElement.linkItem.onClick();
        fixture.detectChanges();
        expect((<any>nestedItemPopoverDirective)._selectedChange).toHaveBeenCalledWith(
            (<any>popoverSubItemElement)._elementId
        );
    });

    it('Should handle keyboard event from sub items', () => {
        spyOn(<any>nestedItemListDirective, '_selectedChange');
        nestedItemListDirective.ngAfterContentInit();
        fixture.detectChanges();
        subItemElement.linkItem.onClick();
        fixture.detectChanges();
        expect((<any>nestedItemListDirective)._selectedChange).toHaveBeenCalledWith((<any>subItemElement)._elementId);
    });
});
