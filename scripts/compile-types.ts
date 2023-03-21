import { compileFromFile } from 'json-schema-to-typescript';
import * as fs from 'fs';
import * as path from 'path';

const schemas = fs.readdirSync(path.join(__dirname, '../schemas'));

schemas.forEach((schema) => {
  compileFromFile(path.join(__dirname, '../schemas', schema))
    .then((ts) => {
      fs.writeFileSync(
        path.join(
          __dirname,
          '../utils/types/schemas',
          schema.replace('.json', '.ts')
        ),
        ts
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
