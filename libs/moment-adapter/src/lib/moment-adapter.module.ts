import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { MomentDatetimeAdapterModule, 
    MomentDatetimeAdapter, 
    MomentDatetimeModule
} from './moment-datetime/moment-datetime.module';

@NgModule({
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [MomentDatetimeAdapterModule, MomentDatetimeAdapter, MomentDatetimeModule]
})
export class MomentAdapterModule {}
