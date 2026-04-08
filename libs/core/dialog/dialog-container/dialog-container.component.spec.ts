import { PortalModule } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DialogContentType, DialogDefaultContent } from '../dialog.types';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';

@Component({
    selector: 'fd-content-test-component',
    template: 'Hello there',
    imports: [PortalModule]
})
class ContentTestComponent {}

describe('DialogContainerComponent', () => {
    let component: DialogContainerComponent;
    let fixture: ComponentFixture<DialogContainerComponent>;
    let dialogRef: DialogRef;
    const dialogConfig = { ...new DialogConfig(), componentClass: 'test-class' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PortalModule, ContentTestComponent, DialogContainerComponent],
            providers: [
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: DialogRef, useClass: DialogRef }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogContainerComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(DialogRef);
        component.childContent = ContentTestComponent;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should create embedded content', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const childComponentEl = fixture.nativeElement.querySelector('fd-content-test-component');
        expect(childComponentEl).toBeTruthy();
        expect(childComponentEl.textContent).toContain('Hello there');
    }));

    it('should create component from object', fakeAsync(() => {
        const content: DialogDefaultContent = { title: 'Hello there' };
        component.childContent = content as DialogContentType;
        const embedContentSpy = jest.spyOn(component as any, '_createFromDefaultDialog');

        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        expect(embedContentSpy).toHaveBeenCalled();
    }));

    describe('animation lifecycle', () => {
        it('should start in void animation state', () => {
            // Before ngAfterViewInit, the animation state should be 'void'
            expect(component['_animationStateSignal']()).toBe('void');
        });

        it('should transition to visible state after content loads', fakeAsync(() => {
            fixture.detectChanges();
            tick(); // triggers setTimeout in ngAfterViewInit -> _loadContent

            expect(component['_animationStateSignal']()).toBe('visible');
        }));

        it('should transition to hidden state when dialog is dismissed', fakeAsync(() => {
            fixture.detectChanges();
            tick(); // content loads, state becomes 'visible'

            dialogRef.dismiss();
            fixture.detectChanges();
            tick();

            expect(component['_animationStateSignal']()).toBe('hidden');
        }));

        it('should transition to hidden state when dialog is closed', fakeAsync(() => {
            fixture.detectChanges();
            tick();

            dialogRef.close('result');
            fixture.detectChanges();
            tick();

            expect(component['_animationStateSignal']()).toBe('hidden');
        }));

        it('should emit _endClose$ when dialog is closed', fakeAsync(() => {
            fixture.detectChanges();
            tick();

            const endCloseSpy = jest.fn();
            dialogRef._endClose$.subscribe(endCloseSpy);

            dialogRef.close('result');

            expect(endCloseSpy).toHaveBeenCalled();
        }));

        it('should emit _endClose$ when dialog is dismissed', fakeAsync(() => {
            fixture.detectChanges();
            tick();

            const endCloseSpy = jest.fn();
            dialogRef._endClose$.subscribe(endCloseSpy);

            dialogRef.dismiss();

            expect(endCloseSpy).toHaveBeenCalled();
        }));

        it('should complete _endClose$ after close', fakeAsync(() => {
            fixture.detectChanges();
            tick();

            const completeSpy = jest.fn();
            dialogRef._endClose$.subscribe({ complete: completeSpy });

            dialogRef.close('result');

            expect(completeSpy).toHaveBeenCalled();
        }));
    });
});
