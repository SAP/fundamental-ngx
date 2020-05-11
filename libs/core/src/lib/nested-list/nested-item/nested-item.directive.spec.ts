import { NestedItemDirective } from './nested-item.directive';
import { Component, ViewChild } from '@angular/core';
import { MenuKeyboardService, NestedLinkDirective, NestedListExpandIconDirective, PopoverModule } from '@fundamental-ngx/core';
import { NestedListModule } from '../nested-list.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemService } from './nested-item.service';

@Component({
    template: `
        <li fd-nested-list-item #popoverNestedItemElement>
            <fd-nested-list-popover>
                <div fd-nested-list-content>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="'settings'"></span>
                        <span fd-nested-list-title>Link 1</span>
                    </a>
                    <a fd-nested-list-expand-icon #iconElement></a>
                </div>
                <ul fd-nested-list [textOnly]="false">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-icon [glyph]="'settings'"></span>
                            <span fd-nested-list-title>Link 1</span>
                        </a>
                    </li>
                </ul>
            </fd-nested-list-popover>
        </li>
        <li fd-nested-list-item #listNestedItemElement>
            <div fd-nested-list-content>
                <a fd-nested-list-link #linkDirective>
                    <span fd-nested-list-icon [glyph]="'settings'"></span>
                    <span fd-nested-list-title>Link 1</span>
                </a>
                <a fd-nested-list-expand-icon #iconElement2></a>
            </div>
            <ul fd-nested-list [textOnly]="false">
                <li fd-nested-list-item>
                    <a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="'settings'"></span>
                        <span fd-nested-list-title>Link 1</span>
                    </a>
                </li>
            </ul>
        </li>
        <li fd-nested-list-item #emptyItemDirective>
            <a fd-nested-list-link>
                <span fd-nested-list-icon [glyph]="'settings'"></span>
                <span fd-nested-list-title>Link 1</span>
            </a>
        </li>
    `
})
class TestNestedContainerComponent {
    @ViewChild('listNestedItemElement', { static: true, read: NestedItemDirective })
    nestedItemListDirective: NestedItemDirective;

    @ViewChild('popoverNestedItemElement', { static: true, read: NestedItemDirective })
    nestedItemPopoverDirective: NestedItemDirective;

    @ViewChild('emptyItemDirective', { static: true, read: NestedItemDirective })
    emptyItemDirective: NestedItemDirective;

    @ViewChild('iconElement', { static: true, read: NestedListExpandIconDirective })
    popoverIconElement: NestedListExpandIconDirective;

    @ViewChild('iconElement2', { static: true, read: NestedListExpandIconDirective })
    iconElement: NestedListExpandIconDirective;

    @ViewChild('linkElement', { static: true, read: NestedLinkDirective })
    linkDirective: NestedLinkDirective;
}

describe('NestedItemDirective', () => {
    let component: TestNestedContainerComponent;
    let nestedItemPopoverDirective: NestedItemDirective;
    let nestedItemListDirective: NestedItemDirective;
    let emptyItemDirective: NestedItemDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;
    let itemService: NestedItemService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NestedListModule, PopoverModule],
            declarations: [TestNestedContainerComponent],
            providers: [NestedListKeyboardService, MenuKeyboardService, NestedListStateService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        nestedItemListDirective = component.nestedItemListDirective;
        emptyItemDirective = component.emptyItemDirective;
        nestedItemPopoverDirective = component.nestedItemPopoverDirective;
        itemService = (<any>nestedItemPopoverDirective)._itemService;
        fixture.detectChanges();
    });

    it('Item with popover should have children', () => {
        expect(nestedItemPopoverDirective.hasChildren).toBeTruthy();
        expect(nestedItemPopoverDirective.contentItem.hasChildren).toBeTruthy();
    });

    it('Item with popover should react to open change from popover', () => {
        spyOn(nestedItemPopoverDirective, 'triggerOpen');
        itemService.popover.handleOpenChange(true);
        expect(nestedItemPopoverDirective.triggerOpen).toHaveBeenCalled();
    });

    it('Item with popover should propagate expanded change event', () => {
        nestedItemPopoverDirective.expanded = false;
        spyOn(nestedItemPopoverDirective as any, 'propagateOpenChange');
        nestedItemPopoverDirective.triggerOpen();
        expect((nestedItemPopoverDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Item with popover should handle expanded change event', () => {
        nestedItemListDirective.expanded = false;
        nestedItemListDirective.triggerOpen();
        expect(nestedItemListDirective.expanded).toBeTruthy();
        expect(nestedItemListDirective.contentItem.nestedExpandIcon.expanded).toBeTruthy();
    });

    it('Item with popover, should pass reference to popover child', () => {
        expect(itemService.popover.parentItemElement).toBe(nestedItemPopoverDirective);
    });

    it('Item with list should have children', () => {
        expect(nestedItemListDirective.hasChildren).toBeTruthy();
        expect(nestedItemListDirective.contentItem.hasChildren).toBeTruthy();
    });

    it('Item with list should propagate expanded change event', () => {
        nestedItemListDirective.expanded = false;
        spyOn(nestedItemListDirective as any, 'propagateOpenChange');
        nestedItemListDirective.triggerOpen();
        expect((nestedItemListDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Item with list should handle expanded change event', () => {
        nestedItemListDirective.expanded = false;
        nestedItemListDirective.triggerOpen();
        expect(nestedItemListDirective.expanded).toBeTruthy();
        expect(nestedItemListDirective.contentItem.nestedExpandIcon.expanded).toBeTruthy();
    });

    it('Empty item should not have children', () => {
        expect(emptyItemDirective.hasChildren).toBeFalsy();
        expect(emptyItemDirective.contentItem.hasChildren).toBeFalsy();
    });

    it('Should react to events from icon child', () => {
        spyOn(nestedItemListDirective, 'toggle');
        component.iconElement.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(nestedItemListDirective.toggle).toHaveBeenCalledWith();
    });

    it('Popover should react to events from icon child', () => {
        itemService.popover.handleOpenChange(true);
        spyOn(nestedItemPopoverDirective, 'toggle');
        component.popoverIconElement.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(nestedItemPopoverDirective.toggle).toHaveBeenCalledWith();
    });

    it('Should handle keyboard event from link', () => {
        spyOn(nestedItemListDirective.keyboardTriggered, 'emit');
        const keyboardEvent = new KeyboardEvent('keyDown');
        component.linkDirective.onKeyDown(keyboardEvent);
        fixture.detectChanges();
        expect(nestedItemListDirective.keyboardTriggered.emit).toHaveBeenCalledWith(keyboardEvent);
    });
});
