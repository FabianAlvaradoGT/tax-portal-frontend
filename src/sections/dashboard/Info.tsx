import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Stack, Alert, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { sociedadesOptions } from './useDashboard'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
}

export function Info({ datos }: { datos: { sociedad: string | null; setSociedad: any } }) {
  const { sociedad, setSociedad } = datos
  const [options, setOptions] = useState(sociedadesOptions)
  const [inputValue, setInputValue] = useState('')

  return (
    <section style={{ marginTop: '25px' }}>
      <Stack gap={3} direction="column">
        <ComponentBox
          title="Búsqueda"
          sx={{ ...componentBoxStyles, backgroundColor: 'background.paper' }}
        >
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <TextField
              variant="outlined"
              fullWidth
              label="RUT"
              type="search"
              size="small"
              onChange={(e) => {
                const target = e.target.value

                if (target === '') {
                  setOptions(sociedadesOptions)
                  setSociedad(null)
                  return
                }

                const societiesFind = sociedadesOptions.filter((society) =>
                  society.rut.includes(target)
                )
                setOptions(societiesFind)
                setSociedad(societiesFind.length > 0 ? societiesFind[0].title : null)
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <Autocomplete
              size="small"
              sx={{ backgroundColor: 'background.paper' }}
              fullWidth
              value={sociedad}
              options={options.map((option) => option.title)}
              onChange={(event, newValue) => {
                setSociedad(newValue)
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
              }}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label="Sociedad" />}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
            />
          </Stack>
        </ComponentBox>

        <ComponentBox title="Datos Básicos" sx={componentBoxStyles}>
          {sociedad ? (
            <>
              <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
                <TextField
                  label="Correo"
                  value={
                    sociedadesOptions.find((society) => society.title === sociedad)?.email || ''
                  }
                  size="small"
                  fullWidth
                  disabled
                  sx={{ backgroundColor: 'background.paper' }}
                />
                <TextField
                  label="Domicilio"
                  value={
                    sociedadesOptions.find((society) => society.title === sociedad)?.domicilio || ''
                  }
                  size="small"
                  fullWidth
                  disabled
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Stack>
              <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
                <TextField
                  label="Regimen Tributario"
                  value={
                    sociedadesOptions.find((society) => society.title === sociedad)
                      ?.regimenTributario || ''
                  }
                  size="small"
                  fullWidth
                  disabled
                  sx={{ backgroundColor: 'background.paper' }}
                />
                <TextField
                  label="Actividad Económica Principal"
                  value={
                    sociedadesOptions.find((society) => society.title === sociedad)
                      ?.actividadEconomicaPrincipal || ''
                  }
                  size="small"
                  fullWidth
                  disabled
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Stack>
            </>
          ) : (
            <Alert severity="info" variant="outlined">
              Seleccione una sociedad para ver el semáforo
            </Alert>
          )}
        </ComponentBox>
      </Stack>
    </section>
  )
}
