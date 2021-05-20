import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed, inject, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Component, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonModule, RtlService, IconModule } from '@fundamental-ngx/core';
import { createKeyboardEvent } from '../../testing/event-objects';
import { ENTER } from '@angular/cdk/keycodes';
import { PlatformMenuModule } from '../menu/menu.module';
import { MenuButtonComponent } from './menu-button.component';
import { MenuItemComponent } from './../menu/menu-item.component';

function mouseClickOnElement(el: Element): void {
    const event: MouseEvent = new MouseEvent('click', {
        detail: 1
    });
    el.dispatchEvent(event);
}

describe('MenuButtonComponent', () => {
    let component: MenuButtonComponent;
    let fixture: ComponentFixture<MenuButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule],
            declarations: [MenuButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('button onclick should be called', () => {
        spyOn(component, 'onButtonClick');
        component.onButtonClick(event);
        expect(component.onButtonClick).toHaveBeenCalled();
    });
});

/** Disabled menu button test */
@Component({
    selector: 'fdp-disabled-menu-button',
    template: `
        <fdp-menu-button [contentDensity]="size" [disabled]="disabled" [type]="type">
            Standard Button with long text
        </fdp-menu-button>
    `
})
class DisabledMenuButtonComponent {
    @Input()
    size = 'compact';

    @Input()
    disabled = true;

    @Input()
    type = 'standard';

    constructor() { }
}

describe('Menu Button Disabled test and Type, size test', () => {
    let component: DisabledMenuButtonComponent;
    let fixture: ComponentFixture<DisabledMenuButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule],
            declarations: [DisabledMenuButtonComponent, MenuButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DisabledMenuButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('button should be disabled', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('button'));
        expect(menubuttonElement.nativeElement.hasAttribute('disabled')).toEqual(true);
    });

    it('button should be standard and contain Menu', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('button'));
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--standard')).toBeTrue();
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--menu')).toBeTrue();
        expect(menubuttonElement.nativeElement.classList.contains('fd-button')).toBeTrue();
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--compact')).toBeTrue();
    });
});

/** menu button click test */
@Component({
    selector: 'fdp-menu-button-click',
    template: `
        <fdp-menu-button
            [contentDensity]="size"
            [disabled]="disabled"
            [type]="type"
            [fdpMenuTriggerFor]="basicMenu"
            (click)="clicked($event)"
        >
            Standard Button with long text
        </fdp-menu-button>

        <fdp-menu #basicMenu id="basic-menu">
            <fdp-menu-item (itemSelect)="onItemSelect('First Item')">First Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Second Item')">Second Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Third Item')">Third Item</fdp-menu-item>
        </fdp-menu>
    `
})
class TestMenuButtonComponent {
    @Input()
    size = 'compact';

    @Input()
    disabled = false;

    @Input()
    type = 'standard';

    currentSelectedItem = '';

    @ViewChild(MenuButtonComponent, { static: true })
    component: MenuButtonComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    public menuButtonClicked = false;

    clicked(event: any): void {
        this.menuButtonClicked = true;
    }

    onItemSelect(item: string): void {
        this.currentSelectedItem = item;
    }
    constructor() { }
}

describe('Menu Button click on Item select', () => {
    let host: TestMenuButtonComponent;
    let fixture: ComponentFixture<TestMenuButtonComponent>;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule],
            declarations: [TestMenuButtonComponent, MenuButtonComponent],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuButtonComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('clicked function should be called', () => {
        spyOn(host, 'clicked');
        host.clicked(event);
        expect(host.clicked).toHaveBeenCalled();
    });

    it('buttonclick should change variable value', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('fdp-menu-button'));
        mouseClickOnElement(menubuttonElement.nativeElement);
        fixture.detectChanges();
        expect(host.menuButtonClicked).toBeTruthy();
    });

    it('select item on click', fakeAsync(() => {
        /**
         * FIRST-CLICK (OPEN MENU)
         */
        const menubutton = fixture.debugElement.query(By.css('fdp-menu-button'));
        mouseClickOnElement(menubutton.nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();
        expect(host.currentSelectedItem).toBe('First Item');
    }));
});
