import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FDP_PRESET_MANAGED_COMPONENT, PresetManagedComponent } from '@fundamental-ngx/platform/shared';
import { BehaviorSubject } from 'rxjs';
import { VariantManagement } from '../../models/variant-management';
import { Variant } from '../../models/variant.interface';
import { FDP_VARIANT_MANAGEMENT } from '../../tokens';
import { VariantItem } from '../../variant-item.class';

import { VariantManagementWrapperComponent } from './variant-management-wrapper.component';

export interface DummyPresetModel {
    param1: string;
    param2: string;
    param3: string;
}

export const defaultDummyPreset = {
    param1: 'param1',
    param2: 'param2',
    param3: 'param3'
};

@Component({
    selector: 'fdp-variant-management-managed-component',
    template: '<ng-content></ng-content>',
    providers: [
        {
            provide: FDP_PRESET_MANAGED_COMPONENT,
            useExisting: VariantManagementManagedTestComponent
        }
    ]
})
export class VariantManagementManagedTestComponent implements PresetManagedComponent<DummyPresetModel> {
    name = 'dummyComponent';
    presetChanged: EventEmitter<DummyPresetModel> = new EventEmitter<DummyPresetModel>();
    private _currentPreset: DummyPresetModel;

    getCurrentPreset(): DummyPresetModel {
        return this._currentPreset;
    }

    setPreset(data: DummyPresetModel): void {
        this._currentPreset = data;
    }
}

@Component({
    selector: 'fdp-variant-management-test',
    template: ` <ng-content></ng-content> `,
    providers: [
        {
            provide: FDP_VARIANT_MANAGEMENT,
            useExisting: VariantManagementTestComponent
        }
    ]
})
export class VariantManagementTestComponent implements VariantManagement<DummyPresetModel> {
    activeVariant: Variant = new VariantItem({ data: { dummyComponent: defaultDummyPreset } });
    activeVariantChangeSubject: BehaviorSubject<Variant | null> = new BehaviorSubject<Variant | null>(
        this.activeVariant
    );

    getActiveVariantData(): DummyPresetModel {
        return this.activeVariant.data;
    }

    getOriginalActiveVariantData(): DummyPresetModel {
        return defaultDummyPreset;
    }

    updateActivePreset(data: DummyPresetModel): void {
        this.activeVariant.data = data;
    }
}

@Component({
    selector: 'fdp-variant-management-test-component',
    template: `
        <fdp-variant-management-wrapper #wrapper>
            <fdp-variant-management-test #manager></fdp-variant-management-test>
            <fdp-variant-management-managed-component #presetComponent></fdp-variant-management-managed-component>
        </fdp-variant-management-wrapper>
    `
})
export class VariantManagementWrapperTestComponent {
    @ViewChild('wrapper')
    wrapper: VariantManagementWrapperComponent;

    @ViewChild('manager')
    manager: VariantManagement;

    @ViewChild('presetComponent')
    presetComponent: PresetManagedComponent<DummyPresetModel>;
}

describe('VariantManagementWrapperComponent with projected variant management component', () => {
    let component: VariantManagementWrapperTestComponent;
    let fixture: ComponentFixture<VariantManagementWrapperTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                VariantManagementWrapperTestComponent,
                VariantManagementTestComponent,
                VariantManagementManagedTestComponent,
                VariantManagementWrapperComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(VariantManagementWrapperTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should find projected variant management component', async () => {
        await fixture.whenRenderingDone();

        expect((component.wrapper as any)._variantManagement).toBeTruthy();
    });

    it('should set preset for the component', async () => {
        await fixture.whenRenderingDone();

        expect(component.presetComponent.getCurrentPreset()).toEqual(defaultDummyPreset);
    });

    it('should react on preset changes', async () => {
        await fixture.whenRenderingDone();
        const newPresetData = { ...defaultDummyPreset, ...{ param1: 'param4' } };
        component.presetComponent.presetChanged.emit(newPresetData);
        await fixture.detectChanges();

        expect(component.manager.activeVariant.data).toEqual(newPresetData);
    });
});
