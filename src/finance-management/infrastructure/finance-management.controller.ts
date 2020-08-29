import { Body, Controller, Post, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { FinanceManagementService } from './finance-management.service';
import { OpenAccount, PerformDeposit, PerformWithdraw, PerformTransfer, ChangeLineOfCredit } from './command-payload';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('finance-management')
export class FinanceManagementController {
  constructor(private readonly service: FinanceManagementService) {}

  @ApiTags('FinanceManaement')
  @ApiBody({ type: OpenAccount })
  @Post('open-account')
  @HttpCode(204)
  async openAccount(
    @Body() payload: OpenAccount,
  ): Promise<{ error: string } | void> {
    try {
      await this.service.openAccount(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }

  @ApiTags('FinanceManaement')
  @ApiBody({ type: PerformDeposit })
  @Post('deposit')
  @HttpCode(204)
  async deposit(
    @Body() payload: PerformDeposit,
  ): Promise<{ error: string } | void> {
    try {
      await this.service.performDeposit(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }

  @ApiTags('FinanceManaement')
  @ApiBody({ type: PerformWithdraw })
  @Post('withdraw')
  @HttpCode(204)
  async withdraw(
    @Body() payload: PerformWithdraw,
  ): Promise<{ error: string } | void> {
    try {
      await this.service.performWithdraw(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }

  @ApiTags('FinanceManaement')
  @ApiBody({ type: PerformTransfer })
  @Post('transfer')
  @HttpCode(204)
  async transfer(
    @Body() payload: PerformTransfer,
  ): Promise<{ error: string } | void> {
    try {
      await this.service.performTransfer(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }

  @ApiTags('FinanceManaement')
  @ApiBody({ type: ChangeLineOfCredit })
  @Post('change-line-of-credit')
  @HttpCode(204)
  async changeLineOfCredit(
    @Body() payload: ChangeLineOfCredit,
  ): Promise<{ error: string } | void> {
    try {
      await this.service.changeLineOfCredit(payload);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }
}
