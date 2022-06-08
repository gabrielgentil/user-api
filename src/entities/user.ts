import { Either, left, right } from '@/shared'
import { Email, Name, UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'

export class User {
	readonly name: Name
	readonly email: Email

	private constructor (name: Name, email: Email) {
		this.name = name
		this.email = email
	}

	static create (
		userData: UserData
	): Either<InvalidNameError | InvalidEmailError, User> {
		const nameOrError = Name.create(String(userData.name))

		if (nameOrError.isLeft()) {
			return left(nameOrError.value)
		}

		const emailOrError = Email.create(String(userData.email))

		if (emailOrError.isLeft()) {
			return left(emailOrError.value)
		}

		const name: Name = nameOrError.value
		const email: Email = emailOrError.value

		return right(new User(name, email))
	}
}
