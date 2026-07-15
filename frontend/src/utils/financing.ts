import type { AmortizationSystem } from '@/types'

export interface FinancingParams {
  propertyValue: number
  downPayment: number
  annualRate: number
  termMonths: number
  system: AmortizationSystem
}

export interface FinancingResult {
  financedAmount: number
  monthlyRate: number
  firstInstallment: number
  lastInstallment: number
  totalPaid: number
  totalInterest: number
}

export function calculateFinancing(params: FinancingParams): FinancingResult {
  const { propertyValue, downPayment, annualRate, termMonths, system } = params
  const financedAmount = Math.max(propertyValue - downPayment, 0)
  const monthlyRate = (1 + annualRate / 100) ** (1 / 12) - 1

  if (financedAmount === 0 || termMonths <= 0) {
    return { financedAmount: 0, monthlyRate, firstInstallment: 0, lastInstallment: 0, totalPaid: 0, totalInterest: 0 }
  }

  if (system === 'sac') {
    const amortization = financedAmount / termMonths
    const firstInstallment = amortization + financedAmount * monthlyRate
    const lastInstallment = amortization + amortization * monthlyRate
    const totalPaid = (termMonths * amortization) + monthlyRate * (financedAmount * (termMonths + 1)) / 2
    return {
      financedAmount,
      monthlyRate,
      firstInstallment,
      lastInstallment,
      totalPaid,
      totalInterest: totalPaid - financedAmount,
    }
  }

  const installment =
    monthlyRate === 0
      ? financedAmount / termMonths
      : (financedAmount * monthlyRate) / (1 - (1 + monthlyRate) ** -termMonths)
  const totalPaid = installment * termMonths
  return {
    financedAmount,
    monthlyRate,
    firstInstallment: installment,
    lastInstallment: installment,
    totalPaid,
    totalInterest: totalPaid - financedAmount,
  }
}
