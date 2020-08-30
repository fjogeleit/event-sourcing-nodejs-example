import { Body, Controller, Post, HttpCode, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { FinanceManagementService } from './finance-management.service';
import { OpenAccount, PerformDeposit, PerformWithdraw, PerformTransfer, ChangeLineOfCredit } from './command-payload';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Account } from '../domain/view/account';

@Controller('finance-management')
export class FinanceManagementController {
  constructor(private readonly service: FinanceManagementService) {}

  @ApiTags('FinanceManaement Write')
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

  @ApiTags('FinanceManaement Write')
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

  @ApiTags('FinanceManaement Write')
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

  @ApiTags('FinanceManaement Write')
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

  @ApiTags('FinanceManaement Write')
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

  @ApiTags('FinanceManaement Read')
  @Get('accounts')
  @HttpCode(200)
  async listAll(): Promise<{ error: string } | Account[]> {
    try {
      return this.service.findAllAccounts();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('FinanceManaement Read')
  @Get('accounts/:account')
  @HttpCode(200)
  async get(@Param('account') owner: string): Promise<{ error: string } | Account> {
    try {
      return this.service.findAccountById(owner);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiTags('FinanceManaement Read')
  @Get('owners/:owner/accounts')
  @HttpCode(200)
  async listByOwner(@Param('owner') owner: string): Promise<{ error: string } | Account[]> {
    try {
      return this.service.findAccountsByOwner(owner);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
