import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';
import { faAdd, faArrowRight, faBox, faMinus, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { Route } from 'react-router-dom';
import { FSCRUDSample } from '../../../samples/crud/FSCRUDSample';

const renderComponent = (args: any): JSX.Element => {
    return <Layout
        appHeader={<div className='d-flex align-items-center ps-3'>
            <img src='/logo-fazsoft.png' height={'60%'}></img>
        </div>}
        doLogout={() => { }}
        loggedUsername={'Administrador'}
        menuItems={[
            {
                id: 1,
                privilegeId: 1000000,
                icon: faAdd,
                text: 'Simples',
                allowed: true,
                itemGroups: [],
                items: [
                    { privilegeId: 1000001, text: 'Cadastro 1', url: '/cadastro1', allowed: true, groupId: 0 },
                    { privilegeId: 1000002, text: 'Cadastro 2', url: '/cadastro2', allowed: true, groupId: 0 },
                    { privilegeId: 1000003, text: 'Cadastro 3', url: '/cadastro3', allowed: true, groupId: 0 }
                ]
            },
            {
                id: 2,
                icon: faNotesMedical,
                text: 'Agrupados',
                privilegeId: 2,
                allowed: true,
                itemGroups: [
                    {
                        id: 1,
                        text: 'Grupo 1',
                        icon: faAdd
                    },
                    {
                        id: 2,
                        text: 'Grupo 2',
                        icon: faMinus
                    },
                    {
                        id: 3,
                        text: 'Grupo 3',
                        icon: faBox
                    }
                ],
                items: [
                    { privilegeId: 1000002, text: '1a', allowed: true, url: '/1a', groupId: 1 },
                    { privilegeId: 1000003, text: '1b', allowed: true, url: '/1b', groupId: 1 },
                    { privilegeId: 1000004, text: '1c', allowed: true, url: '/1c', groupId: 1 },

                    { privilegeId: 1000005, text: '2a', url: '/2a', groupId: 2 },
                    { privilegeId: 1000006, text: '2b', allowed: true, url: '/2b', groupId: 2 },
                    { privilegeId: 1000007, text: '2c', url: '/2c', groupId: 2 },

                    { privilegeId: 1000008, text: '3a', url: '/3a', groupId: 3 },
                    { privilegeId: 1000009, text: '3b', allowed: true, url: '/3b', groupId: 3 },
                    { privilegeId: 1000010, text: '3c', allowed: true, url: '/3c', groupId: 3 }
                ]
            },
            {
                id: 3,
                privilegeId: 3,
                icon: faArrowRight,
                allowed: true,
                text: 'Link Direto',
                url: '/link'
            }
        ]}
        {...args}
    >
        <Route path='*' Component={FSCRUDSample} />
    </Layout>
}

const meta = {
    title: 'Componentes/Layout com menu lateral (Layout)',
    component: Layout,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof Layout>;

export default meta;

type Story = StoryObj<typeof Layout>;

export const Component: Story = {
    render: renderComponent
};