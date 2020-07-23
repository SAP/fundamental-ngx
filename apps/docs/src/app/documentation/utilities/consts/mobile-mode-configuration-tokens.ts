import { MobileModeControlName, MobileModeToken } from '@fundamental-ngx/core';
import { MOBILE_DIALOG_PORTRAIT } from './mobile-dialog.consts';

export const SELECT_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.SELECT,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};

export const COMBOBOX_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.COMBOBOX,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};

export const MULTI_INPUT_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.MULTI_INPUT,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};

export const MENU_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.MENU,
    config: {dialogConfig: MOBILE_DIALOG_PORTRAIT}
};
