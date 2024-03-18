import * as React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import { FSButtonRadio } from './FSButtonRadio';

const renderComponent = (args: any) => {
    const [responseType, setResponseType] = React.useState<number>(1)

    return <FSButtonRadio
        onChange={(value: number) => setResponseType(value)}
        currentValue={responseType}
        containerClassName='d-flex'
        options={[
            { key: 1, value: 'Numérico' },
            { key: 2, value: 'Opções' },
            { key: 3, value: 'Texto' },
            { key: 4, value: 'Vídeo' },
            { key: 5, value: 'Áudio' }
        ]}
    />
}

const meta = {
    title: 'Componentes/RadioButton (FSButtonRadio)',
    component: FSButtonRadio,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof FSButtonRadio>;

export default meta;

type Story = StoryObj<typeof FSButtonRadio>;

export const Component: Story = {
    render: renderComponent
};