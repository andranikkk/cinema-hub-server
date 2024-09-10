import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { PaymentService } from './payment.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { PaymentDto } from './dto/pyament.dto'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { PaymentStatusDto } from './dto/payment-status.dto'

@Controller('payments')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	checkout(@Body() dto: PaymentDto, @CurrentUser('id') userId: string) {
		return this.paymentService.checkout(dto, userId)
	}

	@HttpCode(200)
	@Post('status')
	async updateStatus(@Body() dto: PaymentStatusDto) {
		return this.paymentService.updateStatus(dto)
	}

	/** For Admin */

	@Get()
	@Auth('admin')
	async getAll() {
		return this.paymentService.getAll()
	}

	@Delete(':id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		const deletedReview = await this.paymentService.delete(id)

		if (!deletedReview) throw new NotFoundException('Payment not found')

		return deletedReview
	}
}
