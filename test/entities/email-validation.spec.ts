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

	test('should not accept string larger than 320 chars', async () => {
		const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept domain part larger than 255 chars', async () => {
		const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept local part larger than 64 chars', async () => {
		const email = 'l'.repeat(65) + '@email.com'
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept empty local part', async () => {
		const email = '@email.com'
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept domain empty', async () => {
		const email = 'any@'
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept domain with a part larger than 63 chars', async () => {
		const email = 'any@' + 'd'.repeat(64) + '.com'
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept local part with invalid char', async () => {
		const email = 'any email@email.com'
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept local part with ending dot', async () => {
		const email = 'any.@email.com'
		expect(Email.validate(email)).toBeFalsy()
	})

	test('should not accept email without an at-sign', async () => {
		const email = 'anyemail.com'
		expect(Email.validate(email)).toBeFalsy()
	})
})
