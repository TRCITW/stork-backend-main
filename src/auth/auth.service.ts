import {Injectable} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {JwtService} from "@nestjs/jwt";
import {RpcException} from "@nestjs/microservices";
import {TokenDto} from "./dto/token.dto";
import {SuccessAuthDto} from "./dto/success-auth.dto";
import * as bcrypt from "bcryptjs";
import {RequestSmsCodeResponse} from "../proto-generated/auth";
import {UserTypes} from "../proto-generated/entity";

@Injectable()
export class AuthService {

    constructor(private readonly database: DatabaseService,
                private jwtService: JwtService) {
    }

    async requestSms(phone: string): Promise<RequestSmsCodeResponse> {
        // const code = Math.floor(Math.random() * (9999 - 1200) + 1200)
        const code = 4444
        const codeHash = await bcrypt.hash(code.toString(), 5)
        await this.database.confirmationSmsCodes.create({ data: { codeHash, phone }})
        const isClientUser = await this.database.clientsPhoneAuth.findFirst({
            where: {
                phone
            }
        })
        const isCourierUser = await this.database.couriersPhoneAuth.findFirst({
            where: {
                phone
            }
        })
        // todo: - should test
        return {
            isRegistered: (isClientUser || isCourierUser) != undefined,
            // as client has more priority
            userType: isClientUser ? UserTypes.CLIENT : isCourierUser ? UserTypes.COURIER : UserTypes.CLIENT
        }
    }

    async loginClient(phone: string, code: string, isRegistered?: boolean) {
        const smsCode = await this.database.confirmationSmsCodes.findFirst({
            where: {
                phone: phone
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        if (!smsCode) throw new  RpcException('smsCode is undefined')
        const isCorrectCode = await bcrypt.compare(`${code}`, smsCode.codeHash)
        if (!isCorrectCode) throw new  RpcException('code is incorrect')
        const client = await this.database.clients.findFirst({
            where: {
                phone: phone
            }
        })
        if (client) {
            await this.database.confirmationSmsCodes.deleteMany({
                where: {
                    phone: phone
                }
            })
            return this.generateToken(client.id)
        } else {
            const newClient = await this.database.clients.create({
                data: {
                    phone: phone,
                    clientsPhoneAuth: {
                        create: {
                            phone: phone
                        }
                    }
                }
            })
            await this.database.confirmationSmsCodes.deleteMany({
                where: {
                    phone: phone
                }
            })
            return this.generateToken(newClient.id)
        }
    }

    async loginCourier(phone: string, code: string) {
        const smsCode = await this.database.confirmationSmsCodes.findFirst({
            where: {
                phone: phone
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        if (!smsCode) throw new  RpcException('smsCode is undefined')
        const isCorrectCode = await bcrypt.compare(`${code}`, smsCode.codeHash)
        if (!isCorrectCode) throw new  RpcException('code is incorrect')
        const courier = await this.database.couriers.findFirst({
            where: {
                phone: phone
            }
        })
        if (!courier) throw new  RpcException('courier is undefined')
        await this.database.confirmationSmsCodes.deleteMany({
            where: {
                phone: phone
            }
        })
        return this.generateToken(courier.id)
    }

    async logoutClient(userId: number) {
        await this.database.authSessions.updateMany({
            where: {
                clientId: userId
            },
            data: {
                isActive: false
            }
        })
    }

    async logoutCourier(userId: number) {
        await this.database.authSessions.updateMany({
            where: {
                courierId: userId
            },
            data: {
                isActive: false
            }
        })
    }

    private generateToken(id: number): SuccessAuthDto {
        const payload: TokenDto = { id }
        const token = this.jwtService.sign(payload)
        return {
            accessToken: token,
            refreshToken: ''
        }
    }

}
