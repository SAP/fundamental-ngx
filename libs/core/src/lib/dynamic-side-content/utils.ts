import { CLASS_NAME, DynamicSideContentPosition, DynamicSideContentSize } from './constants';

export const getSizeClassName = (size: DynamicSideContentSize): string => {
    switch (size) {
        case 'sm':
            return CLASS_NAME.containerSizeSm;
        case 'md':
        case 'lg':
            return CLASS_NAME.containerSizeMd;
        case 'xl':
            return CLASS_NAME.containerSizeXl;
        default:
            return null;
    }
};

export const getPositionClassName = (position: DynamicSideContentPosition): string => {
    switch (position) {
        case 'bottom':
            return CLASS_NAME.containerSideBelow;
        case 'equalSplit':
            return CLASS_NAME.containerSideEqual;
        default:
            return null;
    }
};
