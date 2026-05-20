import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { filter } from 'rxjs/operators';

/**
 * Demonstrates theming bridge synchronization between fundamental-ngx and UI5 Web Components.
 *
 * Both the fd-button and ui5-button react to the same theme change because
 * provideUi5ThemingBridge() (in app.config.ts) forwards ThemingService changes
 * to UI5's setTheme().
 *
 * Use the toolbar theme selector (top-right) to see the effect.
 */
@Component({
    selector: 'ui5-theming-bridge-sample',
    templateUrl: './theming-bridge-sample.html',
    styleUrl: './theming-bridge-sample.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, Button]
})
export class ThemingBridgeSampleComponent {
    private readonly _themingService = inject(ThemingService);
    private readonly _currentTheme = toSignal(this._themingService.currentTheme.pipe(filter((theme) => !!theme)));

    protected readonly currentThemeName = computed(() => this._currentTheme()?.name ?? 'Unknown');
    protected readonly currentThemeId = computed(() => this._currentTheme()?.id ?? 'sap_horizon');
}
