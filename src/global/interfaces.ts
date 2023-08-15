import { ModeType } from "@scom/scom-chart-data-source-setup"

export interface ITableOptions {
  columns: {
    name: string,
    title?: string,
    alignContent?: string,
    isHidden?: boolean,
    numberFormat?: string,
    type?: 'normal' | 'progressbar',
    coloredPositiveValues?: boolean,
    coloredNegativeValues?: boolean
  }[]
}

export interface ITableConfig {
  dataSource: string;
  queryId: string;
  title: string,
  description?: string,
  options: ITableOptions,
  file?: {
    cid: string,
    name: string
  },
  mode: ModeType
}