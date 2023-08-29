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
            type?: 'normal' | 'progressbar';
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
    export interface IFetchDataOptions {
        dataSource: string;
        queryId?: string;
        apiEndpoint?: string;
    }
}
/// <amd-module name="@scom/scom-table/global/utils.ts" />
declare module "@scom/scom-table/global/utils.ts" {
    import { BigNumber } from '@ijstech/eth-wallet';
    import { IFormatNumberOptions, IFetchDataOptions } from "@scom/scom-table/global/interfaces.ts";
    export const isNumeric: (value: string | number | BigNumber) => boolean;
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number | string | BigNumber, options: IFormatNumberOptions) => string;
    export const callAPI: (options: IFetchDataOptions) => Promise<any>;
}
/// <amd-module name="@scom/scom-table/global/index.ts" />
declare module "@scom/scom-table/global/index.ts" {
    export * from "@scom/scom-table/global/interfaces.ts";
    export * from "@scom/scom-table/global/utils.ts";
}
/// <amd-module name="@scom/scom-table/index.css.ts" />
declare module "@scom/scom-table/index.css.ts" {
    export const containerStyle: string;
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
            dataSource: string;
            queryId: string;
            title: string;
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
    export function getBuilderSchema(): {
        dataSchema: {
            type: string;
            required: string[];
            properties: {
                darkShadow: {
                    type: string;
                };
                fontColor: {
                    type: string;
                    format: string;
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
            elements: {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        elements?: undefined;
                        label?: undefined;
                    } | {
                        type: string;
                        elements: {
                            type: string;
                            scope: string;
                        }[];
                        scope?: undefined;
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
                        scope?: undefined;
                    })[];
                }[];
            }[];
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
                                        numberFormat: {
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
                fontColor: {
                    type: string;
                    format: string;
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
            elements: {
                type: string;
                label: string;
                elements: {
                    type: string;
                    elements: ({
                        type: string;
                        scope: string;
                        elements?: undefined;
                        label?: undefined;
                    } | {
                        type: string;
                        elements: {
                            type: string;
                            scope: string;
                        }[];
                        scope?: undefined;
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
                        scope?: undefined;
                    })[];
                }[];
            }[];
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
/// <amd-module name="@scom/scom-table" />
declare module "@scom/scom-table" {
    import { Module, ControlElement, Container, IDataSchema, VStack, IUISchema } from '@ijstech/components';
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
    export default class ScomTable extends Module {
        private vStackTable;
        private vStackInfo;
        private hStackFooter;
        private loadingElm;
        private lbTitle;
        private lbDescription;
        private pnlTable;
        private tableElm;
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
        private resizeTable;
        init(): Promise<void>;
        render(): any;
    }
}
