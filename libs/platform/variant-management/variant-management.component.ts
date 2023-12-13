import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FilterStringsPipe, Nullable } from '@fundamental-ngx/cdk/utils';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { ListComponent, ListItemComponent, ListLinkDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent,
    TriggerConfig
} from '@fundamental-ngx/core/popover';
import { HeaderSizes, TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MenuButtonComponent } from '@fundamental-ngx/platform/menu-button';
import { SearchFieldComponent, SearchInput } from '@fundamental-ngx/platform/search-field';
import equal from 'fast-deep-equal';
import { BehaviorSubject } from 'rxjs';
import { ManageVariantItemComponent } from './components/manage-variant-item/manage-variant-item.component';
import { ManageVariantsDialogComponent } from './components/manage-variants-dialog/manage-variants-dialog.component';
import { VariantManagementDirtyLabelDirective } from './directives/variant-management-dirty-label.directive';
import { SaveDialogContext } from './models/save-dialog.model';
import { VariantManagement } from './models/variant-management';
import { NewVariant, Variant } from './models/variant.interface';
import { FDP_VARIANT_MANAGEMENT } from './tokens';
import { VariantItem } from './variant-item.class';

@Component({
    selector: 'fdp-variant-management',
    templateUrl: './variant-management.component.html',
    styleUrl: './variant-management.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FDP_VARIANT_MANAGEMENT,
            useExisting: VariantManagementComponent
        }
    ],
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        TitleComponent,
        NgTemplateOutlet,
        MenuButtonComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        BarComponent,
        BarLeftDirective,
        BarElementDirective,
        SearchFieldComponent,
        ListComponent,
        ListItemComponent,
        ListLinkDirective,
        ListTitleDirective,
        PopoverBodyFooterDirective,
        BarRightDirective,
        ButtonBarComponent,
        FdTranslatePipe,
        FilterStringsPipe
    ]
})
export class VariantManagementComponent<T = any> implements VariantManagement<T> {
    /** Initial variants array. */
    @Input()
    set variants(items: Variant<T>[]) {
        this._variants = this._transformVariants(items);

        let currentVariantIndex = this._variants.findIndex((variant) => variant.isDefault);
        currentVariantIndex = currentVariantIndex > -1 ? currentVariantIndex : 0;
        const currentVariant = this._variants[currentVariantIndex];
        this.selectVariant(currentVariant as VariantItem);
    }

    /** Header size. */
    @Input()
    headerSize: HeaderSizes = 4;

    /** Popover trigger events. */
    @Input()
    popoverTriggers: (string | TriggerConfig)[] = [
        { trigger: 'click', stopPropagation: true, closeAction: true, openAction: true }
    ];

    /** User's name which will be applied to all new variants user creates. */
    @Input()
    userName: string;

    /** Whether to display search field for variants list. */
    @Input()
    displaySearch = false;

    /** Event emitted when variants data has been updated. */
    @Output()
    variantsChange = new EventEmitter<Variant<T>[]>();

    /** Event emitted when new variant selected. */
    @Output()
    activeVariantChange = new EventEmitter<Variant<T>>();

    /**
     * Used internally for communicating with wrapper component.
     */
    activeVariantChangeSubject = new BehaviorSubject<Variant<T> | null>(null);

    /**
     * Custom dirty label directive.
     */
    @ContentChild(VariantManagementDirtyLabelDirective)
    dirtyLabel: VariantManagementDirtyLabelDirective;

    /** @ignore */
    @ViewChild('popover')
    _popover: PopoverComponent;

    /** @ignore */
    _variantChanged = false;

    /** Selected variant. */
    activeVariant!: VariantItem<T>;

    /** @ignore */
    _variants: VariantItem<T>[] = [];

    /** @ignore */
    _filterPhrase: Nullable<string> = null;

    /** @ignore */
    @HostBinding('class')
    private readonly _initialClass = 'fd-variant-management';

    /** @ignore */
    private _originalActiveVariant: VariantItem<T>;

    /** @ignore */
    constructor(
        private readonly _dialogService: DialogService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    /**
     * Manually select variant.
     * @param variant Variant to select.
     */
    selectVariant(variant: VariantItem<T>): void {
        this._variantChanged = false;
        this.activeVariant = variant;
        this._originalActiveVariant = variant.clone({}, false);
        this.activeVariantChange.emit(variant);
        this.activeVariantChangeSubject.next(variant);
    }

    /** Returns original variant data. */
    getOriginalActiveVariantData(): Variant<T>['data'] {
        return this._originalActiveVariant.data;
    }

    /** Returns current active variant data with applied changes. */
    getActiveVariantData(): Variant<T>['data'] {
        return this.activeVariant.data;
    }

    /**
     * Saves current variant with its configuration.
     */
    saveCurrentVariant(): void {
        const currentVariantIndex = this._variants.findIndex((variant) => variant.id === this.activeVariant.id);
        this._variants[currentVariantIndex] = this.activeVariant;
        this._originalActiveVariant = this.activeVariant.clone({}, false);
        this._variantChanged = false;
        this.variantsChange.emit(this._variants);
    }

    /** @ignore */
    _openSaveDialog(): void {
        this._popover?.close(false);
        const dialogRef = this._dialogService.open<SaveDialogContext>(ManageVariantItemComponent, {
            data: {
                existingVariantNames: this._variants.map((variant) => variant.name),
                currentVariantName: this.activeVariant.name
            }
        });
        dialogRef.afterClosed.subscribe({
            next: (result: NewVariant) => {
                const newVariant = this.activeVariant.clone({ ...result, ...{ createdBy: this.userName } });
                this._variants.push(newVariant);
                this.variantsChange.emit(this._variants);
                this.activeVariant = newVariant;
                this._variantChanged = false;
                this._cdr.detectChanges();
            },
            error: () => {}
        });
    }

    /**
     * Updates current active preset with new configuration.
     * @param preset Preset configuration.
     * @param componentName component to which this preset belongs to.
     */
    updateActivePreset(preset: T, componentName: string): void {
        const activeVariantData = this._originalActiveVariant.data[componentName];
        this._variantChanged = activeVariantData && !equal(preset, activeVariantData);
        this.activeVariant.data[componentName] = preset;
        this._cdr.detectChanges();
    }

    /** @ignore */
    _openManageDialog(): void {
        this._popover?.close(false);
        const dialogRef = this._dialogService.open<VariantItem[]>(ManageVariantsDialogComponent, {
            data: this._variants
        });

        dialogRef.afterClosed.subscribe({
            next: (variants: VariantItem[]) => {
                this._variants = variants;
                this.variantsChange.emit(this._variants);
            },
            error: () => {}
        });
    }

    /** @ignore */
    _onSearchSubmit(search: SearchInput): void {
        this._filterPhrase = search.text;
        this._cdr.detectChanges();
    }

    /** @ignore */
    _cancelSearch(): void {
        this._filterPhrase = null;
        this._cdr.detectChanges();
    }

    /** @ignore */
    _trackFn(index: number, item: VariantItem<T>): string {
        return item.id;
    }

    /** @ignore */
    private _transformVariants(items: Variant<T>[]): VariantItem[] {
        return items.map((variant) => new VariantItem(variant));
    }
}
