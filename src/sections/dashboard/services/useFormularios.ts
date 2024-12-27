interface Forms {
  uuid: string
  fuente: string
  tipo_archivo: string
}

interface Years {
  value: string
  label: string
}

export const FORMS: Forms[] = [
  {
    fuente: 'SII',
    tipo_archivo: 'F50',
    uuid: '8341e73e-8922-4cf0-b384-0f54e8cddec8',
  },
  {
    fuente: 'SII',
    tipo_archivo: 'F3600',
    uuid: 'f76736d0-4dd7-4b4c-bb9f-d00399a15744',
  },
  {
    fuente: 'SII',
    tipo_archivo: 'F29',
    uuid: 'c771d3f2-48a6-4633-b675-3c8a9a1d6efb',
  },
  {
    fuente: 'APP',
    tipo_archivo: 'F22',
    uuid: 'e9138eab-f363-4bb8-9e07-03412c3ac701',
  },
]

export const YEARS: Years[] = [
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
]
