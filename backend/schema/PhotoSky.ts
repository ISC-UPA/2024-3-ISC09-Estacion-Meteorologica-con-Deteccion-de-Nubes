import { list } from '@keystone-6/core';
import { checkbox, text, timestamp, relationship, float } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const PhotoSky = list({
  access: allowAll,
  fields: {
    user_id: relationship({ ref: 'User', many: true }) ,
    url_photo: text({ ui: { displayMode: 'textarea' }, validation: { isRequired: true } }),
    latitude: float({ validation: { isRequired: true } }),
    longitude: float({ validation: { isRequired: true } }),
    api: checkbox({ defaultValue: false }),
    date_photo: timestamp({ defaultValue: { kind: 'now' } }),
  },
});
