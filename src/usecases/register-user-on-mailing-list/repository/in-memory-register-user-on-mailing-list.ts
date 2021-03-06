import { UserRepository } from '../ports/user-repository'
import { UserData } from '../../../entities/user-data'

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
		const found = this.repository.find(user => user.email === email)

		return found || null
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
