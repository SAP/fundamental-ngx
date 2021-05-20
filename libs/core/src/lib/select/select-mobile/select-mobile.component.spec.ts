import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SelectComponent } from '../select.component';
import { SelectMobileModule } from './select-mobile.module';
import { SelectModule } from '../select.module';
import { MobileModeConfig } from '../../utils/interfaces/mobile-mode-config';
import { whenStable } from '../../utils/tests/when-stable';
import { getMobileModeViewElements, MOBILE_CONFIG_TEST_TOKEN } from '../../utils/tests';

const MOBILE_CONFIG: MobileModeConfig = { title: 'TITLE', hasCloseButton: true };

@Component({
    template: `
        <fd-select placeholder="Select an option" [(value)]="selectedValue" [mobile]="true"
                   [mobileConfig]="mobileConfig">
            <fd-option *ngFor="let option of options" [value]="option">{{option}}</fd-option>
        </fd-select>
    `
})
class TestWrapperComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;

    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    constructor(@Inject(MOBILE_CONFIG_TEST_TOKEN) public mobileConfig: MobileModeConfig) { }
}

describe('SelectComponent in mobile mode', () => {
    let testComponent: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [SelectModule, SelectMobileModule, BrowserAnimationsModule, RouterTestingModule]
        }).overrideComponent(
            SelectComponent,
            { set: { changeDetection: ChangeDetectionStrategy.Default } }
        )
    }));

    function setup(mobileConfig: MobileModeConfig = MOBILE_CONFIG): void {
        TestBed.overrideProvider(MOBILE_CONFIG_TEST_TOKEN, { useValue: mobileConfig });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    }


    it('should create', async () => {
        setup();
        expect(testComponent).toBeTruthy();

        await whenStable(fixture);

        expect(testComponent.selectComponent).toBeTruthy();
    });

    it('should start closed', async () => {
        setup();
        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open', async () => {
        setup();
        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();

        expect(fixture.nativeElement.querySelectorAll('fd-option').length).toBe(testComponent.options.length);
    });

    it('should close', async () => {
        setup();
        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        testComponent.selectComponent.close();

        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open on click', async () => {
        setup();
        await whenStable(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await whenStable(fixture);
        expect(testComponent.selectComponent._isOpen).toBe(true);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    });

    it('should close on click while open', async () => {
        setup();
        await whenStable(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await whenStable(fixture);

        expect(testComponent.selectComponent._isOpen).toBe(false);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should select an option', async () => {
        setup();
        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await whenStable(fixture);

        expect(fixture.componentInstance.selectedValue).toBe(testComponent.selectComponent.selected.value);
    });

    it('should properly render with empty MobileConfig', async () => {
        setup({});

        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        const mobileElements = getMobileModeViewElements(fixture);
        expect(mobileElements.dialogTitle).toBeFalsy();
        expect(mobileElements.dialogFooter).toBeFalsy();
        expect(mobileElements.dialogCloseBtn).toBeFalsy();
        expect(mobileElements.footerButtons.length).toEqual(0);

    });

    it('should emit value on submit', async () => {
        setup({ approveButtonText: 'SUBMIT', hasCloseButton: true });

        await whenStable(fixture);

        spyOn(testComponent.selectComponent.valueChange, 'emit').and.callThrough();
        testComponent.selectComponent.open();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await whenStable(fixture);

        expect(testComponent.selectComponent.valueChange.emit).not.toHaveBeenCalled();

        await whenStable(fixture);
    });

    it('should emit value on cancel', async () => {
        setup({ approveButtonText: 'SUBMIT', hasCloseButton: true });
        await whenStable(fixture);

        spyOn(testComponent.selectComponent.isOpenChange, 'emit').and.callThrough();
        testComponent.selectComponent.open();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await whenStable(fixture);
        fixture.nativeElement.querySelector('.sap-icon--decline').click();
        expect(testComponent.selectComponent.isOpenChange.emit).toHaveBeenCalled();
    });
});
