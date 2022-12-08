import { NgModule } from '@angular/core';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from '@fundamental-ngx/core/dialog';

const DEFAULT_CONFIG: DialogConfig = {
    draggable: true,
    escKeyCloseable: false
};

@NgModule({
    providers: [{ provide: DIALOG_DEFAULT_CONFIG, useValue: DEFAULT_CONFIG }]
})
export class DialogGlobalConfigExampleModule {}
