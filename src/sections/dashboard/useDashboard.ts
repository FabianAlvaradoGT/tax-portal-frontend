export const sociedadesOptions = [
  {
    title: 'Sociedad 1',
    rut: '77887188-3',
    email: 'sociedad_1@contacto.com',
    domicilio: 'Calle 123, Santiago',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 2',
    rut: '1945509-6',
    email: 'sociedad_2@contacto.com',
    domicilio: 'Calle 121, Maule',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 3',
    rut: '80191238-1',
    email: 'sociedad_3@contacto.com',
    domicilio: 'Calle 1213, Valparaiso',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 4',
    rut: '61293817-k',
    email: 'sociedad_4@contacto.com',
    domicilio: 'Calle AVC, Quintero',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 5',
    rut: '77812312-4',
    email: 'sociedad_5@contacto.com',
    domicilio: 'Calle 987, Arica',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 6',
    rut: '88726182-3',
    email: 'sociedad_6@contacto.com',
    domicilio: 'Calle 876, Pucón',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 7',
    rut: '98917261-1',
    email: 'sociedad_7@contacto.com',
    domicilio: 'Calle AAA, Santiago',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 8',
    rut: '71778289-7',
    email: 'sociedad_8@contacto.com',
    domicilio: 'Calle DDD, Santiago',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
  {
    title: 'Sociedad 9',
    rut: '12318119-2',
    email: 'sociedad_9@contacto.com',
    domicilio: 'Calle SSS, Santiago',
    regimenTributario: 'General',
    actividadEconomicaPrincipal: 'Venta de productos',
  },
]

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export const dataSemaforo = () => [
  {
    form_name: 'IVA',
    data: [
      {
        periodo: 2024,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2023,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2022,
        observaciones: getRandomInt(5),
      },
    ],
  },
  {
    form_name: 'Formulario 29',
    data: [
      {
        periodo: 2024,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2023,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2022,
        observaciones: getRandomInt(5),
      },
    ],
  },
  {
    form_name: 'Formulario 3600',
    data: [
      {
        periodo: 2024,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2023,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2022,
        observaciones: getRandomInt(5),
      },
    ],
  },
  {
    form_name: 'Formulario 50',
    data: [
      {
        periodo: 2024,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2023,
        observaciones: getRandomInt(5),
      },
      {
        periodo: 2022,
        observaciones: getRandomInt(5),
      },
    ],
  },
]
