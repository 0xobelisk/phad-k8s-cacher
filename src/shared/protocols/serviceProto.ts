import { ServiceProto } from 'tsrpc-proto';
import { ReqDaManager, ResDaManager } from './v1/Aptos/PtlDaManager';

export interface ServiceType {
    api: {
        "v1/Aptos/DaManager": {
            req: ReqDaManager,
            res: ResDaManager
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 12,
    "services": [
        {
            "id": 4,
            "name": "v1/Aptos/DaManager",
            "type": "api"
        }
    ],
    "types": {
        "v1/Aptos/PtlDaManager/ReqDaManager": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "da_height",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "blob",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Aptos/PtlDaManager/ResDaManager": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "aptos_digest",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        }
    }
};