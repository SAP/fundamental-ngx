import { DYNAMIC_SIDE_CONTENT_CLASS_NAME, DynamicSideContentPosition, DynamicSideContentSize } from './constants';

export const getSizeClassName = (size: DynamicSideContentSize): string | null => {
    switch (size) {
        case 'sm':
            return DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeSm;
        case 'md':
        case 'lg':
            return DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeMd;
        case 'xl':
            return DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSizeXl;
        default:
            return null;
    }
};

export const getPositionClassName = (position: DynamicSideContentPosition): string | null => {
    switch (position) {
        case 'bottom':
            return DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSideBelow;
        case 'equalSplit':
            return DYNAMIC_SIDE_CONTENT_CLASS_NAME.containerSideEqual;
        default:
            return null;
    }
};
