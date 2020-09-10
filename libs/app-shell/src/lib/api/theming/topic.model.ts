import { EventType } from '../events/message-bus';

export class ThemeTopics {
    static readonly EventType = EventType.ONLY_LAST;
    static readonly Prefix = 'theme:';
    static readonly ThemeChange = ThemeTopics.Prefix + 'change';

}
