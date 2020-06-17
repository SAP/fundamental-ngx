import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { SelectComponent } from '../../select.component';
import { SelectMobileModule } from '../select-mobile.module';
import { SelectModule } from '../../select.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileModeConfig } from '../../../utils/interfaces/mobile-mode-config';

@Component({
    template: `
        <fd-select placeholder="Select an option" [(value)]="selectedValue" [mobile]="true" [mobileConfig]="mobileConfig">
            <fd-option *ngFor="let option of options" [value]="option">{{option}}</fd-option>
        </fd-select>
    `
})
class TestWrapperComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;
    mobileConfig: MobileModeConfig = { title: 'TITLE', hasCloseButton: true };

    @ViewChild(SelectComponent, {static: true})
    selectComponent: SelectComponent;
}

describe('SelectComponent in mobile mode', () => {
    let testComponent: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [SelectModule, SelectMobileModule, BrowserAnimationsModule]
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

    it('should properly render based on MobileConfig', async () => {
        let mobileElements;

        function getMobileElements() {
            return {
                dialogTitle: fixture.nativeElement.querySelector('[fd-dialog-title]'),
                dialogFooter: fixture.nativeElement.querySelector('fd-dialog-footer'),
                dialogCloseBtn: fixture.nativeElement.querySelector('[fd-dialog-close-button]'),
                footerButtons: fixture.nativeElement.querySelectorAll('[fd-dialog-decisive-button]')
            }
        }

        await wait(fixture);

        testComponent.mobileConfig = {};
        testComponent.selectComponent.open();

        await wait(fixture);

        mobileElements = getMobileElements();
        expect(mobileElements.dialogTitle).toBeFalsy();
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(0);
        testComponent.mobileConfig = {title: 'TITLE', hasCloseButton: true};

        await wait(fixture);

        mobileElements = getMobileElements();
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeTruthy();
        expect(mobileElements.footerButtons.length).toEqual(0);
        expect(mobileElements.dialogTitle.textContent).toContain('TITLE');
        testComponent.mobileConfig = {cancelButtonText: 'APPROVE', approveButtonText: 'DISMISS'};

        await wait(fixture);

        mobileElements = getMobileElements();
        expect(mobileElements.dialogTitle).toBeFalsy();
        expect(mobileElements.dialogFooter).toBeTruthy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(2);
    });

    it('should emit value on submit', async () => {
        await wait(fixture);

        spyOn(testComponent.selectComponent.valueChange, 'emit').and.callThrough();
        testComponent.mobileConfig = { approveButtonText: 'SUBMIT', hasCloseButton: true };
        testComponent.selectComponent.open();

        await wait(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await wait(fixture);

        expect(testComponent.selectComponent.valueChange.emit).not.toHaveBeenCalled();

        await wait(fixture);

        fixture.nativeElement.querySelector('[fd-dialog-decisive-button]').click();

        await wait(fixture);

        expect(testComponent.selectComponent.valueChange.emit).toHaveBeenCalled();
    });

    it('should not emit value on cancel', async () => {
        await wait(fixture);

        spyOn(testComponent.selectComponent.valueChange, 'emit').and.callThrough();
        testComponent.selectComponent.mobileConfig = { approveButtonText: 'SUBMIT', hasCloseButton: true };
        testComponent.selectComponent.open();

        await wait(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await wait(fixture);

        fixture.nativeElement.querySelector('.sap-icon--decline').click();
        expect(testComponent.selectComponent.valueChange.emit).not.toHaveBeenCalled();
    });
});
