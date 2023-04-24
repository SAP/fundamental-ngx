import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { DialogModule } from '@fundamental-ngx/core/dialog';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

import { SEARCH_FIELD_COMPONENT, SearchFieldMobileInterface } from '../search-field-mobile.interface';
import { SearchFieldMobileComponent } from './search-field-mobile.component';

describe('SearchFieldMobileComponent', () => {
    let component: SearchFieldMobileComponent;
    let anyComponent: any;
    let fixture: ComponentFixture<SearchFieldMobileComponent>;

    const testSearchFieldConfigObject: MobileModeConfig = {
        approveButtonText: 'OK',
        hasCloseButton: true
    };

    class SearchFieldComponent implements SearchFieldMobileInterface {
        inputText: string;
        isOpenChange: Subject<boolean> = new EventEmitter<boolean>();
        mobile = true;
        isOpen = false;
        mobileConfig: MobileModeConfig = {
            approveButtonText: 'OK',
            hasCloseButton: true
        };

        dialogApprove(): void {
            //
        }

        dialogDismiss(): void {
            //
        }
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DialogModule, NoopAnimationsModule],
            declarations: [SearchFieldMobileComponent],
            providers: [
                DynamicComponentService,
                { provide: SEARCH_FIELD_COMPONENT, useValue: new SearchFieldComponent() }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFieldMobileComponent);
        component = fixture.componentInstance;
        anyComponent = <any>component;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get multi input config, when it is passed by input', () => {
        expect(anyComponent.mobileConfig).toEqual(testSearchFieldConfigObject);
    });

    it('should open and close with approve', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.isOpenChange.emit(true);
        jest.spyOn(anyComponent._component, 'dialogApprove');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        fixture.detectChanges();
        component._handleApprove();
        expect(anyComponent._component.dialogApprove).toHaveBeenCalled();
    });

    it('should open and close with dismiss', () => {
        anyComponent._component.mobile = true;
        component.ngOnInit();
        anyComponent._component.inputText = 'test';
        anyComponent._component.isOpenChange.emit(true);
        jest.spyOn(anyComponent._component, 'dialogDismiss');
        fixture.detectChanges();
        expect(anyComponent._dialogService.hasOpenDialogs()).toBe(true);
        fixture.detectChanges();
        component._handleDismiss();
        expect(anyComponent._component.dialogDismiss).toHaveBeenCalledWith();
    });
});
