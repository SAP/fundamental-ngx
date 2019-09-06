import { TemplateRef } from '@angular/core';
/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
export declare class TabPanelComponent {
    /** @hidden */
    titleTemplate: TemplateRef<any>;
    /** The title of the tab header. */
    title: string;
    /** Aria-label of the tab. Also applied to the tab header. */
    ariaLabel: string;
    /** Id of the element that labels the tab. Also applied to the tab header. */
    ariaLabelledBy: string;
    /** Whether the tab is disabled. */
    disabled: boolean;
    /** Id of the tab. If none is provided, one will be generated. */
    id: string;
    /** @hidden */
    expanded: boolean;
    /** @hidden */
    index: number;
}
