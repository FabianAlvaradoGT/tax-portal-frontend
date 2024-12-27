export const sociedadesOptions = [
  {
    estado: true,
    uuid_cliente: '244b3694-ea66-4630-88c1-efa68d74d674',
    rut: '76565080-1',
    email: 'carlos.ceron@cela.cl',
    razon_social: 'Centro Estetico Laser Aleman SPA',
    uuid: '4f0e0071-bfb6-4010-8d36-41118133eca8',
    domicilio: 'ARRAYAN 2750 OF 503 PISO 5 COMUNA PROVIDENCIA',
  },
  {
    estado: true,
    uuid_cliente: '244b3694-ea66-4630-88c1-efa68d74d674',
    rut: '77077097-1',
    email: null,
    razon_social: 'B2X Care Chile SPA',
    uuid: 'fb057f3c-2fff-421b-9130-744475a51a34',
    domicilio: 'HOLANDA #230 DEPTO. #2 COMUNA PROVIDENCIA CIUDAD SANTIAGO',
  },
  {
    estado: true,
    uuid_cliente: '244b3694-ea66-4630-88c1-efa68d74d674',
    rut: '76378501-7',
    email: 'diaz.c@e80group.com',
    razon_social: 'Elettric 80 Chile SPA',
    uuid: 'e3171f5b-bc55-4c3b-b924-f379ac229b4d',
    domicilio: 'ROSARIO 530 550 COMUNA LAS CONDES',
  },
  {
    estado: true,
    uuid_cliente: '244b3694-ea66-4630-88c1-efa68d74d674',
    rut: '76775016-1',
    email: 'corporatetaxchile@ge.com',
    razon_social: 'Industrial C&S Chile SPA',
    uuid: '11a2c038-13de-46fb-8b2f-6583c1656d5e',
    domicilio: 'PDTE RIESCO 5335 OF 603 P 6 EX 5333 P6 DEPTO. #603 COMUNA LAS CONDES',
  },
  {
    estado: true,
    uuid_cliente: '244b3694-ea66-4630-88c1-efa68d74d674',
    rut: '78282710-3',
    email: 'r.cunningham@bejoandes.cl',
    razon_social: 'Agrocomercial Bejo Andes Limitada',
    uuid: '2e74d71d-1584-4a18-9ab9-4b0f44ba843a',
    domicilio: 'EBRO #2740 DEPTO. #301 COMUNA LAS CONDES CIUDAD STGO',
  },
  {
    estado: true,
    uuid_cliente: '244b3694-ea66-4630-88c1-efa68d74d674',
    rut: '77125462-4',
    email: null,
    razon_social: 'Inversiones Hidroelectrica Tres',
    uuid: 'a63f8f5e-1792-4ff4-9b5b-ee88f893e894',
    domicilio: null,
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
