import { UserRepository } from '../../ports/user-repository'
import { UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
	private repository: UserData[]

	constructor (repository: UserData[]) {
		this.repository = repository
	}

	async add (user: UserData): Promise<void> {
		const exists = await this.exists(user)
		if (!exists) {
			this.repository.push(user)
		}
	}

	async findByEmail (email: string): Promise<UserData> {
		const users = this.repository.filter((user) => {
			return user.email === email
		})

		if (users.length > 0) {
			return users[0]
		}

		return null
	}

	async findAllUsers (): Promise<UserData[]> {
		return this.repository
	}

	async exists (user: UserData): Promise<boolean> {
		if (await this.findByEmail(String(user.email)) === null) {
			return false
		}
		return true
	}
}
