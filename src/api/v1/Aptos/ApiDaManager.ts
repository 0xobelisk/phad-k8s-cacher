import { ApiCall } from "tsrpc";
import { ReqDaManager, ResDaManager } from "../../../shared/protocols/v1/Aptos/PtlDaManager";
import { Dubhe, loadMetadata, PendingTransactionResponse } from "@0xobelisk/aptos-client";
import { ACCOUNT, PRIVATEKEY } from "../../../chain/key";
import { NETWORK, PACKAGE_ID } from "../../../chain/config";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const dubhe_client_init = async () => {
	const metadata = await loadMetadata(NETWORK, PACKAGE_ID);
    const dubhe = new Dubhe({
      networkType: NETWORK,
      packageId: PACKAGE_ID,
      metadata: metadata,
	  secretKey: PRIVATEKEY,
    });
    return dubhe
}


export default async function (call: ApiCall<ReqDaManager, ResDaManager>) {
    const { da_height, blob } = call.req;

    if (!blob) {
        return call.error('blob is empty');
    }

    try {
		const dubhe = await dubhe_client_init();
		const response = (await dubhe.tx.pds_system.set(
            {
                sender:ACCOUNT,
                params:[
                    Number(da_height),
                    blob
                ]
            }
        )) as PendingTransactionResponse;
      	await dubhe.waitForTransaction(response.hash);
		console.log(response);
		return call.succ({
			time: new Date(),
			aptos_digest: response.hash,
		});
	} catch (error) {
        console.error("Error in ApiDaManager:", error);
        return call.error('An error occurred while processing the request');
    }
}