import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Stack, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { sociedadesOptions } from './useDashboard'

export const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
}

export function Info() {
  const [options, setOptions] = useState(sociedadesOptions)
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState<string | null>(null)

  return (
    <section style={{ marginTop: '25px' }}>
      <Stack gap={3} direction="column">
        <ComponentBox title="Búsqueda" sx={componentBoxStyles}>
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
                  setValue(null)
                  return
                }

                const societiesFind = sociedadesOptions.filter((society) =>
                  society.rut.includes(target)
                )
                setOptions(societiesFind)
                setValue(societiesFind.length > 0 ? societiesFind[0].title : null)
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <Autocomplete
              size="small"
              sx={{ backgroundColor: 'background.paper' }}
              fullWidth
              value={value}
              options={options.map((option) => option.title)}
              onChange={(event, newValue) => {
                setValue(newValue)
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

        <ComponentBox title="Datos" sx={componentBoxStyles}>
          <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
            <TextField
              label="Correo"
              value={sociedadesOptions.find((society) => society.title === value)?.email || ''}
              size="small"
              fullWidth
              disabled
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              label="Domicilio"
              value={sociedadesOptions.find((society) => society.title === value)?.domicilio || ''}
              size="small"
              fullWidth
              sx={{ backgroundColor: 'background.paper' }}
            />
          </Stack>
          <Stack spacing={2} direction={{ xs: 'row', sm: 'row' }}>
            <TextField
              label="Regimen Tributario"
              value={
                sociedadesOptions.find((society) => society.title === value)?.regimenTributario ||
                ''
              }
              size="small"
              fullWidth
              sx={{ backgroundColor: 'background.paper' }}
            />
            <TextField
              label="Actividad Económica Principal"
              value={
                sociedadesOptions.find((society) => society.title === value)
                  ?.actividadEconomicaPrincipal || ''
              }
              size="small"
              fullWidth
              sx={{ backgroundColor: 'background.paper' }}
            />
          </Stack>
        </ComponentBox>
      </Stack>
    </section>
  )
}
