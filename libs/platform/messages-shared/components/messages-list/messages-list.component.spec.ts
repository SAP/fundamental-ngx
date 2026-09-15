import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagePopoverEntry, MessagePopoverErrorGroup } from '../../models/message-popover-entry.interface';
import { MessagesListComponent } from './messages-list.component';

describe('MessagesListComponent', () => {
    let component: MessagesListComponent;
    let fixture: ComponentFixture<MessagesListComponent>;

    const mockMessages: MessagePopoverErrorGroup[] = [
        {
            group: 'Test Group',
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessagesListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MessagesListComponent);
        component = fixture.componentInstance;
        component.filteredErrors = mockMessages;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with list screen', () => {
        expect(component.currentScreen).toBe('list');
    });

    describe('Screen transitions', () => {
        it('should set currentScreen when input changes', () => {
            component.currentScreen = 'details';
            expect(component.currentScreen).toBe('details');
        });

        it('should animate when changing between screens', () => {
            // Set initial screen
            component.currentScreen = 'list';
            fixture.detectChanges();

            const animateSpy = jest.spyOn(component as any, '_animateScreenTransition');

            // Change screen
            component.currentScreen = 'details';

            expect(animateSpy).toHaveBeenCalledWith('details');
        });
    });

    describe('Event emissions', () => {
        it('should emit openDetails when entry with description is clicked', () => {
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Test description', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null
            };

            const spy = jest.fn();
            component.openDetails.subscribe(spy);

            component.showDetails(entry);

            expect(spy).toHaveBeenCalledWith(entry);
            expect(component.currentScreen).toBe('details');
        });

        it('should emit focusItem when entry without description is clicked', () => {
            const mockElement = { nativeElement: document.createElement('div') };
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: null, type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null,
                element: mockElement as any
            };

            const focusSpy = jest.fn();
            component.focusItem.subscribe(focusSpy);

            component.showDetails(entry);

            expect(focusSpy).toHaveBeenCalledWith(entry);
            expect(component.currentScreen).toBe('list');
        });

        it('should emit closePopover when focusing element', () => {
            const mockElement = { nativeElement: document.createElement('input') };
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Test', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null,
                element: mockElement as any
            };

            const closeSpy = jest.fn();
            component.closePopover.subscribe(closeSpy);

            component._focusElement(undefined, entry);

            expect(closeSpy).toHaveBeenCalledWith(false);
        });

        it('should emit focusItem when focusing element', () => {
            const mockElement = { nativeElement: document.createElement('input') };
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Test', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null,
                element: mockElement as any
            };

            const focusSpy = jest.fn();
            component.focusItem.subscribe(focusSpy);

            component._focusElement(undefined, entry);

            expect(focusSpy).toHaveBeenCalledWith(entry);
        });
    });

    describe('Focus management', () => {
        it('should stop event propagation when focusing element', () => {
            const mockElement = { nativeElement: document.createElement('input') };
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Test', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null,
                element: mockElement as any
            };

            const mockEvent = new MouseEvent('click');
            const stopPropagationSpy = jest.spyOn(mockEvent, 'stopImmediatePropagation');

            component._focusElement(mockEvent, entry);

            expect(stopPropagationSpy).toHaveBeenCalled();
        });

        it('should handle keyboard events when focusing element', () => {
            const mockElement = { nativeElement: document.createElement('input') };
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Test', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null,
                element: mockElement as any
            };

            const mockEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            const stopPropagationSpy = jest.spyOn(mockEvent, 'stopImmediatePropagation');

            component._focusElement(mockEvent, entry);

            expect(stopPropagationSpy).toHaveBeenCalled();
        });

        it('should not focus if item has no element', () => {
            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Test', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null
            };

            const focusSpy = jest.fn();
            component.focusItem.subscribe(focusSpy);

            component._focusElement(undefined, entry);

            expect(focusSpy).not.toHaveBeenCalled();
        });

        it('should store active list element when navigating to details', () => {
            const mockActiveElement = document.createElement('button');
            const mockDocument = TestBed.inject(DOCUMENT);
            Object.defineProperty(mockDocument, 'activeElement', {
                value: mockActiveElement,
                configurable: true
            });

            const entry: MessagePopoverEntry = {
                heading: { message: 'Test', type: 'string' as const },
                type: 'error' as const,
                state: 'negative' as const,
                description: { message: 'Description', type: 'string' as const },
                name: 'test',
                fieldName: 'Test Field',
                errors: null
            };

            component.showDetails(entry);

            expect(component['_activeListElement']).toBe(mockActiveElement);
        });
    });

    describe('Animation', () => {
        beforeEach(() => {
            // Mock view children
            component['_listSection'] = { nativeElement: document.createElement('div') } as any;
            component['_detailsSection'] = { nativeElement: document.createElement('div') } as any;
        });

        it('should cancel ongoing animations when new transition starts', () => {
            const mockAnimation = { cancel: jest.fn(), finished: Promise.resolve() } as any;
            component['_listAnimation'] = mockAnimation;
            component['_detailsAnimation'] = mockAnimation;

            component.currentScreen = 'list';
            component.currentScreen = 'details';

            expect(mockAnimation.cancel).toHaveBeenCalled();
        });

        it('should not animate if elements are not available', () => {
            component['_listSection'] = null as any;
            component['_detailsSection'] = null as any;

            // Should not throw
            expect(() => {
                component.currentScreen = 'list';
                component.currentScreen = 'details';
            }).not.toThrow();
        });

        it('should handle browser without animate support', () => {
            const mockDiv = document.createElement('div');
            delete (mockDiv as any).animate;

            component['_listSection'] = { nativeElement: mockDiv } as any;
            component['_detailsSection'] = { nativeElement: document.createElement('div') } as any;

            // Should not throw
            expect(() => {
                component.currentScreen = 'list';
                component.currentScreen = 'details';
            }).not.toThrow();
        });
    });

    describe('Lifecycle', () => {
        it('should clean up animations on destroy', () => {
            const mockAnimation = { cancel: jest.fn(), finished: Promise.resolve() } as any;
            component['_listAnimation'] = mockAnimation;
            component['_detailsAnimation'] = mockAnimation;

            fixture.destroy();

            expect(mockAnimation.cancel).toHaveBeenCalled();
            expect(component['_listAnimation']).toBeNull();
            expect(component['_detailsAnimation']).toBeNull();
        });
    });
});
