import { ViewChild, Component, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { SelectSelectionModelService } from './select-selection-model.service';
import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';

@Component({
    template: `
    <fd-select [(value)]="value" formControlName="selectControl" (isOpenChange)="onOpen($event)">
        <fd-option id="option-1" [value]="'value-1'">Test1</fd-option>
        <fd-option id="option-2" [value]="'value-2'">Test2</fd-option>
        <fd-option id="option-3" [value]="'value-3'">Test3</fd-option>
        <fd-option id="option-4" [disabled]="disabled" [value]="'value-4'">Test4</fd-option>
    </fd-select>
`,
    providers: [SelectSelectionModelService]
})
class SelectTestComponent {

    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    value: string;

    isOpen: boolean;

    onOpen(isOpen: boolean): void {
        this.isOpen = isOpen;
    }

    constructor(public modelService: SelectSelectionModelService) { }
}

describe('SelectSelectionModelService', () => {
    let service: SelectSelectionModelService;
    let _component: SelectTestComponent;
    let fixture: ComponentFixture<SelectTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SelectModule],
            declarations: [SelectTestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SelectTestComponent);
        _component = fixture.componentInstance;
        fixture.detectChanges();
        service = _component.selectComponent._selectionService;
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should empty a selection model', () => {
        service._selectionModel = null;
        fixture.detectChanges();
        expect((service).empty).toBeTruthy();
    });

    it('should clear a selection model', () => {
        spyOn(<any>service, 'clear');
        fixture.detectChanges();
        service.clear();
        expect(service.clear).toHaveBeenCalled();
        fixture.detectChanges();
        expect((service).empty).toBeTruthy();
    });

});
