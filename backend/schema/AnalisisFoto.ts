import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const AnalisisFoto = list({
  access: allowAll,
  fields: {
    foto_id: relationship({ ref: 'FotoCielo', many: false }),
    descripcion: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true } }),
    prediccion: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true } }),
  },
});
