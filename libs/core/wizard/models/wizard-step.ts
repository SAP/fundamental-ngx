import { EventEmitter, WritableSignal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export interface WizardStepIndicator<Component = any> {
    stepIndicatorItemClicked: EventEmitter<Component>;
    stackedItems$: WritableSignal<Component[]>;
    glyph: Nullable<string>;
    setStackedItems(items: Component[]): void;
}
