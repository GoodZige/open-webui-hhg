import requests

# 配置信息
login_url = "https://portal.huanghuaport.com.cn/login"
personnel_sync_url = "https://portal.huanghuaport.com.cn/unifyinterface/main/org/queryemplist"
portal_app_entry_push_url = "https://portal.huanghuaport.com.cn/unifyinterface/main/commonfun/getappdata"
signup_url = "http://10.60.193.131:8080/api/v1/auths/signup"

username = "Ai"  # 替换为实际的用户名
password = "aSDF1@#$"  # 替换为实际的密码

def signup(name,email,password):
    """推送全量用户到门户应用入口"""
    headers = {
        'Content-Type': 'application/json',
    }
    payload = {"name": name, "email": email, "password": password}

    response = requests.post(signup_url, json=payload, headers=headers)
    if response.status_code == 200 and response.json().get("errcode") == 0:
        print(f"用户{name}注册成功")
    else:
        print(f"用户注册失败，状态码：{response.status_code}, 原因：{response.text}")



def get_token():
    """获取token"""
    login_form = {
        'username': username,
        'password': password
    }
    response = requests.post(login_url, data=login_form)
    if response.status_code == 200:
        token = response.cookies.get('user_session')
        print("获取Token成功:", token)
        return token
    else:
        print(f"【认证失败】--异常信息：{response.text}")
        return None


def sync_personnel(token):
    """调用人员同步接口"""
    headers = {
        'Content-Type': 'application/json',
        'Cookie': f'user_session={token}'
    }
    response = requests.get(personnel_sync_url, headers=headers)
    if response.status_code == 200:
        users = []
        data = response.json().get('dataList', [])
        for user in data:
                users.append(user)
        print("人员同步成功，共找到{}个用户".format(len(users)))
        return users
    else:
        print(f"人员同步失败，状态码：{response.status_code}, 原因：{response.text}")


def push_portal_app_entry(token, users):
    """推送全量用户到门户应用入口"""
    headers = {
        'Content-Type': 'application/json',
        'Cookie': f'user_session={token}'
    }
    app_data = [{"clientId": "", "userId": user} for user in users]
    payload = {"appData": str(app_data)}

    response = requests.post(portal_app_entry_push_url, json=payload, headers=headers)
    if response.status_code == 200 and response.json().get("errcode") == 0:
        print("门户应用入口数据推送成功")
    else:
        print(f"门户应用入口数据推送失败，状态码：{response.status_code}, 原因：{response.text}")


if __name__ == "__main__":
    token = get_token()
    if token:
        users = sync_personnel(token)
        for user in users:
            name = user.get('name')
            email = user.get('email')
            password = "qiwrjh@ty14511"
            signup(name,email,password)
        # if users:
            # push_portal_app_entry(token, users)