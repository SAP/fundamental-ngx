import { NgStyle } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { LinkComponent } from '@fundamental-ngx/core/link';

@Component({
    selector: 'fd-link-example',
    templateUrl: './link-example.component.html',
    imports: [LinkComponent, RouterLink, IconComponent, NgStyle]
})
export class LinkExampleComponent {
    readonly arrowRight = computed(() => (this._rtlService?.rtl() ? 'slim-arrow-left' : 'slim-arrow-right'));

    readonly arrowLeft = computed(() => (this._rtlService?.rtl() ? 'slim-arrow-right' : 'slim-arrow-left'));

    private readonly _rtlService = inject(RtlService, { optional: true });
}
