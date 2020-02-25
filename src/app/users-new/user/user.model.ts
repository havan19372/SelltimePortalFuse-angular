import { MatChipInputEvent } from '@angular/material';
import { FuseUtils } from '@fuse/utils';

export class User
{
    id: string;
    userName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    handle: any;
    memberId: any;

    constructor(user?)
    {
        user = user || {};
        this.id = user.id;
        this.userName = user.userName || '';
        this.handle = user.handle || FuseUtils.handleize(this.userName);
        this.email = user.email || '';
        this.password = user.password || '';
        this.passwordConfirm = user.passwordConfirm || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.memberId = user.memberId || '';
    }
}
