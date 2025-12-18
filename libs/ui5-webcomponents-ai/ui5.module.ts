import { NgModule } from '@angular/core';
import { Button } from './button';
import { ButtonState } from './button-state';
import { PromptInput } from './prompt-input';

@NgModule({
    imports: [Button, ButtonState, PromptInput],
    exports: [Button, ButtonState, PromptInput]
})
export class Ui5ComponentsModule {}
