import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsIBAN, IsBIC, IsNotEmpty, IsNumber, Min } from 'class-validator';

export interface IOpenAccount {
  accountId: string;
  iban: string;
  bic: string;
  ownerId: string;
}

export class OpenAccount implements IOpenAccount {
  @ApiProperty()
  @IsUUID()
  public accountId: string;

  @ApiProperty()
  @IsIBAN()
  public iban: string;

  @ApiProperty()
  @IsBIC()
  public bic: string;

  @ApiProperty()
  @IsUUID()
  public ownerId: string;
}

export interface IPerformDeposit {
  accountId: string;
  amount: number;
  reference: string;
}

export class PerformDeposit implements IPerformDeposit {
  @ApiProperty()
  @IsUUID()
  public accountId: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  public amount: number;

  @ApiProperty()
  @IsNotEmpty()
  public reference: string;
}

export interface IPerformWithdraw {
  accountId: string;
  amount: number;
  reference: string;
}

export class PerformWithdraw implements IPerformWithdraw {
  @ApiProperty()
  @IsUUID()
  public accountId: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  public amount: number;

  @ApiProperty()
  @IsNotEmpty()
  public reference: string;
}

export interface IPerformTransfer {
  accountId: string;
  targetAccount: string;
  amount: number;
}

export class PerformTransfer implements IPerformTransfer {
  @ApiProperty()
  @IsUUID()
  public accountId: string;

  @ApiProperty()
  @IsNotEmpty()
  public targetAccount: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  public amount: number;
}

export interface IChangeLineOfCredit {
  accountId: string;
  lineOfCredit: number;
}

export class ChangeLineOfCredit implements IChangeLineOfCredit {
  @ApiProperty()
  @IsUUID()
  public accountId: string;

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  public lineOfCredit: number;
}
