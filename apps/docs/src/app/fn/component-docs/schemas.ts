import { Schema } from '@fundamental-ngx/docs/schema';
import { Icons } from '@fundamental-ngx/docs/shared';

export const COMPONENT_SCHEMAS: { [name: string]: Schema } = {
    media: {
        properties: {
            image: {
                type: 'string'
            },
            alt: {
                type: 'string'
            }
        },
        type: 'object'
    },
    tabs: {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    items: {
                        type: 'object',
                        properties: {
                            mode: {
                                type: 'string',
                                enum: ['', 'icon-only', 'filter', 'process']
                            },
                            compact: {
                                type: 'boolean'
                            }
                        }
                    },
                    item1: {
                        type: 'object',
                        properties: {
                            title: {
                                type: 'string'
                            },
                            counter: {
                                type: 'string'
                            },
                            content: {
                                type: 'string'
                            },
                            icon: {
                                type: 'string',
                                enum: Icons
                            }
                        }
                    },
                    item2: {
                        type: 'object',
                        properties: {
                            title2: {
                                type: 'string'
                            },
                            counter2: {
                                type: 'string'
                            },
                            content2: {
                                type: 'string'
                            },
                            icon2: {
                                type: 'string',
                                enum: Icons
                            }
                        }
                    },
                    item3: {
                        type: 'object',
                        properties: {
                            title3: {
                                type: 'string'
                            },
                            counter3: {
                                type: 'string'
                            },
                            content3: {
                                type: 'string'
                            },
                            icon3: {
                                type: 'string',
                                enum: Icons
                            }
                        }
                    }
                }
            }
        },
        type: 'object'
    }
};
