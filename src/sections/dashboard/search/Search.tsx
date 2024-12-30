import type { Theme, SxProps } from '@mui/material'
import type { Company } from 'src/sections/dashboard/useSearch'

import { useState, useEffect } from 'react'

import { Stack, TextField, Autocomplete } from '@mui/material'

import { ComponentBox } from 'src/components/layout/component-box'

const componentBoxStyles: SxProps<Theme> = {
  flexDirection: 'column',
  alignItems: 'unset',
  justifyContent: 'flex-start',
}

export function Search({
  datos,
}: {
  datos: { sociedad: Company | null; setSociedad: any; data: Company[]; loading: boolean }
}) {
  const { sociedad, setSociedad, data, loading } = datos
  const [options, setOptions] = useState<Company[]>([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (data) {
      setOptions(data)
    }
  }, [data])

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
                setOptions(data)
                setSociedad(null)
                return
              }

              const societiesFind = data.filter((society) => society.rut.includes(target))
              setOptions(societiesFind)
              setSociedad(societiesFind.length > 0 ? societiesFind[0] : null)
            }}
            sx={{ backgroundColor: 'background.paper' }}
          />

          <Autocomplete
            size="small"
            sx={{ backgroundColor: 'background.paper' }}
            fullWidth
            value={sociedad || null}
            loading={loading}
            loadingText="Cargando..."
            options={options}
            getOptionLabel={(option) => option.razon_social}
            onChange={(event, newValue) => {
              setSociedad(newValue)
              setInputValue(newValue ? newValue.uuid : '')
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue)
            }}
            renderInput={(params) => <TextField {...params} label="Sociedad" />}
            renderOption={(props, option) => (
              <li {...props} key={option.uuid}>
                {option.razon_social}
              </li>
            )}
          />
        </Stack>
      </ComponentBox>
    </section>
  )
}
