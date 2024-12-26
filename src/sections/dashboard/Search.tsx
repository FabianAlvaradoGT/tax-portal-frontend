import type { Theme, SxProps } from '@mui/material'

import { useState } from 'react'

import { Stack, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

import { sociedadesOptions } from './useDashboard'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
}

export function Search({ datos }: { datos: { sociedad: string | null; setSociedad: any } }) {
  const { sociedad, setSociedad } = datos
  const [options, setOptions] = useState(sociedadesOptions)
  const [inputValue, setInputValue] = useState('')

  return (
    <section style={{ marginTop: '25px' }}>
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
    </section>
  )
}
