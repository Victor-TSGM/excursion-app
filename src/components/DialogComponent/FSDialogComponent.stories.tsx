import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSDialogComponent } from './FSDialogComponent';
import { LayoutStateProvider } from '../../../presentation/providers';
import { useDialog } from '../../../presentation/hooks';

const renderComponent = (): JSX.Element => {
    return <LayoutStateProvider>
        <div className='row g-0'>
            <div className='col-12'>
                <FSDialogComponent />
            </div>
            <ChildComponent />
        </div>
    </LayoutStateProvider>
}

const ChildComponent = (): JSX.Element => {
    const dialog = useDialog()

    return <>
        <div className='col-3 p-3'>
            <button className='btn btn-primary col-12' onClick={() => {
                dialog.showDialog(
                    'Executar ação?',
                    () => {
                        alert("ação executada")
                    },
                    () => {
                        alert("cancelado")
                    }
                )
            }}>
                Dialog
            </button>
        </div>
    </>
}

const meta = {
    title: 'Componentes/Dialog (FSDialogComponent)',
    component: FSDialogComponent,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof FSDialogComponent>;

export default meta;

type Story = StoryObj<typeof FSDialogComponent>;

export const Component: Story = {
    render: renderComponent
};