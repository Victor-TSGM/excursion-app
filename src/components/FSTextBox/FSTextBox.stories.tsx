import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSTextBox } from './FSTextBox';

const renderComponent = (): JSX.Element => {
    const [value, setValue] = React.useState('usr000')

    return <>
        <div className='row g-0'>
            <div className='col-4 p-3'>
                <FSTextBox
                    placeholder='Nome de Usuário'
                    value={value}
                    onChange={setValue}
                />
            </div>
        </div>
    </>
}

const meta = {
    title: 'Componentes/Input de Texto (FSTextBox)',
    component: FSTextBox,
    tags: ['autodocs'],
    argTypes: {
        placeholder: { description: 'Texto que aparece na label do campo' },
        value: { description: 'Valor dentro do input' },
        onChange: { description: 'Função que é executada sempre que o valor dentro do campo muda' },
        disabled: { description: 'Define se o input de texto ficará em modo somente leitura ou não' },
        maxLength: { description: 'Define uma quantidade máxima de caracteres permitida no input' }
    },
    render: renderComponent
} satisfies Meta<typeof FSTextBox>;

export default meta;

type Story = StoryObj<typeof FSTextBox>;

export const Component: Story = {
    render: renderComponent
};