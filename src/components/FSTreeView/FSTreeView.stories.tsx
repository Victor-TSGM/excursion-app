import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSTreeView } from './FSTreeView';
  
interface TreeViewItemViewModel {
    id: string,
    content: string,
    child?: TreeViewItemViewModel[]
}

const items: TreeViewItemViewModel[] = [
    { 
        id: "1", 
        content: "Level 1, item 1",
        child: [
            { id: "1-1", content: "Level 2, item 1" },
            { id: "1-2", content: "Level 2, item 2" }
        ]
    },
    { 
        id: "2", 
        content: "Level 1, item 2",
        child: [
            { 
                id: "2-1", 
                content: "Level 2, item 1",
                child: [
                    { id: "2-1-1", content: "Level 3, item 1" }
                ]
            },
            { 
                id: "2-2", 
                content: "Level 2, item 2", 
                child: [
                    { id: "2-2-1", content: "Level 3, item 1" },
                    { id: "2-2-2", content: "Level 3, item 2" }
                ]
            },
            
        ]
    },
    { id: "3", content: "Level 1, item 3" }
  ];

const renderComponent = (): JSX.Element => {
    return <>
        <div className='row g-0'>
            <div className='col-6 p-3'>
                <FSTreeView
                    dataSource={items}
                    idField='id'
                    textField='content'
                    childField='child'
                    selectionMode='multiselect'
                    allOpen
                />
            </div>
        </div>
    </>
}

const meta = {
    title: 'Componentes/TreeView (FSTreeView)',
    component: FSTreeView,
    tags: ['autodocs'],
    render: renderComponent
} satisfies Meta<typeof FSTreeView>;

export default meta;

type Story = StoryObj<typeof FSTreeView>;

export const Component: Story = {
    render: renderComponent
};