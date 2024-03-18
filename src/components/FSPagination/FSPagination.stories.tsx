import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSPagination, FSPaginationProps } from './FSPagination';

const renderSample = (args: any) => <FSPagination
    page={1}
    total={16}
    pageSize={50}
    onPageSizeChange={() => {}}
    onPageChange={() => {}}

    activeButtonColor='blue'
/>

const meta = {
    title: 'Componentes/Paginação (FSPagination)',
    tags: ['autodocs'],
    render: renderSample
} satisfies Meta<typeof FSPagination>;

export default meta;

type Story = StoryObj<typeof FSPagination>;

export const Component: Story = {
    render: renderSample
};