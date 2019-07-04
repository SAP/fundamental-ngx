import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuModule } from './menu.module';

@Component({
    selector: 'fd-menu-test',
    template: `
        <fd-menu #menuComponent>
            <ul fd-menu-list>
                <li fd-menu-item>
                    <a #element1 [attr.href]="'#'">Option 1</a>
                </li>
                <li fd-menu-item>
                    <a #element2 [attr.href]="'#'">Option 2</a>
                </li>
                <li fd-menu-item #element3>
                    Option 3
                </li>
            </ul>
            <ul fd-menu-list>
                <li fd-menu-item>
                    <a #element4 [attr.href]="'#'">Option 4</a>
                </li>
            </ul>
        </fd-menu>
        <a href="#" #elementOutOfScope>OutOfScope</a>
    `
})
export class TestMenuComponent {
    @ViewChild('element1') element1: ElementRef;
    @ViewChild('element2') element2: ElementRef;
    @ViewChild('element3') element3: ElementRef;
    @ViewChild('element4') element4: ElementRef;
    @ViewChild('elementOutOfScope') elementOutOfScope: ElementRef;
    @ViewChild('menuComponent') menuComponent: MenuComponent;
}


describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<TestMenuComponent>;
    let elements: ElementRef[];
    let elementOutOfScope: ElementRef;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MenuModule],
            declarations: [TestMenuComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestMenuComponent);
        component = fixture.componentInstance.menuComponent;
        const componentInstance = fixture.componentInstance;
        elements = [
            componentInstance.element1,
            componentInstance.element2,
            componentInstance.element3,
            componentInstance.element4
        ];
        elementOutOfScope = fixture.componentInstance.elementOutOfScope;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should focus first element', () => {
        const list = elements.map(element => element.nativeElement);
        spyOn(list[0], 'focus');
        component.focusFirst();
        expect(list[0].focus).toHaveBeenCalled();
    });

    it('should focus second element', () => {
        const list = elements.map(element => element.nativeElement);
        spyOn(list[1], 'focus');
        const event = { code: 'ArrowDown', preventDefault: () => {} };
        component.keyDownHandler(event, 0);
        expect(list[1].focus).toHaveBeenCalled();
    });

    it('Should select fourth element, ignoring element without anchor', () => {
        const list = elements.map(element => element.nativeElement);
        spyOn(list[3], 'focus');
        const event = { code: 'ArrowDown', preventDefault: () => {} };
        component.keyDownHandler(event, 1);
        expect(list[3].focus).toHaveBeenCalled();
    });

    it('Should use default function and select last element, when encounter a beginning and arrow up', () => {
        const list = elements.map(element => element.nativeElement);
        spyOn(list[3], 'focus');
        const event = { code: 'ArrowUp', preventDefault: () => {} };
        component.keyDownHandler(event, 0);
        expect(list[3].focus).toHaveBeenCalled();
    });

    it('Should use custom after focus function which and focus out of scope element', () => {
        const _elementOutOfScope = elementOutOfScope.nativeElement;
        component.focusEscapeAfterList = () => { _elementOutOfScope.focus(); };
        spyOn(_elementOutOfScope, 'focus');
        const event = { code: 'ArrowDown', preventDefault: () => {} };
        component.keyDownHandler(event, 3);
        expect(_elementOutOfScope.focus).toHaveBeenCalled();
    });

    it('Should use custom before focus function which and focus out of scope element', () => {
        const _elementOutOfScope = elementOutOfScope.nativeElement;
        component.focusEscapeBeforeList = () => { _elementOutOfScope.focus(); };
        spyOn(_elementOutOfScope, 'focus');
        const event = { code: 'ArrowUp', preventDefault: () => {} };
        component.keyDownHandler(event, 0);
        expect(_elementOutOfScope.focus).toHaveBeenCalled();
    });
});
