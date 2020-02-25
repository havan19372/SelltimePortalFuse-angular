import { IPageModel } from '../page/page.model';

export interface IWebsiteModel {
  id?: number;
  name?: string;
  pages?: IPageModel[];
  expiryDate?: string;
  publishDate?: string;
  domainKey?: string;
  themeId?: number;
  dbConnectionId?: number;
  isActive?: boolean;
  websiteUrls?: IWebsiteUrlModel[];
  notifications?: INotificationsModel[];
  secretKey?:string;

}

export interface IWebsiteUrlModel {
  id?: number;
  websiteId?: number;
  url?: string;
  secretKey?:string;
}
export interface INotificationsModel {
  
  displayName: string,
  email: string,
  isSendSales?: boolean,
  isSendSupport?: boolean,
  websiteId?: number
}