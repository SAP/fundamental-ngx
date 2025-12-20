import { NgModule } from '@angular/core';
import { Button } from './button';
import { ButtonState } from './button-state';
import { Input } from './input';
import { PromptInput } from './prompt-input';
import { TextArea } from './text-area';

@NgModule({
    imports: [
        Button,
        ButtonState,
        Input,
        PromptInput,
        TextArea
    ],
    exports: [
        Button,
        ButtonState,
        Input,
        PromptInput,
        TextArea
    ]
})
export class Ui5ComponentsModule {}
