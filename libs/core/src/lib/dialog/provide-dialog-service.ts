import { Provider } from '@angular/core';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { DialogService } from './dialog-service/dialog.service';

/**
 * Provides necessary services for dialog functionality to property work.
 * @returns Array of Providers.
 */
export function provideDialogService(): Provider[] {
    return [DialogService, DynamicComponentService];
}
