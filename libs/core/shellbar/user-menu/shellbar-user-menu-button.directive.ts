import { Directive, inject, Input, isDevMode, OnInit } from '@angular/core';
import { defaultButtonType, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';

@Directive({
    selector: '[fd-button][fdShellbarUserMenuButton]',
    host: {
        '[class.fd-shellbar__button]': 'true',
        '[class.fd-shellbar__button--user-menu]': 'true'
    },
    standalone: true
})
export class ShellbarUserMenuButtonDirective implements OnInit {
    /** The type of the button. In case of the ShellbarUserMenuButtonDirective, the type is always 'transparent'. */
    @Input()
    fdType = 'transparent' as const;

    /** @hidden */
    private _hostButton = inject(FD_BUTTON_COMPONENT, { host: true });

    /** @hidden */
    ngOnInit(): void {
        if (
            this._hostButton.getFdType() !== 'transparent' &&
            this._hostButton.getFdType() !== defaultButtonType &&
            isDevMode()
        ) {
            console.warn(
                'ShellbarUserMenuButtonDirective should be used with transparent button type. Overriding button type to transparent.'
            );
        }
        this._hostButton.setFdType('transparent');
    }
}
