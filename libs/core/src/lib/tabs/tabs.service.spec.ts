import { Component, ElementRef, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { TabsService } from './tabs.service';

@Component({
    template: `
        <a href="#" #testTemplate1>test</a>
        <a href="#" #testTemplate2>test</a>
        <a href="#" #testTemplate3>test</a>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate1', { static: true }) anchor1: ElementRef;
    @ViewChild('testTemplate2', { static: true }) anchor2: ElementRef;
    @ViewChild('testTemplate3', { static: true }) anchor3: ElementRef;
}

describe('TabsService', () => {
    let service: TabsService;
    let anchors: ElementRef[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TemplateTestComponent],
            providers: [TabsService]
        }).compileComponents();

        service = TestBed.get(TabsService);
        const componentInstance = TestBed.createComponent(TemplateTestComponent).componentInstance;
        anchors = [componentInstance.anchor1, componentInstance.anchor2, componentInstance.anchor3];
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should handle focus', () => {
        const elements = anchors.map((anchor) => anchor.nativeElement);
        spyOn(elements[1], 'focus');
        service.tabHeaderKeyHandler(0, { key: 'ArrowRight' }, elements);
        expect(elements[1].focus).toHaveBeenCalled();
    });

    it('should handle focus on first element, when reached last', () => {
        const elements = anchors.map((anchor) => anchor.nativeElement);
        spyOn(elements[0], 'focus');
        service.tabHeaderKeyHandler(2, { key: 'ArrowRight' }, elements);
        expect(elements[0].focus).toHaveBeenCalled();
    });

    it('should handle focus on last element, when reached before first', () => {
        const elements = anchors.map((anchor) => anchor.nativeElement);
        spyOn(elements[2], 'focus');
        service.tabHeaderKeyHandler(0, { key: 'ArrowLeft' }, elements);
        expect(elements[2].focus).toHaveBeenCalled();
    });

    it('should handle select on first element', (done) => {
        const elements = anchors.map((anchor) => anchor.nativeElement);
        service.tabSelected.pipe(first()).subscribe((index) => {
            expect(index).toBe(0);
            done();
        });
        service.tabHeaderKeyHandler(0, { key: 'Enter', preventDefault: () => {} }, elements);
    });

    it('should handle select when space click on first element', (done) => {
        const elements = anchors.map((anchor) => anchor.nativeElement);
        service.tabSelected.pipe(first()).subscribe((index) => {
            expect(index).toBe(1);
            done();
        });
        service.tabHeaderKeyHandler(1, { key: ' ', preventDefault: () => {} }, elements);
    });
});
