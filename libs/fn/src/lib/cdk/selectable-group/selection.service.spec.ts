import { SelectableItemToken, SelectComponentRootToken, SelectionService } from '@fundamental-ngx/fn/cdk';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AfterViewInit, Component, Directive, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { SPACE, ENTER } from '@angular/cdk/keycodes';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[testDirective]'
})
class TestDirective implements SelectableItemToken<string> {
    @Input('testDirective') value!: string;
    selected!: boolean;

    constructor(private _elementRef: ElementRef<HTMLElement>) {}

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
    value = '3';
    disabled!: boolean;
    multiple = true;
    toggle = false;
    @ViewChildren(TestDirective) items!: QueryList<TestDirective>;

    constructor(public readonly selectionService: SelectionService) {
        selectionService.registerRootComponent(this);
        selectionService.setValue(this.value);
    }

    onChange(value: string): void {
        this.value = value;
    }

    ngAfterViewInit(): void {
        this.selectionService.initialize(this.items);
    }
}

describe('SelectionService', () => {
    let component: HostComponent;
    let selectionService: SelectionService;
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
        const onChangeSpy = spyOn(component, 'onChange');
        value1Element.click();
        expect(onChangeSpy).toHaveBeenCalledOnceWith('1');
    });

    it('should update selected state of child when setValue is called', () => {
        selectionService.setValue(['1', '3']);
        const items = component.items.toArray();
        expect(items[0].selected).toBeTrue();
        expect(items[1].selected).toBeFalse();
        expect(items[2].selected).toBeTrue();
    });

    it('should respect multiple property of host component', () => {
        component.multiple = false;
        selectionService.setValue(['1', '3']);
        const items = component.items.toArray();
        expect(items[0].selected).toBeTrue();
        expect(items[1].selected).toBeFalse();
        expect(items[2].selected).toBeFalse();
    });

    it('should respect toggle property of host component', () => {
        component.multiple = false;
        component.toggle = true;
        selectionService.setValue('1');
        const items = component.items.toArray();
        items[0].elementRef().nativeElement.click();
        expect(items.every(({ selected }) => !selected)).toBeTrue();
    });

    it('should listen to the SPACE click', () => {
        const items = component.items.toArray();
        const event = new KeyboardEvent('keydown', {
            keyCode: SPACE
        });
        items[0].elementRef().nativeElement.dispatchEvent(event);

        expect(items[0].selected).toBeTrue();
    });

    it('should listen to the ENTER click', () => {
        const items = component.items.toArray();
        const event = new KeyboardEvent('keydown', {
            keyCode: ENTER
        });
        items[0].elementRef().nativeElement.dispatchEvent(event);

        expect(items[0].selected).toBeTrue();
    });
});
