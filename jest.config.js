module.exports = {
  transform: {
    '\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/db/sqlite3.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov']
}
