import { NestedItemDirective } from './nested-item.directive';
import { Component, ViewChild } from '@angular/core';
import { MenuKeyboardService, PopoverModule } from '@fundamental-ngx/core';
import { NestedListModule } from '../nested-list.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemService } from './nested-item.service';

@Component({
    template: `
        <li fd-nested-list-item #popoverNestedItemElement>
            <fd-nested-list-popover>
                <a fd-nested-list-link>
                    <span fd-nested-list-icon [glyph]="'settings'"></span>
                    <span fd-nested-list-title>Link 3</span>
                </a>
                <ul fd-nested-list [textOnly]="false">
                    <li fd-nested-list-item><a fd-nested-list-link>
                        <span fd-nested-list-icon [glyph]="'settings'"></span>
                        <span fd-nested-list-title>Link 1</span>
                    </a></li>
                </ul>
            </fd-nested-list-popover>
        </li>
        <li fd-nested-list-item #listNestedItemElement>
            <a fd-nested-list-link>
                <span fd-nested-list-icon [glyph]="'settings'"></span>
                <span fd-nested-list-title>Link 3</span>
            </a>
            <ul fd-nested-list [textOnly]="false">
                <li fd-nested-list-item><a fd-nested-list-link>
                    <span fd-nested-list-icon [glyph]="'settings'"></span>
                    <span fd-nested-list-title>Link 1</span>
                </a></li>
            </ul>
        </li>
        <li fd-nested-list-item #emptyItemDirective><a fd-nested-list-link>
            <span fd-nested-list-icon [glyph]="'settings'"></span>
            <span fd-nested-list-title>Link 1</span>
        </a></li>
    `
})
class TestNestedContainerComponent {
    @ViewChild('listNestedItemElement', { static: true, read: NestedItemDirective })
    nestedItemListDirective: NestedItemDirective;

    @ViewChild('popoverNestedItemElement', { static: true, read: NestedItemDirective })
    nestedItemPopoverDirective: NestedItemDirective;

    @ViewChild('emptyItemDirective', { static: true, read: NestedItemDirective })
    emptyItemDirective: NestedItemDirective;
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
            providers: [ NestedListKeyboardService, MenuKeyboardService, NestedListStateService ]
        })
            .compileComponents();
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
        expect(nestedItemPopoverDirective.linkItem.hasChildren).toBeTruthy()
    });

    it('Item with popover should react to open change from popover', () => {
        spyOn(nestedItemPopoverDirective, 'triggerOpen');
        itemService.popover.handleOpenChange(true);
        expect(nestedItemPopoverDirective.triggerOpen).toHaveBeenCalled();
    });

    it('Item with popover should propagate expanded change event', () => {
        nestedItemPopoverDirective.expanded = false;
        spyOn((nestedItemPopoverDirective as any), 'propagateOpenChange');
        nestedItemPopoverDirective.triggerOpen();
        expect((nestedItemPopoverDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Item with popover should handle expanded change event', () => {
        nestedItemListDirective.expanded = false;
        nestedItemListDirective.triggerOpen();
        expect(nestedItemListDirective.expanded).toBeTruthy();
    });

    it('Item with popover, should pass reference to popover child', () => {
        expect(itemService.popover.parentItemElement).toBe(nestedItemPopoverDirective);
    });

    it('Item with list should have children', () => {
        expect(nestedItemListDirective.hasChildren).toBeTruthy();
        expect(nestedItemListDirective.linkItem.hasChildren).toBeTruthy();
    });

    it('Item with list should propagate expanded change event', () => {
        nestedItemListDirective.expanded = false;
        spyOn((nestedItemListDirective as any), 'propagateOpenChange');
        nestedItemListDirective.triggerOpen();
        expect((nestedItemListDirective as any).propagateOpenChange).toHaveBeenCalledWith(true);
    });

    it('Item with list should handle expanded change event', () => {
        nestedItemListDirective.expanded = false;
        nestedItemListDirective.triggerOpen();
        expect(nestedItemListDirective.expanded).toBeTruthy();
    });

    it('Empty item should not have children', () => {
        expect(emptyItemDirective.hasChildren).toBeFalsy();
        expect(emptyItemDirective.linkItem.hasChildren).toBeFalsy();
    });

    it('Should react to events from link child', () => {
        spyOn(emptyItemDirective, 'toggle');
        spyOn(emptyItemDirective.keyboardTriggered, 'emit');
        const keyboardEvent: any = { key: 'value' };
        emptyItemDirective.linkItem.clicked.emit();
        emptyItemDirective.linkItem.keyboardTriggered.emit(keyboardEvent);
        expect(emptyItemDirective.toggle).toHaveBeenCalled();
        expect(emptyItemDirective.keyboardTriggered.emit).toHaveBeenCalledWith(keyboardEvent);
    });


});
