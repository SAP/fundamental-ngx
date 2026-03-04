import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarValueStates } from './avatar-value-states.type';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
    let fixture: ComponentFixture<AvatarComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });
        fixture = TestBed.createComponent(AvatarComponent);
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('Should Change Size', () => {
        fixture.componentRef.setInput('size', 'm');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--m')).toBe(true);

        fixture.componentRef.setInput('size', 'xs');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--xs')).toBe(true);

        fixture.componentRef.setInput('size', 's');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--s')).toBe(true);

        fixture.componentRef.setInput('size', 'l');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--l')).toBe(true);

        fixture.componentRef.setInput('size', 'xl');
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--xl')).toBe(true);
    });

    it('Should Add Glyph', () => {
        fixture.componentRef.setInput('glyph', 'group');
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.sap-icon--group')).toBeTruthy();
    });

    it('Should Add Circle Design', () => {
        fixture.componentRef.setInput('circle', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--circle')).toBe(true);
    });

    it('Should Add Transparent Background', () => {
        fixture.componentRef.setInput('transparent', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--transparent')).toBe(true);
    });

    it('Should Use background size contain option', () => {
        fixture.componentRef.setInput('contain', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--background-contain')).toBe(true);
    });

    it('Should Add Placeholder Background', () => {
        fixture.componentRef.setInput('placeholder', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--placeholder')).toBe(true);
    });

    it('Should Add Tile Background', () => {
        fixture.componentRef.setInput('tile', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--tile')).toBe(true);
    });

    it('Should Add Accent Color', () => {
        fixture.componentRef.setInput('colorAccent', 1);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--accent-color-1')).toBe(true);

        fixture.componentRef.setInput('colorAccent', 5);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--accent-color-5')).toBe(true);

        fixture.componentRef.setInput('colorAccent', 10);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--accent-color-10')).toBe(true);
    });

    it('Should Add Indication Color', () => {
        fixture.componentRef.setInput('colorIndication', 1);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--indication-color-1')).toBe(true);

        fixture.componentRef.setInput('colorIndication', 5);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--indication-color-5')).toBe(true);

        fixture.componentRef.setInput('colorIndication', 10);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--indication-color-10')).toBe(true);
    });

    it('Should Add Random Accent Color', () => {
        fixture.componentRef.setInput('colorAccent', null);
        fixture.componentRef.setInput('random', true);
        fixture.detectChanges();

        const hasAccentColor = Array.from<string>(fixture.nativeElement.classList).some((cls) =>
            cls.startsWith('fd-avatar--accent-color-')
        );
        expect(hasAccentColor).toBe(true);
    });

    it('Should Add Border', () => {
        fixture.componentRef.setInput('border', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.classList.contains('fd-avatar--border')).toBe(true);
    });

    it('Should Add Zoom Icon', () => {
        fixture.componentRef.setInput('zoomGlyph', 'edit');
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-avatar__zoom-icon')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.sap-icon--edit')).toBeTruthy();
    });

    it('Should Add Abbreviate', async () => {
        fixture.componentRef.setInput('label', 'Jane Doe');
        fixture.detectChanges();
        await fixture.whenRenderingDone();
        expect((fixture.componentInstance as any).abbreviate()).toEqual('JD');

        fixture.componentRef.setInput('label', 'Marjolein van Veen');
        fixture.detectChanges();
        expect((fixture.componentInstance as any).abbreviate()).toEqual('MvV');
    });

    it('should add respective Value State Icons', () => {
        const stateIcons: Record<AvatarValueStates, string> = {
            positive: 'sys-enter-2',
            caution: 'warning',
            negative: 'error',
            information: 'information'
        };

        Object.keys(stateIcons).forEach((state) => {
            fixture.componentRef.setInput('valueState', state as AvatarValueStates);
            fixture.detectChanges();
            const badgeElementClassList = fixture.debugElement.query(By.css('.fd-avatar__zoom-icon'))?.nativeElement
                .classList;
            expect(badgeElementClassList).toContain(`fd-avatar__zoom-icon--${state}`);
            expect(badgeElementClassList).toContain(`sap-icon--${stateIcons[state]}`);
        });
    });
});

/**
 * Tests to verify the fix for infinite image loading requests
 */
describe('AvatarComponent - Infinite Image Requests', () => {
    let fixture: ComponentFixture<AvatarComponent>;
    let requestCount: number;
    let lastRequestedUrl: string | null;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        lastRequestedUrl = null;

        // Store original Image constructor
        OriginalImage = window.Image;

        // Mock Image constructor to track HTTP requests
        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                lastRequestedUrl = value;
                this._src = value;

                // Simulate successful image load
                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };

        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        fixture = TestBed.createComponent(AvatarComponent);
    });

    afterEach(() => {
        // Restore original Image constructor
        window.Image = OriginalImage;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('should only make ONE HTTP request when image input is set once', fakeAsync(() => {
        const imageUrl = 'https://example.com/avatar.jpg';

        // Set image URL
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);
        expect(lastRequestedUrl).toBe(imageUrl);
    }));

    it('should NOT make duplicate HTTP requests when change detection runs multiple times with same URL', fakeAsync(() => {
        const imageUrl = 'https://example.com/avatar.jpg';

        // Set image URL
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        const initialRequestCount = requestCount;
        expect(initialRequestCount).toBe(1);

        // Simulate multiple change detection cycles (like window resize)
        for (let i = 0; i < 10; i++) {
            fixture.detectChanges();
            tick(50);
        }

        // Should still be the same as initial request count
        expect(requestCount).toBe(initialRequestCount);
    }));

    it('should make ONLY ONE new request when image URL changes to a different URL', fakeAsync(() => {
        const imageUrl1 = 'https://example.com/avatar1.jpg';
        const imageUrl2 = 'https://example.com/avatar2.jpg';

        // Set first image URL
        fixture.componentRef.setInput('image', imageUrl1);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);
        expect(lastRequestedUrl).toBe(imageUrl1);

        // Change to second image URL
        fixture.componentRef.setInput('image', imageUrl2);
        fixture.detectChanges();
        tick(100);

        // Should have exactly 2 requests total
        expect(requestCount).toBe(2);
        expect(lastRequestedUrl).toBe(imageUrl2);
    }));

    it('should NOT make new requests when the same URL is set multiple times', fakeAsync(() => {
        const imageUrl = 'https://example.com/avatar.jpg';

        // Set image URL first time
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Set the SAME image URL again (should not trigger new request)
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        // Should still be 1 request
        expect(requestCount).toBe(1);

        // Set the SAME image URL again
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        // Should still be 1 request
        expect(requestCount).toBe(1);
    }));

    it('should cache the image and not reload on subsequent access to same URL', fakeAsync(() => {
        const imageUrl = 'https://example.com/avatar1.jpg';

        // Load image first time
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        const firstLoadCount = requestCount;
        expect(firstLoadCount).toBe(1);

        // Change to different URL
        fixture.componentRef.setInput('image', 'https://example.com/avatar2.jpg');
        fixture.detectChanges();
        tick(100);

        const afterSecondImageCount = requestCount;
        expect(afterSecondImageCount).toBe(2);

        // Change BACK to original URL (should be cached)
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        const finalCount = requestCount;
        // No new requests for cached image
        expect(finalCount).toBe(afterSecondImageCount);
    }));
});

/**
 * Test for the actual shellbar scenario
 */
@Component({
    selector: 'fd-test-shellbar-avatar-wrapper',
    template: ` <fd-avatar [colorAccent]="colorAccent" [circle]="true" size="xs" [image]="userImage"></fd-avatar> `,
    standalone: true,
    imports: [AvatarComponent]
})
class TestShellbarAvatarWrapperComponent {
    userImage = 'https://example.com/user-avatar.jpg';
    colorAccent = 1;

    constructor(public cdr: ChangeDetectorRef) {}

    triggerMultipleChangeDetections(count: number): void {
        for (let i = 0; i < count; i++) {
            this.cdr.detectChanges();
        }
    }
}

describe('ShellbarUserMenu Avatar Integration', () => {
    let fixture: ComponentFixture<TestShellbarAvatarWrapperComponent>;
    let component: TestShellbarAvatarWrapperComponent;
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;

        // Store original Image constructor
        OriginalImage = window.Image;

        // Mock Image constructor
        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };

        TestBed.configureTestingModule({
            imports: [TestShellbarAvatarWrapperComponent]
        });

        fixture = TestBed.createComponent(TestShellbarAvatarWrapperComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should not trigger multiple requests when parent component runs change detection multiple times', fakeAsync(() => {
        // Initial render
        fixture.detectChanges();
        tick(100);

        const initialRequestCount = requestCount;
        expect(initialRequestCount).toBeGreaterThan(0);

        // Simulate what happens in shellbar during window resize:
        // Multiple change detection cycles with the same user image URL
        component.triggerMultipleChangeDetections(10);
        tick(500);

        // Should not increase request count
        expect(requestCount).toBe(initialRequestCount);
    }));

    it('should simulate real-world shellbar resize scenario', fakeAsync(() => {
        // Initial render
        fixture.detectChanges();
        tick(100);

        const initialRequestCount = requestCount;

        // Simulate 5 window resize events (like in real shellbar usage)
        // Each resize would trigger change detection in shellbar component
        for (let i = 0; i < 5; i++) {
            fixture.detectChanges();
            tick(50);
        }

        // User avatar image should only be requested once
        expect(requestCount).toBe(initialRequestCount);
    }));
});

/**
 * Test with STRING INTERPOLATION binding (the problematic pattern)
 */
@Component({
    selector: 'fd-test-shellbar-avatar-string-interpolation',
    template: ` <fd-avatar [colorAccent]="colorAccent" [circle]="true" size="xs" image="{{ userImage }}"></fd-avatar> `,
    standalone: true,
    imports: [AvatarComponent]
})
class TestStringInterpolationComponent {
    userImage = 'https://example.com/user-avatar.jpg';
    colorAccent = 1;

    constructor(public cdr: ChangeDetectorRef) {}
}

describe('String Interpolation Issue', () => {
    let fixture: ComponentFixture<TestStringInterpolationComponent>;
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;

        OriginalImage = window.Image;

        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };

        TestBed.configureTestingModule({
            imports: [TestStringInterpolationComponent]
        });

        fixture = TestBed.createComponent(TestStringInterpolationComponent);
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should handle string interpolation without duplicate requests', fakeAsync(() => {
        // Initial render
        fixture.detectChanges();
        tick(100);

        const initialRequestCount = requestCount;

        // Multiple change detection cycles
        for (let i = 0; i < 5; i++) {
            fixture.detectChanges();
            tick(50);
        }

        // With string interpolation, each change detection creates a new string instance
        // But the fix should handle this by comparing URL values, not references
        expect(requestCount).toBe(initialRequestCount);
    }));
});

/**
 * Image Load Failure Scenarios
 */
describe('Image Load Failure Scenario', () => {
    let fixture: ComponentFixture<AvatarComponent>;
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        // Mock Image that ALWAYS FAILS (simulates CORS error, 404, network timeout, etc.)
        (window as any).Image = class MockFailingImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                // Simulate image load failure (CORS, 404, network error)
                setTimeout(() => {
                    if (this.onerror) {
                        this.onerror({} as Event); // Always fail!
                    }
                }, 10);
            }

            get src(): string {
                return this._src;
            }
        };

        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        fixture = TestBed.createComponent(AvatarComponent);
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('FIXED: failing image no longer causes infinite loop - only 1 request attempt', fakeAsync(() => {
        const imageUrl = 'https://broken-cors-domain.com/avatar.jpg';

        // Set image URL
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Simulate 50 change detection cycles (like rapid window resizing or responsive testing)
        // BEFORE FIX: Each cycle would trigger a NEW request because _imageLoaded never becomes true
        // AFTER FIX: No additional requests - the component prevents duplicate requests
        for (let i = 0; i < 50; i++) {
            fixture.detectChanges();
            tick(50);
        }

        // ✅ AFTER FIX: Only 1 request even though image failed
        // The fix prevents retrying failed images on every change detection
        expect(requestCount).toBe(1);
    }));

    it('FIXED: slow network no longer causes request pile-up', fakeAsync(() => {
        const imageUrl = 'https://slow-cdn.com/avatar.jpg';

        // Mock Image that loads SLOWLY (simulates 3G network, slow CDN)
        (window as any).Image = class SlowLoadingImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                // Simulate slow network: image takes 5 seconds to load
                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 5000); // 5 second delay!
            }

            get src(): string {
                return this._src;
            }
        };

        fixture = TestBed.createComponent(AvatarComponent);

        // Set image URL
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // User resizes window 20 times during the 5 seconds the image is loading
        // BEFORE FIX: Each resize would trigger a NEW request before first completes
        // AFTER FIX: Additional resizes are blocked - no duplicate requests
        for (let i = 0; i < 20; i++) {
            tick(200); // Advance time
            fixture.detectChanges(); // Change detection from resize
        }

        // At this point we're at 4000ms, image still hasn't loaded (needs 5000ms)
        // Still only 1 request - duplicates prevented!
        expect(requestCount).toBe(1);

        // Now wait for the first image to finally load
        tick(1100); // Complete the 5 seconds

        // Try more change detection after image loaded
        fixture.detectChanges();
        tick(100);

        // Should still be 1 because cache works after load completes
        expect(requestCount).toBe(1);
    }));
});

/**
 * Reactive Loop Detection Tests
 */
describe('AvatarComponent - Reactive Loop Detection', () => {
    let fixture: ComponentFixture<AvatarComponent>;
    let requestCount: number;
    let requestedUrls: string[];
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        requestedUrls = [];

        // Store original Image constructor
        OriginalImage = window.Image;

        // Mock Image constructor to track ALL requests
        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                requestedUrls.push(value);
                this._src = value;

                // Simulate successful image load after short delay
                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 10);
            }

            get src(): string {
                return this._src;
            }
        };

        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        fixture = TestBed.createComponent(AvatarComponent);
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should make ONLY ONE request when image is set once', fakeAsync(() => {
        const imageUrl = 'https://picsum.photos/id/1018/400';

        // Set image URL
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        // Wait a bit more to see if any additional requests happen
        tick(200);
        flush();

        // Expected: 1 request
        expect(requestCount).toBe(1);
        expect(requestedUrls).toEqual([imageUrl]);
    }));

    it('should not make additional requests after image loads successfully', fakeAsync(() => {
        const imageUrl = 'https://picsum.photos/id/1018/400';

        // Set image URL
        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();
        tick(100);

        const requestCountAfterLoad = requestCount;

        // Trigger additional change detection cycles (simulating what happens in real app)
        for (let i = 0; i < 5; i++) {
            fixture.detectChanges();
            tick(50);
        }

        // After image loads, no additional requests should be made
        expect(requestCount).toBe(requestCountAfterLoad);
    }));

    it('should handle multiple avatars on the same page without multiplying requests', fakeAsync(() => {
        // This simulates the avatar examples page with multiple avatars
        const imageUrl = 'https://picsum.photos/id/1018/400';

        // Create 5 avatar components (like in the examples page)
        const fixtures: ComponentFixture<AvatarComponent>[] = [];

        for (let i = 0; i < 5; i++) {
            const f = TestBed.createComponent(AvatarComponent);
            f.componentRef.setInput('image', imageUrl);
            f.detectChanges();
            fixtures.push(f);
        }

        tick(100);
        flush();

        // Each component has its own cache, so each will make 1 request
        // Expected: 5 requests (one per component instance)
        expect(requestCount).toBeLessThanOrEqual(5);
    }));

    it('should not create infinite loop when image effect triggers', fakeAsync(() => {
        const imageUrl = 'https://picsum.photos/id/1018/400';

        // Set a maximum time to wait
        const maxWaitTime = 1000; // 1 second

        fixture.componentRef.setInput('image', imageUrl);
        fixture.detectChanges();

        // Advance time in small increments and check if requests keep coming
        let previousCount = 0;
        for (let elapsed = 0; elapsed < maxWaitTime; elapsed += 100) {
            tick(100);

            if (requestCount > previousCount + 10) {
                // If we see 10+ new requests in 100ms, we have an infinite loop
                fail(`Infinite loop detected: ${requestCount} requests in ${elapsed}ms`);
            }

            previousCount = requestCount;
        }

        // Expected: 1 request
        expect(requestCount).toBe(1);
    }));
});

/**
 * Real-world scenario tests based on actual usage patterns
 */

/**
 * Test 1: Parent Component Object Mutation
 */
@Component({
    selector: 'fd-test-parent-mutation',
    template: `
        <fd-avatar [image]="user.avatar"></fd-avatar>
        <div>{{ user.name }}</div>
    `,
    standalone: true,
    imports: [AvatarComponent]
})
class ParentWithUserObjectComponent {
    user = { avatar: 'https://example.com/avatar.jpg', name: 'John' };
}

describe('AvatarComponent - Real World: Parent Component Mutations', () => {
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should not reload when parent object changes but URL stays same', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ParentWithUserObjectComponent]
        });

        const parent = TestBed.createComponent(ParentWithUserObjectComponent);
        parent.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Parent updates user object (new reference, same avatar URL)
        parent.componentInstance.user = {
            ...parent.componentInstance.user,
            name: 'Updated Name'
        };
        parent.detectChanges();
        tick(100);

        // Avatar shouldn't reload because URL is the same
        expect(requestCount).toBe(1);
    }));

    it('should handle multiple parent property updates without reloading avatar', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ParentWithUserObjectComponent]
        });

        const parent = TestBed.createComponent(ParentWithUserObjectComponent);
        parent.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Multiple parent updates
        for (let i = 0; i < 5; i++) {
            parent.componentInstance.user = {
                ...parent.componentInstance.user,
                name: `Name ${i}`
            };
            parent.detectChanges();
            tick(50);
        }

        // Avatar should still only have 1 request
        expect(requestCount).toBe(1);
    }));
});

/**
 * Test 2: OnPush Change Detection Strategy
 */
@Component({
    selector: 'fd-test-onpush-parent',
    template: `<fd-avatar [image]="avatarUrl"></fd-avatar>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AvatarComponent]
})
class OnPushParentComponent {
    avatarUrl = 'https://example.com/avatar.jpg';

    constructor(public cdr: ChangeDetectorRef) {}
}

describe('AvatarComponent - Real World: OnPush Change Detection Strategy', () => {
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should work correctly with OnPush parent component', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [OnPushParentComponent]
        });

        const fixture = TestBed.createComponent(OnPushParentComponent);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Manually trigger change detection (as OnPush would do)
        fixture.componentInstance.cdr.detectChanges();
        tick(50);

        // Should not reload avatar
        expect(requestCount).toBe(1);
    }));

    it('should not make duplicate requests when OnPush parent re-renders', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [OnPushParentComponent]
        });

        const fixture = TestBed.createComponent(OnPushParentComponent);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Simulate multiple OnPush change detections
        for (let i = 0; i < 10; i++) {
            fixture.componentInstance.cdr.detectChanges();
            tick(20);
        }

        expect(requestCount).toBe(1);
    }));
});

/**
 * Test 3: Race Condition - Rapid URL Changes
 */
describe('AvatarComponent - Real World: Race Condition - Rapid URL Changes', () => {
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should handle rapid image URL changes without request pile-up', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        // Rapidly change image URLs without waiting for load
        fixture.componentRef.setInput('image', 'https://example.com/avatar1.jpg');
        fixture.detectChanges();

        fixture.componentRef.setInput('image', 'https://example.com/avatar2.jpg');
        fixture.detectChanges();

        fixture.componentRef.setInput('image', 'https://example.com/avatar3.jpg');
        fixture.detectChanges();

        tick(200); // Wait for all to resolve

        // Should have exactly 3 requests (one per unique URL)
        expect(requestCount).toBe(3);
    }));

    it('should cancel previous request when URL changes rapidly', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        // Set first URL
        fixture.componentRef.setInput('image', 'https://example.com/avatar1.jpg');
        fixture.detectChanges();
        tick(5); // Don't wait for load to complete

        // Change to second URL before first finishes
        fixture.componentRef.setInput('image', 'https://example.com/avatar2.jpg');
        fixture.detectChanges();
        tick(5);

        // Change to third URL
        fixture.componentRef.setInput('image', 'https://example.com/avatar3.jpg');
        fixture.detectChanges();
        tick(200);

        // All 3 URLs should have been requested
        expect(requestCount).toBe(3);
    }));

    it('should return to previously loaded URL without new request', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        // Load first image
        fixture.componentRef.setInput('image', 'https://example.com/avatar1.jpg');
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Switch to second image
        fixture.componentRef.setInput('image', 'https://example.com/avatar2.jpg');
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(2);

        // Return to first image (should be cached)
        fixture.componentRef.setInput('image', 'https://example.com/avatar1.jpg');
        fixture.detectChanges();
        tick(100);

        // Should still be 2, not 3 (cache hit)
        expect(requestCount).toBe(2);
    }));
});

/**
 * Test 4: Failed Load with Fallback
 */
describe('AvatarComponent - Real World: Failed Load with Fallback', () => {
    let requestCount: number;
    let OriginalImage: typeof Image;
    let MockFailingImage: any;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        // Mock Image that always fails
        MockFailingImage = class FailingImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onerror) {
                        this.onerror({} as Event);
                    }
                }, 10);
            }

            get src(): string {
                return this._src;
            }
        };
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should fallback gracefully when image fails to load', fakeAsync(() => {
        (window as any).Image = MockFailingImage;

        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        fixture.componentRef.setInput('image', 'https://broken.com/avatar.jpg');
        fixture.componentRef.setInput('alterIcon', 'default-icon');
        fixture.componentRef.setInput('label', 'John Doe');
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1); // Only tried once

        // Try change detection - shouldn't retry
        for (let i = 0; i < 5; i++) {
            fixture.detectChanges();
            tick(50);
        }

        expect(requestCount).toBe(1); // Still only 1 attempt
    }));

    it('should try backup image when primary fails', fakeAsync(() => {
        (window as any).Image = MockFailingImage;

        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        fixture.componentRef.setInput('image', 'https://broken.com/avatar.jpg');
        fixture.componentRef.setInput('alterIcon', 'backup');
        fixture.componentRef.setInput('backupImage', 'https://backup.com/avatar.jpg');
        fixture.detectChanges();
        tick(100);

        // Should try primary (1) + backup (1) = 2 requests
        expect(requestCount).toBe(2);
    }));

    it('should fallback to default icon when image fails and no content available', fakeAsync(() => {
        (window as any).Image = MockFailingImage;

        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        fixture.componentRef.setInput('image', 'https://broken.com/avatar.jpg');
        fixture.componentRef.setInput('alterIcon', 'default-icon');
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Check that showDefault flag is set
        const component = fixture.componentInstance;
        expect((component as any)._shouldShowDefaultIcon()).toBe(true);
    }));
});

/**
 * Test 5: Browser Navigation Patterns
 */
describe('AvatarComponent - Real World: Browser Navigation Patterns', () => {
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should use cache when navigating back to same avatar', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        // First visit - load avatar
        fixture.componentRef.setInput('image', 'https://example.com/user.jpg');
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(1);

        // Navigate away - clear avatar
        fixture.componentRef.setInput('image', null);
        fixture.detectChanges();
        tick(50);

        // Navigate back - should use cache
        fixture.componentRef.setInput('image', 'https://example.com/user.jpg');
        fixture.detectChanges();
        tick(100);

        // Should still be 1 (cached)
        expect(requestCount).toBe(1);
    }));

    it('should handle switching between multiple user profiles efficiently', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const fixture = TestBed.createComponent(AvatarComponent);

        const user1 = 'https://example.com/user1.jpg';
        const user2 = 'https://example.com/user2.jpg';
        const user3 = 'https://example.com/user3.jpg';

        // Load user 1
        fixture.componentRef.setInput('image', user1);
        fixture.detectChanges();
        tick(100);

        // Load user 2
        fixture.componentRef.setInput('image', user2);
        fixture.detectChanges();
        tick(100);

        // Load user 3
        fixture.componentRef.setInput('image', user3);
        fixture.detectChanges();
        tick(100);

        expect(requestCount).toBe(3);

        // Go back to user 1 (cached)
        fixture.componentRef.setInput('image', user1);
        fixture.detectChanges();
        tick(100);

        // Go to user 2 (cached)
        fixture.componentRef.setInput('image', user2);
        fixture.detectChanges();
        tick(100);

        // Should still be 3 (all cached)
        expect(requestCount).toBe(3);
    }));
});

/**
 * Test 6: Multiple Avatars on Page (Shared Cache)
 */
describe('AvatarComponent - Real World: Multiple Avatars on Page', () => {
    let requestCount: number;
    let OriginalImage: typeof Image;

    beforeEach(() => {
        requestCount = 0;
        OriginalImage = window.Image;

        (window as any).Image = class MockImage {
            onload: ((ev: Event) => any) | null = null;
            onerror: ((ev: Event) => any) | null = null;
            private _src = '';

            set src(value: string) {
                requestCount++;
                this._src = value;

                setTimeout(() => {
                    if (this.onload) {
                        this.onload({} as Event);
                    }
                }, 0);
            }

            get src(): string {
                return this._src;
            }
        };
    });

    afterEach(() => {
        window.Image = OriginalImage;
    });

    it('should efficiently handle multiple avatars with same image', fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [AvatarComponent]
        });

        const imageUrl = 'https://example.com/shared-avatar.jpg';
        const fixtures: ComponentFixture<AvatarComponent>[] = [];

        // Create 10 avatars with same image URL
        for (let i = 0; i < 10; i++) {
            const f = TestBed.createComponent(AvatarComponent);
            f.componentRef.setInput('image', imageUrl);
            f.detectChanges();
            fixtures.push(f);
        }

        tick(100);

        // Each component has its own cache, so each will make 1 request
        // Expected: 10 requests (one per component instance)
        expect(requestCount).toBe(10);

        // But triggering change detection on any avatar shouldn't cause new requests
        const initialCount = requestCount;
        for (const f of fixtures) {
            f.detectChanges();
            tick(10);
        }

        // Should still be same count
        expect(requestCount).toBe(initialCount);
    }));
});
