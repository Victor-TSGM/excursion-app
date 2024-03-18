import * as React from 'react';
import { FSDatePicker, FSTable, FSTableColumn, FSTextBox, FSWindow, FSWindowActions, If, SectionCard } from '../../../../presentation/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faSave } from '@fortawesome/free-solid-svg-icons';

export interface Props {

}

export const PassengersDataSource: PassengerViewModel[] = [
    {
        id: 1,
        name: "Alisson Giron",
        legalGuardian: "Alisson Giron",
        legalGuardianPhone: "(15) 99655-5151",
        note: "Alergias: gluten; Remérios: Resfenol (11hrs, 16hrs)",
        excursionId: 1
    },
    {
        id: 2,
        name: "Ana Vitória",
        legalGuardian: "Ivete Aparecida",
        legalGuardianPhone: "(15) 99612-3214",
        note: "Alergias; nenhum; Remedios: nenhum; Enjoo em viagens",
        excursionId: 1
    },
    {
        id: 3,
        name: "Isac Silva",
        legalGuardian: "Emerson Santos",
        legalGuardianPhone: "(15) 99675-6598",
        note: "Sem informações",
        excursionId: 1
    },
    {
        id: 4,
        name: "Flávio Gomes",
        legalGuardian: "Flávio Gomes",
        legalGuardianPhone: "(15) 99678-4855",
        note: "Sem informações",
        excursionId: 1
    },
    {
        id: 5,
        name: "Tainá Caroline",
        legalGuardian: "Sheila Ramos",
        legalGuardianPhone: "(15) 9988-9517",
        note: "Sem informações",
        excursionId: 1
    }
]

export class PassengerViewModel {
    id: number
    name: string
    legalGuardian: string
    legalGuardianPhone: string
    note: string
    excursionId: number
}

export const ExcursionCrud = (props: Props) => {
    const [showImportFile, setShowImportFile] = React.useState<number>(0);
    const windowRef = React.useRef<FSWindowActions>(null)
    const [imported, setImported] = React.useState<boolean>(false)

    const columnsFieldBuilder: FSTableColumn<PassengerViewModel>[] = [
        { field: "name", header: "Nome", width: "200px" },
        { field: "legalGuardian", header: "Responsável", width: "200px" },
        { field: "legalGuardianPhone", header: "Telefone do Responsável", width: "200px" },
        { field: "note", header: "Anotações importantes", width: "400px" },
    ]

    return (
        <div className="row g-0">
            <div className="col-12">
                <SectionCard header={() => <div className='col-12 d-flex pe-3' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className='btn btn-outline-light p-2 px-4'>
                        <FontAwesomeIcon icon={faSave} className='me-2' />
                        Salvar
                    </button>
                </div>}>
                    <div className="col-12 p-2">
                        <SectionCard header={() => <div className='col-12 d-flex pe-2' style={{ height: '25px', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="p-3">Informações da excursão</div>
                        </div>}>
                            <div className='col-12'>
                                <FSTextBox onChange={() => { }} placeholder='Descrição da excursão' value='Passeio Hopi-Hari' />
                            </div>
                            <div className='col-12'>
                                <FSTextBox onChange={() => { }} placeholder='Nome do responsável' value='Victor Martins' />
                            </div>
                            <div className='col-12'>
                                <FSTextBox onChange={() => { }} placeholder='Telefone do responsável' value='(15) 99619-1674' />
                            </div>
                            <div className="col-12">
                                <FSTextBox onChange={() => { }} placeholder='Local de partida' value='Endereço de partida' />
                            </div>
                            <div className="col-12">
                                <FSTextBox onChange={() => { }} placeholder='Local de destino' value='Endereço de partida' />
                            </div>
                            <div className="col-12">
                                <FSDatePicker onChange={() => []} placeholder='Data de partida' value={new Date(Date.now())} />
                            </div>
                        </SectionCard>
                    </div>
                    <div className="col-12 p-2">
                        <SectionCard header={() => <div className='col-12 d-flex pe-2' style={{ height: '25px', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="p-2">Lista de passageiros</div>
                            <button className='btn btn-outline-light p-1 px-2' onClick={() => windowRef.current?.show()}>
                                <FontAwesomeIcon icon={faFileImport} className='me-2' />
                                Importar
                            </button>
                        </div>}>
                            <If condition={imported}>
                                <div style={{ height: '300px' }}>
                                    <FSTable
                                        data={PassengersDataSource}
                                        columns={columnsFieldBuilder}
                                        initialSortColumn={'name'}
                                        initialSortDirection='asc'
                                    />
                                </div>
                            </If>
                        </SectionCard>
                    </div>
                    <FSWindow ref={windowRef} title='Importar lista de passageiros' closeIcon beforeHide={() => setShowImportFile(0)}>
                        <div className="col-12 d-flex" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="col-12 d-flex pe-3" style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="col-8">
                                    <FSTextBox placeholder='Arquivo' value='lista-hopi-hari.xls' onChange={() => { }} disabled />
                                </div>
                                <div className="col-2">
                                    <button className='btn btn-outline-dark p-2 px-3'>
                                        Procurar
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <button className='btn btn-outline-dark p-2 px-3' onClick={() => { setImported(true); windowRef.current?.hide() }}>
                                    Continuar
                                </button>
                            </div>
                        </div>
                    </FSWindow>
                </SectionCard>

            </div>
        </div>
    );
}
