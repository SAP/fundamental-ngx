import { ColorAccent } from '@fundamental-ngx/cdk/utils';
import { IndicationColor } from '@fundamental-ngx/core/avatar';
import { IconFont } from '@fundamental-ngx/core/icon';

export interface ProductSwitchItem {
    /** Title of product */
    title: string;

    /** Subtitle of product */
    subtitle?: string;

    /** Callback function that will be called on selecting this product from dropdown */
    callback?: (event: MouseEvent) => void;

    /** Icon of product item */
    icon?: string;

    /** Avatar representing the product item */
    avatar?: {
        glyph?: string;
        label?: string;
        circle?: boolean;
        image?: string;
        contain?: boolean;
        transparent?: boolean;
        placeholder?: boolean;
        tile?: boolean;
        colorAccent?: ColorAccent | null;
        colorIndication?: IndicationColor | null;
        border?: boolean;
        alterIcon?: string;
        backupImage?: string;
        ariaLabel?: string;
    };

    /** Font of product item */
    font?: IconFont;

    /** Whether user wants to mark this element ass selected */
    selected?: boolean;

    /** Whether user wants to disable drag and drop functionality from single element */
    disabledDragAndDrop?: boolean;

    /** Whether this element should stick in one place, without changing position */
    stickToPosition?: boolean;
}
