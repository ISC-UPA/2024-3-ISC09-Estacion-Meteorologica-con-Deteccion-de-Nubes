import { list } from '@keystone-6/core';
import { integer, text, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const FotoCielo = list({
  access: allowAll,
  fields: {
    usuario_id: integer({ validation: { isRequired: true } }),
    url_foto: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true } }),
    fecha_foto: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
