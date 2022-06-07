import { InvalidEmailError } from '../../../../src/entities/errors/invalid-email'
import { InvalidNameError } from '../../../../src/entities/errors/invalid-name'
import { UserData } from '../../../../src/entities/user-data'
import { left } from '../../../../src/shared/either'
import { UserRepository } from '../../../../src/usecases/ports/user-repository'
import { RegisterUserOnMailingList } from '../../../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../../../src/usecases/register-user-on-mailing-list/repository/in-memory-register-user-on-mailing-list'

describe('Register user on mailing list use case', () => {
	test('should add user with complete data to mailing list', async () => {
		const users: UserData[] = []

		const repo: UserRepository = new InMemoryUserRepository(users)
		const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
			repo
		)
		const name = 'any_name'
		const email = 'any@email.com'
		const response = await usecase.registerUserOnMailingList({ name, email })
		const user = await repo.findByEmail(email)

		expect(user.name).toBe(name)
		expect(response.value.name).toBe(name)
	})

	test('should not add user with invalid email', async () => {
		const users: UserData[] = []

		const repo: UserRepository = new InMemoryUserRepository(users)
		const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
			repo
		)
		const name = 'any_name'
		const invalidEmail = 'invalid_email'
		const response = await usecase.registerUserOnMailingList({ name, email: invalidEmail })
		const user = await repo.findByEmail(invalidEmail)

		expect(user).toBeNull()
		expect(response).toEqual(left(new InvalidEmailError()))
	})

	test('should not add user with name to mailing list', async () => {
		const users: UserData[] = []

		const repo: UserRepository = new InMemoryUserRepository(users)
		const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(
			repo
		)
		const invalidName = ''
		const email = 'any@email.com'
		const response = await usecase.registerUserOnMailingList({ name: invalidName, email })
		const user = await repo.findByEmail(email)

		expect(user).toBeNull()
		expect(response).toEqual(left(new InvalidNameError()))
	})
})
