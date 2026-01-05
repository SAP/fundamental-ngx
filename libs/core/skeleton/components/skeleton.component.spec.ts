import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
    let component: SkeletonComponent;
    let fixture: ComponentFixture<SkeletonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SkeletonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SkeletonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Default behavior', () => {
        it('should be animated by default', () => {
            expect(component.animated()).toBe(true);
            expect(fixture.nativeElement.classList.contains('fd-skeleton--animated')).toBe(true);
        });

        it('should have null type by default', () => {
            expect(component.type()).toBeNull();
        });

        it('should have 3 text lines by default', () => {
            expect(component.textLines()).toBe(3);
        });

        it('should have null width and height by default', () => {
            expect(component.width()).toBeNull();
            expect(component.height()).toBeNull();
        });
    });

    describe('Input changes', () => {
        it('should disable animation when animated is false', () => {
            fixture.componentRef.setInput('animated', false);
            fixture.detectChanges();

            expect(component.animated()).toBe(false);
            expect(fixture.nativeElement.classList.contains('fd-skeleton--animated')).toBe(false);
        });

        it('should accept type changes', () => {
            fixture.componentRef.setInput('type', 'rectangle');
            expect(component.type()).toBe('rectangle');

            fixture.componentRef.setInput('type', 'circle');
            expect(component.type()).toBe('circle');

            fixture.componentRef.setInput('type', 'text');
            expect(component.type()).toBe('text');
        });

        it('should coerce textLines from string to number', () => {
            fixture.componentRef.setInput('textLines', '5');
            expect(component.textLines()).toBe(5);
        });
    });

    describe('Text type dimensions', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('type', 'text');
            fixture.detectChanges();
        });

        it('should set default width to 100% for text type', () => {
            expect(fixture.nativeElement.style.width).toBe('100%');
        });

        it('should calculate height based on textLines for text type', () => {
            fixture.componentRef.setInput('textLines', 3);
            fixture.detectChanges();
            expect(fixture.nativeElement.style.height).toBe('60px'); // 3 * 20px

            fixture.componentRef.setInput('textLines', 1);
            fixture.detectChanges();
            expect(fixture.nativeElement.style.height).toBe('8px'); // Single line
        });

        it('should use custom width when provided', () => {
            fixture.componentRef.setInput('width', '200px');
            fixture.detectChanges();
            expect(fixture.nativeElement.style.width).toBe('200px');
        });

        it('should use custom height when provided', () => {
            fixture.componentRef.setInput('height', '150px');
            fixture.detectChanges();
            expect(fixture.nativeElement.style.height).toBe('150px');
        });
    });

    describe('Circle type dimensions', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('type', 'circle');
            fixture.detectChanges();
        });

        it('should match width to height when only height is provided', () => {
            fixture.componentRef.setInput('height', '100px');
            fixture.detectChanges();
            expect(fixture.nativeElement.style.width).toBe('100px');
            expect(fixture.nativeElement.style.height).toBe('100px');
        });

        it('should match height to width when only width is provided', () => {
            fixture.componentRef.setInput('width', '80px');
            fixture.detectChanges();
            expect(fixture.nativeElement.style.width).toBe('80px');
            expect(fixture.nativeElement.style.height).toBe('80px');
        });

        it('should use both dimensions when both are provided', () => {
            fixture.componentRef.setInput('width', '100px');
            fixture.componentRef.setInput('height', '150px');
            fixture.detectChanges();
            // When both provided, effect runs and checks each condition
            // Since both exist, neither condition triggers, so values pass through
            expect(fixture.nativeElement.style.width).toBe('100px');
            expect(fixture.nativeElement.style.height).toBe('150px');
        });
    });

    describe('Rectangle type', () => {
        it('should use custom dimensions for rectangle type', () => {
            fixture.componentRef.setInput('type', 'rectangle');
            fixture.componentRef.setInput('width', '300px');
            fixture.componentRef.setInput('height', '200px');
            fixture.detectChanges();

            expect(fixture.nativeElement.style.width).toBe('300px');
            expect(fixture.nativeElement.style.height).toBe('200px');
        });
    });

    describe('Unique ID', () => {
        it('should generate unique IDs for multiple instances', () => {
            const fixture2 = TestBed.createComponent(SkeletonComponent);
            fixture2.detectChanges();

            const svg1 = fixture.nativeElement.querySelector('mask');
            const svg2 = fixture2.nativeElement.querySelector('mask');

            expect(svg1.id).toBeTruthy();
            expect(svg2.id).toBeTruthy();
            expect(svg1.id).not.toBe(svg2.id);
        });
    });

    describe('Text line widths', () => {
        beforeEach(() => {
            fixture.componentRef.setInput('type', 'text');
        });

        it('should render line with 100% width for single line', () => {
            fixture.componentRef.setInput('textLines', 1);
            fixture.detectChanges();

            const rects = fixture.nativeElement.querySelectorAll('mask rect');
            expect(rects.length).toBe(1);
            expect(rects[0].getAttribute('width')).toBe('100%');
        });

        it('should render all lines as 100% except last line (60%) for multiple lines', () => {
            fixture.componentRef.setInput('textLines', 3);
            fixture.detectChanges();

            const rects = fixture.nativeElement.querySelectorAll('mask rect');
            expect(rects.length).toBe(3);
            expect(rects[0].getAttribute('width')).toBe('100%');
            expect(rects[1].getAttribute('width')).toBe('100%');
            expect(rects[2].getAttribute('width')).toBe('60%'); // Last line
        });

        it('should update rendered line widths when textLines changes', () => {
            fixture.componentRef.setInput('textLines', 2);
            fixture.detectChanges();

            let rects = fixture.nativeElement.querySelectorAll('mask rect');
            expect(rects.length).toBe(2);
            expect(rects[0].getAttribute('width')).toBe('100%');
            expect(rects[1].getAttribute('width')).toBe('60%');

            fixture.componentRef.setInput('textLines', 5);
            fixture.detectChanges();

            rects = fixture.nativeElement.querySelectorAll('mask rect');
            expect(rects.length).toBe(5);
            expect(rects[0].getAttribute('width')).toBe('100%');
            expect(rects[1].getAttribute('width')).toBe('100%');
            expect(rects[2].getAttribute('width')).toBe('100%');
            expect(rects[3].getAttribute('width')).toBe('100%');
            expect(rects[4].getAttribute('width')).toBe('60%'); // Last line
        });

        it('should render no lines when textLines is zero', () => {
            fixture.componentRef.setInput('textLines', 0);
            fixture.detectChanges();

            const rects = fixture.nativeElement.querySelectorAll('mask rect');
            expect(rects.length).toBe(0);
        });

        it('should position lines correctly with 20px spacing', () => {
            fixture.componentRef.setInput('textLines', 3);
            fixture.detectChanges();

            const rects = fixture.nativeElement.querySelectorAll('mask rect');
            expect(rects[0].getAttribute('y')).toBe('0');
            expect(rects[1].getAttribute('y')).toBe('20');
            expect(rects[2].getAttribute('y')).toBe('40');
        });
    });
});
