import { list } from '@keystone-6/core';
import { integer, text, password, timestamp, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const Usuario = list({
  access: allowAll,
  fields: {
    usuario_id: integer({ validation: { isRequired: true } }),
    nombre: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    contrasena: password({ validation: { isRequired: true } }),
    telefono: text(),   
    fecha_creacion: timestamp({ defaultValue: { kind: 'now' } }),
    fotos: relationship({ ref: 'FotoCielo', many: true }),
    lecturas: relationship({ ref: 'LecturaMeteorologia', many: true }),
    ubicaciones: relationship({ ref: 'Ubicacion', many: true }),
  },
});
