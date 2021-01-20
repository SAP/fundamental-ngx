import { Component } from '@angular/core';

@Component({
  selector: 'fd-variant-management',
  templateUrl: './variant-management.component.html',
  styleUrls: ['./variant-management.component.scss']
})
export class VariantManagementComponent {
    selectedView: any;
    list = ['Option 1', 'Option 2', 'Option 3'];
}
