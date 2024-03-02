import type { Config } from 'jest';

const config: Config = {
	verbose: true,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
	},
};

export default config;
