import { WEBUI_API_BASE_URL } from '$lib/constants';
import { getUserPosition } from '$lib/utils';

export const getUserGroups = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/groups`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getUserDefaultPermissions = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/default/permissions`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateUserDefaultPermissions = async (token: string, permissions: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/default/permissions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			...permissions
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
let user_session = null;
let users = null;
export const pushManyUser = async (email: string) => {
	let error = null;

	const newUser = {
		username: email.split("@")[0]
	};

	const res = await fetch('/api_self/push_new_user', {
		method: 'POST', // 指定请求方法
		headers: {
			'Content-Type': 'application/json' // 设置请求头
		},
		body: JSON.stringify(newUser) // 将JavaScript对象转换为JSON字符串
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('服务响应异常');
			}
			return response.json(); // 解析JSON响应
		})
		.catch(err => {
			console.error('Error:', err); // 出错时处理错误
			error = err.detail;
			return null
		});
		if (error) {
			throw error;
		}
	
		return res;
}
export const popManyUser = async (email: string) => {
	let error = null;

	const newUser = {
		username: email.split("@")[0]
	};

	const res = await fetch('/api_self/pop_new_user', {
		method: 'POST', // 指定请求方法
		headers: {
			'Content-Type': 'application/json' // 设置请求头
		},
		body: JSON.stringify(newUser) // 将JavaScript对象转换为JSON字符串
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('服务响应异常');
			}
			return response.json(); // 解析JSON响应
		})
		.catch(err => {
			console.error('Error:', err); // 出错时处理错误
			error = err.detail;
			return null
		});
		if (error) {
			throw error;
		}
	
		return res;
}

// export const pushManyUser = async (email: string) => {
// 	let error = null;

// 	if (user_session) {
// 		// 人员同步
// 		const res_person = await fetch(`https://portal.huanghuaport.com.cn/unifyinterface/main/org/queryemplist`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Cookie': `user_session=${user_session}`
// 			},
// 			body: JSON.stringify({
// 				id: id,
// 				role: role
// 			})
// 		})
// 			.then(async (res) => {
// 				if (!res.ok) throw await res.json();
// 				return res.json();
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				error = err.detail;
// 				return null;
// 			});

// 		if (error) {
// 			throw error;
// 		}
// 		users = res_person.dataList || [];
// 		// 筛选用户
// 		const appData = users.filter(user => {
// 			if(user.username.length === 8){
// 				if(user.username.startWith("1") || user.username.startWith("2")){
// 					return true
// 				}else{
// 					return false
// 				}
// 			}else{
// 				return false
// 			}
// 		}).map(user=>{
// 			return {clientId: "Ai", userId: user.username}
// 		})
// 		// 添加当前用户
// 		appData.push({clientId: "Ai", userId: email.split("@")[0]})
//     	const payload = JSON.stringify({"appData": JSON.stringify(appData)});

// 		// app_data = [{"clientId": "", "userId": user} for user in users]
// 		// payload = {"appData": str(app_data)}
// 		const res = await fetch(`https://portal.huanghuaport.com.cn/unifyinterface/main/commonfun/getappdata`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Cookie': `user_session=${user_session}`
// 			},
// 			body: payload
// 		})
// 			.then(async (res) => {
// 				if (!res.ok) throw await res.json();
// 				return res.json();
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				error = err.detail;
// 				return null;
// 			});

// 		if (error) {
// 			throw error;
// 		}

// 		return res;

// 	} else {
// 		const loginForm = new URLSearchParams({
// 			'username': 'Ai',
// 			'password': 'aSDF1@#$'
// 		});
// 		const res_login = await fetch(`https://portal.huanghuaport.com.cn/login`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded',
// 			},
// 			body: loginForm
// 		})
// 			.then(async (res) => {
// 				console.log(res);
// 				if (res.headers != null) {
// 					user_session = res.headers.get('Set-Cookie')?.match(/user_session=([^;]*)/)?.[1];
// 				}
// 				return res
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				error = err.detail;
// 				return null;
// 			});

// 		if (error) {
// 			throw error;
// 		}
// 	}




// };

export const updateUserRole = async (token: string, id: string, role: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/update/role`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			id: id,
			role: role
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getUsers = async (token: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res ? res : [];
};

export const getUserSettings = async (token: string) => {
	let error = null;
	const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/settings`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateUserSettings = async (token: string, settings: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/settings/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			...settings
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getUserById = async (token: string, userId: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getUserInfo = async (token: string) => {
	let error = null;
	const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/info`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const updateUserInfo = async (token: string, info: object) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/user/info/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			...info
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const getAndUpdateUserLocation = async (token: string) => {
	const location = await getUserPosition().catch((err) => {
		console.log(err);
		return null;
	});

	if (location) {
		await updateUserInfo(token, { location: location });
		return location;
	} else {
		console.log('Failed to get user location');
		return null;
	}
};

export const deleteUserById = async (token: string, userId: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

type UserUpdateForm = {
	profile_image_url: string;
	email: string;
	name: string;
	password: string;
};

export const updateUserById = async (token: string, userId: string, user: UserUpdateForm) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/${userId}/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			profile_image_url: user.profile_image_url,
			email: user.email,
			name: user.name,
			password: user.password !== '' ? user.password : undefined
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};
