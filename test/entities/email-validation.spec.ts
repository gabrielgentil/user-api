import { Email } from '../../src/entities/email'

describe('Email validation', () => {
	test('should not accept null string', async () => {
		const email = null
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept empty string', async () => {
		const email: string = ''
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should accept valid email', async () => {
		const email = 'any@email.com'
		expect(Email.validate(email)).toBeTruthy()
	})
})
