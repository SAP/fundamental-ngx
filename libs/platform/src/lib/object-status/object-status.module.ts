import { NgModule } from '@angular/core';
import { ObjectStatusComponent, PlatformObjectStatusTextDirective } from './object-status.component';

/**
 * @deprecated
 * Use `ObjectStatusComponent` import instead.
 */
@NgModule({
    imports: [ObjectStatusComponent, PlatformObjectStatusTextDirective],
    exports: [ObjectStatusComponent, PlatformObjectStatusTextDirective]
})
export class PlatformObjectStatusModule {}
