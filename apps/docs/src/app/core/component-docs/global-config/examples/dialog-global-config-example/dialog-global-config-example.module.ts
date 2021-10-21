import { NgModule } from '@angular/core';
import { DialogConfig, DIALOG_DEFAULT_CONFIG } from '@fundamental-ngx/core/dialog';

const DEFAULT_CONFIG: DialogConfig = {
    draggable: true,
    escKeyCloseable: false
};

@NgModule({
    providers: [{ provide: DIALOG_DEFAULT_CONFIG, useValue: DEFAULT_CONFIG }]
})
class DialogGlobalConfigExampleModule {}
