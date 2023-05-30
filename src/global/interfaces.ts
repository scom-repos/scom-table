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
  apiEndpoint: string,
  title: string,
  description?: string,
  options: ITableOptions
}