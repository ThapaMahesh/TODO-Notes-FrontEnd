module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  },
  // transformIgnorePatterns: ['/node_modules/'],
  setupFiles: ["./tests/unit/setup.js"],
}
