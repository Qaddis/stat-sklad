import { EndpointsEnum } from "@/constants/api.constants"
import { IUser } from "@/types/user.types"
import instance from "../api.interceptor"

class UserService {
	async get() {
		const response = await instance.get<IUser>(EndpointsEnum.USER)

		return response.data
	}
}

const userService = new UserService()

export default userService
