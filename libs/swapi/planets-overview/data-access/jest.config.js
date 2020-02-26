
module.exports = {
  name: 'swapi-planets-overview-planets-overview-list-data-access',
  preset: '../../../../jest.config.js',
  coverageDirectory:'../../../../coverage/libs/swapi/planets-overview/planets-overview-list/data-access',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};

