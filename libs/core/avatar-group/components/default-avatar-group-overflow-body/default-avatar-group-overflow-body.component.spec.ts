import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultAvatarGroupOverflowBodyComponent } from './default-avatar-group-overflow-body.component';

describe('DefaultAvatarGroupOverflowBodyComponent', () => {
    let component: DefaultAvatarGroupOverflowBodyComponent;
    let fixture: ComponentFixture<DefaultAvatarGroupOverflowBodyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DefaultAvatarGroupOverflowBodyComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DefaultAvatarGroupOverflowBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Escape key handling', () => {
        it('should emit escapePressed when Escape key is dispatched on the host', () => {
            const spy = jest.fn();
            component.escapePressed.subscribe(spy);

            fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should emit escapePressed even when a child element calls stopPropagation', () => {
            const spy = jest.fn();
            component.escapePressed.subscribe(spy);

            // Simulate fdkFocusableList behaviour: it calls stopPropagation in the bubbling phase.
            // Our listener uses capture phase so it fires before stopPropagation takes effect.
            const child = document.createElement('div');
            fixture.nativeElement.appendChild(child);
            child.addEventListener('keydown', (e) => e.stopPropagation());

            child.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should not emit escapePressed for non-Escape keys', () => {
            const spy = jest.fn();
            component.escapePressed.subscribe(spy);

            fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

            expect(spy).not.toHaveBeenCalled();
        });
    });
});
