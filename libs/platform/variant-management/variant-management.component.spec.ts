import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
            imports: [VariantManagementComponent, NoopAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(VariantManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set variants', () => {
        const setVariantSpy = jest.spyOn(component, 'selectVariant');
        const setVariantEventSpy = jest.spyOn(component.activeVariantChange, 'emit');

        component.variants = mockVariants;

        expect(setVariantSpy).toBeCalledTimes(1);
        expect(setVariantSpy).toHaveBeenLastCalledWith(selectedVariantItem);

        expect(setVariantEventSpy).toBeCalledTimes(1);
        expect(setVariantEventSpy).toHaveBeenLastCalledWith(selectedVariantItem);
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
        expect(component._variantChanged).toBe(true);

        component.saveCurrentVariant();

        expect(component._variantChanged).toBe(false);

        component.updateActivePreset(newData, 'test');

        expect(component._variantChanged).toBe(false);
    });
});
