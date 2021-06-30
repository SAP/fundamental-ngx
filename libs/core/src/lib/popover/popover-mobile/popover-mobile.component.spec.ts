import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, Inject, InjectionToken, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MobileModeConfig } from '@fundamental-ngx/core';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { PopoverComponent, PopoverModule } from '../public_api';
import { PopoverMobileComponent } from './popover-mobile.component';
import { PopoverMobileModule } from './popover-mobile.module';

const MOBILE_CONFIG_TEST_TOKEN = new InjectionToken<MobileModeConfig>('For test purposes');
const MOBILE_CONFIG: MobileModeConfig = { title: 'Test popover title' };

@Component({
    template: `
        <fd-popover #popoverMobile
            [mobile]="true"
            [mobileConfig]="{ title: 'Mobile Popover Test', hasCloseButton: true }"
            style="display: block">
            <ng-template #popoverBodyContent>
                Dummy Content
            </ng-template>
            <ng-template #popoverFooterContent>
                <div class="footer-buttons-container">
                    <button fd-button fdType="positive">Dummy Button</button>
                </div>
            </ng-template>
        </fd-popover>
    `,
})
class TestPopoverWrapperComponent {
    @ViewChild(PopoverComponent) popoverComponent: PopoverComponent;

    constructor(@Inject(MOBILE_CONFIG_TEST_TOKEN) public mobileConfig: MobileModeConfig) { }
}

describe('PopoverMobileComponent', () => {
    let popoverComponent: PopoverComponent;
    let popoverMobileComponent: PopoverMobileComponent;
    let fixture: ComponentFixture<TestPopoverWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestPopoverWrapperComponent,
                PopoverComponent,
                PopoverMobileComponent,
            ],
            imports: [PopoverModule, OverlayModule, A11yModule, PopoverMobileModule],
        })
        .compileComponents();
    }));

    beforeEach(() => setup());

    function setup(mobileConfig: MobileModeConfig = MOBILE_CONFIG): void {
        TestBed.overrideProvider(MOBILE_CONFIG_TEST_TOKEN, { useValue: mobileConfig });
        TestBed.compileComponents();
        fixture = TestBed.createComponent(TestPopoverWrapperComponent);
        fixture.detectChanges();
        popoverComponent = fixture.componentInstance.popoverComponent;
        popoverMobileComponent = fixture.componentInstance.popoverComponent['_mobileModeComponentRef'].instance;
    }

    it ('should create component', () => {
        expect(popoverComponent).toBeDefined();
        expect(popoverMobileComponent).toBeDefined();
    });

    it ('should destroy', () => {
        popoverMobileComponent.dialogRef = { close: () => {} } as DialogRef;
        spyOn(popoverMobileComponent.dialogRef, 'close');

        popoverMobileComponent.ngOnDestroy();

        expect(popoverMobileComponent.dialogRef.close).toHaveBeenCalled();
    });

    it ('should close', () => {
        popoverMobileComponent.dialogRef = { close: () => {} } as DialogRef;
        spyOn(popoverMobileComponent.dialogRef, 'close');

        popoverMobileComponent.close();

        expect(popoverMobileComponent.dialogRef.close).toHaveBeenCalled();
    });
});
