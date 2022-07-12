import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { SelectComponent, SelectMobileModule, SelectModule } from '@fundamental-ngx/core/select';
import { getMobileModeViewElements, MOBILE_CONFIG_TEST_TOKEN, whenStable } from '@fundamental-ngx/core/tests';

const MOBILE_CONFIG: MobileModeConfig = { title: 'TITLE', hasCloseButton: true };

@Component({
    template: `
        <fd-select
            placeholder="Select an option"
            [(value)]="selectedValue"
            [mobile]="true"
            [mobileConfig]="mobileConfig"
        >
            <li fd-option *ngFor="let option of options" [value]="option">{{ option }}</li>
        </fd-select>
    `
})
class TestWrapperComponent {
    options: string[] = ['Apple', 'Pineapple', 'Tomato', 'Strawberry'];
    selectedValue: string;

    @ViewChild(SelectComponent, { static: true })
    selectComponent: SelectComponent;

    constructor(@Inject(MOBILE_CONFIG_TEST_TOKEN) public mobileConfig: MobileModeConfig) {}
}

describe('SelectComponent in mobile mode', () => {
    let testComponent: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestWrapperComponent],
                imports: [SelectModule, SelectMobileModule, BrowserAnimationsModule, RouterTestingModule],
                providers: [{ provide: MOBILE_CONFIG_TEST_TOKEN, useValue: MOBILE_CONFIG }]
            }).overrideComponent(SelectComponent, { set: { changeDetection: ChangeDetectionStrategy.Default } });
        })
    );

    async function setup(mobileConfig: MobileModeConfig = MOBILE_CONFIG): Promise<void> {
        TestBed.overrideProvider(MOBILE_CONFIG_TEST_TOKEN, { useValue: mobileConfig });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);

        await whenStable(fixture);

        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    }

    it('should create', async () => {
        await setup();
        expect(testComponent).toBeTruthy();

        await whenStable(fixture);

        expect(testComponent.selectComponent).toBeTruthy();
    });

    it('should start closed', async () => {
        await setup();
        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open', async () => {
        await setup();
        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();

        expect(fixture.nativeElement.querySelectorAll('fd-option').length).toBe(testComponent.options.length);
    });

    it('should close', async () => {
        await setup();
        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        testComponent.selectComponent.close();

        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should open on click', async () => {
        await setup();
        await whenStable(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await whenStable(fixture);
        expect(testComponent.selectComponent._isOpen).toBe(true);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeTruthy();
    });

    it('should close on click while open', async () => {
        await setup();
        await whenStable(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('.fd-select__control').click();

        await whenStable(fixture);

        expect(testComponent.selectComponent._isOpen).toBe(false);
        expect(fixture.nativeElement.querySelector('.fd-dialog--active')).toBeFalsy();
    });

    it('should select an option', async () => {
        await setup();
        await whenStable(fixture);

        testComponent.selectComponent.open();

        await whenStable(fixture);

        fixture.nativeElement.querySelector('fd-option').click();

        await whenStable(fixture);

        expect(fixture.componentInstance.selectedValue).toBe(testComponent.selectComponent.selected.value);
    });

    it('should properly render with empty MobileConfig', async () => {
        await setup({});

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
        await setup({ approveButtonText: 'SUBMIT', hasCloseButton: true });

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
        await setup({ approveButtonText: 'SUBMIT', hasCloseButton: true });
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
