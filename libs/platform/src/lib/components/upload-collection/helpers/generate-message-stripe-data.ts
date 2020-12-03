import { DeleteEvent, MoveToEvent } from '../models/upload-collection-events.models';
import {
    MessageOptions,
    MessageType,
    Message,
    UploadCollectionItem,
    MessageItemsCount
} from '../models/upload-collection.models';

function _groupByTypeAndCount(items: UploadCollectionItem[]): MessageItemsCount {
    const count = items.reduce(
        (res, item) => {
            res[item.type] += 1;

            return res;
        },
        { file: 0, folder: 0 } as MessageItemsCount
    );

    return count;
}

export function generateMessageStripeData(type: MessageType, options: MessageOptions): Message {
    const newMessage: Message = {
        messageType: type,
        messageStripType: options.type,
        payload: options.payload
    };

    const items = (<DeleteEvent | MoveToEvent>options.payload).items;

    if (items && items.length > 0) {
        newMessage.count = _groupByTypeAndCount(items);
    }

    return newMessage;
}
