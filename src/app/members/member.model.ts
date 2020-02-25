

export class MemberModel {
  
  constructor(
    public id?: number,
    public name?: string,
    public host?: string,
    public code?: string,
    public sponsorCode?: string,
    public note?: string,
    public dateJoined?: string,
    public parentId?: number,
    public autoSendEmail?: boolean,
    public activeStatusId?: number,
    public logoId?: number,
    public logo?: string,
    public businessCount?: number,
    public usersCount?: number
  ) {}
}

