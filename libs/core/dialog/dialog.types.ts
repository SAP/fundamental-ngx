import { TemplateRef, Type } from '@angular/core';
import { DialogDefaultContent } from './utils/dialog-default-content.class';

export { DialogDefaultContent };

export type DialogContentType = TemplateRef<any> | Type<any> | DialogDefaultContent;
