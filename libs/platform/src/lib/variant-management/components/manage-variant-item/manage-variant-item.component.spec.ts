import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { I18nModule } from '@fundamental-ngx/i18n';
import {
    FdpFormGroupModule,
    PlatformCheckboxGroupModule,
    PlatformCheckboxModule,
    PlatformInputModule
} from '@fundamental-ngx/platform/form';

import { ManageVariantItemComponent } from './manage-variant-item.component';

describe('ManageVariantItemComponent', () => {
    let component: ManageVariantItemComponent;
    let fixture: ComponentFixture<ManageVariantItemComponent>;

    beforeEach(async () => {
        const dialogRef = new DialogRef();
        dialogRef.data = {
            currentVariantName: 'Test',
            existingVariantNames: ['Second']
        };
        await TestBed.configureTestingModule({
            declarations: [ManageVariantItemComponent],
            imports: [
                ReactiveFormsModule,
                I18nModule,
                PlatformInputModule,
                PlatformCheckboxGroupModule,
                PlatformCheckboxModule,
                FdpFormGroupModule
            ],
            providers: [
                {
                    provide: DialogRef,
                    useValue: dialogRef
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ManageVariantItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate name', () => {
        component._form.get('name')?.setValue('Second');

        expect(component._form.get('name')?.errors).not.toBeNull();
    });
});
