import React, { useRef, useState } from "react";
import './FileUpload.css'
import { FSCRUDEditorBar } from "../FSCRUD/FSCRUDEditorBar";
import { FSTextBox } from "../FSTextBox/FSTextBox";
import { ValidationDisplay } from "../ValidationDisplay/ValidationDisplay";

export interface Props {
    onFileUploaded: (result: UploadResult) => void,
    onUploadCanceled: () => void,
    fileIcon: React.ReactNode
}

export interface UploadResult {
    file?: File,
    description: string
}

export const FileUpload: React.FC<Props> = (props) => {
    const [entity, setEntity] = useState<UploadResult>({
        description: '',
    });

    const [descriptionValidation, setDescriptionValidation] = useState("")
    const [fileValidation, setFileValidation] = useState("")

    const fileInputRef = useRef<HTMLInputElement | undefined>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setEntity({ ...entity, file: file });
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        fileInputRef.current.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file) {
            setEntity({ ...entity, file: file });
        }
    };

    const onAttachmentSave = () => {

        let isValid = true

        if (!entity.description || entity.description.length <= 0) {
            isValid = false;
            setDescriptionValidation('A Descrição do anexo é obrigatória.');
        }
        else {
            setDescriptionValidation('');
        }

        if (!entity.file) {
            isValid = false;
            setFileValidation('Selecione um arquivo.');
        }
        else {
            setFileValidation('');
        }

        if (!isValid) {
            return;
        }

        props.onFileUploaded(entity);
    }

    const onAttachmentCancel = () => {
        props.onUploadCanceled();
    }

    return <>
        <div className='file-upload-wrapper'>
            <div className='attachment-action-bar'>
                <FSCRUDEditorBar onSave={onAttachmentSave} onCancel={onAttachmentCancel} />
            </div>
            <div className='file-upload-input-wrapper'>
                <div className='row g-0 w-100'>
                    <div className='col-12 col-lg-8 offset-lg-2 mb-2'>
                        <div className='text-input'>
                            <FSTextBox placeholder="Descrição" value={entity.description} onChange={(value) => setEntity({ ...entity, description: value })} />
                        </div>
                        <ValidationDisplay text={descriptionValidation} />
                    </div>
                    <br />
                    <div className='col-12 col-lg-8 offset-lg-2'>
                        <ValidationDisplay text={fileValidation} />
                        <div
                            className='drop-zone'
                            onDrop={handleDrop}
                            onDrag={handleDragOver}
                            onClick={handleClick}
                        >
                            <div className='upload-info'>
                                <p>Arraste um arquivo para esta area ou clique aqui para subir o arquivo.</p>
                            </div>
                            {entity && entity.file && (<>
                                <div className='select-file-preview'>
                                    <div className='file-icon'>
                                        {props.fileIcon}
                                    </div>
                                    <div className='file-label'>
                                        <p>Arquivo Selecionado</p>
                                    </div>
                                    <div className='file-name'>
                                        <p>{entity.file.name}</p>
                                    </div>
                                </div>
                            </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept=".jpg, .jpeg, .png, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}