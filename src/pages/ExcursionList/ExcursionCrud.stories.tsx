import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { ExcursionList } from './ExcursionList';

const renderComponent = (args: any): JSX.Element => {
    return <ExcursionList />
}

const meta = {
    title: 'Exemplos/Aplicativo de passageiros/Listagem das excursões',
    component: ExcursionList,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof ExcursionList>;

export default meta;

type Story = StoryObj<typeof ExcursionList>;

export const Component: Story = {
    render: renderComponent
};