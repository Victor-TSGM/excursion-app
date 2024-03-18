import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSWindow, FSWindowActions } from './FSWindow';

const renderComponent = (): JSX.Element => {
    const windowRef = React.useRef<FSWindowActions>(null)

    return <>
        <div className='row g-0'>
            <div className='col-4 p-3'>
                <button 
                    className='btn btn-primary'
                    onClick={() => windowRef.current.show()}
                >
                    Abrir
                </button>
            </div>

            <FSWindow ref={windowRef} title='Janela de teste'>
                teste
            </FSWindow>
        </div>
    </>
}

const meta = {
    title: 'Componentes/Popup (FSWindow)',
    component: FSWindow,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof FSWindow>;

export default meta;

type Story = StoryObj<typeof FSWindow>;

export const Component: Story = {
    render: renderComponent
};