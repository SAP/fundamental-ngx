import { NgModule } from '@angular/core';

import {
    InputGroupAddonButtonDirective,
    InputGroupAddOnDirective,
    InputGroupInputDirective,
    InputGroupTextareaDirective
} from './input-group-directives';
import { InputGroupComponent } from './input-group.component';

const components = [
    InputGroupComponent,
    InputGroupInputDirective,
    InputGroupTextareaDirective,
    InputGroupAddOnDirective,
    InputGroupAddonButtonDirective
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class InputGroupModule {}
