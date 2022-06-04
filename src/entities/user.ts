import { Either, left } from '../shared/either'
import { Email } from './email'
import { InvalidEmailError } from './errors/invalid-email'
import { UserData } from './user-data'

export class User {
	static create (userData: UserData): Either<InvalidEmailError, User> {
		const emailOrError = Email.create(String(userData.email))

		if (emailOrError.isLeft()) {
			return left(new InvalidEmailError())
		}
	}
}
