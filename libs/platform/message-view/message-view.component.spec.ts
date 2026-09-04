import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageViewComponent } from './message-view.component';

describe('MessageViewComponent', () => {
    let component: MessageViewComponent;
    let fixture: ComponentFixture<MessageViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessageViewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show list screen by default', () => {
        expect(component.currentScreen).toBe('list');
    });

    it('should switch to details screen', () => {
        const entry = {
            heading: { message: 'Test', type: 'string' as const },
            type: 'error' as const,
            state: 'negative' as const,
            description: { message: 'Test description', type: 'string' as const },
            name: 'test',
            fieldName: 'Test Field',
            errors: null
        };

        component._showDetails(entry);
        expect(component.currentScreen).toBe('details');
        expect(component.currentEntry).toBe(entry);
    });

    it('should switch back to list screen', () => {
        component.currentScreen = 'details';
        component._showList();
        expect(component.currentScreen).toBe('list');
        expect(component.currentEntry).toBeNull();
    });

    it('should accept messages input', () => {
        const messages = [
            {
                errors: [
                    {
                        heading: { message: 'Error', type: 'string' as const },
                        type: 'error' as const,
                        state: 'negative' as const,
                        description: { message: 'Error description', type: 'string' as const },
                        name: 'error1',
                        fieldName: 'Field 1',
                        errors: null
                    }
                ]
            }
        ];

        fixture.componentRef.setInput('messages', messages);
        fixture.detectChanges();

        expect(component.messages()).toEqual(messages);
        expect(component._groupedErrors$()).toEqual(messages);
    });

    it('should display error count when messages are provided', () => {
        const messages = [
            {
                errors: [
                    {
                        heading: { message: 'Error', type: 'string' as const },
                        type: 'error' as const,
                        state: 'negative' as const,
                        description: { message: 'Error description', type: 'string' as const },
                        name: 'error1',
                        fieldName: 'Field 1',
                        errors: null
                    },
                    {
                        heading: { message: 'Warning', type: 'string' as const },
                        type: 'warning' as const,
                        state: 'critical' as const,
                        description: { message: 'Warning description', type: 'string' as const },
                        name: 'warning1',
                        fieldName: 'Field 2',
                        errors: null
                    }
                ]
            }
        ];

        fixture.componentRef.setInput('messages', messages);
        fixture.detectChanges();

        const errorTypes = component._errorTypes$();
        expect(errorTypes.length).toBe(2);
        expect(errorTypes.some((e) => e.group === 'error' && e.count === 1)).toBe(true);
        expect(errorTypes.some((e) => e.group === 'warning' && e.count === 1)).toBe(true);
    });

    it('should accept title input', () => {
        fixture.componentRef.setInput('title', 'Test Title');
        fixture.detectChanges();

        expect(component.title()).toBe('Test Title');
    });

    it('should accept detailsTitle input', () => {
        fixture.componentRef.setInput('detailsTitle', 'Test Details');
        fixture.detectChanges();

        expect(component.detailsTitle()).toBe('Test Details');
    });

    it('should filter messages by type', () => {
        const messages = [
            {
                errors: [
                    {
                        heading: { message: 'Error', type: 'string' as const },
                        type: 'error' as const,
                        state: 'negative' as const,
                        description: { message: 'Error description', type: 'string' as const },
                        name: 'error1',
                        fieldName: 'Field 1',
                        errors: null
                    },
                    {
                        heading: { message: 'Warning', type: 'string' as const },
                        type: 'warning' as const,
                        state: 'critical' as const,
                        description: { message: 'Warning description', type: 'string' as const },
                        name: 'warning1',
                        fieldName: 'Field 2',
                        errors: null
                    }
                ]
            }
        ];

        fixture.componentRef.setInput('messages', messages);
        fixture.detectChanges();

        // Filter by error type
        component._currentErrorType$.set('error');
        const filteredErrors = component._filteredErrors$();

        expect(filteredErrors.length).toBe(1);
        expect(filteredErrors[0].errors.length).toBe(1);
        expect(filteredErrors[0].errors[0].type).toBe('error');
    });

    it('should show all messages when filter is set to "all"', () => {
        const messages = [
            {
                errors: [
                    {
                        heading: { message: 'Error', type: 'string' as const },
                        type: 'error' as const,
                        state: 'negative' as const,
                        description: { message: 'Error description', type: 'string' as const },
                        name: 'error1',
                        fieldName: 'Field 1',
                        errors: null
                    },
                    {
                        heading: { message: 'Warning', type: 'string' as const },
                        type: 'warning' as const,
                        state: 'critical' as const,
                        description: { message: 'Warning description', type: 'string' as const },
                        name: 'warning1',
                        fieldName: 'Field 2',
                        errors: null
                    }
                ]
            }
        ];

        fixture.componentRef.setInput('messages', messages);
        fixture.detectChanges();

        component._currentErrorType$.set('all');
        const filteredErrors = component._filteredErrors$();

        expect(filteredErrors).toEqual(messages);
    });

    it('should calculate priority state correctly', () => {
        const messages = [
            {
                errors: [
                    {
                        heading: { message: 'Error', type: 'string' as const },
                        type: 'error' as const,
                        state: 'negative' as const,
                        description: { message: 'Error description', type: 'string' as const },
                        name: 'error1',
                        fieldName: 'Field 1',
                        errors: null
                    },
                    {
                        heading: { message: 'Warning', type: 'string' as const },
                        type: 'warning' as const,
                        state: 'critical' as const,
                        description: { message: 'Warning description', type: 'string' as const },
                        name: 'warning1',
                        fieldName: 'Field 2',
                        errors: null
                    }
                ]
            }
        ];

        fixture.componentRef.setInput('messages', messages);
        fixture.detectChanges();

        // Error has higher priority than warning
        expect(component._priorityFormState$()).toBe('error');
        expect(component._priorityState$()).toBe('negative');
        expect(component._priorityStateItemsCount$()).toBe(1);
    });

    it('should emit focusItem event', () => {
        const entry = {
            heading: { message: 'Test', type: 'string' as const },
            type: 'error' as const,
            state: 'negative' as const,
            description: { message: 'Test description', type: 'string' as const },
            name: 'test',
            fieldName: 'Test Field',
            errors: null
        };

        const spy = jest.fn();
        component.focusItem.subscribe(spy);

        component.focusItem.emit(entry);

        expect(spy).toHaveBeenCalledWith(entry);
    });
});
