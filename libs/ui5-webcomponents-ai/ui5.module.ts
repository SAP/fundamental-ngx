import { NgModule } from '@angular/core';
import { Button } from './ai-button';
import { ButtonState } from './ai-button-state';
import { PromptInput } from './ai-prompt-input';

@NgModule({
    imports: [Button, ButtonState, PromptInput],
    exports: [Button, ButtonState, PromptInput]
})
export class Ui5ComponentsModule {}
