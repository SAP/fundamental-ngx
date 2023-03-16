import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    HostBinding,
    Inject,
    inject,
    Injector,
    Input,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { DestroyedService, Nullable } from '@fundamental-ngx/cdk/utils';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';
import { BaseSettingsGeneratorLayout } from './layouts/base-settings-generator-layout';
import { SettingsGeneratorSidebarLayoutComponent } from './layouts/settings-generator-sidebar-layout/settings-generator-sidebar-layout.component';
import { SettingsConfig } from './models/settings-config.model';
import { SettingsModel } from './models/settings.model';
import { SettingsGeneratorLayoutAccessorService } from './settings-generator-layout-accessor.service';
import { SettingsGeneratorReturnValue, SettingsGeneratorService } from './settings-generator.service';
import { ThemeSelectorListComponent } from './controls/theme-selector-list/theme-selector-list.component';
import { BehaviorSubject, filter, Observable, Subscription, takeUntil } from 'rxjs';
import { FDP_SETTINGS_GENERATOR_CONFIG } from './tokens';

@Component({
    selector: 'fdp-settings-generator',
    templateUrl: './settings-generator.component.html',
    styleUrls: ['./settings-generator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SettingsGeneratorService, DestroyedService]
})
export class SettingsGeneratorComponent implements AfterViewInit, OnDestroy {
    /**
     * Settings Generator Element Ref.
     */
    elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    /**
     * Settings configuration.
     */
    @Input()
    set settings(value: Nullable<SettingsModel>) {
        if (value) {
            value.appearance = value.appearance || (this._config.defaultLayout as string);
        }
        this._settings = value;
        this._settingsGeneratorService.settings.next(value);
        this._setLayout();
    }

    get settings(): Nullable<SettingsModel> {
        return this._settings;
    }

    /** @hidden */
    private _settings: Nullable<SettingsModel>;

    /** @hidden */
    private readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fdp-settings-generator';

    /** @hidden */
    @ViewChild('renderer', { read: ViewContainerRef })
    private readonly _viewRef: ViewContainerRef;

    /** @hidden */
    private _currentLayout: string;

    /** @hidden */
    private readonly _viewReady = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private _viewReadySub: Subscription;

    /** @hidden */
    private _layoutComponentRef: ComponentRef<BaseSettingsGeneratorLayout>;

    /** @hidden */
    constructor(
        private readonly _fgService: FormGeneratorService,
        private readonly _settingsLayoutService: SettingsGeneratorLayoutAccessorService,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _destroy$: DestroyedService,
        @Inject(FDP_SETTINGS_GENERATOR_CONFIG) private readonly _config: SettingsConfig
    ) {
        this._settingsLayoutService.addLayout('sidebar', SettingsGeneratorSidebarLayoutComponent);
        this._fgService.addComponent(ThemeSelectorListComponent, ['theme-list']);
        this._settingsGeneratorService.onItemFocus.subscribe((entry) => {
            this._layoutComponentRef.instance.focusElementByPath(entry.path, entry.element);
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewReady.next(true);

        // We need to notify children components to update their classes.
        this._settingsGeneratorService.mobileState$.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._viewReady.complete();
        this._viewReadySub?.unsubscribe();
        this._layoutComponentRef?.destroy();
        this._viewRef?.clear();
    }

    /**
     * Programmatically submit inner forms of the settings generator.
     * @returns Observable with settings value grouped by main sections and inner sections.
     */
    submit(): Observable<SettingsGeneratorReturnValue> {
        return this._settingsGeneratorService.submit();
    }

    /** @hidden */
    private _setLayout(): void {
        this._viewReadySub?.unsubscribe();

        this._viewReadySub = this._viewReady.pipe(filter((ready) => ready)).subscribe(() => {
            if (!this.settings?.appearance || this._currentLayout === this.settings.appearance) {
                return;
            }

            const layoutComponent = this._settingsLayoutService.getLayout(this.settings.appearance);

            if (!layoutComponent) {
                return;
            }

            const injector = Injector.create({
                providers: [],
                parent: this._injector
            });

            this._layoutComponentRef?.destroy();
            this._viewRef.clear();
            this._layoutComponentRef = this._viewRef.createComponent(layoutComponent, { injector });

            this._currentLayout = this.settings.appearance;

            this._cdr.detectChanges();
        });
    }
}
