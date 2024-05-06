/// <amd-module name="@scom/scom-table/global/interfaces.ts" />
declare module "@scom/scom-table/global/interfaces.ts" {
    import { BigNumber } from "@ijstech/eth-wallet";
    import { ModeType } from "@scom/scom-chart-data-source-setup";
    export interface ITableOptions {
        columns: {
            name: string;
            title?: string;
            alignContent?: string;
            isHidden?: boolean;
            numberFormat?: string;
            dateFormat?: string;
            dateType?: string;
            buttons?: any[];
            type?: 'normal' | 'progressbar' | 'action';
            coloredPositiveValues?: boolean;
            coloredNegativeValues?: boolean;
        }[];
    }
    export interface ITableConfig {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
        title: string;
        description?: string;
        options: ITableOptions;
        file?: {
            cid: string;
            name: string;
        };
        mode: ModeType;
    }
    export interface IFormatNumberOptions {
        precision?: number;
        roundingMode?: BigNumber.RoundingMode;
    }
}
/// <amd-module name="@scom/scom-table/global/utils.ts" />
declare module "@scom/scom-table/global/utils.ts" {
    import { BigNumber } from '@ijstech/eth-wallet';
    export const isNumeric: (value: string | number | BigNumber) => boolean;
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
}
/// <amd-module name="@scom/scom-table/global/index.ts" />
declare module "@scom/scom-table/global/index.ts" {
    export * from "@scom/scom-table/global/interfaces.ts";
    export * from "@scom/scom-table/global/utils.ts";
}
/// <amd-module name="@scom/scom-table/index.css.ts" />
declare module "@scom/scom-table/index.css.ts" {
    export const containerStyle: string;
    export const textStyle: string;
    export const tableStyle: string;
}
/// <amd-module name="@scom/scom-table/assets.ts" />
declare module "@scom/scom-table/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-table/data.json.ts" />
declare module "@scom/scom-table/data.json.ts" {
    const _default_1: {
        defaultBuilderData: {
            mode: string;
            dataSource: string;
            queryId: string;
            options: {
                columns: ({
                    name: string;
                    title: string;
                    type?: undefined;
                    numberFormat?: undefined;
                } | {
                    name: string;
                    type: string;
                    title: string;
                    numberFormat: string;
                } | {
                    name: string;
                    title: string;
                    numberFormat: string;
                    type?: undefined;
                })[];
            };
        };
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-table/formSchema.ts" />
declare module "@scom/scom-table/formSchema.ts" {
    export function getBuilderSchema(columns: string[]): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                progressBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerFontColor: {
                    type: string;
                    format: string;
                };
                footerBackgroundColor: {
                    type: string;
                    format: string;
                };
                footerFontColor: {
                    type: string;
                    format: string;
                };
                paginationActiveBackgoundColor: {
                    type: string;
                    format: string;
                };
                paginationActiveFontColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                        label?: undefined;
                    } | {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    })[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
        advanced: {
            dataSchema: {
                type: string;
                properties: {
                    options: {
                        type: string;
                        title: string;
                        properties: {
                            columns: {
                                type: string;
                                required: boolean;
                                items: {
                                    type: string;
                                    properties: {
                                        name: {
                                            type: string;
                                            enum: string[];
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                        };
                                        alignContent: {
                                            type: string;
                                            enum: string[];
                                        };
                                        type: {
                                            type: string;
                                            enum: string[];
                                        };
                                        buttons: {
                                            type: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    caption: {
                                                        type: string;
                                                    };
                                                    colorType: {
                                                        type: string;
                                                        enum: string[];
                                                    };
                                                };
                                            };
                                        };
                                        numberFormat: {
                                            type: string;
                                        };
                                        dateFormat: {
                                            type: string;
                                        };
                                        dateType: {
                                            type: string;
                                        };
                                        isHidden: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            uiSchema: {
                type: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                        options: {
                            detail: {
                                type: string;
                            };
                        };
                    }[];
                }[];
            };
        };
    };
    export function getEmbedderSchema(): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                customFontColor: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
                };
                customBackgroundColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                    format: string;
                };
                progressBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerBackgroundColor: {
                    type: string;
                    format: string;
                };
                headerFontColor: {
                    type: string;
                    format: string;
                };
                footerBackgroundColor: {
                    type: string;
                    format: string;
                };
                footerFontColor: {
                    type: string;
                    format: string;
                };
                paginationActiveBackgoundColor: {
                    type: string;
                    format: string;
                };
                paginationActiveFontColor: {
                    type: string;
                    format: string;
                };
                height: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
            };
        };
        uiSchema: {
            type: string;
            elements: ({
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        elements: ({
                            type: string;
                            scope: string;
                            rule?: undefined;
                        } | {
                            type: string;
                            scope: string;
                            rule: {
                                effect: string;
                                condition: {
                                    scope: string;
                                    schema: {
                                        const: boolean;
                                    };
                                };
                            };
                        })[];
                        label?: undefined;
                    } | {
                        type: string;
                        label: string;
                        elements: {
                            type: string;
                            elements: {
                                type: string;
                                scope: string;
                            }[];
                        }[];
                    })[];
                }[];
            } | {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: {
                        type: string;
                        scope: string;
                    }[];
                }[];
            })[];
        };
    };
}
/// <amd-module name="@scom/scom-table/dataOptionsForm.tsx" />
declare module "@scom/scom-table/dataOptionsForm.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    interface IData {
        options: any;
    }
    interface ScomTableDataOptionsFormElement extends ControlElement {
        dataSchema?: string;
        uiSchema?: string;
        options: any;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-table-data-options-form"]: ScomTableDataOptionsFormElement;
            }
        }
    }
    export default class ScomTableDataOptionsForm extends Module {
        private formEl;
        private _dataSchema;
        private _uiSchema;
        private _data;
        constructor(parent?: Container, options?: any);
        get data(): IData;
        set data(value: IData);
        refreshFormData(): Promise<IData>;
        private renderUI;
        private onInputChanged;
        onCustomInputChanged(data: IData): Promise<void>;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-table/dts/index.ts" />
declare module "@scom/scom-table/dts/index.ts" {
    const _default_2: "/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            buttons?: any[];\n            type?: 'normal' | 'progressbar' | 'action';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        buttons: {\n                                            type: string;\n                                            items: {\n                                                type: string;\n                                                properties: {\n                                                    caption: {\n                                                        type: string;\n                                                    };\n                                                    colorType: {\n                                                        type: string;\n                                                        enum: string[];\n                                                    };\n                                                };\n                                            };\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            type?: 'normal' | 'progressbar';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            type?: 'normal' | 'progressbar';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"/// <amd-module name=\"@scom/scom-table/global/interfaces.ts\" />\ndeclare module \"@scom/scom-table/global/interfaces.ts\" {\n    import { BigNumber } from \"@ijstech/eth-wallet\";\n    import { ModeType } from \"@scom/scom-chart-data-source-setup\";\n    export interface ITableOptions {\n        columns: {\n            name: string;\n            title?: string;\n            alignContent?: string;\n            isHidden?: boolean;\n            numberFormat?: string;\n            dateFormat?: string;\n            dateType?: string;\n            type?: 'normal' | 'progressbar';\n            coloredPositiveValues?: boolean;\n            coloredNegativeValues?: boolean;\n        }[];\n    }\n    export interface ITableConfig {\n        dataSource: string;\n        queryId?: string;\n        apiEndpoint?: string;\n        title: string;\n        description?: string;\n        options: ITableOptions;\n        file?: {\n            cid: string;\n            name: string;\n        };\n        mode: ModeType;\n    }\n    export interface IFormatNumberOptions {\n        precision?: number;\n        roundingMode?: BigNumber.RoundingMode;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/global/utils.ts\" />\ndeclare module \"@scom/scom-table/global/utils.ts\" {\n    import { BigNumber } from '@ijstech/eth-wallet';\n    export const isNumeric: (value: string | number | BigNumber) => boolean;\n    export const formatNumber: (num: number, options?: {\n        format?: string;\n        decimals?: number;\n        percentValues?: boolean;\n    }) => any;\n    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;\n}\n/// <amd-module name=\"@scom/scom-table/global/index.ts\" />\ndeclare module \"@scom/scom-table/global/index.ts\" {\n    export * from \"@scom/scom-table/global/interfaces.ts\";\n    export * from \"@scom/scom-table/global/utils.ts\";\n}\n/// <amd-module name=\"@scom/scom-table/index.css.ts\" />\ndeclare module \"@scom/scom-table/index.css.ts\" {\n    export const containerStyle: string;\n    export const textStyle: string;\n    export const tableStyle: string;\n}\n/// <amd-module name=\"@scom/scom-table/assets.ts\" />\ndeclare module \"@scom/scom-table/assets.ts\" {\n    function fullPath(path: string): string;\n    const _default: {\n        fullPath: typeof fullPath;\n    };\n    export default _default;\n}\n/// <amd-module name=\"@scom/scom-table/data.json.ts\" />\ndeclare module \"@scom/scom-table/data.json.ts\" {\n    const _default_1: {\n        defaultBuilderData: {\n            mode: string;\n            dataSource: string;\n            queryId: string;\n            title: string;\n            options: {\n                columns: ({\n                    name: string;\n                    title: string;\n                    type?: undefined;\n                    numberFormat?: undefined;\n                } | {\n                    name: string;\n                    type: string;\n                    title: string;\n                    numberFormat: string;\n                } | {\n                    name: string;\n                    title: string;\n                    numberFormat: string;\n                    type?: undefined;\n                })[];\n            };\n        };\n    };\n    export default _default_1;\n}\n/// <amd-module name=\"@scom/scom-table/formSchema.ts\" />\ndeclare module \"@scom/scom-table/formSchema.ts\" {\n    export function getBuilderSchema(columns: string[]): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n        advanced: {\n            dataSchema: {\n                type: string;\n                properties: {\n                    options: {\n                        type: string;\n                        title: string;\n                        properties: {\n                            columns: {\n                                type: string;\n                                required: boolean;\n                                items: {\n                                    type: string;\n                                    properties: {\n                                        name: {\n                                            type: string;\n                                            enum: string[];\n                                            required: boolean;\n                                        };\n                                        title: {\n                                            type: string;\n                                        };\n                                        alignContent: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        type: {\n                                            type: string;\n                                            enum: string[];\n                                        };\n                                        numberFormat: {\n                                            type: string;\n                                        };\n                                        dateFormat: {\n                                            type: string;\n                                        };\n                                        dateType: {\n                                            type: string;\n                                        };\n                                        isHidden: {\n                                            type: string;\n                                        };\n                                    };\n                                };\n                            };\n                        };\n                    };\n                };\n            };\n            uiSchema: {\n                type: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                        options: {\n                            detail: {\n                                type: string;\n                            };\n                        };\n                    }[];\n                }[];\n            };\n        };\n    };\n    export function getEmbedderSchema(): {\n        dataSchema: {\n            type: string;\n            required: string[];\n            properties: {\n                darkShadow: {\n                    type: string;\n                };\n                customFontColor: {\n                    type: string;\n                };\n                fontColor: {\n                    type: string;\n                    format: string;\n                };\n                customBackgroundColor: {\n                    type: string;\n                };\n                backgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                progressBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                headerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                footerBackgroundColor: {\n                    type: string;\n                    format: string;\n                };\n                footerFontColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveBackgoundColor: {\n                    type: string;\n                    format: string;\n                };\n                paginationActiveFontColor: {\n                    type: string;\n                    format: string;\n                };\n                height: {\n                    type: string;\n                };\n                title: {\n                    type: string;\n                };\n                description: {\n                    type: string;\n                };\n            };\n        };\n        uiSchema: {\n            type: string;\n            elements: ({\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: ({\n                        type: string;\n                        elements: ({\n                            type: string;\n                            scope: string;\n                            rule?: undefined;\n                        } | {\n                            type: string;\n                            scope: string;\n                            rule: {\n                                effect: string;\n                                condition: {\n                                    scope: string;\n                                    schema: {\n                                        const: boolean;\n                                    };\n                                };\n                            };\n                        })[];\n                        label?: undefined;\n                    } | {\n                        type: string;\n                        label: string;\n                        elements: {\n                            type: string;\n                            elements: {\n                                type: string;\n                                scope: string;\n                            }[];\n                        }[];\n                    })[];\n                }[];\n            } | {\n                type: string;\n                label: string;\n                elements: {\n                    type: string;\n                    elements: {\n                        type: string;\n                        scope: string;\n                    }[];\n                }[];\n            })[];\n        };\n    };\n}\n/// <amd-module name=\"@scom/scom-table/dataOptionsForm.tsx\" />\ndeclare module \"@scom/scom-table/dataOptionsForm.tsx\" {\n    import { Module, ControlElement, Container } from '@ijstech/components';\n    interface IData {\n        options: any;\n    }\n    interface ScomTableDataOptionsFormElement extends ControlElement {\n        dataSchema?: string;\n        uiSchema?: string;\n        options: any;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                [\"i-scom-table-data-options-form\"]: ScomTableDataOptionsFormElement;\n            }\n        }\n    }\n    export default class ScomTableDataOptionsForm extends Module {\n        private formEl;\n        private _dataSchema;\n        private _uiSchema;\n        private _data;\n        constructor(parent?: Container, options?: any);\n        get data(): IData;\n        set data(value: IData);\n        refreshFormData(): Promise<IData>;\n        private renderUI;\n        private onInputChanged;\n        onCustomInputChanged(data: IData): Promise<void>;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n/// <amd-module name=\"@scom/scom-table/dts/index.ts\" />\ndeclare module \"@scom/scom-table/dts/index.ts\" {\n    const _default_2: \"\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n\";\n    export default _default_2;\n}\n/// <amd-module name=\"@scom/scom-table\" />\ndeclare module \"@scom/scom-table\" {\n    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';\n    import { ITableConfig } from \"@scom/scom-table/global/index.ts\";\n    interface ScomTableElement extends ControlElement {\n        lazyLoad?: boolean;\n        data: ITableConfig;\n    }\n    global {\n        namespace JSX {\n            interface IntrinsicElements {\n                ['i-scom-table']: ScomTableElement;\n            }\n        }\n    }\n    interface ICustomWidget {\n        showConfigurator: (parent: Modal, prop: string) => void;\n        register: () => {\n            types: string;\n            defaultData: ITableConfig;\n        };\n    }\n    export default class ScomTable extends Module implements ICustomWidget {\n        private vStackTable;\n        private vStackInfo;\n        private hStackFooter;\n        private loadingElm;\n        private lbTitle;\n        private lbDescription;\n        private pnlTable;\n        private tableElm;\n        private columnNames;\n        private tableData;\n        private paginationElm;\n        private lbTotal;\n        private inputSearch;\n        private totalPage;\n        private pageNumber;\n        private itemStart;\n        private itemEnd;\n        private _data;\n        tag: any;\n        defaultEdit: boolean;\n        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;\n        constructor(parent?: Container, options?: ScomTableElement);\n        showConfigurator(parent: Modal, prop: string): void;\n        private onConfigSave;\n        register(): {\n            types: string;\n            defaultData: ITableConfig;\n        };\n        private getData;\n        private setData;\n        private getTag;\n        private setTag;\n        private _getActions;\n        getConfigurators(): ({\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getData: any;\n            setData: (data: ITableConfig) => Promise<void>;\n            getTag: any;\n            setTag: any;\n            getLinkParams?: undefined;\n            setLinkParams?: undefined;\n        } | {\n            name: string;\n            target: string;\n            getActions: () => ({\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                userInputDataSchema: IDataSchema;\n                userInputUISchema: IUISchema;\n                customUI?: undefined;\n            } | {\n                name: string;\n                icon: string;\n                command: (builder: any, userInputData: any) => {\n                    execute: () => Promise<void>;\n                    undo: () => void;\n                    redo: () => void;\n                };\n                customUI: {\n                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;\n                };\n                userInputDataSchema?: undefined;\n                userInputUISchema?: undefined;\n            })[];\n            getLinkParams: () => {\n                data: string;\n            };\n            setLinkParams: (params: any) => Promise<void>;\n            getData: any;\n            setData: any;\n            getTag: any;\n            setTag: any;\n        })[];\n        private get dataListFiltered();\n        private get dataListPagination();\n        private updateStyle;\n        private updateTheme;\n        private onUpdateBlock;\n        private updateTableData;\n        private renderSnapshotData;\n        private renderLiveData;\n        private renderTable;\n        private updateTableUI;\n        private onSelectIndex;\n        private onSearch;\n        resize(): void;\n        init(): Promise<void>;\n        render(): any;\n    }\n}\n";
    export default _default_2;
}
/// <amd-module name="@scom/scom-table" />
declare module "@scom/scom-table" {
    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema, Modal } from '@ijstech/components';
    import { ITableConfig } from "@scom/scom-table/global/index.ts";
    interface ScomTableElement extends ControlElement {
        lazyLoad?: boolean;
        data: ITableConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-table']: ScomTableElement;
            }
        }
    }
    interface ICustomWidget {
        showConfigurator: (parent: Modal, prop: string) => void;
        register: () => {
            types: string;
            defaultData: ITableConfig;
        };
    }
    export default class ScomTable extends Module implements ICustomWidget {
        private vStackTable;
        private vStackInfo;
        private hStackFooter;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private pnlTable;
        private tableElm;
        private columnNames;
        private tableData;
        private paginationElm;
        private lbTotal;
        private inputSearch;
        private totalPage;
        private pageNumber;
        private itemStart;
        private itemEnd;
        private _data;
        tag: any;
        defaultEdit: boolean;
        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;
        constructor(parent?: Container, options?: ScomTableElement);
        showConfigurator(parent: Modal, prop: string): void;
        private onConfigSave;
        register(): {
            types: string;
            defaultData: ITableConfig;
        };
        private getData;
        private setData;
        private getTag;
        private setTag;
        private _getActions;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            })[];
            getData: any;
            setData: (data: ITableConfig) => Promise<void>;
            getTag: any;
            setTag: any;
            getLinkParams?: undefined;
            setLinkParams?: undefined;
        } | {
            name: string;
            target: string;
            getActions: () => ({
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                userInputDataSchema: IDataSchema;
                userInputUISchema: IUISchema;
                customUI?: undefined;
            } | {
                name: string;
                icon: string;
                command: (builder: any, userInputData: any) => {
                    execute: () => Promise<void>;
                    undo: () => void;
                    redo: () => void;
                };
                customUI: {
                    render: (data?: any, onConfirm?: (result: boolean, data: any) => void, onChange?: (result: boolean, data: any) => void) => VStack;
                };
                userInputDataSchema?: undefined;
                userInputUISchema?: undefined;
            })[];
            getLinkParams: () => {
                data: string;
            };
            setLinkParams: (params: any) => Promise<void>;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        })[];
        private get dataListFiltered();
        private get dataListPagination();
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateTableData;
        private renderSnapshotData;
        private renderLiveData;
        private renderTable;
        private updateTableUI;
        private onSelectIndex;
        private onSearch;
        resize(): void;
        init(): Promise<void>;
        render(): any;
    }
}
