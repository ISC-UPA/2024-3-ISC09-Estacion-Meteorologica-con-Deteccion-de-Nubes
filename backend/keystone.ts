import { config, list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { integer, text, timestamp } from '@keystone-6/core/fields';
import { Usuario } from './schema/Usuario';
import { FotoCielo } from './schema/FotoCielo';
import { LecturaMeteorologia } from './schema/LecturaMeteorologia';
import { AnalisisFoto } from './schema/AnalisisFoto';
import { authentication } from './schema/Authentication';
import { azureADIntegration } from './schema/AzureADIntegration';
import { Ubicacion } from './schema/Ubicacion';

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
    Usuario,
    FotoCielo,
    LecturaMeteorologia,
    Ubicacion,
    AnalisisFoto,
    authentication,
    azureADIntegration
  },
});