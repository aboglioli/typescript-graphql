import * as glob from 'glob';

const files = glob.sync(__dirname + '/**/*resolver.ts');

export default files.map(file => require(file));
