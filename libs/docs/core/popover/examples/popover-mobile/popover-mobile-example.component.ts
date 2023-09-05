import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormControlModule, FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';
import { PopoverComponent, PopoverTriggerDirective } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-mobile-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './popover-mobile-example.component.html',
    standalone: true,
    imports: [
        ButtonModule,
        PopoverTriggerDirective,
        PopoverComponent,
        FormItemModule,
        FormLabelModule,
        FormControlModule,
        FormsModule,
        BarModule
    ]
})
export class PopoverMobileExampleComponent {
    private _cdr = inject(ChangeDetectorRef);
    clickCount = 0;

    addClick(): void {
        this.clickCount++;
        this._cdr.detectChanges();
    }

    reset(): void {
        this.clickCount = 0;
        this._cdr.detectChanges();
    }

    accept(): void {
        alert('Accept button clicked..');
    }

    decline(): void {
        alert('Decline button clicked..');
    }
}
