import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedButtonComponent } from '@fundamental-ngx/fn/segmented-button';
import { Component, Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { SelectableItemToken } from '@fundamental-ngx/fn/cdk';
import { Observable } from 'rxjs';

@Directive({
    selector: '[fnTestSelection]',
    providers: [{ provide: SelectableItemToken, useExisting: TestSelectionDirective }]
})
class TestSelectionDirective implements SelectableItemToken<string> {
    @Input('fnTestSelection') value!: string;
    selected = false;

    clicked: Observable<MouseEvent | KeyboardEvent> = new Observable<MouseEvent | KeyboardEvent>();

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
        <fn-segmented-button [(selected)]="selectedItem" [multiple]="multiple" [toggle]="toggle" [disabled]="disabled">
            <button fnTestSelection="value1" id="value1"></button>
            <button fnTestSelection="value2" id="value2"></button>
            <button fnTestSelection="value2" id="value2"></button>
        </fn-segmented-button>
    `
})
class HostComponent {
    @ViewChild(SegmentedButtonComponent, { static: false }) segmentedComponent!: SegmentedButtonComponent;
    selectedItem: string | string[] = 'value1';
    multiple = false;
    toggle = false;
    disabled = false;
}

describe('SegmentedButtonComponent', () => {
    let component: SegmentedButtonComponent;
    let hostComponent: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HostComponent, SegmentedButtonComponent, TestSelectionDirective]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        hostComponent = fixture.componentInstance;
        component = hostComponent.segmentedComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update selected when selectable item is clicked', () => {
        const selectableItem = fixture.elementRef.nativeElement.querySelector('#value2');
        selectableItem.click();
        expect(hostComponent.selectedItem).toEqual('value2');
    });

    it('should toggle', () => {
        component.toggle = true;
        const selectableItem = fixture.elementRef.nativeElement.querySelector('#value1');
        selectableItem.click();
        expect(hostComponent.selectedItem).toBeFalsy();
    });

    it('should select multiple values', () => {
        component.multiple = true;
        const selectableItem = fixture.elementRef.nativeElement.querySelector('#value2');
        selectableItem.click();
        expect(hostComponent.selectedItem).toEqual(['value2', 'value1']);
    });
});
