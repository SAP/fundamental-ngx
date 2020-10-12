import {
    Channel,
    DeliveryModel
} from './message-bus';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessagingConfig {

    deliveryMode: DeliveryModel = DeliveryModel.NON_PERSIST;

    channel: Channel = Channel.RxJS;

    durableEventSize: number;

    /**
     * Here we can have some other properties related to current session, user, context app that could check certain
     * app policy, ...
     *
     * ....
     */


    /**
     * Create Provider factory function
     */
    static createProviderFactory(obj: Partial<MessagingConfig>):
        (messagingConfig: MessagingConfig) => MessagingConfig {
        const useFactory = (config: MessagingConfig): MessagingConfig => {
            const newConfig = new MessagingConfig();
            newConfig.channel = config.channel || newConfig.channel;
            newConfig.deliveryMode = config.deliveryMode || newConfig.deliveryMode;
            newConfig.durableEventSize = config.durableEventSize || 6;

            return newConfig;
        };
        return useFactory;
    }
}
