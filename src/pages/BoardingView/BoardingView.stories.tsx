import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { PassengersView } from './BoardingView';

const renderComponent = (args: any): JSX.Element => {
    return <PassengersView />
}

const meta = {
    title: 'Exemplos/Aplicativo de passageiros/Embarques',
    component: PassengersView,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof PassengersView>;

export default meta;

type Story = StoryObj<typeof PassengersView>;

export const Component: Story = {
    render: renderComponent
};