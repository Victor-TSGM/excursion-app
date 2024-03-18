import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSMultiSelect } from './FSMultiSelect';

interface SampleViewModel {
    id: number,
    name: string
}

const renderComponent = () => {
    const [value, setValue] = React.useState<SampleViewModel[]>([{ id: 3, name: 'Joabe' }])

    return <FSMultiSelect<SampleViewModel>
        onChange={(selected: SampleViewModel[]) => setValue(selected)}
        placeholder='Desenvolvedor'
        value={value}
        dataSource={[
            { id: 1, name: 'Alisson' },
            { id: 2, name: 'Julio' },
            { id: 3, name: 'Joabe' },
            { id: 4, name: 'Vinícius' }
        ]}

        textField='name'
        valueField='id'
    />
}

const meta = {
    title: 'Componentes/Multiseleção (FSMultiSelect)',
    component: FSMultiSelect,
    tags: ['autodocs'],
    argTypes: {
        placeholder: { description: 'Texto que aparece na label do campo' },
        value: { description: 'Valor dentro do input' },
        onChange: { description: 'Função que é executada sempre que o valor dentro do campo muda' },
        disabled: { description: 'Define se o input ficará em modo somente leitura ou não' },
        dataSource: { description: 'Campo que espera receber um vetor de objetos, utilize para passar a lista que será exibida no dropdown' },
        textField: { description: 'Passe o nome de uma propriedade que faz parte dos objetos do dataSource, o componente utilizará esse valor como display' },
        valueField: { description: 'Passe o nome da propriedade que faz parte dos objetos do dataSource, use um campo com valores únicos pois esse será o identificador do item selecionado' }
    },
    render: renderComponent
} satisfies Meta<typeof FSMultiSelect>;

export default meta;

type Story = StoryObj<typeof FSMultiSelect>;

export const Component: Story = {
    render: renderComponent
};