import { InlineHelpFormPlacement } from '@fundamental-ngx/core/form';
import { HintPlacement } from './form-options';
import { TriggerConfig } from '@fundamental-ngx/core/popover';
import { TemplateRef } from '@angular/core';

export type HintContent = string | TemplateRef<void>;

export type HintInput = HintContent | HintOptions;
export type FieldHintInput = HintContent | FieldHintOptions;

export interface HintOptions {
    /** Text or the template of the hint */
    content: HintContent;

    /** Text position of the inline help icon, relative to label */
    position?: InlineHelpFormPlacement;
    /** Trigger events for showing and hiding help */
    trigger?: (string | TriggerConfig)[];
    /** Hint placement */
    placement?: HintPlacement;
    /** Icon name of the inline help element */
    glyph?: string;
}

export interface FieldHintOptions extends HintOptions {
    /** Target where hint should be placed */
    target?: 'auto' | 'input' | 'label';
}
