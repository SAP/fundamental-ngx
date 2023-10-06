import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuInteractiveComponent } from '@fundamental-ngx/core/menu';

export interface FdbToolHeaderActionButton {
    glyph: string;
    label: string;
    forceVisibility?: boolean;
    clickCallback: (button: ButtonComponent | MenuInteractiveComponent) => void;
    hasBadge?: boolean;
    hasSeparator?: boolean;
}
