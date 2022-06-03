import { UserData } from '../../../../../src/usecases/register-user-on-mailing-list/user-data'
import { InMemoryUserRepository } from '../../../../../src/usecases/register-user-on-mailing-list/repository/in-memory-register-user-on-mailing-list'

describe('In memory User repository', () => {
	test('should return null if user is not found', async () => {
		const users: UserData[] = []
		const userRepo = new InMemoryUserRepository(users)

		const user = await userRepo.findByEmail('any@email.com')

		expect(user).toBeNull()
	})
})
