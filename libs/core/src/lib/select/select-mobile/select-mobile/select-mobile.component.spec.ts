import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SelectComponent } from '../../select.component';
import { SelectMobileModule } from '../select-mobile.module';
import { SelectModule } from '../../select.module';

@Component({
    template: `
        <fd-select placeholder="Select an option" [(value)]="selectedValue" [mobile]="true">
            <fd-option *ngFor="let option of options" [value]="option">{{option}}</fd-option>
        </fd-select>
    `
})
class TestWrapperComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;

    @ViewChild(SelectComponent, {static: true})
    selectComponent: SelectComponent;
}

describe('SelectComponent in mobile mode', () => {
    let testComponent: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [SelectModule, SelectMobileModule]
        }).overrideComponent(
            SelectComponent,
            {set: {changeDetection: ChangeDetectionStrategy.Default}}
        ).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', async () => {
        expect(testComponent).toBeTruthy();

        await wait(fixture);

        expect(testComponent.selectComponent).toBeTruthy();
    });

    it('should start closed', async () => {
        await wait(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open', async () => {
        await wait(fixture);

        testComponent.selectComponent.open();

        await wait(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();

        expect(fixture.nativeElement.querySelectorAll('fd-option').length).toBe(testComponent.options.length);
    });

    it('should close', async () => {
        await wait(fixture);

        testComponent.selectComponent.open();

        await wait(fixture);

        testComponent.selectComponent.close();

        await wait(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open on click', async () => {
        await wait(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await wait(fixture);

        expect(testComponent.selectComponent.isOpen).toBe(true);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    });

    it('should close on click while open', async () => {
        await wait(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await wait(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await wait(fixture);

        expect(testComponent.selectComponent.isOpen).toBe(false);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should select an option', async () => {
        await wait(fixture);

        testComponent.selectComponent.open();

        await wait(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await wait(fixture);

        expect(fixture.componentInstance.selectedValue).toBe(testComponent.selectComponent.selected.value);
    });
});
