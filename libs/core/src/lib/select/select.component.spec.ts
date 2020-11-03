import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';
import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';
import { OptionComponent } from './option/option.component';

@Component({
    template: `
        <fd-select [(value)]="value" formControlName="selectControl">
            <fd-option id="option-1" [value]="'value-1'">Test1</fd-option>
            <fd-option id="option-2" [value]="'value-2'">Test2</fd-option>
            <fd-option id="option-3" [value]="'value-3'">Test3</fd-option>
            <fd-option id="option-4" *ngIf="optionVisible" [value]="'value-4'">Test4</fd-option>
        </fd-select>
    `
})
class TestWrapperComponent {
    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    @ViewChildren(OptionComponent)
    optionComponents: QueryList<OptionComponent>;

    value: string;

    optionVisible = true;
}

describe('SelectComponent', () => {
    let element: ElementRef;
    let component: SelectComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [SelectModule]
        })
            .overrideComponent(SelectComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .overrideComponent(PopoverComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.selectComponent;
        element = fixture.componentInstance.selectElement;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<any> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open', async () => {
        spyOn(component.isOpenChange, 'emit');
        component.open();

        fixture.detectChanges();

        expect(component.isOpen).toBeTruthy()
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(true)
    });

    it('should close', async () => {
        component.open();

        fixture.detectChanges();

        spyOn(component.isOpenChange, 'emit');

        component.close()

        expect(component.isOpen).toBeFalsy()
        expect(component.isOpenChange.emit).toHaveBeenCalledWith(false)
    });


    it('should start closed', () => {
        expect(fixture.nativeElement.querySelector('#option-1')).toBeFalsy();
    });

    it('should open on click', async () => {
        component.close();
        element.nativeElement.querySelector('.fd-button').click();

        await wait(fixture);

        expect(component.isOpen).toBe(true);
    });

    it('should close on click while open', async () => {
        component.open();

        await wait(fixture);
        fixture.detectChanges();

        element.nativeElement.querySelector('.fd-button').click();

        await wait(fixture);
        fixture.detectChanges();

        expect(component.isOpen).toBe(false);
    });

    it('should select an option', async () => {
        spyOn(component.valueChange, 'emit').and.callThrough();
        component.open();

        await wait(fixture);
        fixture.detectChanges();

        fixture.componentInstance.optionComponents.first.selectionHandler();

        await wait(fixture);
        fixture.detectChanges();

        expect(fixture.componentInstance.value).toBe('value-1');
        expect(component.valueChange.emit).toHaveBeenCalledWith('value-1');
    });

    it('should be disabled', async () => {
        component.disabled = true;

        await wait(fixture);
        fixture.detectChanges();

        element.nativeElement.querySelector('.fd-button').click();

        await wait(fixture);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#option-1')).toBeFalsy();
    });

    it('should change value programmatically', async () => {
        const testValue = 'value-1';
        fixture.componentInstance.value = testValue;

        await wait(fixture);

        expect(component.selected).toBeTruthy();
        expect(component.selected.value).toBe(testValue);
        expect(component.options.find(option => option.value === testValue).selected).toBe(true);
    });

    it('Should unselect option', async () => {
        const selectValue = 'value-4';
        component.unselectMissingOption = true;
        fixture.componentInstance.optionVisible = true;

        fixture.componentInstance.value = selectValue;

        await wait(fixture);
        fixture.detectChanges();

        fixture.componentInstance.optionVisible = false;

        await wait(fixture);
        fixture.detectChanges();

        expect(fixture.componentInstance.value).toBe(undefined);
    });

    it('Should not unselect option', async () => {
        const selectValue = 'value-4';
        component.unselectMissingOption = false;
        fixture.componentInstance.optionVisible = true;

        fixture.componentInstance.value = selectValue;

        await wait(fixture);

        fixture.componentInstance.optionVisible = false;

        await wait(fixture);

        expect(fixture.componentInstance.value).toBe(selectValue);
    });

    it('Should focus first when no selected value', fakeAsync(() => {
        component.open();

        fixture.detectChanges();
        tick(100);

        expect(document.activeElement).toBe(component.options.first.getHtmlElement());
    }));

    it('Should focus selected', fakeAsync(() => {
        fixture.componentInstance.value = 'value-2';

        fixture.detectChanges();
        tick();

        component.open();

        fixture.detectChanges();
        tick(100);

        expect(document.activeElement).toBe(component.selected.getHtmlElement());
    }));

    it('Should support arrows navigation', fakeAsync(() => {
        const options: any = component.options.toArray();
        component.open();

        fixture.detectChanges();
        tick(100);

        expect(document.activeElement).toBe(options[0].getHtmlElement());

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        fixture.detectChanges();
        tick();

        expect(document.activeElement).toBe(options[1].getHtmlElement());

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        fixture.detectChanges();
        tick();

        expect(document.activeElement).toBe(options[0].getHtmlElement());
    }));

    it('Should support opening and closing with keyboard', async () => {
        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

        await wait(fixture);

        expect(component.isOpen).toBeTrue();

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

        await wait(fixture);

        expect(component.isOpen).toBeFalse();

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

        await wait(fixture);

        expect(component.isOpen).toBeTrue();
    });

    it('Should support alphanumerical keys selection', async () => {
        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyV' }));

        await wait(fixture);

        expect(component.selected.value).toEqual('value-1');

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyV' }));

        await wait(fixture);

        expect(component.selected.value).toEqual('value-2');

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        await wait(fixture);

        expect(component.selected.value).toEqual('value-3');
    });

    it('Should support alphanumerical keys focus', fakeAsync(() => {
        fixture.componentInstance.value = 'value-1';
        component.open();

        fixture.detectChanges();
        tick();

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyT' }));

        fixture.detectChanges();
        tick(component.typeaheadDebounceInterval + 1);

        expect(document.activeElement).toBe(component['_options'][1].getHtmlElement());

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyT' }));

        fixture.detectChanges();
        tick(component.typeaheadDebounceInterval + 1);

        expect(document.activeElement).toBe(component['_options'][2].getHtmlElement());

        component['_elementRef'].nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        fixture.detectChanges();
        tick(component.typeaheadDebounceInterval + 1);

        expect(document.activeElement).toBe(component['_options'][1].getHtmlElement());
    }));
});
