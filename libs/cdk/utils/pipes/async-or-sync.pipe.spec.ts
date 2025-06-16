import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AsyncOrSyncPipe } from './async-or-sync.pipe';

@Component({
    template: ` <div>{{ value | fdkAsyncOrSync }}</div> `,
    standalone: true,
    imports: [AsyncOrSyncPipe]
})
class TestComponent {
    value: any;
}

describe('AsyncOrSyncPipe', () => {
    let fixture;
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });

    it('should render static value', () => {
        component.value = 'static value';
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.textContent).toBe('static value');
    });

    it('should render async value from observable', () => {
        component.value = of('async value');
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.textContent).toBe('async value');
    });

    it('should render async value from promise', async () => {
        component.value = Promise.resolve('promise value');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
        const div = fixture.nativeElement.querySelector('div');
        expect(div.textContent).toBe('promise value');
    });
});
