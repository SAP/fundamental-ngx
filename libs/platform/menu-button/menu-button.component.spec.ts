import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ENTER } from '@angular/cdk/keycodes';

import { ButtonType } from '@fundamental-ngx/core/button';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { createKeyboardEvent } from '@fundamental-ngx/platform/shared';
import { MenuItemComponent, PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { MenuButtonComponent } from './menu-button.component';
import { PlatformMenuButtonModule } from './menu-button.module';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

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
            imports: [PlatformMenuButtonModule],
            schemas: [NO_ERRORS_SCHEMA]
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
        jest.spyOn(component, 'onButtonClick');
        component.onButtonClick({});
        expect(component.onButtonClick).toHaveBeenCalled();
    });
});

/** Disabled menu button test */
@Component({
    selector: 'fdp-disabled-menu-button',
    template: `
        <fdp-menu-button [fdContentDensity]="size" [disabled]="disabled" [type]="type">
            Standard Button with long text
        </fdp-menu-button>
    `
})
class DisabledMenuButtonComponent {
    @Input()
    size: ContentDensityMode = ContentDensityMode.COMPACT;

    @Input()
    disabled = true;

    @Input()
    type: ButtonType = 'standard';

    constructor() {}
}

describe('Menu Button Disabled test and Type, size test', () => {
    let component: DisabledMenuButtonComponent;
    let fixture: ComponentFixture<DisabledMenuButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuButtonModule],
            declarations: [DisabledMenuButtonComponent],
            schemas: [NO_ERRORS_SCHEMA]
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
        const menubuttonElement = fixture.debugElement.query(By.css('fdp-menu-button'));
        expect(menubuttonElement.nativeElement.classList.contains('fd-menu-button--disabled')).toBe(true);
    });

    it('button should be standard and contain Menu', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('button'));
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--standard')).toBe(true);
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--menu')).toBe(true);
        expect(menubuttonElement.nativeElement.classList.contains('fd-button')).toBe(true);
        expect(menubuttonElement.nativeElement.classList.contains('is-compact')).toBe(true);
    });
});

/** menu button click test */
@Component({
    selector: 'fdp-menu-button-click',
    template: `
        <fdp-menu-button
            [fdContentDensity]="size"
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
    size: ContentDensityMode = ContentDensityMode.COMPACT;

    @Input()
    disabled = false;

    @Input()
    type: ButtonType = 'standard';

    currentSelectedItem = '';

    @ViewChild(MenuButtonComponent, { static: true })
    component: MenuButtonComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    public menuButtonClicked = false;

    constructor() {}

    clicked(): void {
        this.menuButtonClicked = true;
    }

    onItemSelect(item: string): void {
        this.currentSelectedItem = item;
    }
}

describe('Menu Button click on Item select', () => {
    let host: TestMenuButtonComponent;
    let fixture: ComponentFixture<TestMenuButtonComponent>;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformMenuModule, PlatformMenuButtonModule],
            declarations: [TestMenuButtonComponent],
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
        jest.spyOn(host, 'clicked');
        host.clicked();
        expect(host.clicked).toHaveBeenCalled();
    });

    it('buttonclick should change variable value', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('fdp-menu-button'));
        mouseClickOnElement(menubuttonElement.nativeElement);
        fixture.detectChanges();
        expect(host.menuButtonClicked).toBeTruthy();
    });

    // Skip this test for now, because it is not working
    xit('select item on click', fakeAsync(() => {
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
