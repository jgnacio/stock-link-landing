import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium ">
          {label}
          {required && (
            <span className="text-red-500 ml-1">
              * <span className="sr-only">(requerido)</span>
            </span>
          )}
        </Label>
        <div className="relative">
          <Input
            defaultValue={defaultValue}
            id={name}
            type="email"
            className="w-full  pl-10 transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="ejemplo@correo.com"
            {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
