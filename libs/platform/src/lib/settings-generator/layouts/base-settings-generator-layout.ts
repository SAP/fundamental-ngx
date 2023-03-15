import { ChangeDetectorRef, Directive, ElementRef, inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SettingsGeneratorService } from '../settings-generator.service';
import { Subject } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SettingsModel } from '../models/settings.model';

@Directive()
export abstract class BaseSettingsGeneratorLayout implements OnInit {
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
    settings: Nullable<SettingsModel>;

    /** @hidden */
    ngOnInit(): void {
        this._settingsGeneratorService.settings.pipe(takeUntil(this._destroy$)).subscribe((settings) => {
            this.settings = settings;
            this._cdr.detectChanges();
        });
    }

    /**
     * Method for focusing inner form control.
     * It is responsible for activating the section and placing focus on the element.
     * @param path path of the control joined by dot(.). Usually represents section ID and inner group ID.
     * @param element ElementRef of native element to focus.
     */
    abstract focusElementByPath(path: string, element: ElementRef<HTMLElement>): void;
}
