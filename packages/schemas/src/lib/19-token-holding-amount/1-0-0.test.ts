import * as fs from 'fs';
import { globSync as glob } from 'fast-glob';

import { ajv } from '../ajv';
import { schema } from './1-0-0';

const jsonFiles = glob('examples/19-token-holding-amount/*.json');

describe('19-token-holding-amount/1-0-0', () => {
  it.each(jsonFiles)('should work for %s', (example) => {
    const validate = ajv.compile(schema);

    expect(validate.errors).toBeNull();

    const json = JSON.parse(fs.readFileSync(example, 'utf8'));
    const valid = validate(json);

    if (!valid) console.log(validate.errors);

    expect(valid).toBeTruthy();
  });
});
