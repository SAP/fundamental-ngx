import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagePopoverEntry, MessagePopoverErrorGroup } from '../../models/message-popover-entry.interface';
import { MessageViewComponent } from './message-view.component';

const mockEntry: MessagePopoverEntry = {
    heading: { type: 'string', message: 'Error heading' },
    description: { type: 'string', message: 'Error description' },
    type: 'error',
    state: 'negative',
    name: 'required',
    fieldName: 'Field Name',
    errors: { required: true }
};

const mockEntryWithElement: MessagePopoverEntry = {
    ...mockEntry,
    element: new ElementRef(document.createElement('input'))
};

const mockEntryNoDescription: MessagePopoverEntry = {
    ...mockEntry,
    description: { type: 'string', message: '' }
};

const mockErrors: MessagePopoverErrorGroup[] = [
    {
        group: 'Group 1',
        errors: [mockEntry, mockEntryWithElement]
    }
];

describe('MessageViewComponent', () => {
    let component: MessageViewComponent;
    let fixture: ComponentFixture<MessageViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessageViewComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageViewComponent);
        component = fixture.componentInstance;
        component.currentScreen = 'list';
        component.filteredErrors = mockErrors;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should have the host class', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-message-popover__view-container')).toBe(true);
    });

    describe('screen switching', () => {
        it('should show list view when currentScreen is list', () => {
            component.currentScreen = 'list';
            fixture.detectChanges();

            const listSection = fixture.nativeElement.querySelector('.fd-message-view__list');
            expect(listSection).toBeTruthy();
        });

        it('should show details view when currentScreen is details', () => {
            component.currentScreen = 'details';
            component.currentEntry = mockEntry;
            fixture.detectChanges();

            const detailsSection = fixture.nativeElement.querySelector('.fd-message-view__details');
            expect(detailsSection).toBeTruthy();
        });
    });

    describe('_showDetails', () => {
        it('should emit openDetails when entry has a description', () => {
            fixture.detectChanges();
            const spy = jest.fn();
            component.openDetails.subscribe(spy);

            component._showDetails(mockEntry);

            expect(component.currentScreen).toBe('details');
            expect(spy).toHaveBeenCalledWith(mockEntry);
        });

        it('should call _focusElement instead when entry has no description', () => {
            fixture.detectChanges();
            const focusSpy = jest.spyOn(component as any, '_focusElement');
            const openDetailsSpy = jest.fn();
            component.openDetails.subscribe(openDetailsSpy);

            component._showDetails(mockEntryNoDescription);

            expect(openDetailsSpy).not.toHaveBeenCalled();
            expect(focusSpy).toHaveBeenCalled();
        });
    });

    describe('_focusElement', () => {
        it('should emit closePopover and focusItem when entry has element', () => {
            fixture.detectChanges();
            const closePopoverSpy = jest.fn();
            const focusItemSpy = jest.fn();
            component.closePopover.subscribe(closePopoverSpy);
            component.focusItem.subscribe(focusItemSpy);

            component._focusElement(undefined, mockEntryWithElement);

            expect(closePopoverSpy).toHaveBeenCalledWith(false);
            expect(focusItemSpy).toHaveBeenCalledWith(mockEntryWithElement);
        });

        it('should not emit events when entry has no element', () => {
            fixture.detectChanges();
            const closePopoverSpy = jest.fn();
            component.closePopover.subscribe(closePopoverSpy);

            component._focusElement(undefined, mockEntry);

            expect(closePopoverSpy).not.toHaveBeenCalled();
        });
    });
});
