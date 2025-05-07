import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          className="w-full bg-gray-50 border border-gray-200 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          {...register(name, { required })}
        />
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
