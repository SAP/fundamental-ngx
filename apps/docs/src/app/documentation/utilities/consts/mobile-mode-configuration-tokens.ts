import { MobileModeControl, MobileModeConfigToken } from '@fundamental-ngx/core';
import { MOBILE_DIALOG_PORTRAIT } from './mobile-dialog.consts';

export const SELECT_MOBILE_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.SELECT,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};

export const COMBOBOX_MOBILE_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.COMBOBOX,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};

export const MULTI_INPUT_MOBILE_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.MULTI_INPUT,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};

export const MENU_MOBILE_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.MENU,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};
