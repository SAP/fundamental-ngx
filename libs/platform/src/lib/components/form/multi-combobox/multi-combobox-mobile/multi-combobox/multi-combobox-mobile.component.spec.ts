import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiComboboxComponent, MultiComboboxMobileComponent, SelectableOptionItem } from '@fundamental-ngx/platform';
import { DialogModule, DynamicComponentService, MobileModeConfig } from '@fundamental-ngx/core';
import { MULTICOMBOBOX_COMPONENT } from '../../multi-combobox.interface';

describe('MultiComboboxMobileComponent', () => {
    let component: MultiComboboxMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<MultiComboboxMobileComponent>;

    const testMobileConfigObject: MobileModeConfig = {
        title: 'title', approveButtonText: 'approve', cancelButtonText: 'cancel', hasCloseButton: true
    };

    let multiComboboxInputComponent: Partial<MultiComboboxComponent> = {
        mobileConfig: {
            title: 'title',
            approveButtonText: 'approve',
            cancelButtonText: 'cancel',
            hasCloseButton: true
        },
        dialogDismiss: (backup: SelectableOptionItem[]) => {},
        dialogApprove: () => {},
        openChange: new EventEmitter<boolean>()
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogModule, BrowserAnimationsModule],
            declarations: [MultiComboboxMobileComponent],
            providers: [DynamicComponentService, {
                provide: MULTICOMBOBOX_COMPONENT,
                useValue: multiComboboxInputComponent
            }]
        }).compileComponents();
    }));

    beforeEach(() => {
        multiComboboxInputComponent = {
            mobileConfig: {
                title: 'title',
                approveButtonText: 'approve',
                cancelButtonText: 'cancel',
                hasCloseButton: true
            },
            dialogDismiss: (backup: SelectableOptionItem[]) => {
            },
            dialogApprove: () => {
            },
            openChange: new EventEmitter<boolean>()
        };
        fixture = TestBed.createComponent(MultiComboboxMobileComponent);
        component = fixture.componentInstance;
        anyComponent = <any>component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get multi input config, when it is passed by input', () => {
        expect(anyComponent.mobileConfig).toEqual(testMobileConfigObject);
    });

    it('should open and close with approve', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.openChange.emit(true);
        spyOn(anyComponent._component, 'dialogApprove');
        fixture.detectChanges();

        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);

        fixture.detectChanges();
        component.handleApprove();

        expect(anyComponent._component.dialogApprove).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.openChange.emit(true);
        spyOn(anyComponent._component, 'dialogDismiss');
        fixture.detectChanges();

        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);

        fixture.detectChanges();
        component.handleDismiss();

        expect(anyComponent._component.dialogDismiss).toHaveBeenCalled();
    });
});
