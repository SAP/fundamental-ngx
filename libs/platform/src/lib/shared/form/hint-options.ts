import { InlineHelpFormPlacement } from '@fundamental-ngx/core/form';
import { HintPlacement } from './form-options';
import { TriggerConfig } from '@fundamental-ngx/core/popover';

export interface HintOptions {
    /** Text of the hint */
    text: string;
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
