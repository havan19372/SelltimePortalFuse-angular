export class ContactUsModel {
  constructor(
    public enquiryTypeId?: number,
    public name?: string,
    public surname?: string,
    public email?: string,
    public tel?: string,
    public mobile?: string,
    public notes?: string,
    createDate?: string
  ) {}
}
