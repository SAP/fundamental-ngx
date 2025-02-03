import { Component, Input, NO_ERRORS_SCHEMA, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonType } from '@fundamental-ngx/core/button';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { MenuItemComponent, PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { MenuButtonComponent } from './menu-button.component';
import { PlatformMenuButtonModule } from './menu-button.module';

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
    `,
    standalone: true,
    imports: [PlatformMenuButtonModule]
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
            imports: [DisabledMenuButtonComponent],
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
            (click)="clicked()"
        >
            Standard Button with long text
        </fdp-menu-button>

        <fdp-menu #basicMenu id="basic-menu">
            <fdp-menu-item (itemSelect)="onItemSelect('First Item')">First Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Second Item')">Second Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Third Item')">Third Item</fdp-menu-item>
        </fdp-menu>
    `,
    standalone: true,
    imports: [PlatformMenuModule, PlatformMenuButtonModule]
})
class TestMenuButtonComponent {
    @Input()
    size: ContentDensityMode = ContentDensityMode.COMPACT;

    @Input()
    disabled = false;

    @Input()
    type: ButtonType = 'standard';

    @ViewChild(MenuButtonComponent, { static: true })
    component: MenuButtonComponent;

    @ViewChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    currentSelectedItem = '';

    menuButtonClicked = false;

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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestMenuButtonComponent],
            providers: [RtlService]
        }).compileComponents();
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
});
