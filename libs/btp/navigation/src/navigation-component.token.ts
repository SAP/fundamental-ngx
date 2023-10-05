import { Signal } from '@angular/core';

export abstract class FdbNavigationComponent {
    abstract state: Signal<'expanded' | 'snapped' | 'popup'>;
    abstract type: Signal<'horizontal' | 'vertical'>;
    abstract mode: Signal<'desktop' | 'tablet' | 'phone'>;
}
