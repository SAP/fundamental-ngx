import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    QueryList,
    ViewChildren
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';

import { SelectableItemToken } from './selectable-item.token';
import { SelectionService } from './selection.service';
import { SelectComponentRootToken } from './select-component-root.token';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[testDirective]'
})
class TestDirective implements SelectableItemToken<HTMLElement, string> {
    @Input('testDirective') value!: string;
    selected!: boolean;

    clicked = new EventEmitter();

    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    @HostListener('click')
    @HostListener('keydown.enter')
    @HostListener('keydown.space')
    onClick(): void {
        this.clicked.emit();
    }

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(isSelected: boolean): void {
        this.selected = isSelected;
    }
}

@Component({
    template: `
        <div testDirective="1" id="value1" tabindex="0"></div>
        <div testDirective="2" id="value2" tabindex="0"></div>
        <div testDirective="3" id="value3" tabindex="0"></div>
    `,
    providers: [SelectionService]
})
class HostComponent implements SelectComponentRootToken<string>, AfterViewInit {
    value: string | string[] = '3';
    disabled!: boolean;
    multiple = true;
    toggle = false;
    selectedChange = new Subject<string | string[]>();
    @ViewChildren(TestDirective) items!: QueryList<TestDirective>;

    constructor(public readonly selectionService: SelectionService<HTMLElement, string>) {
        selectionService.registerRootComponent(this);
        selectionService.setValue(this.value);
    }

    onChange(value: string | string[]): void {
        this.value = value;
    }

    ngAfterViewInit(): void {
        this.selectionService.initialize(this.items);
    }
}

describe('SelectionService', () => {
    let component: HostComponent;
    let selectionService: SelectionService<HTMLElement, string>;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, TestDirective]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        selectionService = component.selectionService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update value when clicked', () => {
        const value1Element = fixture.elementRef.nativeElement.querySelector('#value1');
        component.multiple = false;
        const onChangeSpy = jest.spyOn(component, 'onChange');
        value1Element.click();
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(onChangeSpy).toHaveBeenCalledWith('1');
    });

    it('should update selected state of child when setValue is called', () => {
        selectionService.setValue(['1', '3']);
        const items = component.items.toArray();
        expect(items[0].selected).toBe(true);
        expect(items[1].selected).toBe(false);
        expect(items[2].selected).toBe(true);
    });

    it('should respect multiple property of host component', () => {
        component.multiple = false;
        selectionService.setValue(['1', '3']);
        const items = component.items.toArray();
        expect(items[0].selected).toBe(true);
        expect(items[1].selected).toBe(false);
        expect(items[2].selected).toBe(false);
    });

    it('should respect toggle property of host component', () => {
        component.multiple = false;
        component.toggle = true;
        selectionService.setValue('1');
        const items = component.items.toArray();
        items[0].elementRef().nativeElement.click();
        expect(items.every(({ selected }) => !selected)).toBe(true);
    });

    it('should listen to the SPACE click', () => {
        const items = component.items.toArray();
        const event = new KeyboardEvent('keydown', {
            key: 'Space',
            keyCode: SPACE
        });
        items[0].elementRef().nativeElement.dispatchEvent(event);

        expect(items[0].selected).toBe(true);
    });

    it('should listen to the ENTER click', () => {
        const items = component.items.toArray();
        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            keyCode: ENTER
        });
        items[0].elementRef().nativeElement.dispatchEvent(event);

        expect(items[0].selected).toBe(true);
    });
});
