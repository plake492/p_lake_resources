import * as React from 'react'
import Select from '../Select'
import { format } from 'date-fns'
import { monthsShort } from '../utils/dateHelpers'

export default function MonthAndYearSelection({
  date,
  setCurrentFocusedDate,
}: any) {
  return (
    <>
      <span>
        <Select
          label="month"
          id="date-picker-month"
          value={format(date, 'MMM')}
          options={[...Array(12)].map((_, i) => ({
            label: monthsShort[i],
            value: i.toString(),
          }))}
          onChange={(v: string) => {
            setCurrentFocusedDate(
              new Date(parseInt(format(date, 'yyyy')), parseInt(v))
            )
          }}
          forDatePicker
          hideLabel
        />
        {/* {format(date, 'MMM')} */}
      </span>{' '}
      <span>
        <Select
          label="Year"
          id="date-picker-year"
          value={format(date, 'yyyy')}
          options={[...Array(124)].map((_, i) => {
            const year = (i + 1900).toString()
            return {
              label: year,
              selected: year === format(date, 'yyyy'),
            }
          })}
          onChange={(v: string) => {
            setCurrentFocusedDate(
              new Date(parseInt(v), parseInt(format(date, 'MM')) - 1)
            )
          }}
          forDatePicker
          hideLabel
        />
      </span>
    </>
  )
}
