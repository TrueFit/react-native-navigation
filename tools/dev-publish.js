/* eslint-disable */
require('shelljs/global');
require('./build.js');

const target = process.argv[2] + '/node_modules/truefit-react-native-navigation/lib';

console.log(target);

rm('-rf', target);
mv('lib', target);