import { MobileModeConfig } from './mobile-mode-config';

/**
 * Base interface for mobile mode support.
 * Supports both plain properties and signal-based (function) access patterns.
 */
export interface MobileMode {
    readonly mobile: boolean | (() => boolean);
    readonly mobileConfig: MobileModeConfig | (() => MobileModeConfig);
}
