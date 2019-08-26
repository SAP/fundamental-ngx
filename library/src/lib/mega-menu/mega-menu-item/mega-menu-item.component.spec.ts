import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaMenuItemComponent } from './mega-menu-item.component';
import { Component } from '@angular/core';
import { MegaMenuModule } from '../mega-menu.module';


@Component({
    selector: 'fd-test-menu-item',
    template: `
        <fd-mega-menu-item>
            <a fd-mega-menu-link>Item 0</a>
            <li fd-mega-menu-subitem>
                <a fd-mega-menu-sublink href="xd">Sub Item 1</a>
            </li>
            <li fd-mega-menu-subitem>
                <a fd-mega-menu-sublink>Sub Item 2</a>
            </li>
            <li fd-mega-menu-subitem>
                <a fd-mega-menu-sublink>Sub Item 3</a>
            </li>
        </fd-mega-menu-item>
    `
})
class TestWrapperComponent {}

describe('MegaMenuItemComponent', () => {
    let component: MegaMenuItemComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [MegaMenuModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open sublist and focus first sub element', () => {
        spyOn(component, 'openSubList');
        spyOn(component.subItems.first, 'focus');
        const event: any = {code: 'ArrowRight', preventDefault: () => {}};
        component.handleKeyboardEvent(event);
        expect(component.openSubList).toHaveBeenCalled();
        expect(component.subItems.first.focus).toHaveBeenCalled();
    });

    it('should close sublist and focus parent element', () => {
        spyOn(component, 'closeSubList');
        spyOn(component.link, 'focus');
        const event: any = {code: 'ArrowLeft', preventDefault: () => {}};
        component.handleKeyboardEvent(event);
        expect(component.closeSubList).toHaveBeenCalled();
        expect(component.link.focus).toHaveBeenCalled();
    });

    it('should open sublist and focus first sub element', () => {
        spyOn(component, 'openSubList');
        spyOn(component.subItems.first, 'focus');
        const event: any = {code: 'Enter', preventDefault: () => {}};
        component.handleKeyboardEvent(event);
        expect(component.openSubList).toHaveBeenCalled();
        expect(component.subItems.first.focus).toHaveBeenCalled();
    });

    it('should open sublist and focus first sub element', () => {
        spyOn(component, 'openSubList');
        spyOn(component.subItems.first, 'focus');
        const event: any = {code: 'Space', preventDefault: () => {}};
        component.handleKeyboardEvent(event);
        expect(component.openSubList).toHaveBeenCalled();
        expect(component.subItems.first.focus).toHaveBeenCalled();
    });

    it('should throw arrow up event', () => {
        spyOn(component.keyDown, 'emit');
        const event: any = {code: 'ArrowUp', preventDefault: () => {}};
        component.handleKeyboardEvent(event);
        expect(component.keyDown.emit).toHaveBeenCalledWith(event);
    });

    it('should not propagate event on specified arrow down event', () => {
        const event: any = {code: 'ArrowDown', stopPropagation: () => {}, preventDefault: () => {}};
        spyOn(event, 'stopPropagation');
        component.handleSubListKeyDown(event, 0);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should not propagate event on specified arrow up event', () => {
        const event: any = {code: 'ArrowUp', stopPropagation: () => {}, preventDefault: () => {}};
        spyOn(event, 'stopPropagation');
        component.handleSubListKeyDown(event, 0);
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});
