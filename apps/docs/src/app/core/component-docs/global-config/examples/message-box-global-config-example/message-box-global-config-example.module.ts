import { NgModule } from '@angular/core';
import { MESSAGE_BOX_DEFAULT_CONFIG, MessageBoxConfig } from '@fundamental-ngx/core';

const DEFAULT_CONFIG: MessageBoxConfig = {
    type: 'error',
    escKeyCloseable: false
};

@NgModule({
    providers: [{ provide: MESSAGE_BOX_DEFAULT_CONFIG, useValue: DEFAULT_CONFIG }]
})
class MessageBoxGlobalConfigExampleModule { }
