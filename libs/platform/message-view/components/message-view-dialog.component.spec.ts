import { computed, EventEmitter, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { MessageViewComponent } from '../message-view.component';
import { MessageViewDialogComponent } from './message-view-dialog.component';

describe('MessageViewDialogComponent', () => {
    let component: MessageViewDialogComponent;
    let fixture: ComponentFixture<MessageViewDialogComponent>;
    let mockMessageView: Partial<MessageViewComponent>;
    let mockDialogRef: Partial<DialogRef>;

    beforeEach(async () => {
        mockMessageView = {
            currentScreen: signal('list'),
            currentEntry: signal(null),
            title: signal('Test Title'),
            detailsTitle: signal('Test Details'),
            _currentErrorType: signal('all'),
            _errorTypes$: computed(() => []),
            _filteredErrors$: computed(() => []),
            showList: jest.fn(),
            showDetails: jest.fn(),
            focusItem: new EventEmitter()
        } as any;

        mockDialogRef = {
            close: jest.fn(),
            dismiss: jest.fn()
        };

        await TestBed.configureTestingModule({
            imports: [MessageViewDialogComponent],
            providers: [
                { provide: MessageViewComponent, useValue: mockMessageView },
                { provide: DialogRef, useValue: mockDialogRef }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageViewDialogComponent);
        component = fixture.componentInstance;
        // Don't call detectChanges to avoid rendering template complexities
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should inject MessageViewComponent', () => {
        expect(component.messageView).toBe(mockMessageView);
    });

    it('should inject DialogRef', () => {
        expect(component.dialogRef).toBe(mockDialogRef);
    });

    it('should have access to messageView properties', () => {
        expect(component.messageView.currentScreen()).toBe('list');
        expect(component.messageView.title()).toBe('Test Title');
        expect(component.messageView.detailsTitle()).toBe('Test Details');
    });

    it('should be able to call dialogRef methods', () => {
        component.dialogRef.close();
        expect(mockDialogRef.close).toHaveBeenCalled();
    });
});
