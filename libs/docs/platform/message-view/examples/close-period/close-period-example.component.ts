import { Component, computed, signal, TemplateRef, viewChild } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageViewComponent } from '@fundamental-ngx/platform/message-view';
import { MessagePopoverErrorGroup } from '@fundamental-ngx/platform/messages-shared';

@Component({
    selector: 'fdp-message-view-close-period-example',
    templateUrl: './close-period-example.component.html',
    imports: [MessageViewComponent, ButtonComponent]
})
export class ClosePeriodExampleComponent {
    protected readonly messages = signal<MessagePopoverErrorGroup[]>([]);
    protected readonly messageView = viewChild(MessageViewComponent);
    protected readonly literalMessageTemplate = viewChild<TemplateRef<any>>('literalMessageTemplate');
    protected readonly dialogWasClosed = signal(false);
    protected readonly resultCount = computed(() =>
        this.messages().reduce((count, group) => count + group.errors.length, 0)
    );
    protected readonly resultStatus = computed(() => {
        const count = this.resultCount();
        if (count === 0) {
            return this.dialogWasClosed()
                ? 'Results cleared. No action results remain; ready for another close.'
                : 'No action results are stored. Run the close to create them.';
        }
        return count + ' aggregated action results are in the dialog. Close it to clear them.';
    });

    protected closePeriod(): void {
        const literalMessageTemplate = this.literalMessageTemplate();
        if (!literalMessageTemplate) {
            // Literal demo messages need a TemplateRef to bypass fdTranslate's translation-key lookup.
            return;
        }

        this.dialogWasClosed.set(false);
        this.messages.set([
            {
                group: 'Period close',
                errors: [
                    {
                        type: 'success',
                        state: 'positive',
                        heading: { type: 'directive', message: literalMessageTemplate, error: 'Close completed' },
                        description: {
                            type: 'directive',
                            message: literalMessageTemplate,
                            error: 'Nine subsidiaries were closed successfully.'
                        },
                        name: 'period-close-success',
                        fieldName: 'Nine subsidiaries closed',
                        errors: null,
                        aggregatedMessages: 9
                    },
                    {
                        type: 'warning',
                        state: 'critical',
                        heading: { type: 'directive', message: literalMessageTemplate, error: 'Approval required' },
                        description: {
                            type: 'directive',
                            message: literalMessageTemplate,
                            error: 'Two subsidiaries are waiting for approval before they can be closed.'
                        },
                        name: 'period-close-warning',
                        fieldName: 'Two subsidiaries are waiting for approval',
                        errors: null,
                        aggregatedMessages: 2
                    },
                    {
                        type: 'error',
                        state: 'negative',
                        heading: {
                            type: 'directive',
                            message: literalMessageTemplate,
                            error: 'Backend connection problem'
                        },
                        description: {
                            type: 'directive',
                            message: literalMessageTemplate,
                            error: 'The backend connection dropped while one subsidiary was being processed. Check the service connection, then retry the close.'
                        },
                        name: 'period-close-error',
                        fieldName: 'One subsidiary could not be processed',
                        errors: null,
                        aggregatedMessages: 1
                    }
                ]
            }
        ]);
        this.messageView()?.open();
    }

    protected clearResults(): void {
        this.messages.set([]);
        this.dialogWasClosed.set(true);
    }
}
