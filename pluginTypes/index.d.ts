/// <amd-module name="@scom/scom-table/global/interfaces.ts" />
declare module "@scom/scom-table/global/interfaces.ts" {
    export interface ITableOptions {
        title: string;
        description?: string;
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
        apiEndpoint: string;
        options: ITableOptions;
    }
}
/// <amd-module name="@scom/scom-table/global/utils.ts" />
declare module "@scom/scom-table/global/utils.ts" {
    export const formatNumber: (num: number, options?: {
        format?: string;
        decimals?: number;
        percentValues?: boolean;
    }) => any;
    export const formatNumberByFormat: (num: number, format: string, separators?: boolean) => any;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const callAPI: (apiEndpoint: string) => Promise<any>;
}
/// <amd-module name="@scom/scom-table/global/index.ts" />
declare module "@scom/scom-table/global/index.ts" {
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
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
/// <amd-module name="@scom/scom-table" />
declare module "@scom/scom-table" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { PageBlock, ITableConfig } from "@scom/scom-table/global/index.ts";
    interface ScomTableElement extends ControlElement {
        data: ITableConfig;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-table']: ScomTableElement;
            }
        }
    }
    export default class ScomTable extends Module implements PageBlock {
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
        private apiEndpoint;
        private totalPage;
        private pageNumber;
        private itemStart;
        private itemEnd;
        private _oldData;
        private _data;
        private oldTag;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomTableElement, parent?: Container): Promise<ScomTable>;
        constructor(parent?: Container, options?: ScomTableElement);
        getData(): ITableConfig;
        setData(data: ITableConfig): Promise<void>;
        getTag(): any;
        setTag(value: any): Promise<void>;
        getConfigSchema(): IDataSchema;
        onConfigSave(config: any): void;
        edit(): Promise<void>;
        confirm(): Promise<void>;
        discard(): Promise<void>;
        config(): Promise<void>;
        private getPropertiesSchema;
        private getThemeSchema;
        getEmbedderActions(): ({
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
            userInputUISchema: {
                type: string;
                elements: ({
                    type: string;
                    scope: string;
                    title: string;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    title?: undefined;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    options: {
                        detail: {
                            type: string;
                        };
                    };
                    title?: undefined;
                })[];
            };
        } | {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
            userInputUISchema?: undefined;
        })[];
        getActions(): ({
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
            userInputUISchema: {
                type: string;
                elements: ({
                    type: string;
                    scope: string;
                    title: string;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    title?: undefined;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    options: {
                        detail: {
                            type: string;
                        };
                    };
                    title?: undefined;
                })[];
            };
        } | {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
            userInputUISchema?: undefined;
        })[];
        _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema): ({
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
            userInputUISchema: {
                type: string;
                elements: ({
                    type: string;
                    scope: string;
                    title: string;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    title?: undefined;
                    options?: undefined;
                } | {
                    type: string;
                    scope: string;
                    options: {
                        detail: {
                            type: string;
                        };
                    };
                    title?: undefined;
                })[];
            };
        } | {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
            userInputUISchema?: undefined;
        })[];
        private get dataListFiltered();
        private get dataListPagination();
        private updateStyle;
        private updateTheme;
        private onUpdateBlock;
        private updateTableData;
        private renderTable;
        private updateTableUI;
        private onSelectIndex;
        private onSearch;
        private resizeTable;
        init(): Promise<void>;
        render(): any;
    }
}