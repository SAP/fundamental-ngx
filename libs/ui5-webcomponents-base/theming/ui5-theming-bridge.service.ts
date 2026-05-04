import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { filter } from 'rxjs/operators';
import { Ui5ThemingService } from './ui5-theming-api';

@Injectable({ providedIn: 'root' })
export class Ui5ThemingBridgeService {
    private readonly _themingService = inject(ThemingService, { optional: true });
    private readonly _ui5ThemingService = inject(Ui5ThemingService);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        if (!this._themingService) {
            return;
        }
        this._themingService.currentTheme
            .pipe(
                filter((theme) => theme != null),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((theme) => {
                this._ui5ThemingService.setTheme(theme.id);
            });
    }
}
