const errorDirection: { [key: string]: string } = {
    "EntityNotExist.User": "",
    "EntityNotExist.Employee": "用户不存在",
    "EntityNotExist.Employee.Empty": "用户不存在",
    "EntityAlreadyExists.VerifyCode.Exist": "验证码获取频繁，请稍后再试",
    "EntityNotExist.VerifyCode.Empty": "验证码错误",
    "EntityNotExist.VerifyCode.Expired": "验证码错误",
  
  
    "EntityAlreadyExists.Mobile.Repeat": "手机号已存在",
    "InvalidParameter.Mobile.Format": "手机号格式错误",
    "InvalidParameter.VerifyCode.Invalid": "验证码错误",
  
  };
  
  export const getErrorMessage = (key?: string) => {
    let msg;
    const errorKey = key ? key.replace(/:\d+/, "") : "";
    if (errorKey && errorDirection.hasOwnProperty(errorKey)) {
      msg = errorDirection[errorKey];
    }
    if (msg !== undefined) {
      return msg;
    }
    return "未知错误码: " + key;
  };
  