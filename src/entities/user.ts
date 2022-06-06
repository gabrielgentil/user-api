import { Either, left } from '../shared/either'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalid-email'
import { InvalidNameError } from './errors/invalid-name'
import { Name } from './name'
import { UserData } from './user-data'

export class User {
	static create (
		userData: UserData
	): Either<InvalidNameError | InvalidEmailError, User> {
		const nameOrError = Name.create(String(userData.name))

		if (nameOrError.isLeft()) {
			return left(new InvalidNameError())
		}

		const emailOrError = Email.create(String(userData.email))

		if (emailOrError.isLeft()) {
			return left(new InvalidEmailError())
		}
	}
}
