import { InlineHelpPlacement } from '@fundamental-ngx/core/form';
import { HintPlacement } from '@fundamental-ngx/platform/shared';

export interface HintOptions {
    text: string;
    position?: InlineHelpPlacement;
    trigger?: string[];
    placement?: HintPlacement;
    glyph?: string;
}
