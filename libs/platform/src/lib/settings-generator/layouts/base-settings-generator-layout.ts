import { AfterViewInit, ChangeDetectorRef, Directive, OnInit, inject } from '@angular/core';
import { SettingsGeneratorService } from '../settings-generator.service';
import { Subject, takeUntil } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SettingsModel } from '../models/settings.model';

@Directive()
export abstract class BaseSettingsGeneratorLayout implements OnInit, AfterViewInit {
    /**
     * Settings generator service.
     */
    protected readonly _settingsGeneratorService = inject(SettingsGeneratorService);

    /**
     * Change detector ref.
     */
    protected readonly _cdr = inject(ChangeDetectorRef);

    /**
     * Subject to notify subscriptions to unsubscribe when component destroys.
     */
    protected abstract _destroy$: Subject<void>;

    /**
     * Settings schema.
     */
    _settings: Nullable<SettingsModel>;

    /**
     * Selected settings section.
     */
    _selectedIndex: number;

    /** @hidden */
    ngOnInit(): void {
        this._settingsGeneratorService.settings.pipe(takeUntil(this._destroy$)).subscribe((settings) => {
            this._settings = settings;
            this._cdr.detectChanges();
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setSelectedIndex(0);
    }

    /** @hidden */
    _setSelectedIndex(index: number): void {
        this._selectedIndex = index;
    }
}
