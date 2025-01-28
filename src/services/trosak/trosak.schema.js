// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const trosakSchema = {
  $id: 'Trosak',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'iznos'],
  properties: {
    id: { type: 'number' },
    datum: { type: 'string' },
    iznos: { type: 'string' },
    komentar: { type: 'string' },
    kategorija: { type: 'string' }
  }
}
export const trosakValidator = getValidator(trosakSchema, dataValidator)
export const trosakResolver = resolve({})

export const trosakExternalResolver = resolve({})

// Schema for creating new data
export const trosakDataSchema = {
  $id: 'TrosakData',
  type: 'object',
  additionalProperties: false,
  required: ['iznos'],
  properties: {
    ...trosakSchema.properties
  }
}
export const trosakDataValidator = getValidator(trosakDataSchema, dataValidator)
export const trosakDataResolver = resolve({})

// Schema for updating existing data
export const trosakPatchSchema = {
  $id: 'TrosakPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...trosakSchema.properties
  }
}
export const trosakPatchValidator = getValidator(trosakPatchSchema, dataValidator)
export const trosakPatchResolver = resolve({})

// Schema for allowed query properties
export const trosakQuerySchema = {
  $id: 'TrosakQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(trosakSchema.properties)
  }
}
export const trosakQueryValidator = getValidator(trosakQuerySchema, queryValidator)
export const trosakQueryResolver = resolve({})
