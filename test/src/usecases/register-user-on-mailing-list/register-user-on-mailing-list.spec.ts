// import { UserData } from '../../../../src/usecases/register-user-on-mailing-list/user-data'

import { UserData } from '../../../../src/entities/user-data'
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
		const user = await repo.findByEmail('any@email.com')

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
		const email = 'any@email.com'
		const response = await usecase.registerUserOnMailingList({ name, email })
		const user = await repo.findByEmail('any@email.com')

		expect(user.name).toBe(name)
		expect(response.value.name).toBe(name)
	})
})
