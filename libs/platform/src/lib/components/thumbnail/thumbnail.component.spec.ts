import { Component } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PlatformThumbnailModule } from './thumbnail.module';
import { Media, ThumbnailComponent } from './thumbnail.component';

@Component({
    template: `<fdp-thumbnail [mediaList]="mediaList"></fdp-thumbnail>`
})
class DefaultThumbnailTestComponent {
    mediaList: Media[] = [{
        title: 'Nature Details',
        thumbnailUrl: 'https://picsum.photos/400/400',
        mediaType: 'video',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load https://picsum.photos/400/400',
        label: 'nature'
    }];
}

describe('DefaultThumbnailComponent', () => {
    let component: DefaultThumbnailTestComponent;
    let fixture: ComponentFixture<DefaultThumbnailTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformThumbnailModule],
            declarations: [ThumbnailComponent, DefaultThumbnailTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultThumbnailTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check for thumbnail load', () => {
        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.classList.contains('fdp-thumbnail-container')).toBe(true);
    });

    it('check for loading of video element on media type video', () => {

        const videoElement = fixture.debugElement.query(By.css('video'));
        const imageElement = fixture.debugElement.query(By.css('img'));
        expect(imageElement).toBeFalsy();
        expect(videoElement).toBeTruthy();

    });

});

@Component({
    template: `<fdp-thumbnail [mediaList]="mediaList" [isHorizontal]="true"></fdp-thumbnail>`
})
class HorizontalThumbnailTestComponent {

    mediaList: Media[] = [{
        title: 'Nature Details',
        thumbnailUrl: 'https://picsum.photos/400/400',
        mediaType: 'video',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load https://picsum.photos/400/400',
        label: 'nature'
    }];
}

describe('HorizontalThumbnailComponent', () => {
    let component: HorizontalThumbnailTestComponent;
    let fixture: ComponentFixture<HorizontalThumbnailTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformThumbnailModule],
            declarations: [ThumbnailComponent, HorizontalThumbnailTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HorizontalThumbnailTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check for thumbnail load horizontal', () => {

        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.classList.contains('fdp-thumbnail-container--horizontal')).toBe(true);

    });
});

@Component({
    template: `<fdp-thumbnail [mediaList]="mediaList" [isHorizontal]="true"></fdp-thumbnail>`
})
class ImageThumbnailTestComponent {

    mediaList = [{
        thumbnailUrl: 'https://picsum.photos/400/400',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load https://picsum.photos/400/400',
        label: 'nature'
    }];
}

describe('ImageThumbnailComponent', () => {

    let component: ImageThumbnailTestComponent;
    let fixture: ComponentFixture<ImageThumbnailTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformThumbnailModule],
            declarations: [ThumbnailComponent, ImageThumbnailTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageThumbnailTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check for loading the Image media', () => {

        const videoElement = fixture.debugElement.query(By.css('video'));
        const imageElement = fixture.debugElement.query(By.css('img'));
        expect(imageElement).toBeTruthy();
        expect(videoElement).toBeFalsy();

    });

});
