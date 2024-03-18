export class ExcursionViewModel {
    id: number
    name: string
    date: Date
}

export const excursionDataSource: ExcursionViewModel[] = [
    { id: 1, name: "Hopi-Hari", date: new Date(Date.now()) },
    { id: 2, name: "Museu", date: new Date(Date.now()) },
    { id: 3, name: "Parque Aquatico", date: new Date(Date.now()) },
]