import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { Variant } from './models/variant.interface';
import { VariantItem } from './variant-item.class';

import { VariantManagementComponent } from './variant-management.component';

export const mockVariants: Variant[] = [
    {
        name: 'First variant',
        createdBy: 'John Doe',
        readonly: false,
        favourite: false,
        isDefault: false,
        access: 'public',
        data: {
            test: {}
        }
    },
    {
        id: 'selectedVariant',
        name: 'Second variant',
        createdBy: 'John Doe',
        readonly: false,
        favourite: false,
        isDefault: true,
        access: 'public',
        data: {
            test: {}
        }
    }
];

export const selectedVariantItem = new VariantItem(mockVariants[1]);

describe('VariantManagementComponent', () => {
    let component: VariantManagementComponent;
    let fixture: ComponentFixture<VariantManagementComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DialogModule, I18nModule, PipeModule, NoopAnimationsModule],
            declarations: [VariantManagementComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(VariantManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set variants', () => {
        const setVariantSpy = spyOn(component, 'selectVariant').and.callThrough();
        const setVariantEventSpy = spyOn(component.activeVariantChange, 'emit').and.callThrough();

        component.variants = mockVariants;

        expect(setVariantSpy).toHaveBeenCalledOnceWith(selectedVariantItem);
        expect(setVariantEventSpy).toHaveBeenCalledOnceWith(selectedVariantItem);
    });

    it('should return original variant data', () => {
        component.variants = mockVariants;
        fixture.detectChanges();
        component.activeVariant.data = { item: 'value' };
        fixture.detectChanges();

        expect(component.getOriginalActiveVariantData()).not.toEqual(component.getActiveVariantData());
    });

    it('should update active variant', () => {
        component.variants = mockVariants;
        fixture.detectChanges();
        const newData = {
            item: 'value',
            otherItem: 'otherValue'
        };
        component.updateActivePreset(newData, 'test');

        expect(component.getActiveVariantData().test).toEqual(newData);
        expect(component._variantChanged).toBeTrue();

        component.saveCurrentVariant();

        expect(component._variantChanged).toBeFalse();

        component.updateActivePreset(newData, 'test');

        expect(component._variantChanged).toBeFalse();
    });
});
