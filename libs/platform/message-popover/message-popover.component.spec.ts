import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n/en';
import { MessagePopoverErrorGroup, MessagePopoverWrapper } from '@fundamental-ngx/platform/messages-shared';
import { MessagePopoverComponent } from './message-popover.component';

const stubErrors: MessagePopoverErrorGroup[] = [
    {
        group: '',
        errors: [
            {
                heading: {
                    type: 'string',
                    message: 'Error heading'
                },
                description: {
                    type: 'string',
                    message: 'Error heading'
                },
                type: 'warning',
                state: 'critical',
                name: 'required',
                fieldName: 'field name',
                errors: {
                    required: true
                }
            },
            {
                heading: {
                    type: 'string',
                    message: 'Error heading'
                },
                description: {
                    type: 'string',
                    message: 'Error heading'
                },
                type: 'error',
                state: 'negative',
                name: 'required',
                fieldName: 'field name',
                errors: {
                    required: true
                }
            }
        ]
    },
    {
        group: 'Group name',
        errors: [
            {
                heading: {
                    type: 'string',
                    message: 'Error heading'
                },
                description: {
                    type: 'string',
                    message: 'Error heading'
                },
                type: 'warning',
                state: 'critical',
                name: 'required',
                fieldName: 'field name',
                errors: {
                    required: true
                }
            },
            {
                heading: {
                    type: 'string',
                    message: 'Error heading'
                },
                description: {
                    type: 'string',
                    message: 'Error heading'
                },
                type: 'error',
                state: 'negative',
                name: 'required',
                fieldName: 'field name',
                errors: {
                    required: true
                }
            }
        ]
    }
];

@Injectable()
export class MessagePopoverWrapperStub implements MessagePopoverWrapper {
    errors$ = signal(stubErrors);
    formFields: [];
    setMessagePopover(): void {}
}

describe('MessagePopoverComponent', () => {
    let component: MessagePopoverComponent;
    let fixture: ComponentFixture<MessagePopoverComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessagePopoverComponent],
            providers: [
                MessagePopoverWrapperStub,
                { provide: FD_LANGUAGE_SIGNAL, useValue: signal(FD_LANGUAGE_ENGLISH) }
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(MessagePopoverComponent);
        component = fixture.componentInstance;
        component.wrapper = TestBed.inject(MessagePopoverWrapperStub);
        fixture.detectChanges();
    });

    function popoverTrigger(): HTMLElement {
        return fixture.nativeElement.querySelector('.fd-message-popover__trigger');
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get errors from wrapper', async () => {
        await fixture.whenStable();

        expect(component._errorTypes$().length).toBeGreaterThan(0);
        expect(component._errorTypes$().map((e) => e.state)).toEqual(['critical', 'negative']);
    });

    it('should filter errors', async () => {
        await fixture.whenStable();

        component._currentErrorType.set('error');

        fixture.detectChanges();

        expect(component._filteredErrors$().every((e) => e.errors.every((error) => error.type === 'error'))).toBe(true);
    });

    it('should give the popover close button an accessible name', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        popoverTrigger().click();
        fixture.detectChanges();
        await fixture.whenStable();

        const closeButton = document.querySelector<HTMLElement>('.fd-popover__body .fd-bar__right button');
        expect(closeButton).toBeTruthy();
        expect(closeButton?.getAttribute('aria-label')).toBe('Close');
    });
});
