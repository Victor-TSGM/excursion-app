import * as React from 'react';
import { PassengerViewModel } from '../ExcursionCrud/ExcursionCrud';
import { faArrowUpRightFromSquare, faTrash, faQrcode, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FSTableColumn, FSTable, FSWindow, FSWindowActions } from '../../components';

export interface Props {
    passengers: PassengerViewModel[]
}

const PassengerList = (props: Props) => {
    const [selectedPassenger, setSelectedPassenger] = React.useState<PassengerViewModel>();
    const passengerInfoRef = React.useRef<FSWindowActions>(null)


    const columnsFieldBuilder: FSTableColumn<PassengerViewModel>[] = [
        { header: 'Nome', field: 'name', width: '140px', textAlign: 'center' },
        {
            header: 'Informações', field: 'note', width: '150px', textAlign: 'center',
            template: (model: PassengerViewModel) => {
                return (<button className='btn btn-outline-dark p-1 px-2' style={{ fontSize: '12px' }}
                    onClick={() => { setSelectedPassenger(model); passengerInfoRef.current?.show() }}
                >
                    Informações&nbsp;<FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>)
            }
        },
        {
            header: '', field: 'id', width: '25px', textAlign: 'center',
            template: (model: PassengerViewModel) => <button className="btn"><FontAwesomeIcon icon={faTrash} /></button>
        },
    ]


    return (
        <>
            <div className="g-0">
                <div className="col-12 d-flex p-3" style={{ backgroundColor: 'black' }}>
                    <button className='btn btn-outline-light p-1 px-2' onClick={() => { }}>
                        <FontAwesomeIcon icon={faQrcode} className='me-2' />
                        Ler pulseira
                    </button>
                </div>
                <div className="col-12" style={{ height: '100vw' }}>
                    <FSTable
                        columns={columnsFieldBuilder}
                        initialSortColumn='name'
                        initialSortDirection='asc'
                        data={props.passengers}
                    />
                </div>
            </div>
            <FSWindow
                title='Informações do passageiro'
                ref={passengerInfoRef}
                closeIcon={<FontAwesomeIcon icon={faClose} />}
            >
                <div className="col-12 d-flex p-3" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                    <h4>Nome&nbsp;</h4><p>{selectedPassenger?.name}</p>
                    <h4>Responsável:&nbsp;</h4><p>{selectedPassenger?.legalGuardian}</p>
                    <h4>Telefone do responsável:&nbsp;</h4><p>{selectedPassenger?.legalGuardianPhone}</p>
                    <h4>Informações:&nbsp;</h4><p>{selectedPassenger?.note}</p>
                </div>
            </FSWindow>
        </>
    );
}

export default PassengerList;