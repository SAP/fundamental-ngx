import { forwardRef, Provider } from '@angular/core';
import { SmartFilterBar } from '../smart-filter-bar.class';
import { SmartFilterBarComponent } from '../smart-filter-bar.component';

export const smartFilterBarProvider: Provider = {
    provide: SmartFilterBar,
    useExisting: forwardRef(() => SmartFilterBarComponent)
};
