import { CdkScrollable } from '@angular/cdk/overlay';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';

interface Location {
    id: string;
    name: string;
    city: string;
    address?: string;
    isOpen?: boolean;
    closingTime?: string;
}

@Component({
    selector: 'fd-location-selection-dialog',
    templateUrl: './location-selection-dialog.component.html',
    styleUrl: './location-selection-dialog.component.scss',
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        TitleComponent,
        ButtonComponent,
        InputGroupModule,
        FormsModule,
        ListModule,
        IconComponent,
        ObjectStatusComponent,
        BarModule,
        TemplateDirective,
        CdkScrollable,
        ScrollbarDirective
    ]
})
export class LocationSelectionDialogComponent {
    readonly searchTerm = signal('');
    readonly selectedLocation = signal<Location | null>(null);

    protected readonly filteredLocations = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) {
            return this.allLocations();
        }

        return this.allLocations().filter(
            (loc) => loc.name.toLowerCase().includes(term) || loc.city.toLowerCase().includes(term)
        );
    });

    protected readonly showDetails = computed(() => this.selectedLocation() !== null);

    private readonly allLocations = signal<Location[]>([
        {
            id: '1',
            name: 'Location',
            city: 'Berlin',
            address: 'George-Stephenson-Straße 7-13, Berlin',
            isOpen: true,
            closingTime: '5:00 PM'
        },
        {
            id: '2',
            name: 'Location',
            city: 'Sofia',
            address: 'Graf Ignatiev St, 1000 Sofia Center, Sofia',
            isOpen: false,
            closingTime: '6:00 PM'
        },
        {
            id: '3',
            name: 'Location',
            city: 'San Francisco',
            address: '575 Market Street, San Francisco, CA 94105',
            isOpen: true,
            closingTime: '7:00 PM'
        },
        {
            id: '4',
            name: 'Location',
            city: 'Bangalore',
            address: 'Embassy Golf Links Business Park, Bangalore 560071',
            isOpen: true,
            closingTime: '8:00 PM'
        }
    ]);

    constructor(public dialogRef: DialogRef) {}

    protected selectLocation(location: Location): void {
        this.selectedLocation.set(location);
    }

    protected backToList(): void {
        this.selectedLocation.set(null);
    }

    protected confirmSelection(): void {
        this.dialogRef.close(this.selectedLocation());
    }

    protected cancel(): void {
        this.dialogRef.dismiss();
    }
}
