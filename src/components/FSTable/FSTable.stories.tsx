import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { FSTable, FSTableProps, FSSortDirection, FSTableParamChangeEvent } from './FSTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faListNumeric } from '@fortawesome/free-solid-svg-icons';

interface SampleViewModel {
    id: number,
    name: string,
    age: number
}

const renderSample = (args: any) => <div>
    <FSTable<SampleViewModel>
        columns={[
            { field: 'id', header: 'Id', textAlign: 'right', width: '100px' },
            {
                field: 'name',
                header: () => <div>
                    <FontAwesomeIcon icon={faIdBadge} className='me-2' />Nome da Pessoa
                </div>
            },
            {
                field: 'age',
                header: 'Idade',
                width: '100px',
                template: (row: SampleViewModel) => <div style={{ color: 'blue' }}>
                    <FontAwesomeIcon icon={faListNumeric} className='me-2' /> {row.age}
                </div>
            }
        ]}
        
        data={[
            { id: 1, name: 'Alisson Alisson Alisson Alisson Alisson Alisson Alisson Alisson Alisson Alisson Alisson Alisson', age: 26 },
            { id: 2, name: 'Julio', age: 98 },
            { id: 2, name: 'Julio', age: 98 },
            { id: 2, name: 'Julio', age: 98 },
            { id: 2, name: 'Julio', age: 98 }
        ]}

        maxHeight='400px'

        page={3}
        pageSize={5}
        total={150}

        initialSortColumn='id'
        initialSortDirection='desc'

        onParamsChange={(event: FSTableParamChangeEvent<SampleViewModel>) => {
            console.log(event)
        }}

        detailTemplate={(row: SampleViewModel) => {
            return <>{row.name}</>
        }}
    />
</div>

const meta = {
    title: 'Componentes/Tabela (FSTable)',
    component: FSTable,
    tags: ['autodocs'],
    render: renderSample
} satisfies Meta<typeof FSTable>;

export default meta;

type Story = StoryObj<typeof FSTable>;

export const Component: Story = {
    render: renderSample
};