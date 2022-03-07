import { InlineHelpPlacement } from '@fundamental-ngx/core/form';
import { HintPlacement } from '@fundamental-ngx/platform/shared';

export interface HintOptions {
    /** Text of the hint */
    text: string;
    /** Text position of the inline help icon, relative to label */
    position?: InlineHelpPlacement;
    /** Trigger events for showing and hiding help */
    trigger?: string[];
    /** Hint placement */
    placement?: HintPlacement;
    /** Icon name of the inline help element */
    glyph?: string;
}
