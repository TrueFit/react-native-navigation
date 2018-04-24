/* eslint-disable */
require('shelljs/global');
echo('Building ...');

// clean
rm('-rf', 'lib');

// move over
exec('babel -d lib/ src/ --sourcemaps');
rm('-rf', 'lib/tools/');

echo('Build Complete');

// move to dev target
const target = process.argv[2] + '/node_modules/truefit-navigation/lib';
rm('-rf', target);
mv('lib', target);

echo('Copy Complete')