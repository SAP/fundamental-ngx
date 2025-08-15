export const enum MessageStripTypeEnum {
    INFORMATION = 'information',
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const enum MessageStringIconEnum {
    ALERT = 'alert',
    SUCCESS = 'sys-enter-2',
    ERROR = 'error',
    INFORMATION = 'information'
}

export const enum MessageStripAnnouncement {
    INFORMATION = 'coreMessageStrip.announcementInfo',
    WARNING = 'coreMessageStrip.announcementWarning',
    SUCCESS = 'coreMessageStrip.announcementSuccess',
    ERROR = 'coreMessageStrip.announcementError'
}

export type MessageStripAnnouncementType = `${MessageStripAnnouncement}`;

export const MESSAGE_STRIP_CLOSABLE = 'coreMessageStrip.closable';

export const MESSAGE_STRIP_DEFAULT_DISMISS_BUTTON_TEXT = 'coreMessageStrip.dismissLabel';
