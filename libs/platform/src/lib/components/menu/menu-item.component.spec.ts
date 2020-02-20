import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';
import { By } from '@angular/platform-browser';
import { MenuKeyboardService, IconModule } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-test-component',
    template: `
        <div>
            <fdp-menu-item
                [label]="label"
                [index]="index"
                [selectable]="selectable"
                [selected]="selected"
                [icon]="icon"
                [itemWidth]="itemWidth"
                (itemClick)="onItemClick($event)"
            ></fdp-menu-item>
        </div>
    `
})
class TestComponent {
    @Input()
    public label: string;
    @Input()
    public index: string;
    @Input()
    public selectable = false;
    @Input()
    public selected = false;
    @Input()
    public icon: string;

    @Input()
    public itemWidth: string;

    @ViewChild(MenuItemComponent)
    menuItem: MenuItemComponent;

    public itemClicked = false;

    constructor() { }

    onItemClick() {
        this.itemClicked = true;
    }
}

describe('MenuItemComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IconModule],
            declarations: [TestComponent, MenuItemComponent],
            providers: [MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display the label', () => {
        component.label = 'First Item';
        fixture.detectChanges();

        let button = fixture.debugElement.query(By.css('[data-tag="menu-item__button"]'));
        expect(button.nativeElement.textContent).toBe(' First Item ');

        component.label = 'New Item';
        fixture.detectChanges();

        button = fixture.debugElement.query(By.css('[data-tag="menu-item__button"]'));
        expect(button.nativeElement.textContent).toBe(' New Item ');
    });

    it('should accept an "index" attribute', () => {
        component.label = 'New Item';
        component.index = '1';
        fixture.detectChanges();

        let menuItem = fixture.debugElement.query(By.css('[data-tag="menu-item"]'));
        expect(menuItem.nativeElement.attributes['data-index'].value).toBe('1');

        component.index = '8';
        fixture.detectChanges();

        menuItem = fixture.debugElement.query(By.css('[data-tag="menu-item"]'));
        expect(menuItem.nativeElement.attributes['data-index'].value).toBe('8');
    });

    it('should invoke callback on click', () => {
        component.label = 'New Item';
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('[data-tag="menu-item__button"]'));
        button.nativeElement.click();

        expect(component.itemClicked).toBeTruthy();
    });

    it('should use "selectable" template if item is selectable', () => {
        component.label = 'Selectable Item';
        component.index = '1';
        component.selectable = true;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('[data-tag="menu-item"]'));
        expect(button.nativeElement.attributes['aria-selected'].value).toBe('false');
    });

    it('should allow for icons to be added', () => {
        component.icon = 'lightbulb';
        component.label = 'Icon Item';
        component.index = '1';
        fixture.detectChanges();

        const icon = fixture.debugElement.query(By.css('[data-tag="menu-item__icon-before"]'));
        expect(icon).not.toBeNull();
        expect(icon.nativeElement.classList.contains('sap-icon--lightbulb')).toBeTruthy();
    });

    it('should allow for alternative select icons to be added', () => {
        component.icon = 'lightbulb';
        component.label = 'Icon Item';
        component.index = '1';
        component.selectable = true;
        component.selected = true;
        fixture.detectChanges();

        const icon = fixture.debugElement.query(By.css('[data-tag="menu-item__icon-before"]'));
        expect(icon).not.toBeNull();
        expect(icon.nativeElement.classList.contains('sap-icon--lightbulb')).toBeTruthy();
    });

    it('should call handleKeyboardEvent on keypress', () => {
        component.label = 'New Item';
        component.index = '1';
        fixture.detectChanges();

        spyOn(component.menuItem, 'handleKeyboardEvent');
        const event: any = { code: 'ArrowDown', preventDefault: () => { } };

        component.menuItem.handleKeyboardEvent(event);
        expect(component.menuItem.handleKeyboardEvent).toHaveBeenCalled();
    });
});
