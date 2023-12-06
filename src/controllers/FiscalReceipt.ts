import axios from 'axios';
import fs from 'fs';
import ChildProcess from 'child_process';
import Fiscalization from './Fiscalization';
import { IFiscalReceiptData } from '../utils/interfaces'

export default class FiscalReceipt {
    public static async createJSONFile (data: IFiscalReceiptData) {
        fs.writeFileSync(__dirname + '/ReceiptData.json', JSON.stringify(data, null, 4), 'utf8');
    }

    // @Dev = Needs to find other way to use OpenSSL
    public static async signReceiptData () {
        if ( !Fiscalization.userCertificatePath || !Fiscalization.userCertificateKeyPath || !Fiscalization.ofdCertificatePath )
            return false;

        if ( !this.checkOpenSSLVersion())
            return false;

        let command = `openssl cms -sign `;                                 // openssl create sign command
        command += `-nodetach `;                                            // Do not detach sign from document
        command += `-binary -in ${__dirname}/ReceiptData.json -text  `;     // Input file with type JSON
        command += `-outform der -out ${__dirname}/ReceiptInfo.p7b `;       // Output file with charset 'der' and named ReceiptInfo.p7b
        command += `-nocerts `;                                             // Do not attach certificate to signed document
        command += `-signer ${Fiscalization.userCertificatePath} `;         // Signers certificate public key from TaxOffice
        command += `-inkey ${Fiscalization.userCertificateKeyPath} `;       // Signers certificate private key from TaxOffice

        try {
            let res = ChildProcess.execSync(command);
            console.log("Done")
            return true;
        } catch ( err ) { 
            console.log('signReceiptData: ', err)
            return false;
        }
    }

    public static async sendReceiptDataToTaxOffice () {
        return await axios.post(Fiscalization.ofdBaseURL, fs.readFileSync(__dirname + '/ReceiptInfo.p7b'), {
            headers: {
                "Content-Type": "application/octet-stream"
            }
        });
    }

    // @Dev = Needs to find other way to use OpenSSL
    public static checkOpenSSLVersion () {
        try {
            let res = ChildProcess.execSync('openssl version');
            if ( res.toString().includes('OpenSSL') )
                return true;
            else
                return false
        } catch ( err ) { 
            console.log('signReceiptData: ', err)
            return false;
        }
    }

    public static async fiscalizeReceipt (data: IFiscalReceiptData) {
        // Create JSON File
        await this.createJSONFile(data);
        // Sign Receipt data using JSON file and Certificate
        await this.signReceiptData();
        const response = await this.sendReceiptDataToTaxOffice();

        if ( response.data.Code === 0 ) {
            console.log('Receipt registered successfully!');
            return response.data;
        } else {
            console.log('Something went wrong, check error: ' + response.data.Message);
            return false;
        }
    }
}