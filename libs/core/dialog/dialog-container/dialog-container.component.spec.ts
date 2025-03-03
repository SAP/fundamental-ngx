import { PortalModule } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DialogContentType, DialogDefaultContent } from '../dialog.types';
import { DialogConfig } from '../utils/dialog-config.class';
import { DialogRef } from '../utils/dialog-ref.class';

@Component({
    selector: 'fd-content-test-component',
    template: 'Hello there',
    standalone: true,
    imports: [PortalModule]
})
class ContentTestComponent {}

describe('DialogContainerComponent', () => {
    let component: DialogContainerComponent;
    let fixture: ComponentFixture<DialogContainerComponent>;
    const dialogConfig = { ...new DialogConfig(), componentClass: 'test-class' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PortalModule,
                NoopAnimationsModule, // Properly imported
                ContentTestComponent,
                DialogContainerComponent
            ],
            providers: [
                { provide: DialogConfig, useValue: dialogConfig },
                { provide: DialogRef, useClass: DialogRef }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogContainerComponent);
        component = fixture.componentInstance;
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
});
