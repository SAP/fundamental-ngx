import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    inject,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { FDP_PRESET_MANAGED_COMPONENT, PresetManagedComponent } from '@fundamental-ngx/platform/shared';
import equal from 'fast-deep-equal';
import { filter, startWith, Subscription } from 'rxjs';
import { VariantManagement } from '../../models/variant-management';
import { FDP_VARIANT_MANAGEMENT, FDP_VARIANT_MANAGEMENT_WRAPPER } from '../../tokens';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Wrapper component used to wrap components that implement `PresetManagedComponent`.
 * It automatically bounds existing presets from `Variant Management` component to `PresetManagedComponent`.
 * Wrapper component supports two ways of providing Variant Management component.
 * First one is to pass reference via Input property.
 * Second one is to put Variant Management component inside wrapper component so it would be accessible via @ContentChild.
 * Usage example:
 *
 * ```html
 *  Usage outside wrapper component:
 *  <fdp-variant-management #variantManagement [variants]="..."></fdp-variant-management>
 *  <fdp-variant-management-wrapper [variantManager]="variantManagement">
 *      <fdp-smart-filter-bar>...</fdp-smart-filter-bar>
 *      <fdp-table>...</fdp-table>
 *  </fdp-variant-management-wrapper>
 *
 *  Usage inside wrapper component:
 *  <fdp-variant-management-wrapper>
 *      <fdp-variant-management [variants]="..."></fdp-variant-management>
 *      <fdp-smart-filter-bar>...</fdp-smart-filter-bar>
 *      <fdp-table>...</fdp-table>
 *  </fdp-variant-management-wrapper>
 * ```
 */
@Component({
    selector: 'fdp-variant-management-wrapper',
    templateUrl: './variant-management-wrapper.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FDP_VARIANT_MANAGEMENT_WRAPPER,
            useExisting: VariantManagementWrapperComponent
        }
    ]
})
export class VariantManagementWrapperComponent implements AfterViewInit, OnDestroy {
    /** Variant management component. */
    @Input()
    variantManager: VariantManagement;

    /** @hidden */
    @ContentChildren(FDP_PRESET_MANAGED_COMPONENT, { descendants: true })
    private readonly _managedComponents: QueryList<PresetManagedComponent<any>>;

    /** @hidden */
    @ContentChild(FDP_VARIANT_MANAGEMENT, { descendants: true })
    private set _projectedVariantManager(variantManager: VariantManagement) {
        this._variantManager = variantManager;
        this._setPresets();
    }

    private get _projectedVariantManager(): VariantManagement {
        return this._variantManager;
    }

    /** @hidden */
    private get _variantManagement(): VariantManagement {
        return this._projectedVariantManager || this.variantManager;
    }

    /** @hidden */
    private _variantManager: VariantManagement;

    /** @hidden */
    private _activeVariantSubscription: Subscription;

    /** @hidden */
    private _componentsPresetChangeSubscription: Subscription;

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    ngAfterViewInit(): void {
        this._setPresets();

        this._managedComponents?.changes
            .pipe(startWith(this._managedComponents), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._listenToPresetChanges();
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._activeVariantSubscription?.unsubscribe();
        this._componentsPresetChangeSubscription?.unsubscribe();
    }

    /**
     * @hidden
     * Listens to the preset change in Variant Management component and applies new configuration across projected components..
     */
    private _setPresets(): void {
        this._activeVariantSubscription?.unsubscribe();
        this._activeVariantSubscription = this._variantManagement?.activeVariantChangeSubject
            .pipe(
                filter((variant) => !!variant && !!this._managedComponents),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                const components = this._managedComponents.toArray();

                components.forEach((component) => {
                    const data = this._variantManagement.activeVariant.data[component.name];
                    component.setPreset(data);
                });
            });
    }

    /**
     * @hidden
     * Listens to preset configuration changes in projected components and sends updated config to Variant Management component.
     */
    private _listenToPresetChanges(): void {
        this._componentsPresetChangeSubscription?.unsubscribe();
        this._componentsPresetChangeSubscription = new Subscription();
        const components = this._managedComponents.toArray();

        components.forEach((component) => {
            this._componentsPresetChangeSubscription.add(
                component.presetChanged
                    .pipe(
                        filter((preset) => {
                            const prevPreset = this._getComponentPreset().get(component);
                            return !equal(preset, prevPreset);
                        }),
                        takeUntilDestroyed(this._destroyRef)
                    )
                    .subscribe((preset) => {
                        this._variantManagement?.updateActivePreset(preset, component.name);
                    })
            );
        });
    }

    /** @hidden */
    private _getComponentPreset(): Map<PresetManagedComponent<any>, any> {
        const components = this._managedComponents.toArray();
        const data = this._variantManagement.getActiveVariantData();
        const componentsMap = new Map<PresetManagedComponent<any>, any>();

        components.forEach((component) => {
            componentsMap.set(component, data[component.name]);
        });

        return componentsMap;
    }
}
