import { TemplateRef, Type } from '@angular/core';
import { MessageBoxContent } from './utils/message-box-content.class';

export type MessageBoxContentType = Type<any> | TemplateRef<any> | MessageBoxContent;
