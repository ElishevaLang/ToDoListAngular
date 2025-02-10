module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    moduleNameMapper: {
      '^@app/(.*)$': '<rootDir>/src/app/$1'
    },
  };
  