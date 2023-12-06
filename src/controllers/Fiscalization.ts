import { IFiscalizationConfig } from '../utils/interfaces';

export default class Fiscalization {
    public static isDev: boolean = false;
    public static userCertificateKeyPath: string;
    public static userCertificatePath: string;
    public static ofdCertificatePath: string;

    public static ofdBaseURL: string;

    public constructor (config: IFiscalizationConfig) {
        Fiscalization.isDev = config?.isDev || false
        Fiscalization.userCertificateKeyPath = config.userCertificateKeyPath;
        Fiscalization.userCertificatePath = config.userCertificatePath;
        Fiscalization.ofdCertificatePath = config.ofdCertificatePath;

        Fiscalization.ofdBaseURL = !Fiscalization.isDev ? 'https://emp.soliq.uz/emp/receipt' : 'https://test.ofd.uz/emp/v3/receipt';
    }
}