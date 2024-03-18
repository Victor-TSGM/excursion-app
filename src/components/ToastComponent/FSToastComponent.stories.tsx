import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSToastComponent } from './FSToastComponent';
import { LayoutContext, LayoutStateProvider } from '../../../presentation/providers';
import { ToastType, useToast } from '../../../presentation/hooks';

const renderComponent = (): JSX.Element => {
    return <LayoutStateProvider>
        <div className='row g-0'>
            <div className='col-12'>
                <FSToastComponent />
            </div>
            <ChildComponent />
        </div>
    </LayoutStateProvider>
}

const ChildComponent = (): JSX.Element => {
    const toast = useToast()

    return <>
        <div className='col-3 p-3'>
            <button className='btn btn-primary col-12' onClick={() => {
                toast.showToast(ToastType.Info, 'Toast de teste', 'teste')
            }}>
                Toast Info
            </button>
        </div>

        <div className='col-3 p-3'>
            <button className='btn btn-success col-12' onClick={() => {
                toast.showToast(ToastType.Success, 'Toast de teste', 'teste')
            }}>
                Toast Success
            </button>
        </div>

        <div className='col-3 p-3'>
            <button className='btn btn-danger col-12' onClick={() => {
                toast.showToast(ToastType.Error, 'Toast de teste', 'teste')
            }}>
                Toast Error
            </button>
        </div>

        <div className='col-3 p-3'>
            <button className='btn btn-warning col-12' onClick={() => {
                toast.showToast(ToastType.Warning, 'Toast de teste', 'teste')
            }}>
                Toast Warning
            </button>
        </div>
    </>
}

const meta = {
    title: 'Componentes/Toast (FSToastComponent)',
    component: FSToastComponent,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof FSToastComponent>;

export default meta;

type Story = StoryObj<typeof FSToastComponent>;

export const Component: Story = {
    render: renderComponent
};