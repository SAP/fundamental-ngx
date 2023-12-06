import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogConfig, DialogRef } from '@fundamental-ngx/core/dialog';

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
            imports: [ManageVariantItemComponent],
            providers: [
                {
                    provide: DialogRef,
                    useValue: dialogRef
                },
                {
                    provide: DialogConfig,
                    useValue: {}
                }
            ]
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
