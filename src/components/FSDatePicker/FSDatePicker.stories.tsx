import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSDatePicker, FSDatePickerProps } from './FSDatePicker';

const defaultArgs: Partial<FSDatePickerProps> = {
    placeholder: 'Data de Hoje',
    value: new Date()
}

const meta = {
    title: 'Componentes/Seletor de Datas (FSDatePicker)',
    component: FSDatePicker,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
        placeholder: { description: 'Texto que aparece na label do campo' },
        value: { description: 'Valor dentro do input' },
        locale: { description: 'Formato de exibição do valor, passar linguagem-pais. Exemplo: en-US', defaultValue: 'pt-BR' }
    }
} satisfies Meta<typeof FSDatePicker>;

export default meta;

type Story = StoryObj<typeof FSDatePicker>;

export const Component: Story = {
    args: defaultArgs
};