import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepeatDirective } from './repeat.directive';

@Component({
    selector: 'fdk-test-repeat',
    template: `
        <div *fdkRepeat="count(); let i = index" class="repeated-item" [attr.data-index]="i">Item {{ i }}</div>
    `,
    imports: [RepeatDirective]
})
class TestRepeatComponent {
    readonly count = input(3);
}

describe('RepeatDirective', () => {
    let component: TestRepeatComponent;
    let fixture: ComponentFixture<TestRepeatComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestRepeatComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestRepeatComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render N elements based on count', () => {
        fixture.componentRef.setInput('count', 3);
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('.repeated-item');
        expect(items.length).toBe(3);
    });

    it('should provide correct index context to each element', () => {
        fixture.componentRef.setInput('count', 3);
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('.repeated-item');
        expect(items[0].getAttribute('data-index')).toBe('0');
        expect(items[1].getAttribute('data-index')).toBe('1');
        expect(items[2].getAttribute('data-index')).toBe('2');
    });

    it('should update elements when count changes', () => {
        fixture.componentRef.setInput('count', 2);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.repeated-item').length).toBe(2);

        fixture.componentRef.setInput('count', 5);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.repeated-item').length).toBe(5);
    });

    it('should render zero elements when count is 0', () => {
        fixture.componentRef.setInput('count', 0);
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('.repeated-item');
        expect(items.length).toBe(0);
    });

    it('should render zero elements when count is negative', () => {
        fixture.componentRef.setInput('count', -5);
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('.repeated-item');
        expect(items.length).toBe(0);
    });

    it('should not render when count is not an integer', () => {
        fixture.componentRef.setInput('count', 3.5);
        fixture.detectChanges();

        const items = fixture.nativeElement.querySelectorAll('.repeated-item');
        expect(items.length).toBe(0);
    });

    it('should clear previous elements when count changes', () => {
        fixture.componentRef.setInput('count', 5);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.repeated-item').length).toBe(5);

        fixture.componentRef.setInput('count', 2);
        fixture.detectChanges();
        const items = fixture.nativeElement.querySelectorAll('.repeated-item');
        expect(items.length).toBe(2);

        // Verify indices are reset correctly
        expect(items[0].getAttribute('data-index')).toBe('0');
        expect(items[1].getAttribute('data-index')).toBe('1');
    });
});
