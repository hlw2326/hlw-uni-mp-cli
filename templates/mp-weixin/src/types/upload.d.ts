declare namespace IUpload {
    interface SignBase {
        type: "local" | "alioss" | "qiniu";
        key: string;
        url: string;
        server: string;
    }

    interface LocalSign extends SignBase {
        type: "local";
    }

    interface AliossSign extends SignBase {
        type: "alioss";
        OSSAccessKeyId: string;
        policy: string;
        Signature: string;
        success_action_status: string;
    }

    interface QiniuSign extends SignBase {
        type: "qiniu";
        token: string;
    }

    type Sign = LocalSign | AliossSign | QiniuSign;

    interface FileParams {
        biz: string;
        filePath: string;
        ext?: string;
        size?: number;
    }
}
