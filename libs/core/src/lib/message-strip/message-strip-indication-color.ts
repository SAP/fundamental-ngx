const messageStripIndicationColors = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;

export type MessageStripIndicationColor =
    | `${(typeof messageStripIndicationColors)[number]}`
    | `${(typeof messageStripIndicationColors)[number]}b`;

export const _messageStripIndicationColors = messageStripIndicationColors.reduce(
    (acc: MessageStripIndicationColor[], item) => {
        acc.push(item);
        acc.push(`${item}b`);
        return acc;
    },
    []
) as MessageStripIndicationColor[];
