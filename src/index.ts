import { IFiscalizationConfig } from './utils/interfaces';

export class Fiscalization {
    private isDev: boolean = false;
    private userCertificateKeyPath: string;
    private userCertificatePath: string;
    private ofdCertificatePath: string;

    public constructor (config: IFiscalizationConfig) {
        this.isDev = config?.isDev || false
        this.userCertificateKeyPath = config.userCertificateKeyPath;
        this.userCertificatePath = config.userCertificatePath;
        this.ofdCertificatePath = config.ofdCertificatePath;
    }
}