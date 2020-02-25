export enum LookUpCodes {
  industryCode = 'INDST',
  tradingCode = 'TRAD',
  titlesCode = 'TTL',
  trustLevelCode = 'TRSTLVL',
  contentTypeCode = 'CNTNTTYPE',
  productGroupCode = 'PRDGRP',
  productSubGroupCode = 'PRDSUBGRP',
  productStatusCode = 'PRDSTS',
  productTypeCode = 'PRDTYP',
  productProjectCode = 'PRDPRJ',
  productColoursCode = 'PRDCLUR',
  ProductCategpry = 'ProdCateg',
  PriceType = 'PriceType',//'PRCTYP',
  PriceTax = 'PRCTAX',
  pricePackages = 'PRCPCKG',
  memberLevels = 'MMBRLVL',
  Countries = 'CNTR',
  TaskStatuses='TSKSTATS',
  SettingType='SetTyps',
  pageTemplate='PageTmplt',
  contentTemplate='ContntTmplt',
  contentSection='ContntSction',
  Theme='THEME'
}

export interface LookUpModel {
  text?: string;
  value?: string;
  projectId:any;
}