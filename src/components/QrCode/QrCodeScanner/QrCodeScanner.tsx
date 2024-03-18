import React, { useRef, useState } from "react";
import './QrCodeScanner.css'
import { Html5Qrcode, Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";

export interface QrCodeScannerActions {
    closeScanner: () => void
}

export interface QrCodeScannerProps {
    scanButtonContent: React.ReactNode,
    onQrCodeSuccess: (qrCodeText: string) => void,
    onQrCodeError: (errorMessage: string) => void
}

export const QrCodeScanner = React.forwardRef<QrCodeScannerActions, QrCodeScannerProps>((props, ref) => {
    const qrCodeScanner = useRef<Html5Qrcode | undefined>();

    const [showScanButton, setShowScanButton] = useState<boolean>(true);

    React.useEffect(() => {
    })

    React.useImperativeHandle(ref, () => ({
        closeScanner: onScanCancel
    }))

    function onQrCodeSuccess(decodedText: string, result: Html5QrcodeResult) {

        props.onQrCodeSuccess(decodedText);
        qrCodeScanner.current.stop()
            .then(() => {
                qrCodeScanner.current.clear();
            });
    }

    function onQrCodeError(errorMessage: string, result: Html5QrcodeError) {
        props.onQrCodeError(errorMessage);
    }

    function onScanStart() {

        try {

            Html5Qrcode.getCameras().then(devices => {
                if (devices && devices.length) {

                    if (!qrCodeScanner.current) {
                        qrCodeScanner.current = new Html5Qrcode('qr-code-reader-container', {
                            verbose: false
                        });
                    }

                    qrCodeScanner.current.clear();

                    qrCodeScanner.current.start({ facingMode: "environment" }, {
                        fps: 5,
                        qrbox: {
                            width: 450,
                            height: 450,
                        },
                    }, onQrCodeSuccess, onQrCodeError)

                    setShowScanButton(false);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    function onScanCancel() {

        if (!qrCodeScanner.current) {
            return;
        }

        qrCodeScanner.current.stop()
            .then(() => {
                qrCodeScanner.current.clear();
            });
    }

    return (
        <>
            <div className={'qrcode-scanner-wrapper'}>
                <br />
                <div className={'qrcode-scanner-container'}>
                    <div>
                        <div id='qr-code-reader-container' className='h-100 w-100'>

                        </div>
                    </div>
                </div>

                {showScanButton ? <div className={'qrcode-scanner-actions-wrapper'}>
                    <button className='btn btn-primary qrcode-scan-button' onClick={onScanStart}>{props.scanButtonContent}</button>
                </div> : <></>}
            </div>
        </>
    )
})