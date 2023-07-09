import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {JwtService} from "@nestjs/jwt";
import {RpcException} from "@nestjs/microservices";
import {TokenDto} from "./dto/token.dto";
import {SuccessAuthDto} from "./dto/success-auth.dto";
import * as bcrypt from "bcryptjs";
import {RequestSmsCodeResponse} from "../proto-generated/auth";

@Injectable()
export class AuthService {

    constructor(private readonly database: DatabaseService,
                private jwtService: JwtService) {
    }


    async requestSms(phone: string): Promise<RequestSmsCodeResponse> {
        const code = Math.floor(Math.random() * (9999 - 1200) + 1200)
        const codeHash = await bcrypt.hash(code.toString(), 5)
        await this.database.confirmationSmsCodes.create({ data: { codeHash, phone }})
        const isUser = await this.database.clientsPhoneAuth.findFirst({
            where: {
                phone
            }
        })

        console.log(isUser)
        return {
            isRegistered: isUser != undefined
        }
    }

    private generateToken(id: number): SuccessAuthDto {
        const payload: TokenDto = { id }
        const token = this.jwtService.sign(payload)
        return { token }
    }

}
