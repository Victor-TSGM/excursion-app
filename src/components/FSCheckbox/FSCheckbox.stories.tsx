import * as React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import { FSCheckbox } from './FSCheckbox';

const renderComponent = (args: any) => {
    const [isChecked, setChecked] = React.useState(false)

    return <FSCheckbox
        label='Está correto?'
        checked={isChecked}
        onCheck={setChecked}
    />
}

const meta = {
    title: 'Componentes/Checkbox (FSCheckbox)',
    component: FSCheckbox,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof FSCheckbox>;

export default meta;

type Story = StoryObj<typeof FSCheckbox>;

export const Component: Story = {
    render: renderComponent
};