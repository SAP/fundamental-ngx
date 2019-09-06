/**
 * The component that represents an image.
 *
 * ```html
 * <fd-image style="margin-right: 10px;" [size]="'l'" [circle]="true" [photo]="'https://placeimg.com/400/400/nature'"></fd-image>
 * ```
 */
export declare class ImageComponent {
    /**
     * The size of the image.
     * The predefined values for the size are *s*, *m*, and *l*.
     */
    size: string;
    /**
     * Whether to render a circle style for the image.
     */
    circle: boolean;
    /**
     * The image label.
     */
    label: string;
    /**
     * The image url.
     */
    photo: string;
}
