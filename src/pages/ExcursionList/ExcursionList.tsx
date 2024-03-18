import React from 'react';
import './ExcursionList.css'
import { FSTable, FSTableColumn, FSWindow, FSWindowActions, SectionCard } from '../../components';
import { faArrowUpRightFromSquare, faClose, faFlag, faFlagCheckered, faPlay, faPlus, faQrcode, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PassengerViewModel, PassengersDataSource } from '../ExcursionCrud/ExcursionCrud';
import PassengerList from '../PassengerList/PassengerInfo';

export interface Props {

}

export class ExcursionViewModel {
    id: number
    title: string
    managerName: string
    managerPhone: string
    departureAddress: string
    destinationAddress: string
    date: string
}

export const excursionDataSource: ExcursionViewModel[] = [
    {
        id: 1,
        title: "Hopi Hari",
        managerName: "Victor Martins",
        managerPhone: "(15) 99651-5252",
        departureAddress: "Alameda Itália, n° 43 Jardim Europa - Sorocaba - SP",
        destinationAddress: "Rod. dos Bandeirantes, km 72, Vinhedo - SP, 13288-390",
        date: "30/02/2024"
    },
    {
        id: 2,
        title: "Pousada Recanto Primavera",
        managerName: "Victor Martins",
        managerPhone: "(15) 99651-5252",
        departureAddress: "Alameda Itália, n° 43 Jardim Europa - Sorocaba - SP",
        destinationAddress: "Estrada Municipal dos Garcias, Km 2,8 - Garcias, Piedade - SP",
        date: "15/03/2024"
    }
]

export const ExcursionList = (props: Props) => {
    const windowRef = React.useRef<FSWindowActions>(null)



    const renderExcursionList = () => {
        let list: React.ReactNode[] = [];
        if (excursionDataSource.length <= 0) {
            return null;
        }

        excursionDataSource.forEach(excursion => {
            list.push(
                <div className='col-12 p-2'>
                    <SectionCard header={() => <div className='col-12 d-flex pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{excursion.title}</span>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>}>
                        <div className="col-12">
                            <div className="col-12 d-flex" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                                <h4>Responsável&nbsp;</h4><p>{excursion.managerName}</p>
                                <h4>Partida&nbsp;</h4><p>{excursion.departureAddress}</p>
                                <h4>Destino&nbsp;</h4><p>{excursion.destinationAddress}</p>
                                <h4>Data&nbsp;</h4><p>{excursion.date}</p>
                            </div>
                            <div className="col-12 d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <button className='btn p-1 px-2' style={{ fontSize: '14px' }} onClick={() => windowRef.current?.show()}>
                                    Passageiros&nbsp;<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                </button>
                                <button className='btn btn-outline-dark p-1 px-2' style={{ fontSize: '20px' }} onClick={() => { }}>
                                    <FontAwesomeIcon icon={faFlag} className='me-2' />
                                    Iniciar
                                </button>
                            </div>
                        </div>
                    </SectionCard>
                    <FSWindow
                        ref={windowRef}
                        title={`Lista de passageiros`}
                        closeIcon={<FontAwesomeIcon icon={faClose} />}>
                        <PassengerList passengers={PassengersDataSource} />
                    </FSWindow>

                </div >
            )
        })

        return list;
    }

    return (
        <div className='g-0' >
            <SectionCard header={() => <div className='col-12 d-flex pe-3' style={{ justifyContent: 'start', alignItems: 'center' }}>
                <span>Excursões</span>
            </div>}>
                <div className="col-12 d-flex pb-2" style={{ justifyContent: 'start', alignItems: 'center' }}>
                    <button className='btn btn-outline-dark p-1 px-2' onClick={() => { }}>
                        <FontAwesomeIcon icon={faPlus} className='me-2' />
                        Novo
                    </button>
                </div>
                {renderExcursionList()}
            </SectionCard>
        </div>
    );
}
