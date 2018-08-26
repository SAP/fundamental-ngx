import { Injectable, TemplateRef } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk-experimental/dialog';
import { ComponentType } from '@angular/cdk/portal';


@Injectable({
    providedIn: 'root'
})
export class ModalService extends Dialog {
    open<T, R>(component: ComponentType<T> | TemplateRef<T>, config?: DialogConfig): DialogRef<T, R> {
          const consolidatedConfig = {
                panelClass: 'fd-modal--panel',
                ...config
          };
          if (component instanceof TemplateRef) {
                return this.openFromTemplate<T>(component, consolidatedConfig);
          }
          return this.openFromComponent<T>(component, consolidatedConfig);
    }
}

