import * as React from 'react';
import './BoardingView.css';
import { faArrowRight, faClose, faHand, faLocationPin, faPerson, faPrint, faQrcode, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FSWindow, FSWindowActions, If, SectionCard } from '../../components';
import { PassengerViewModel, PassengersDataSource } from '../ExcursionCrud/ExcursionCrud';
import PassengerList from '../PassengerList/PassengerInfo';

export interface Props {

}

export const PassengersView = (props: Props) => {
    const [isBoarding, setIsBoarding] = React.useState<boolean>(false);
    const windowRef = React.useRef<FSWindowActions>(null);
    const passengerListRef = React.useRef<FSWindowActions>(null);
    const [passengerList, setPassengerList] = React.useState<PassengerViewModel[]>([]);

    const renderPassengerList = () => {
        return (
            <div className="col-12 d-flex p-2" style={{ flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                {
                    passengerList.map(passenger => {
                        return (
                            <div className='col-12 d-flex p-1 m-1' style={{ border: '1px solid grey', borderRadius: '8px', justifyContent: 'start', alignItems: 'center' }}>
                                {passenger.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className="row g-0" style={{ height: "500px" }}>
            <div className="col-12">
                <SectionCard header={() => <div className='col-12 d-flex pe-3' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Passeio Hopi-Hari</span>
                    <If condition={!isBoarding}>
                        <button className='btn btn-outline-light p-1 px-2'>
                            <FontAwesomeIcon icon={faPrint} className='me-2' />
                            Imprimir Pulseiras
                        </button>
                    </If>
                </div>}>
                    <If condition={!isBoarding}>
                        <If condition={passengerList.length <= 0}>

                            <SectionCard header={() => <div className='col-12 d-flex pe-3' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Embarque inicial</span>
                            </div>}>
                                <div className="col-12 d-flex pe-2" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <button className='btn btn-outline-dark p-2 px-4' onClick={() => setIsBoarding(true)}>
                                        <FontAwesomeIcon icon={faArrowRight} className='me-2' />
                                        Iniciar
                                    </button>
                                </div>
                            </SectionCard>
                        </If>
                        <If condition={passengerList.length > 0}>
                            <SectionCard header={() => <div className='col-12 d-flex pe-3' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Excursão em andamento</span>
                            </div>}>
                                <div className="col-12 d-flex pe-2" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <button className='col-12 btn btn-outline-dark p-2  m-2 px-4' onClick={() => passengerListRef.current?.show()} >
                                        <FontAwesomeIcon icon={faPerson} className='me-2' />
                                        Lista de passageiros
                                    </button>
                                    <button className='col-12 btn btn-outline-dark p-2 m-2 px-4' onClick={() => setIsBoarding(true)} >
                                        <FontAwesomeIcon icon={faHand} className='me-2' />
                                        Realizar parada
                                    </button>
                                    <button className='col-12 btn btn-outline-dark p-2 m-2 px-4' onClick={() => { }} >
                                        <FontAwesomeIcon icon={faLocationPin} className='me-2' />
                                        Finalizar excursão
                                    </button>
                                </div>
                                <FSWindow
                                    ref={passengerListRef}
                                    title={`Lista de passageiros`}
                                    closeIcon={<FontAwesomeIcon icon={faClose} />}>
                                    <PassengerList passengers={PassengersDataSource} />
                                </FSWindow>
                            </SectionCard>
                        </If>
                    </If>
                    <If condition={isBoarding}>
                        <SectionCard header={() => <div className='col-12 d-flex pe-3' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Passageiros do embarque</span>
                            <button className='btn btn-outline-light p-1 px-2' onClick={() => setIsBoarding(false)}>
                                Concluir
                            </button>
                        </div>}>
                            <div className="col-12 d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <div className="col-12">
                                    <button className='btn btn-outline-dark p-1 px-2' onClick={() => windowRef.current?.show()}>
                                        <FontAwesomeIcon icon={faQrcode} className='me-2' />
                                        Ler pulseira
                                    </button>
                                    {
                                        passengerList.length > 0
                                            ? renderPassengerList()
                                            : <></>
                                    }
                                </div>
                            </div>
                            <FSWindow ref={windowRef} title='Camera'>
                                <div className="g-0" >
                                    <div className="col-12 d-flex p-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="img">

                                        </div>
                                    </div>
                                    <div className="col-12 d-flex p-3" style={{ textAlign: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <p className='p-3'>Camera do celular aberta para escanear o QRCode da pulseira dos passageiros</p>
                                        <button className="btn btn-outline-dark p-2 px-4" onClick={() => { setPassengerList(PassengersDataSource); windowRef.current?.hide() }}>Ok</button>
                                    </div>
                                </div>
                            </FSWindow>
                        </SectionCard>
                    </If>
                </SectionCard>
            </div>
        </div>
    );
}
