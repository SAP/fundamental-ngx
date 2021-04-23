import { Component, ViewChildren, ViewChild, ElementRef, QueryList } from '@angular/core';
import { ComponentFixture, TestBed, inject, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { DOWN_ARROW, ESCAPE, UP_ARROW, ENTER, TAB, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';

import { of } from 'rxjs';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { PlatformMenuModule } from './menu.module';
import { createKeyboardEvent, createMouseEvent } from '../../testing/event-objects';
import { RtlService } from '@fundamental-ngx/core';

function mouseClickOnElement(el: Element): void {
    const event: MouseEvent = new MouseEvent('click', {
        detail: 1
    });
    el.dispatchEvent(event);
}

@Component({
    template: `<button [fdpMenuTriggerFor]="menu" #button>Fruit</button>
        <fdp-menu #menu>
            <fdp-menu-item (itemSelect)="onSelect('Apple')">Apple</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Banana')">Banana</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Orange')">Orange</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Peach')">Peach</fdp-menu-item>
        </fdp-menu>
        <button #otherButton>Another Button</button> `
})
class SimpleMenuComponent {
    @ViewChild('button', { static: false }) button: ElementRef<HTMLElement>;
    @ViewChild('otherButton', { static: false }) otherButton: ElementRef<HTMLElement>;
    @ViewChild(MenuTriggerDirective, { static: false }) trigger: MenuTriggerDirective;
    @ViewChild(MenuComponent, { static: false }) menu: MenuComponent;
    @ViewChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    public currentSelectedItem = '';

    constructor() { }

    onSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}

// TODO: Unskip after fix
xdescribe('Simple Menu', () => {
    let component: SimpleMenuComponent;
    let fixture: ComponentFixture<SimpleMenuComponent>;
    let overlayContainerEl: HTMLElement;

    let button: ElementRef<HTMLElement>;
    let otherButton: ElementRef<HTMLElement>;
    let trigger: MenuTriggerDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule],
            declarations: [SimpleMenuComponent],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        button = component.button;
        otherButton = component.otherButton;
        trigger = component.trigger;
    });

    it('should be able to toggle menu by clicking on trigger element', fakeAsync(() => {
        /**
         * PRE-CLICK CHECKS
         */
        // check state of trigger elememt
        expect(trigger.isMenuOpen).toBeFalsy();

        // check menu element is not shown
        let menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);

        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // check state of trigger element
        expect(trigger.isMenuOpen).toBeTruthy();

        // check menu element is shown
        menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(1);

        /**
         * SECOND-CLICK (CLOSE MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // check state of trigger element
        expect(trigger.isMenuOpen).toBeFalsy();

        // check menu element is not shown
        menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    }));

    it('should not open the menu on trigger hover if the trigger is not a menu item', () => {
        /**
         * MOUSE ENTER
         */
        const mouseEnterEvent = createMouseEvent('mouseenter');
        button.nativeElement.dispatchEvent(mouseEnterEvent);
        fixture.detectChanges();

        // check state of trigger element
        expect(trigger.isMenuOpen).toBeFalsy();

        // check menu element is not shown
        const menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    });

    it('should close the menu when user clicks outside of menu area', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // check state of trigger element
        expect(trigger.isMenuOpen).toBeTruthy();

        // check menu element is shown
        let menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(1);

        /**
         * CLICK OUTSIDE OF MENU
         */
        otherButton.nativeElement.click();
        tick(1);
        fixture.detectChanges();

        // check state of trigger elememt
        expect(trigger.isMenuOpen).toBeFalsy();

        // check menu element is not shown
        menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    }));

    it('should close the menu when the user hits the ESC key', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // check state of trigger element
        expect(trigger.isMenuOpen).toBeTruthy();

        // check menu element is shown
        let menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(1);

        /**
         * KEYPRESS ESC TO CLOSE MENU
         */
        const keyboardEvent = createKeyboardEvent('keydown', ESCAPE, 'Escape');
        menuEl[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check state of trigger elememt
        expect(trigger.isMenuOpen).toBeFalsy();

        // check menu element is not shown
        menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    }));

    it('should close the menu after user TABs off of menu', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // check state of trigger element
        expect(trigger.isMenuOpen).toBeTruthy();

        // check menu element is shown
        let menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(1);

        /**
         * KEYPRESS ESC TO CLOSE MENU
         */
        const keyboardEvent = createKeyboardEvent('keydown', TAB, 'Tab');
        menuEl[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check state of trigger elememt
        expect(trigger.isMenuOpen).toBeFalsy();

        // check menu element is not shown
        menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    }));

    it('should allow keyboard navigation of items after opening of menu', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const menuEl = overlayContainerEl.querySelector('.fd-menu');

        // check to see if first item is focused
        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        expect(items[0]).toBe(document.activeElement);

        /**
         * KEYPRESS ARROWDOWN
         */
        let keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown');
        menuEl.dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        expect(items[1]).toBe(document.activeElement);

        /**
         * KEYPRESS ARROWDOWN
         */
        keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown');
        menuEl.dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        expect(items[2]).toBe(document.activeElement);

        /**
         * KEYPRESS ARROWUP
         */
        keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp');
        menuEl.dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        expect(items[1]).toBe(document.activeElement);
    }));

    it('should restore focus to the originating trigger after menu close', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        // check menu element is shown
        const menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(1);

        // check to see if first item is focused
        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        expect(items[0]).toBe(document.activeElement);

        /**
         * KEYPRESS ESC TO CLOSE MENU
         */
        const keyboardEvent = createKeyboardEvent('keydown', ESCAPE, 'Escape');
        menuEl[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        expect(button.nativeElement).toBe(document.activeElement as HTMLElement);
    }));

    it('should allow item selection to be captured as events', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();
        expect(component.currentSelectedItem).toBe('Apple');
    }));

    it('should close the menu after user keyboard selection of an item', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check menu element is not shown
        const menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    }));

    it('should close the menu after user mouse click of an item', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * MOUSE CLICK
         */
        const mouseClickEvent = createMouseEvent('click');
        items[0].dispatchEvent(mouseClickEvent);
        fixture.detectChanges();

        // check menu element is not shown
        const menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBe(0);
    }));
});

@Component({
    template: `<button [fdpMenuTriggerFor]="menu" #button>Fruit</button>
        <fdp-menu #menu>
            <fdp-menu-item [fdpMenuTriggerFor]="appleMenu">Apple</fdp-menu-item>
            <fdp-menu-item [fdpMenuTriggerFor]="bananaMenu">Banana</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Orange')">Orange</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Peach')">Peach</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #appleMenu id="appleMenu">
            <fdp-menu-item (itemSelect)="onSelect('Braeburn')" [fdpMenuTriggerFor]="braeburnMenu"
                >Braeburn</fdp-menu-item
            >
            <fdp-menu-item (itemSelect)="onSelect('Fuji')">Fuji</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Honey Crisp')">Honey Crisp</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #bananaMenu id="bananaMenu">
            <fdp-menu-item (itemSelect)="onSelect('Cavandish')">Cavandish</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Lady Finger')">Lady Finger</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Red')">Red</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #braeburnMenu id="braeburnMenu">
            <fdp-menu-item (itemSelect)="onSelect('Red Braeburn')">Red Braeburn</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Pink Braeburn')">Pink Braeburn</fdp-menu-item>
        </fdp-menu> `
})
class CascadingMenuComponent {
    @ViewChild('button', { static: false }) button: ElementRef<HTMLElement>;
    @ViewChild(MenuTriggerDirective, { static: false }) trigger: MenuTriggerDirective;
    @ViewChild(MenuComponent, { static: false }) menu: MenuComponent;
    @ViewChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    public currentSelectedItem = '';

    constructor() { }

    onSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}
describe('Cascading Menu', () => {
    let component: CascadingMenuComponent;
    let fixture: ComponentFixture<CascadingMenuComponent>;
    let overlayContainerEl: HTMLElement;

    let button: ElementRef<HTMLElement>;
    let trigger: MenuTriggerDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule],
            declarations: [CascadingMenuComponent],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CascadingMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        button = component.button;
        trigger = component.trigger;
    });

    it('should identify menu items which trigger submenu with arrow icon', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        expect(items[0].classList.contains('trigger')).toBeTruthy();
        expect(items[1].classList.contains('trigger')).toBeTruthy();
        expect(items[2].classList.contains('trigger')).toBeFalsy();
        expect(items[3].classList.contains('trigger')).toBeFalsy();
    }));

    it('should expand cascading menu on mouse hover of menu item', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * MOUSE ENTER
         */
        const mouseEnterEvent = createMouseEvent('mouseenter');
        items[0].dispatchEvent(mouseEnterEvent);
        fixture.detectChanges();

        // check menu elements are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);
    }));

    it('should expand cascading menu on keyboard enter', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check menu elements are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);
    }));

    it('should expand multiple cascading menus on keyboard enter', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[0].dispatchEvent(keyboardEvent);

        // check menu elements are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(3);
    }));

    it('should hide all menus when a non-trigger menu sub item is selected with mouse click', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * MOUSE ENTER
         */
        const mouseEnterEvent = createMouseEvent('mouseenter');
        items[0].dispatchEvent(mouseEnterEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * SELECT SUB MENU ITEM W/ MOUSE CLICK
         */
        const mouseClickEvent = createMouseEvent('click');
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[1].dispatchEvent(mouseClickEvent);
        fixture.detectChanges();

        // check menu element are not shown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
    }));

    it('should hide all menus when a non-trigger menu sub item is selected with keyboard ENTER', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * OPEN SUB MENU ITEM W/ KEYBOARD ENTER
         */
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        /**
         * SELECT SUB-SUB MENU ITEM W/ KEYBOARD ENTER
         */
        const subsubItems = overlayContainerEl.querySelectorAll('#fdp-menu-braeburnMenu .fd-menu__item');
        subsubItems[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check menu element are not shown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
    }));

    it('should hide all menus when when the user hits the ESC key', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * KEYPRESS ESC
         */
        const keyboardEscEvent = createKeyboardEvent('keydown', ESCAPE, 'Escape');
        menuEls[1].dispatchEvent(keyboardEscEvent);
        fixture.detectChanges();

        // check menu element are not shown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
    }));

    it('should hide all menus when when the user TABs off of menu', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * KEYPRESS TAB
         */
        const keyboardTabEvent = createKeyboardEvent('keydown', TAB, 'Tab');
        menuEls[1].dispatchEvent(keyboardTabEvent);
        fixture.detectChanges();

        // check menu element are not shown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(0);
    }));

    it('should hide branch of trigger menu item if another trigger menu item is selected', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * MOUSE ENTER
         */
        const mouseEnterEvent = createMouseEvent('mouseenter');
        items[0].dispatchEvent(mouseEnterEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * OPEN SUB MENU ITEM W/ MOUSE ENTER
         */
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[0].dispatchEvent(mouseEnterEvent);
        fixture.detectChanges();

        /**
         * MOUSE ENTER ON ANOTHER MENU ITEM
         */
        items[3].dispatchEvent(mouseEnterEvent);
        fixture.detectChanges();

        // check menu element are not shown
        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
    }));

    it('should be able to show sub menu on RIGHT ARROW click of trigger menu item (non-RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS RIGHT ARROW
         */
        const keyboardRightEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');
        items[0].dispatchEvent(keyboardRightEvent);
        fixture.detectChanges();

        // check menu element are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);
    }));

    it('should be able to hide sub menu on LEFT ARROW click of menu item (non-RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS RIGHT ARROW
         */
        const keyboardRightEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');
        items[0].dispatchEvent(keyboardRightEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * KEYPRESS LEFT ARROW
         */
        const keyboardLeftEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft');
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[0].dispatchEvent(keyboardLeftEvent);
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
    }));
});

@Component({
    template: `<button [fdpMenuTriggerFor]="menu" #button>Fruit</button>
        <fdp-menu #menu [xPosition]="'before'">
            <fdp-menu-item [fdpMenuTriggerFor]="appleMenu">Apple</fdp-menu-item>
            <fdp-menu-item [fdpMenuTriggerFor]="bananaMenu">Banana</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Orange')">Orange</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Peach')">Peach</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #appleMenu [xPosition]="'before'" id="appleMenu">
            <fdp-menu-item (itemSelect)="onSelect('Braeburn')">Braeburn</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Fuji')">Fuji</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Honey Crisp')">Honey Crisp</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #bananaMenu [xPosition]="'before'" id="bananaMenu">
            <fdp-menu-item (itemSelect)="onSelect('Cavandish')">Cavandish</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Lady Finger')">Lady Finger</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Red')">Red</fdp-menu-item>
        </fdp-menu> `
})
class CascadingBeforeMenuComponent {
    @ViewChild('button', { static: false }) button: ElementRef<HTMLElement>;
    @ViewChild(MenuTriggerDirective, { static: false }) trigger: MenuTriggerDirective;
    @ViewChild(MenuComponent, { static: false }) menu: MenuComponent;
    @ViewChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    public currentSelectedItem = '';

    constructor() { }

    onSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}
describe('Cascading Menu - Position Before', () => {
    let component: CascadingBeforeMenuComponent;
    let fixture: ComponentFixture<CascadingBeforeMenuComponent>;
    let overlayContainerEl: HTMLElement;

    let button: ElementRef<HTMLElement>;
    let trigger: MenuTriggerDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule],
            declarations: [CascadingBeforeMenuComponent],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CascadingBeforeMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        button = component.button;
        trigger = component.trigger;
    });

    it('should be able to show sub menu on LEFT ARROW click of trigger menu item (position-before, non-RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS LEFT ARROW
         */
        const keyboardLeftEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft');
        items[0].dispatchEvent(keyboardLeftEvent);
        fixture.detectChanges();

        // check menu element are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);
    }));

    it('should be able to hide sub menu on RIGHT ARROW click of menu item (non-RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS LEFT ARROW
         */
        const keyboardLeftEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft');
        items[0].dispatchEvent(keyboardLeftEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * KEYPRESS LEFT ARROW
         */
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        const keyboardRightEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');
        subItems[0].dispatchEvent(keyboardRightEvent);
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
    }));
});

@Component({
    template: `<button [fdpMenuTriggerFor]="menu" #button>Fruit</button>
        <fdp-menu #menu [xPosition]="'after'">
            <fdp-menu-item [fdpMenuTriggerFor]="appleMenu">Apple</fdp-menu-item>
            <fdp-menu-item [fdpMenuTriggerFor]="bananaMenu">Banana</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Orange')">Orange</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Peach')">Peach</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #appleMenu [xPosition]="'after'" id="appleMenu">
            <fdp-menu-item (itemSelect)="onSelect('Braeburn')">Braeburn</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Fuji')">Fuji</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Honey Crisp')">Honey Crisp</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #bananaMenu [xPosition]="'after'" id="bananaMenu">
            <fdp-menu-item (itemSelect)="onSelect('Cavandish')">Cavandish</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Lady Finger')">Lady Finger</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Red')">Red</fdp-menu-item>
        </fdp-menu> `
})
class CascadingAfterRTLMenuComponent {
    @ViewChild('button', { static: false }) button: ElementRef<HTMLElement>;
    @ViewChild(MenuTriggerDirective, { static: false }) trigger: MenuTriggerDirective;
    @ViewChild(MenuComponent, { static: false }) menu: MenuComponent;
    @ViewChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    public currentSelectedItem = '';

    constructor() { }

    onSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}
describe('Cascading Menu - Position After, RTL', () => {
    let component: CascadingAfterRTLMenuComponent;
    let fixture: ComponentFixture<CascadingAfterRTLMenuComponent>;
    let overlayContainerEl: HTMLElement;

    let button: ElementRef<HTMLElement>;
    let trigger: MenuTriggerDirective;

    const dirProvider = {
        rtl: of(true)
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule],
            declarations: [CascadingAfterRTLMenuComponent],
            providers: [
                {
                    provide: RtlService,
                    useFactory: () => dirProvider
                }
            ]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CascadingAfterRTLMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        button = component.button;
        trigger = component.trigger;
    });

    it('should be able to show sub menu on LEFT ARROW click of trigger menu item (position-after, RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS LEFT ARROW
         */
        const keyboardLeftEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft');
        items[0].dispatchEvent(keyboardLeftEvent);
        fixture.detectChanges();

        // check menu element are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);
    }));

    it('should be able to hide sub menu on RIGHT ARROW click of menu item (position-after, RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS LEFT ARROW
         */
        const keyboardLeftEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft');
        items[0].dispatchEvent(keyboardLeftEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * KEYPRESS RIGHT ARROW
         */
        const keyboardRightEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[0].dispatchEvent(keyboardRightEvent);
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
    }));
});

@Component({
    template: `<button [fdpMenuTriggerFor]="menu" #button>Fruit</button>
        <fdp-menu #menu [xPosition]="'before'">
            <fdp-menu-item [fdpMenuTriggerFor]="appleMenu">Apple</fdp-menu-item>
            <fdp-menu-item [fdpMenuTriggerFor]="bananaMenu">Banana</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Orange')">Orange</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Peach')">Peach</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #appleMenu [xPosition]="'before'" id="appleMenu">
            <fdp-menu-item (itemSelect)="onSelect('Braeburn')">Braeburn</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Fuji')">Fuji</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Honey Crisp')">Honey Crisp</fdp-menu-item>
        </fdp-menu>
        <fdp-menu #bananaMenu [xPosition]="'before'" id="bananaMenu">
            <fdp-menu-item (itemSelect)="onSelect('Cavandish')">Cavandish</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Lady Finger')">Lady Finger</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Red')">Red</fdp-menu-item>
        </fdp-menu> `
})
class CascadingBeforeRTLMenuComponent {
    @ViewChild('button', { static: false }) button: ElementRef<HTMLElement>;
    @ViewChild(MenuTriggerDirective, { static: false }) trigger: MenuTriggerDirective;
    @ViewChild(MenuComponent, { static: false }) menu: MenuComponent;
    @ViewChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    public currentSelectedItem = '';

    constructor() { }

    onSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}
describe('Cascading Menu - Position Before, RTL', () => {
    let component: CascadingBeforeRTLMenuComponent;
    let fixture: ComponentFixture<CascadingBeforeRTLMenuComponent>;
    let overlayContainerEl: HTMLElement;

    let button: ElementRef<HTMLElement>;
    let trigger: MenuTriggerDirective;

    const dirProvider = {
        rtl: of(true)
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule],
            declarations: [CascadingBeforeRTLMenuComponent],
            providers: [
                {
                    provide: RtlService,
                    useFactory: () => dirProvider
                }
            ]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CascadingBeforeRTLMenuComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        button = component.button;
        trigger = component.trigger;
    });

    it('should be able to show sub menu on RIGHT ARROW click of trigger menu item (position-before, RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS RIGHT ARROW
         */
        const keyboardRightEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');
        items[0].dispatchEvent(keyboardRightEvent);
        fixture.detectChanges();

        // check menu element are shown
        const menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);
    }));

    it('should be able to hide sub menu on LEFT ARROW click of menu item (position-before, RTL)', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        mouseClickOnElement(button.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS RIGHT ARROW
         */
        const keyboardRightEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight');
        items[0].dispatchEvent(keyboardRightEvent);
        fixture.detectChanges();

        // check menu element are shown
        let menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(2);

        /**
         * KEYPRESS LEFT ARROW
         */
        const keyboardLeftEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft');
        const subItems = overlayContainerEl.querySelectorAll('#fdp-menu-appleMenu .fd-menu__item');
        subItems[0].dispatchEvent(keyboardLeftEvent);
        fixture.detectChanges();

        menuEls = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEls.length).toBe(1);
    }));
});

@Component({
    template: `
        <button [fdpMenuTriggerFor]="menu" #fruitButton>Fruit</button>
        <button [fdpMenuTriggerFor]="menu" #snackButton>Snack</button>
        <button [fdpMenuTriggerFor]="menu" #foodButton>Food</button>
        <fdp-menu #menu>
            <fdp-menu-item (itemSelect)="onSelect('Apple')">Apple</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Banana')">Banana</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Orange')">Orange</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onSelect('Peach')">Peach</fdp-menu-item>
        </fdp-menu> `
})
class MultipleTriggersMenuComponent {
    @ViewChild('fruitButton') fruitButton: ElementRef<HTMLElement>;
    @ViewChild('snackButton') snackButton: ElementRef<HTMLElement>;
    @ViewChild('foodButton') foodButton: ElementRef<HTMLElement>;
    @ViewChild(MenuComponent) menu: MenuComponent;
    @ViewChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

    public currentSelectedItem = '';

    constructor() { }

    onSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}
describe('Multiple triggers sharing same menu', () => {
    let component: MultipleTriggersMenuComponent;
    let fixture: ComponentFixture<MultipleTriggersMenuComponent>;
    let overlayContainerEl: HTMLElement;

    const dirProvider = {
        rtl: of(false)
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule],
            declarations: [MultipleTriggersMenuComponent],
            providers: [
                {
                    provide: RtlService,
                    useFactory: () => dirProvider
                }
            ]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultipleTriggersMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open menu on click of different triggers attached to same menu', fakeAsync(() => {
        /**
         * CLICK ON FIRST BUTTON
         */
        mouseClickOnElement(component.fruitButton.nativeElement);
        tick(10);
        fixture.detectChanges();

        // check menu element is shown
        let menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBeGreaterThan(0);

        /**
         * CLICK ON SECOND BUTTON
         */
        mouseClickOnElement(component.snackButton.nativeElement);
        tick(10);
        fixture.detectChanges();

        // check menu element is shown
        menuEl = overlayContainerEl.querySelectorAll('.fd-menu');
        expect(menuEl.length).toBeGreaterThan(0);
    }));

});
