module.exports = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^[^.]+.vue$': '@vue/vue3-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/**.vue', 'src/**/**.js', 'src/**/**.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['vue', 'js', 'ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  },
  // moduleNameMapper: {
  //   '\\.(css|less)$': '<rootDir>/__test__/styleMock.ts'
  // }
}
