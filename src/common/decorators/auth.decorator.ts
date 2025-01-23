import { applyDecorators, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../../UserBionic/jwt-auth.guards"

export function Auth() {
    return applyDecorators(
        UseGuards(
            JwtAuthGuard
        )
    )
}