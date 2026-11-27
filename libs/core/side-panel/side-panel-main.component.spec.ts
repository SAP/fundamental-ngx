import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SidePanelMainComponent } from './side-panel-main.component';

@Component({
    imports: [SidePanelMainComponent],
    template: `<fd-side-panel-main><p id="projected">Hello</p></fd-side-panel-main>`
})
class SidePanelMainTestHostComponent {}

describe('SidePanelMainComponent', () => {
    it('projects its content and carries the host class', () => {
        TestBed.configureTestingModule({ imports: [SidePanelMainTestHostComponent] });
        const fixture = TestBed.createComponent(SidePanelMainTestHostComponent);
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('fd-side-panel-main');
        expect(el.classList.contains('fd-side-panel__main')).toBe(true);
        expect(el.querySelector('#projected')?.textContent).toBe('Hello');
    });
});
