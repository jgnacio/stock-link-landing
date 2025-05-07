import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && (
            <span className="text-red-500 ml-1">
              * <span className="sr-only">(requerido)</span>
            </span>
          )}
        </Label>
        <TextAreaComponent
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          className="w-full bg-gray-50 border border-gray-200 min-h-[100px] transition-colors focus:border-primary focus:ring-1 focus:ring-primary resize-y"
          {...register(name, { required: required })}
        />
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
