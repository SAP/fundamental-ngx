import { MessageStripAlertPosition } from './message-strip-alert.position';
import { TemplateRef, Type } from '@angular/core';
import { MessageStripConfiguration } from './message-strip-configuration-type';

import { MessageStripAlertRef } from './message-strip-alert.ref';

/**
 * The configuration type which is expected from the user
 */
export interface OpenMessageStripAlertConfig<ComponentType = unknown> {
    /**
     * Position of the message strip alert container.
     * Every top-* and bottom-* ones will be merged into the top-middle
     * and bottom-middle sections respectively and will be sorted by the
     * order of appearance.
     */
    position?: MessageStripAlertPosition;
    /** Content, that will be rendered inside the message strip when it appears */
    content: string | TemplateRef<{ $implicit: MessageStripAlertRef }> | Type<ComponentType>;
    /** Configuration for the message strip component */
    messageStrip?: Partial<MessageStripConfiguration>;
}
