import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceComponent } from './data-source.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DataSourceComponent],
    exports: [DataSourceComponent]
})
export class DataSourceModule {}
