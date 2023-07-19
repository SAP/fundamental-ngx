import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { I18nModule } from '@fundamental-ngx/i18n';
import { of } from 'rxjs';

import { MessagePopoverComponent } from './message-popover.component';
import { MessagePopoverWrapper } from './models/message-popover-wrapper.interface';
import { MessagePopoverErrorGroup } from './models/message-popover-entry.interface';

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

export class MessagePopoverWrapperStub implements MessagePopoverWrapper {
    errors = of(stubErrors);
    formFields: [];
    setMessagePopover(): void {}
}

describe('MessagePopoverComponent', () => {
    let component: MessagePopoverComponent;
    let fixture: ComponentFixture<MessagePopoverComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopoverModule, I18nModule],
            declarations: [MessagePopoverComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(MessagePopoverComponent);
        component = fixture.componentInstance;
        component.wrapper = new MessagePopoverWrapperStub();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get errors from wrapper', async () => {
        await fixture.whenStable();

        expect(component._errorTypes.length).toBeGreaterThan(0);
        expect(component._errorTypes.map((e) => e.state)).toEqual(['critical', 'negative']);
    });

    it('should filter errors', async () => {
        await fixture.whenStable();

        component._currentErrorType = 'error';
        component._filterErrors();

        expect(component._filteredErrors.every((e) => e.errors.every((error) => error.type === 'error'))).toBe(true);
    });
});
