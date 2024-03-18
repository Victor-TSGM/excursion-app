import * as React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import { FSCRUD } from './FSCRUD';
import { LayoutStateProvider } from '../../../presentation/providers';
import { FSToastComponent } from '../ToastComponent';
import { FSDialogComponent } from '../DialogComponent/FSDialogComponent';
import { FSCRUDSample } from '../../../samples/crud/FSCRUDSample';

const renderCRUDComponent = (args: any) => {
    return <LayoutStateProvider>
        <FSToastComponent />
        <FSDialogComponent />
        <FSCRUDSample />
    </LayoutStateProvider>
}

const meta = {
    title: 'Componentes/CRUD (FSCRUD)',
    component: FSCRUD,
    tags: ['autodocs'],
    render: renderCRUDComponent
} satisfies Meta<typeof FSCRUD>;

export default meta;

type Story = StoryObj<typeof FSCRUD>;

export const Component: Story = {
    render: renderCRUDComponent
};