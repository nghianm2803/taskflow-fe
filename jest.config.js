module.exports = {
    type: 'module',

    // An array of file extensions your tests use (e.g., js, jsx, ts, tsx)
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  
    // The paths to the directories containing your test files
    testMatch: ['**/__tests__/**/*.js', '**/__tests__/**/*.jsx'],
  
    // Transform files with Babel before running tests
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
  
    // Configure where to search for modules
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  
    // Additional options for Jest
    // (e.g., coverage reporting, test environment, setup files)
    // ...
  
    // Jest-specific settings for React
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // Coverage reporting configuration
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!**/__tests__/**',
      '!**/node_modules/**',
    ],
  };
  