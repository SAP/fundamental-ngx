import { NgModule } from '@angular/core';
import { MultiAnnouncerDirective } from './multi-announcer/multi-announcer.directive';
import { MultiComboboxComponent } from './multi-combobox.component';
import { SelectAllTogglerComponent } from './select-all-toggler/select-all-toggler.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [MultiComboboxComponent, SelectAllTogglerComponent, MultiAnnouncerDirective],
    exports: [MultiComboboxComponent, SelectAllTogglerComponent, MultiAnnouncerDirective]
})
export class MultiComboboxModule {}
