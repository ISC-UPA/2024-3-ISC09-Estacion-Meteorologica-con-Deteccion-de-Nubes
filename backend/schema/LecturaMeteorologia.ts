import { list } from '@keystone-6/core';
import { integer, float, timestamp, checkbox, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const LecturaMeteorologia = list({
  access: allowAll,
  fields: {
    usuario_id: relationship({ ref: 'Usuario', many: true }),
    foto_id: relationship({ ref: 'FotoCielo', many: false }),
    temperatura: float({ validation: { isRequired: true } }),
    presion_atmosferica: float({ validation: { isRequired: true } }),
    humedad: float({ validation: { isRequired: true } }),
    api: checkbox({ defaultValue: false }),
    fecha_lectura: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
