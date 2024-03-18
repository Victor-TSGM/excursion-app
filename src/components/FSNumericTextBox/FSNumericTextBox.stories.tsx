import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSNumericTextBox, FSNumericTextBoxProps } from './FSNumericTextBox';


const renderComponent = (): JSX.Element => {
    const [value, setValue] = React.useState(5)

    return <>
        <div className='row g-0'>
            <div className='col-4 p-3'>
                <FSNumericTextBox
                    placeholder='Exemplo'
                    value={value}
                    onChange={setValue}

                    min={0}
                    step={0.25}
                    decimals={2}
                />
            </div>
        </div>
    </>
}

const meta = {
    title: 'Componentes/Input de Número (FSNumericTextBox)',
    component: FSNumericTextBox,
    tags: ['autodocs'],
    argTypes: {
        placeholder: { description: 'Texto que aparece na label do campo' },
        value: { description: 'Valor dentro do input' },
        onChange: { description: 'Função que é executada sempre que o valor dentro do campo muda' },
        disabled: { description: 'Define se o input ficará em modo somente leitura ou não' },
    },
    render: renderComponent
} satisfies Meta<typeof FSNumericTextBox>;

export default meta;

type Story = StoryObj<typeof FSNumericTextBox>;

export const Component: Story = {
    render: renderComponent
};