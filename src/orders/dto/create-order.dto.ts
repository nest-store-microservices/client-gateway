import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, Min } from "class-validator"
import { OrderStatus, OrderStatusList } from "../enum/order-enum"



export class CreateOrderDto {

    
    @Min(1)
    @IsPositive()
    total:number

    @IsNumber()
    @IsPositive()
    items:number

    @IsEnum(OrderStatusList,{
        message: `Status must be one of the following`
    })
    @IsOptional()
    status: OrderStatus

    @IsBoolean()
    @IsOptional()
    paid: boolean
    
}
