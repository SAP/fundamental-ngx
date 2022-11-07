import { NgModule } from '@angular/core';
import { PlatformMessagePopoverModule } from '@fundamental-ngx/platform/message-popover';

@NgModule({
    imports: [
        PlatformMessagePopoverModule.withConfig({
            errors: {
                email: {
                    heading: 'platformMessagePopover.defaultErrors.email',
                    description: 'platformMessagePopover.defaultErrors.email',
                    type: 'warning'
                },
                max: {
                    heading: 'platformMessagePopover.defaultErrors.max',
                    description: 'platformMessagePopover.defaultErrors.max',
                    type: 'warning'
                },
                maxlength: {
                    heading: 'platformMessagePopover.defaultErrors.maxLength',
                    description: 'platformMessagePopover.defaultErrors.maxLength',
                    type: 'warning'
                },
                min: {
                    heading: 'platformMessagePopover.defaultErrors.min',
                    description: 'platformMessagePopover.defaultErrors.min',
                    type: 'warning'
                },
                minlength: 'platformMessagePopover.defaultErrors.minLength',
                pattern: 'platformMessagePopover.defaultErrors.pattern',
                required: 'platformMessagePopover.defaultErrors.required'
            }
        })
    ]
})
export class ExampleAppModule {}
