export class AddLookup {
  id?: number;
  text: string;
  parentId?: number;
  code?: string;
  masterCode?: string;
  deleted?: boolean;
  showForMembers?: boolean;
  parentTitle?: string;

  constructor(addLookup?) {
    addLookup = AddLookup || {};
    this.text = addLookup.text;
    this.code = addLookup.code || '';
    this.masterCode = addLookup.masterCode || '';
    this.parentId = addLookup.parentId || null;
    this.parentTitle = addLookup.parentTitle || '';
    this.showForMembers = addLookup.showForMembers || false;
  }
}
export class IListLookup {
  id?: number;
  parentId?: number;
  parentTitle?: string;
  text: string;
  code?: string;
  detailCount?: string;
  showForMembers?: boolean;
}
