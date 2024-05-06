import { BigNumber } from "@ijstech/eth-wallet";
import { ModeType } from "@scom/scom-chart-data-source-setup"

export interface ITableOptions {
  columns: {
    name: string,
    title?: string,
    alignContent?: string,
    isHidden?: boolean,
    numberFormat?: string,
    dateFormat?: string,
    dateType?: string,
    buttons?: any[],
    type?: 'normal' | 'progressbar' | 'action',
    coloredPositiveValues?: boolean,
    coloredNegativeValues?: boolean
  }[]
}

export interface ITableConfig {
  dataSource: string;
  queryId?: string;
  apiEndpoint?: string;
  title: string,
  description?: string,
  options: ITableOptions,
  file?: {
    cid: string,
    name: string
  },
  mode: ModeType
}

export interface IFormatNumberOptions {
  precision?: number;
  roundingMode?: BigNumber.RoundingMode;
}
