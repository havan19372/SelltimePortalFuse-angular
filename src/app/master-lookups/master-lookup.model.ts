export class MasterLookup {
  id?: number;
  text: string;
  parentTitle: string;
  
  parentId?: number;
  code?: string;
  masterCode?: string;
  showForMembers?: boolean;
  value?: number;
  constructor(addLookup?) {
    addLookup = addLookup || {};
    this.text = addLookup.text;
    this.code = addLookup.code || '';
    this.parentTitle = addLookup.parentTitle || '';
    this.masterCode = addLookup.masterCode || '';
    this.showForMembers = addLookup.showForMembers || false;
    this.value = addLookup.value || null;
  }
}
