// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const prihodSchema = {
  $id: 'Prihod',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const prihodValidator = getValidator(prihodSchema, dataValidator)
export const prihodResolver = resolve({})

export const prihodExternalResolver = resolve({})

// Schema for creating new data
export const prihodDataSchema = {
  $id: 'PrihodData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...prihodSchema.properties
  }
}
export const prihodDataValidator = getValidator(prihodDataSchema, dataValidator)
export const prihodDataResolver = resolve({})

// Schema for updating existing data
export const prihodPatchSchema = {
  $id: 'PrihodPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...prihodSchema.properties
  }
}
export const prihodPatchValidator = getValidator(prihodPatchSchema, dataValidator)
export const prihodPatchResolver = resolve({})

// Schema for allowed query properties
export const prihodQuerySchema = {
  $id: 'PrihodQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(prihodSchema.properties)
  }
}
export const prihodQueryValidator = getValidator(prihodQuerySchema, queryValidator)
export const prihodQueryResolver = resolve({})
