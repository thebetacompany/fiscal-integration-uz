interface IFiscalizationConfig {
    isDev?: boolean;
    userCertificateKeyPath: string;
    userCertificatePath: string;
    ofdCertificatePath: string;
}

interface IFiscalReceiptData {
    receiptSeq: number;
    isRefund: 0 | 1; // 0 = No, 1 = Yes
    receivedCash: number;
    receivedCard: number;
    totalVAT: number;
    time: string; // Date timestamp with format yyyy-mm-dd hh:mm:ss
    receiptType: number;
    advanceContractID?: string;
    items: IFiscalReceiptItemsObject[];
    location?: IFiscalReceiptLocationObject;
    taxiInfo?: IFiscalReceiptTaxiInfoObject;
    refundInfo?: IFiscalReceiptRefundInfoObject;
    extraInfo?: IFiscalReceiptExtraInfoObject;
    merchantInfo?: IFiscalReceiptMerchantInfoObject;
    saleReceiptInfo?: IFiscalReceiptSaleReceiptInfoObject;
}

interface IFiscalReceiptItemsObject {
    name: string;
    barcode: string;
    labels: string[];
    spic: string;
    units?: number;
    packageCode: string;
    ownerType: 0 | 1 | 2;
    goodPrice: number;
    price: number;
    amount: number;
    vat: number;
    vatPercent: number;
    discount?: number;
    other?: number;
    voucher?: number;
    commissionInfo?: IFiscalReceiptCommissionInfoData
}

interface IFiscalReceiptCommissionInfoData {
    tin?: string;
    pinfl?: string;
}

interface IFiscalReceiptLocationObject {
    latitude?: number;
    longitude?: number;
}

interface IFiscalReceiptTaxiInfoObject {
    tin: string;
    pinfl: string;
    carNumber: string;
}

interface IFiscalReceiptRefundInfoObject {
    terminalID: string;
    receiptSeq: number;
    dateTime: string;
    fiscalSign?: string;
}

interface IFiscalReceiptExtraInfoObject {
    phoneNumber: string;
    cashedOutFromCard?: number;
    other?: string;
}

interface IFiscalReceiptMerchantInfoObject {
    tin?: string;
    pinfl?: string;
    name?: string;
    contractDate?: string;
    contractNumber?: string;
}

interface IFiscalReceiptSaleReceiptInfoObject {
    terminalID: string;
    receiptSeq: number;
    name: string;
    dateTime: string;
    fiscalSign: string;
}

export {
    IFiscalizationConfig,
    IFiscalReceiptData
}