 
 
 
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageToastConfig } from './config/message-toast.config';
import { MESSAGE_TOAST_CONFIG } from './constants/message-toast.token';
import { MessageToastService } from './message-toast.service';

// Minimal Component Setup
@Component({
    template: ` <ng-template #template> Template Content </ng-template> `,
    standalone: true,
    imports: [CommonModule]
})
export class TestComponent {
    @ViewChild('template') template!: TemplateRef<any>;

    constructor(public toastService: MessageToastService) {}
}

describe('MessageToastService', () => {
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, NoopAnimationsModule, TestComponent],
            providers: [
                MessageToastService,
                Overlay,
                { provide: MESSAGE_TOAST_CONFIG, useValue: new MessageToastConfig() }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    });

    it('should create service', () => {
        const service: MessageToastService = TestBed.inject(MessageToastService);
        expect(service).toBeTruthy();
    });

    it('should create component', () => {
        const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display message toast', fakeAsync(() => {
        const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
        const component = fixture.componentInstance;
        component.toastService.open('Test message');
        fixture.detectChanges();
        tick();
        const toastElement = overlayContainerElement.querySelector('.fd-message-toast') as HTMLElement;
        expect(toastElement).toBeTruthy();
    }));
});
