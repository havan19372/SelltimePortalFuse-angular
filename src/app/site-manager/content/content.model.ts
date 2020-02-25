export interface IContentModel {
  id?: number;
  result?:any;//for json
  name?: string;
  title?: string;
  body?: string;
  slug?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  ref1?: string;
  ref2?: string;
  styleName?: string;
  linkURL?: string;
  titleStyleName?: string;
  priceDisplay?: string;
  wrapperId?: number;
  statusId?: number;
  contentTypeId?: number;
  //contentTypeId?:string;
  authorId?: number;
  //author?: string;
  author?:number;
  sectionId?: number;
  sortOrder?: number;
  attachments?: any[];
  galleryId?: number;
  addressId?: number;
  productId?: number;
  priceFrom?: number;
  priceTo?: number;
  templateId?: number;
  datePublished?: string;
  publishExpireDate?: string;
  pageId?: number;
  setting?: ContentSetting[];
}
export interface ContentSetting {
  key?: string;
  value?: string;
}
