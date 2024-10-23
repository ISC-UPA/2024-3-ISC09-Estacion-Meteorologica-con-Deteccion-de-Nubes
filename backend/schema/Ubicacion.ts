import { list } from '@keystone-6/core';
import { integer, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Ubicacion = list({
  access: allowAll,
  fields: {
    latitud: integer({ validation: { isRequired: true } }),
    longitud: integer({ validation: { isRequired: true } }),
    usuario_id: relationship({ ref: 'Usuario', many: true }),
  },
});
