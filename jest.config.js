module.exports = {
  rootDir: __dirname,
  clearMocks: true,
  collectCoverage: true,
  setupFilesAfterEnv: ['jest-dom/extend-expect', 'jest-styled-components', '@testing-library/react/cleanup-after-each'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
}
