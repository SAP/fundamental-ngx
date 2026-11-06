import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardContentComponent } from './card-content.component';

import { CLASS_NAME } from '../constants';

describe('CardContentComponent', () => {
    let fixture: ComponentFixture<CardContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CardContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardContentComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add className to host', () => {
        expect(fixture.debugElement.nativeElement.className.includes(CLASS_NAME.cardContent)).toBe(true);
    });

    describe('padding inputs', () => {
        it('should apply padding style when padding input is set', () => {
            fixture.componentRef.setInput('padding', 'sm');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.padding).toBe('1rem');
        });

        it('should apply different padding sizes', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;

            fixture.componentRef.setInput('padding', 'tiny');
            fixture.detectChanges();
            expect(element.style.padding).toBe('0.5rem');

            fixture.componentRef.setInput('padding', 'md');
            fixture.detectChanges();
            expect(element.style.padding).toBe('2rem');

            fixture.componentRef.setInput('padding', 'lg');
            fixture.detectChanges();
            expect(element.style.padding).toBe('3rem');
        });

        it('should apply paddingInline style when paddingInline input is set', () => {
            fixture.componentRef.setInput('paddingInline', 'md');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.paddingInline).toBe('2rem');
        });

        it('should apply paddingBlock style when paddingBlock input is set', () => {
            fixture.componentRef.setInput('paddingBlock', 'lg');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.paddingBlock).toBe('3rem');
        });

        it('should apply paddingBlockEnd style when paddingBlockEnd input is set', () => {
            fixture.componentRef.setInput('paddingBlockEnd', 'sm');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.paddingBlockEnd).toBe('1rem');
        });

        it('should allow paddingInline to override general padding horizontally', () => {
            fixture.componentRef.setInput('padding', 'sm');
            fixture.componentRef.setInput('paddingInline', 'lg');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.padding).toBe('1rem');
            expect(element.style.paddingInline).toBe('3rem');
        });

        it('should allow paddingBlock to override general padding vertically', () => {
            fixture.componentRef.setInput('padding', 'sm');
            fixture.componentRef.setInput('paddingBlock', 'md');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.padding).toBe('1rem');
            expect(element.style.paddingBlock).toBe('2rem');
        });

        it('should allow paddingBlockEnd to override paddingBlock for block-end spacing', () => {
            fixture.componentRef.setInput('paddingBlock', 'md');
            fixture.componentRef.setInput('paddingBlockEnd', 'tiny');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.paddingBlock).toBe('2rem');
            expect(element.style.paddingBlockEnd).toBe('0.5rem');
        });

        it('should not apply padding styles when no padding inputs are set', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.padding).toBe('');
            expect(element.style.paddingInline).toBe('');
            expect(element.style.paddingBlock).toBe('');
            expect(element.style.paddingBlockEnd).toBe('');
        });

        it('should support all padding inputs simultaneously', () => {
            fixture.componentRef.setInput('padding', 'tiny');
            fixture.componentRef.setInput('paddingInline', 'sm');
            fixture.componentRef.setInput('paddingBlock', 'md');
            fixture.componentRef.setInput('paddingBlockEnd', 'lg');
            fixture.detectChanges();

            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.style.padding).toBe('0.5rem');
            expect(element.style.paddingInline).toBe('1rem');
            expect(element.style.paddingBlock).toBe('2rem');
            expect(element.style.paddingBlockEnd).toBe('3rem');
        });
    });
});
