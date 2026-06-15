export interface IRegisterDto {
	email: string
	password: string
	fullName?: string
}
export interface ILoginDTO{
	email: string
	password: string
}
export interface IResetPasswordDTO{
	token: string
	newPassword: string
}
export interface IChangePasswordDTO{
	oldPassword: string
	newPassword: string
}
export interface IJwtPayload {
	sub: string
	email: string
	role: string
}

export interface ITokenPair{
	accessToken: string
	refreshToken: string
}