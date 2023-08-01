import { ChangeDetectorRef, DestroyRef, Directive, ElementRef, inject, OnInit } from '@angular/core';
import { SettingsGeneratorService } from '../settings-generator.service';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SettingsModel } from '../models/settings.model';
import { FDP_SETTINGS_GENERATOR } from '../tokens';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
export abstract class BaseSettingsGeneratorLayout implements OnInit {
    /**
     * Subject to notify subscriptions to unsubscribe when component destroys.
     */
    protected abstract _destroyRef: DestroyRef;

    /**
     * Method for focusing inner form control.
     * It is responsible for activating the section and placing focus on the element.
     * @param path path of the control joined by dot(.). Usually represents section ID and inner group ID.
     * @param element ElementRef of native element to focus.
     */
    abstract focusElementByPath(path: string, element: ElementRef<HTMLElement>): void;

    /**
     * Settings schema.
     */
    settings: Nullable<SettingsModel>;

    /**
     * Settings generator service.
     */
    protected readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /**
     * Change detector ref.
     */
    protected readonly _cdr = inject(ChangeDetectorRef);

    /**
     * Settings generator component ref.
     */
    protected _settingsGenerator = inject(FDP_SETTINGS_GENERATOR);

    /** @hidden */
    ngOnInit(): void {
        this._settingsGeneratorService.settings.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((settings) => {
            this.settings = settings;
            this._cdr.detectChanges();
        });
    }
}
