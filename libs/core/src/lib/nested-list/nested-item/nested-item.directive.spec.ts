import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListExpandIconComponent } from '../nested-list-directives';
import { NestedListModule } from '../nested-list.module';
import { NestedItemDirective } from './nested-item.directive';
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
                    <a fd-nested-list-expand-icon #iconElementPopover></a>
                </div>
                <ul fd-nested-list [textOnly]="false">
                    <li fd-nested-list-item #popoverSubItemElement>
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
                <a fd-nested-list-expand-icon #iconElement></a>
            </div>
            <ul fd-nested-list [textOnly]="false">
                <li fd-nested-list-item #subItemElement>
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
    @ViewChild('listNestedItemElement', { read: NestedItemDirective })
    nestedItemListDirective: NestedItemDirective;

    @ViewChild('subItemElement', { read: NestedItemDirective })
    subItemElement: NestedItemDirective;

    @ViewChild('popoverNestedItemElement', { read: NestedItemDirective })
    nestedItemPopoverDirective: NestedItemDirective;

    @ViewChild('popoverSubItemElement', { read: NestedItemDirective })
    popoverSubItemElement: NestedItemDirective;

    @ViewChild('emptyItemDirective', { read: NestedItemDirective })
    emptyItemDirective: NestedItemDirective;

    @ViewChild('iconElementPopover', { read: NestedListExpandIconComponent })
    popoverIconElement: NestedListExpandIconComponent;

    @ViewChild('iconElement', { read: NestedListExpandIconComponent })
    iconElement: NestedListExpandIconComponent;

    @ViewChild('linkElement', { read: NestedLinkDirective })
    linkDirective: NestedLinkDirective;
}

describe('NestedItemDirective', () => {
    let component: TestNestedContainerComponent;
    let nestedItemPopoverDirective: NestedItemDirective;
    let nestedItemListDirective: NestedItemDirective;
    let subItemElement: NestedItemDirective;
    let popoverSubItemElement: NestedItemDirective;
    let emptyItemDirective: NestedItemDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;
    let itemService: NestedItemService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NestedListModule, PopoverModule],
            declarations: [TestNestedContainerComponent]
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
        fixture.detectChanges();
    });

    it('Item with popover should have children', () => {
        expect(nestedItemPopoverDirective.hasChildren).toBeTruthy();
        expect(nestedItemPopoverDirective.contentItem.hasChildren).toBeTruthy();
    });

    it('Item with popover should react to open change from popover', () => {
        const spy = jest.spyOn(nestedItemPopoverDirective, 'triggerOpen');
        expect(itemService.popover).toBeDefined();
        itemService.popover!.handleOpenChange(true);
        expect(spy).toHaveBeenCalled();
    });

    it('Item with popover should propagate expanded change event', () => {
        nestedItemPopoverDirective.expanded = false;
        const spy = jest.spyOn(nestedItemPopoverDirective as any, 'propagateOpenChange');
        nestedItemPopoverDirective.triggerOpen();
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('Item with popover should handle expanded change event', () => {
        nestedItemListDirective.expanded = false;
        nestedItemListDirective.triggerOpen();
        expect(nestedItemListDirective.expanded).toBeTruthy();
        expect(nestedItemListDirective.contentItem.nestedExpandIcon.expanded).toBeTruthy();
    });

    it('Item with popover, should pass reference to popover child', () => {
        expect(itemService.popover!.parentItemElement).toBe(nestedItemPopoverDirective);
    });

    it('Item with list should have children', () => {
        expect(nestedItemListDirective.hasChildren).toBeTruthy();
        expect(nestedItemListDirective.contentItem.hasChildren).toBeTruthy();
    });

    it('Item with list should propagate expanded change event', () => {
        nestedItemListDirective.expanded = false;
        const spy = jest.spyOn(nestedItemListDirective as any, 'propagateOpenChange');
        nestedItemListDirective.triggerOpen();
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('Item with list should handle expanded change event', () => {
        nestedItemListDirective.expanded = false;
        nestedItemListDirective.triggerOpen();
        expect(nestedItemListDirective.expanded).toBeTruthy();
        expect(nestedItemListDirective.contentItem.nestedExpandIcon.expanded).toBeTruthy();
    });

    it('Empty item should not have children', () => {
        expect(emptyItemDirective.hasChildren).toBeFalsy();
    });

    it('Should react to events from icon child', () => {
        fixture.detectChanges();
        const spy = jest.spyOn(nestedItemListDirective, 'toggle');
        nestedItemListDirective.contentItem.nestedExpandIcon.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith();
    });

    it('Popover should react to events from icon child', () => {
        fixture.detectChanges();
        expect(itemService.popover).toBeDefined();
        itemService.popover!.handleOpenChange(true);
        const spy = jest.spyOn(nestedItemPopoverDirective, 'toggle');
        nestedItemPopoverDirective.contentItem.nestedExpandIcon.onClick(new MouseEvent('click'));
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith();
    });

    it('Should handle keyboard event from link', () => {
        fixture.detectChanges();
        const spy = jest.spyOn(nestedItemListDirective.keyboardTriggered, 'emit');
        const keyboardEvent = new KeyboardEvent('keyDown');
        nestedItemListDirective.contentItem.nestedLink.onKeyDown(keyboardEvent);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(keyboardEvent);
    });

    it('Popover Should handle keyboard event from link', () => {
        fixture.detectChanges();
        const spy = jest.spyOn(nestedItemPopoverDirective.keyboardTriggered, 'emit');
        const keyboardEvent = new KeyboardEvent('keyDown');
        nestedItemPopoverDirective.contentItem.nestedLink.onKeyDown(keyboardEvent);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(keyboardEvent);
    });

    it('Popover Should handle keyboard event from sub items', () => {
        const spy = jest.spyOn(<any>nestedItemPopoverDirective, '_selectedChange');
        fixture.detectChanges();
        popoverSubItemElement.linkItem.onClick();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith((<any>popoverSubItemElement)._elementId);
    });

    it('Should handle keyboard event from sub items', () => {
        const spy = jest.spyOn(<any>nestedItemListDirective, '_selectedChange');
        fixture.detectChanges();
        subItemElement.linkItem.onClick();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith((<any>subItemElement)._elementId);
    });
});
