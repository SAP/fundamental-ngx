import { NestedListStateService } from './nested-list-state.service';

interface MockNestedLink {
    selected?: boolean;
    controlSelected?: boolean
}

interface MockNestedItem {
    linkItem: MockNestedLink;
    allChildrenItems: MockNestedItem[];
}

interface MockNestedList {
    nestedItems: MockNestedItem[];
}

describe('NestedListStateService', () => {

    let service: NestedListStateService;
    let object: MockNestedList;
    let secondObject: MockNestedList;

    beforeEach(() => {

        service = new NestedListStateService();

        object = {
            nestedItems: [
                {
                    linkItem: {},
                    allChildrenItems: [
                        {
                            linkItem: {},
                            allChildrenItems: [
                                {
                                    linkItem: {},
                                    allChildrenItems: [
                                        {
                                            linkItem: {},
                                            allChildrenItems: [
                                                {
                                                    linkItem: {
                                                        selected: true
                                                    },
                                                    allChildrenItems: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            linkItem: {},
                            allChildrenItems: []
                        }
                    ]
                },
                {
                    linkItem: {},
                    allChildrenItems: []
                },
                {
                    linkItem: {},
                    allChildrenItems: []
                }
            ]
        };

        secondObject = {
            nestedItems: [
                {
                    linkItem: {},
                    allChildrenItems: [
                        {
                            linkItem: {
                                selected: true
                            },
                            allChildrenItems: [
                                {
                                    linkItem: {},
                                    allChildrenItems: [
                                        {
                                            linkItem: {},
                                            allChildrenItems: [
                                                {
                                                    linkItem: {
                                                    },
                                                    allChildrenItems: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            linkItem: {},
                            allChildrenItems: []
                        }
                    ]
                },
                {
                    linkItem: {
                        selected: true
                    },
                    allChildrenItems: []
                },
                {
                    linkItem: {},
                    allChildrenItems: []
                }
            ]
        };
    });

    it('Should add selectedControl to every item in row', () => {
        service.propagateSelected(<any>object);
        const validObject = {
            nestedItems: [
                {
                    linkItem: {
                        controlSelected: true
                    },
                    allChildrenItems: [
                        {
                            linkItem: {
                                controlSelected: true
                            },
                            allChildrenItems: [
                                {
                                    linkItem: {
                                        controlSelected: true
                                    },
                                    allChildrenItems: [
                                        {
                                            linkItem: {
                                                controlSelected: true
                                            },
                                            allChildrenItems: [
                                                {
                                                    linkItem: {
                                                        selected: true,
                                                        controlSelected: true
                                                    },
                                                    allChildrenItems: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            linkItem: {
                                controlSelected: undefined
                            },
                            allChildrenItems: []
                        }
                    ]
                },
                {
                    linkItem: {
                        controlSelected: undefined
                    },
                    allChildrenItems: []
                },
                {
                    linkItem: {
                        controlSelected: undefined
                    },
                    allChildrenItems: []
                }
            ]
        };

        expect(object).toEqual(validObject);
    });

    it('Should add selectedControl to some items in rows', () => {
        service.propagateSelected(<any>secondObject);
        const validObject = {
            nestedItems: [
                {
                    linkItem: {
                        controlSelected: true
                    },
                    allChildrenItems: [
                        {
                            linkItem: {
                                selected: true,
                                controlSelected: true
                            },
                            allChildrenItems: [
                                {
                                    linkItem: {
                                        controlSelected: undefined
                                    },
                                    allChildrenItems: [
                                        {
                                            linkItem: {
                                                controlSelected: undefined
                                            },
                                            allChildrenItems: [
                                                {
                                                    linkItem: {
                                                        controlSelected: undefined
                                                    },
                                                    allChildrenItems: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            linkItem: {
                                controlSelected: undefined
                            },
                            allChildrenItems: []
                        }
                    ]
                },
                {
                    linkItem: {
                        selected: true,
                        controlSelected: undefined
                    },
                    allChildrenItems: []
                },
                {
                    linkItem: {
                        controlSelected: undefined
                    },
                    allChildrenItems: []
                }
            ]
        };

        expect(secondObject).toEqual(validObject);
    });

});
