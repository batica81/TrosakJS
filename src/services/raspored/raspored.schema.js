// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const rasporedSchema = {
  $id: 'Raspored',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const rasporedValidator = getValidator(rasporedSchema, dataValidator)
export const rasporedResolver = resolve({})

export const rasporedExternalResolver = resolve({})

// Schema for creating new data
export const rasporedDataSchema = {
  $id: 'RasporedData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...rasporedSchema.properties
  }
}
export const rasporedDataValidator = getValidator(rasporedDataSchema, dataValidator)
export const rasporedDataResolver = resolve({})

// Schema for updating existing data
export const rasporedPatchSchema = {
  $id: 'RasporedPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...rasporedSchema.properties
  }
}
export const rasporedPatchValidator = getValidator(rasporedPatchSchema, dataValidator)
export const rasporedPatchResolver = resolve({})

// Schema for allowed query properties
export const rasporedQuerySchema = {
  $id: 'RasporedQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(rasporedSchema.properties)
  }
}
export const rasporedQueryValidator = getValidator(rasporedQuerySchema, queryValidator)
export const rasporedQueryResolver = resolve({})
