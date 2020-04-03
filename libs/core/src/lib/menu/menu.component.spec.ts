import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MenuModule } from './menu.module';
import { MenuKeyboardService } from './menu-keyboard.service';
import { MenuItemDirective } from './directives/menu-item.directive';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu fd-menu-addon>
            <ul fd-menu-list>
                <li fd-menu-item #element1>
                    <div fd-menu-item-addon></div>
                    Option 1
                </li>
                <li fd-menu-item #element2>
                    Option 2
                </li>
                <li fd-menu-item #element3>
                    Option 3
                </li>
            </ul>
            <ul fd-menu-list>
                <li fd-menu-item #element4>
                    Option 4
                </li>
            </ul>
        </fd-menu>
        <a href="#" #elementOutOfScope>OutOfScope</a>
    `
})
export class TestMenuComponent implements AfterViewInit {
    @ViewChild('element1') element1: ElementRef;
    @ViewChild('element2') element2: ElementRef;
    @ViewChild('element3') element3: ElementRef;
    @ViewChild('element4') element4: ElementRef;
    @ViewChild('elementOutOfScope') elementOutOfScope: ElementRef;
    @ViewChildren(MenuItemDirective)
    menuItems: QueryList<MenuItemDirective>;
    public ngAfterViewInit(): void {}
}

describe('MenuComponent', () => {
    let items: QueryList<MenuItemDirective>;
    let fixture: ComponentFixture<TestMenuComponent>;
    let elements: ElementRef[];
    let elementOutOfScope: ElementRef;
    let service: MenuKeyboardService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MenuModule],
            declarations: [TestMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        fixture.detectChanges();
        const componentInstance = fixture.componentInstance;
        elements = [
            componentInstance.element1,
            componentInstance.element2,
            componentInstance.element3,
            componentInstance.element4
        ];
        elementOutOfScope = fixture.componentInstance.elementOutOfScope;
        items = fixture.componentInstance.menuItems;
        service = new MenuKeyboardService();
    });

    it('should focus first element', () => {
        const list = elements.map((element) => element.nativeElement);
        spyOn(list[0], 'focus');
        fixture.componentInstance.menuItems.first.focus();
        expect(list[0].focus).toHaveBeenCalled();
    });

    it('should focus second element', () => {
        const list = elements.map((element) => element.nativeElement);
        spyOn(list[1], 'focus');
        const event: any = { key: 'ArrowDown', preventDefault: () => {} };
        service.keyDownHandler(event, 0, items.toArray());
        expect(list[1].focus).toHaveBeenCalled();
    });

    it('Should use default function and select last element, when encounter a beginning and arrow up', () => {
        const list = elements.map((element) => element.nativeElement);
        spyOn(list[3], 'focus');
        const event: any = { key: 'ArrowUp', preventDefault: () => {} };
        service.keyDownHandler(event, 0, items.toArray());
        expect(list[3].focus).toHaveBeenCalled();
    });

    it('Should use custom after focus function which and focus out of scope element', () => {
        const _elementOutOfScope = elementOutOfScope.nativeElement;
        service.focusEscapeAfterList = () => {
            _elementOutOfScope.focus();
        };
        spyOn(_elementOutOfScope, 'focus');
        const event: any = { key: 'ArrowDown', preventDefault: () => {} };
        service.keyDownHandler(event, 3, items.toArray());
        expect(_elementOutOfScope.focus).toHaveBeenCalled();
    });

    it('Should use custom before focus function which and focus out of scope element', () => {
        const _elementOutOfScope = elementOutOfScope.nativeElement;
        service.focusEscapeBeforeList = () => {
            _elementOutOfScope.focus();
        };
        spyOn(_elementOutOfScope, 'focus');
        const event: any = { key: 'ArrowUp', preventDefault: () => {} };
        service.keyDownHandler(event, 0, items.toArray());
        expect(_elementOutOfScope.focus).toHaveBeenCalled();
    });
});
