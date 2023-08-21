import { Inject, Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { FieldHintOptions } from '@fundamental-ngx/platform/shared';
import { BaseDynamicFormItemGuiOptions, DynamicFormItemGuiOptions } from '../interfaces/dynamic-form-item';
import { FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS } from '../form-generator.tokens';
import { defaultFormGeneratorHintOptions } from '../config/default-form-generator-hint-options';

@Pipe({
    name: 'getHintOptions',
    standalone: true
})
export class GetHintOptionsPipe implements PipeTransform {
    /** @hidden */
    private readonly _defaultHintOptions: FieldHintOptions;

    /** @hidden */
    constructor(@Inject(FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS) _providedHintOptions: FieldHintOptions) {
        this._defaultHintOptions = {
            ...defaultFormGeneratorHintOptions,
            ..._providedHintOptions
        };
    }

    /**
     * Used for extracting hintOptions from GuiOptions. This will coerce string | HintOptions to FieldHintOptions,
     * will combine default value of hints for form generator with provided options.
     */
    transform(
        hintOptions: BaseDynamicFormItemGuiOptions | DynamicFormItemGuiOptions | undefined
    ): FieldHintOptions | undefined {
        if (!hintOptions?.hint) {
            return;
        }
        const formItemHintOptions = hintOptions.hint;
        if (typeof formItemHintOptions === 'string' || formItemHintOptions instanceof TemplateRef) {
            return {
                ...this._defaultHintOptions,
                content: formItemHintOptions
            };
        }
        return {
            ...this._defaultHintOptions,
            ...formItemHintOptions
        };
    }
}
