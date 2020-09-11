import { TemplateRef } from '@angular/core';

export interface MainAction {
    mainActionTitle: string | TemplateRef<any>,
    callback?: Function
}
