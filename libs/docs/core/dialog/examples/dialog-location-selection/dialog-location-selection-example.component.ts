import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { LocationSelectionDialogComponent } from './location-selection-dialog.component';

interface Location {
    id: string;
    name: string;
    city: string;
    address?: string;
    isOpen?: boolean;
    closingTime?: string;
}

@Component({
    selector: 'fd-dialog-location-selection-example',
    templateUrl: './dialog-location-selection-example.component.html',
    imports: [ButtonComponent, BarModule]
})
export class DialogLocationSelectionExampleComponent {
    selectedLocation: Location | null = null;

    constructor(private _dialogService: DialogService) {}

    openLocationDialog(): void {
        const dialogRef = this._dialogService.open(LocationSelectionDialogComponent, {
            width: '400px',
            responsivePadding: true,
            ariaLabelledBy: 'fd-location-dialog-title',
            ariaDescribedBy: 'fd-location-dialog-description'
        });

        dialogRef.afterClosed.subscribe((result) => {
            if (result) {
                this.selectedLocation = result;
            }
        });
    }
}
