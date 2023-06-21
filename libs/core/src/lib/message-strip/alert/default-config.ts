import { OpenMessageStripAlertConfig } from './open-message-strip-alert.config';

const defaultConfig: Required<Omit<OpenMessageStripAlertConfig, 'content'>> = {
    position: 'top-middle',
    messageStrip: {}
};

/**
 * Applies default config to the given config
 */
export function applyDefaultConfig<ComponentType = unknown>(
    config: OpenMessageStripAlertConfig<ComponentType>
): Required<OpenMessageStripAlertConfig<ComponentType>> {
    return { ...defaultConfig, ...config };
}
