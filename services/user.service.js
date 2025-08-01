const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
const {models} = require("../libs/sequelize");


class UserService {

	constructor() {
		this.users = []
		this.generate();
	}

	generate() {

		const limit = 10;
		for (let index = 0; index < limit; index++) {
			this.users.push({
				id: faker.string.uuid(),
				name: faker.person.firstName(),
				lastName: faker.person.lastName(),
				age: faker.number.int({ min: 18, max: 65 }),
				email: faker.internet.email(),
			})
		}
	}

	async create(data) {
		const newUser = await models.User.create(data);
		return newUser;
	}

	async find() {
		const rta = await models.User.findAll(
      {
        include: ["customer"],
      }
    );
		return rta;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound('user not found')
		}
		return user;
	}

	async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}


module.exports = UserService;
