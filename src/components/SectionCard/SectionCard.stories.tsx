import * as React from 'react'
import { Meta, StoryObj } from "@storybook/react";
import { SectionCard } from "./SectionCard";

const renderComponent = (args: any) => <SectionCard
    header={() => <>teste</>}
>
    teste
</SectionCard>

const meta = {
    title: 'Componentes/Cartão com título (SectionCard)',
    component: SectionCard,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof SectionCard>;

export default meta;

type Story = StoryObj<typeof SectionCard>;

export const Component: Story = {
    render: renderComponent
};