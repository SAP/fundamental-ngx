import { EventEmitter } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export interface WizardStepIndicator<Component = any> {
    stepIndicatorItemClicked: EventEmitter<Component>;
    stackedItems: Component[];
    glyph: Nullable<string>;
    setStackedItems(items: Component[]): void;
}
