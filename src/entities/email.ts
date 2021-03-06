import { Either, left, right } from '@/shared'
import { InvalidEmailError } from '@/entities/errors'

export class Email {
	readonly value: string

	private constructor (email: string) {
		this.value = email
	}

	static create (email: string): Either<InvalidEmailError, Email> {
		if (Email.validate(email)) {
			return right(new Email(email))
		}

		return left(new InvalidEmailError(email))
	}

	static validate (email: string) {
		const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

		if (!emailRegex.test(email)) {
			return false
		}

		if (!email) {
			return false
		}

		if (email.length > 320) {
			return false
		}

		const [local, domain] = email.split('@')

		if (!local.length || local.length > 64) {
			return false
		}

		if (!domain.length || domain.length > 255) {
			return false
		}

		const domainParts = domain.split('.')
		if (domainParts.some((part) => {
			return part.length > 63
		})) {
			return false
		}

		return true
	}
}
