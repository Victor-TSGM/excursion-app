import React from "react";
import './QrCodeView.css'
import QRCode from "react-qr-code";

export interface QrCodeViewProps {
    value: string,
    description?: string,
    printButtonContent: React.ReactNode
}

export const QrCodeView: React.FC<QrCodeViewProps> = ((props, ref) => {
    React.useEffect(() => {

    })

    const Print = () => {
        const printWindow = window.open('', '', 'width=600,height=600'); // Open a new window
        const contentToPrint = document.getElementById('qr-code-view-wrapper').innerHTML;

        printWindow.document.open();
        printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <style>
        .qr-code-view-wrapper {
            width: 100%;
            height: 100%;
            margin-top: 10px;
            text-align: center;
            vertical-align: middle;
        }

        .qr-code {
            margin: auto;
        }

        .qr-code-code {
            width: 100%;
            text-align: center;
        }

        .description {
            font-weight: bold;
            width: 100%;
            text-align: center;
        }
        </style>
        <body>
          ${contentToPrint}
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    }

    return (
        <>
            <div id='qr-code-view-wrapper' className='qr-code-view-wrapper row g-0'>
                <div id='qr-code-view' className='qr-code'>
                    <div className='qr-code-code'>
                        <QRCode value={props.value} />
                    </div>
                    <div className='description'>
                        {props.description || ""}
                    </div>
                </div>
            </div>
            <div className='qr-code-actions-wrapper'>
                <button className='btn btn-primary print-button' onClick={Print}>{props.printButtonContent}</button>
            </div>
        </>
    )
})