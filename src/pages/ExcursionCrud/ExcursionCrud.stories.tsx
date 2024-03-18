import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { ExcursionCrud } from './ExcursionCrud';

const renderComponent = (args: any): JSX.Element => {
    return <ExcursionCrud />
}

const meta = {
    title: 'Exemplos/Aplicativo de passageiros/Cadastro excursão',
    component: ExcursionCrud,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof ExcursionCrud>;

export default meta;

type Story = StoryObj<typeof ExcursionCrud>;

export const Component: Story = {
    render: renderComponent
};