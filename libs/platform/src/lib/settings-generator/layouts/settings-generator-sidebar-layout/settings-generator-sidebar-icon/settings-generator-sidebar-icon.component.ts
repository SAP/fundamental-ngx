import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { ThumbnailSettingsItem } from '../../../models/settings.model';
import { ListAvatarConfig, ListIconConfig } from '@fundamental-ngx/platform/list';
import { merge } from 'lodash-es';
import { Observable, takeUntil } from 'rxjs';
import { DestroyedService, isSubscribable } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fdp-settings-generator-sidebar-icon',
    templateUrl: './settings-generator-sidebar-icon.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
})
export class SettingsGeneratorSidebarIconComponent {
    /** Thumbnail configuration. */
    @Input()
    set thumbnail(value: ThumbnailSettingsItem) {
        this._thumbnail = value;
        if (this.thumbnail.avatar) {
            this._transformAvatarConfig(this.thumbnail.avatar);
        }

        if (this.thumbnail.icon) {
            this._transformIconConfig(this.thumbnail.icon);
        }
    }

    get thumbnail(): ThumbnailSettingsItem {
        return this._thumbnail;
    }

    /** @hidden */
    private _thumbnail: ThumbnailSettingsItem;

    /** @hidden */
    _avatarConfig: ListAvatarConfig | undefined;

    /** @hidden */
    _iconConfig: ListIconConfig | undefined;

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private _transformAvatarConfig(
        config$: Partial<ListAvatarConfig> | string | Observable<Partial<ListAvatarConfig> | string>
    ): void {
        this._getConfigFromObservable(config$, (parsedConfig) => {
            const avatarConfig = typeof parsedConfig === 'string' ? { image: parsedConfig } : parsedConfig;
            this._avatarConfig = merge(new ListAvatarConfig(), avatarConfig);
            this._cdr.detectChanges();
        });
    }

    /** @Hidden */
    private _transformIconConfig(
        config$: Partial<ListIconConfig> | string | Observable<Partial<ListIconConfig> | string>
    ): void {
        this._getConfigFromObservable(config$, (parsedConfig) => {
            const iconConfig = typeof parsedConfig === 'string' ? { glyph: parsedConfig } : parsedConfig;
            this._iconConfig = merge(new ListIconConfig(), iconConfig);
            this._cdr.detectChanges();
        });
    }

    /** @hidden */
    private _getConfigFromObservable<T>(config: T | Observable<T>, callback: (config: T) => void): void {
        if (isSubscribable(config)) {
            config.pipe(takeUntil(this._destroy$)).subscribe((_config) => {
                callback(_config);
            });

            return;
        }

        callback(config);
    }
}
