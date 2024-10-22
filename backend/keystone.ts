import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, text, timestamp } from '@keystone-6/core/fields';

export default config({
  db: {
    provider: 'sqlite',
    url: 'file:./db/cloudyDB.db',
  },
  lists: {
    Login: list({
      access: allowAll,
      fields: {
        idUser: integer({ validation: { isRequired: true }, isIndexed: 'unique' }),
        nombre: text({ validation: { isRequired: true } }),
        username: text({ validation: { isRequired: true } }),
        passsword: text({ validation: { isRequired: true } }),
      },
    }),
    Ubicacione: list({
      access: allowAll,
      fields: {
        idLocacion: integer({ validation: { isRequired: true }, isIndexed: 'unique' }),
        nombre: text({ validation: { isRequired: true } }),
        latitud: integer({ validation: { isRequired: true } }),
        longitud: integer({ validation: { isRequired: true } }),
      },
    }),
    Temperatura: list({
      access: allowAll,
      fields: {
        idTemperatura: integer({ validation: { isRequired: true }, isIndexed: 'unique' }),
        valor: integer({ validation: { isRequired: true } }),
        timestamp: timestamp({ validation: { isRequired: true } }),
        idLocacion: text({ validation: { isRequired: true } }),
      },
    }),
    Humedade: list({
      access: allowAll,
      fields: {
        idHumedad: integer({ validation: { isRequired: true }, isIndexed: 'unique' }),
        valor: integer({ validation: { isRequired: true } }),
        timestamp: timestamp({ validation: { isRequired: true } }),
        idLocacion: text({ validation: { isRequired: true } }),
      },
    }),
  },
});