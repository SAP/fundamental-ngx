import { TemplateRef } from '@angular/core';

export interface FdbToolHeaderActionButton {
    templateRef?: TemplateRef<void>;
    glyph: string;
    label: string;
    forceVisibility?: boolean;
    clickCallback: () => void;
    hasBadge?: boolean;
    hasSeparator?: boolean;
}
