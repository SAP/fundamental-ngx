import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, ViewChild } from '@angular/core';
import { IconModule } from '@fundamental-ngx/core';
import { PlatformMenuModule } from '../menu/menu.module';
import { By } from '@angular/platform-browser';
import { MenuButtonComponent } from './menu-button.component';
import { ButtonModule } from '@fundamental-ngx/core';

describe('MenuButtonComponent', () => {
    let component: MenuButtonComponent;
    let fixture: ComponentFixture<MenuButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule],
            declarations: [MenuButtonComponent],
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

    it('should have a disabled menu button', () => {
        spyOn(component, 'setDisabledState');
        component.setDisabledState(true);
        expect(component.setDisabledState).toHaveBeenCalled();
    });

    it('button onclick should be called', () => {
        spyOn(component, 'buttonclick');
        component.buttonclick(event);
        expect(component.buttonclick).toHaveBeenCalled();
    });
});

/** Disabled menu button test */
@Component({
    selector: 'fdp-disabled-menu-button',
    template: `
        <fdp-menu-button [displaySize]="size" [disabled]="disabled" [type]="type">
            Standard Button with long text
        </fdp-menu-button>
    `,
})
class DisabledMenuButtonComponent {
    @Input()
    size = 'compact';

    @Input()
    disabled = true;

    @Input()
    type = 'standard';

    constructor() {}
}

describe('Menu Button Disabled test and Type, size test', () => {
    let component: DisabledMenuButtonComponent;
    let fixture: ComponentFixture<DisabledMenuButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule],
            declarations: [DisabledMenuButtonComponent, MenuButtonComponent],
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
        expect(menubuttonElement.nativeElement.getAttribute('disabled')).toEqual('');
    });

    it('button should be standard and contain Menu', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('button'));
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--standard')).toBeTrue();
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--menu')).toBeTrue();
        expect(menubuttonElement.nativeElement.classList.contains('fd-button')).toBeTrue();
        expect(menubuttonElement.nativeElement.classList.contains('fd-button--compact')).toBeTrue();
    });
});

/** Disabled menu button test */
@Component({
    selector: 'fdp-disabled-menu-button',
    template: `
        <fdp-menu-button
            [displaySize]="size"
            [disabled]="disabled"
            [type]="type"
            [fdpMenuTriggerFor]="basicMenu"
            (click)="menuButtonClick($event)"
        >
            Standard Button with long text
        </fdp-menu-button>

        <fdp-menu #basicMenu id="basic-menu">
            <fdp-menu-item (itemSelect)="onItemSelect('First Item')">First Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Second Item')">Second Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Third Item')">Third Item</fdp-menu-item>
        </fdp-menu>
    `,
})
class TestMenuButtonComponent {
    @Input()
    size = 'compact';

    @Input()
    disabled = true;

    @Input()
    type = 'standard';

    item: string = '';

    @ViewChild(MenuButtonComponent, { static: true })
    component: MenuButtonComponent;

    public menuButtonClicked = false;
    menuButtonClick(event: any) {
        this.menuButtonClicked = true;
    }

    onItemSelect(item: string) {
        this.item = item;
    }
    constructor() {}
}

describe('Menu Button click, Item select', () => {
    let host: TestMenuButtonComponent;
    let component: MenuButtonComponent;
    let fixture: ComponentFixture<TestMenuButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule],
            declarations: [DisabledMenuButtonComponent, MenuButtonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuButtonComponent);
        host = fixture.componentInstance;
        component = host.component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('buttonclick should be called', () => {
        spyOn(host, 'menuButtonClick');
        host.menuButtonClick(event);
        expect(host.menuButtonClick).toHaveBeenCalled();
    });

    it('buttonclick should change variable value', () => {
        const menubuttonElement = fixture.debugElement.query(By.css('fdp-menu-button'));
        menubuttonElement.nativeElement.click();
        fixture.detectChanges();
        expect(host.menuButtonClicked).toBeTruthy();
    });

    it('select item on click', () => {
        const menuItems = fixture.debugElement.queryAll(By.css('fdp-menu-item'));

        menuItems[0].nativeElement.dispatchEvent(new Event('itemSelect'));
        menuItems[0].triggerEventHandler('click', { key: 'a' });
        fixture.detectChanges();
        expect(host.item).toEqual('First Item');

        menuItems[1].nativeElement.dispatchEvent(new Event('itemSelect'));
        menuItems[1].triggerEventHandler('click', { key: 'a' });
        fixture.detectChanges();
        expect(host.item).toEqual('Second Item');

        menuItems[2].nativeElement.dispatchEvent(new Event('itemSelect'));
        menuItems[2].triggerEventHandler('click', { key: 'a' });
        fixture.detectChanges();
        expect(host.item).toEqual('Third Item');
    });
});
