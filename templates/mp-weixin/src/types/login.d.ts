declare namespace ILogin {
    interface Result {
        token: string;
        user: IUser.Info;
    }

    interface Params {
        code: string;
        invite_uid?: string;
    }
}
