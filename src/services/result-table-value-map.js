function tableValueMap(key) {
    return {
        years: 'Year',
        annualRent: 'Annual Rent',
        straightLineRentExpense: 'Annual Straight-Line Rent Expense',
        deferredRent: 'Deferred Rent',
        cumulativeDeferredRent: 'Cumulative Deferred Rent Balance',
        eoyBalanceRightOfUseAsset: 'End-of-Year Balance Right-of-Use Asset',
        eoyBalanceLeaseLiability: 'End-of-Year Balance Lease Liability',
        interestExpense: 'Interest Expense',
        amortizationExpense: 'Amortization Expense',
        totalExpense: 'Total P&L Expense',
        interestComponent: 'Interest Component',
        rightOfUseAssetAmortization: 'Right-of-Use Asset Amortization',
        presentValueOfRent: 'Initial Balance Sheet Impact'
    }[key];
}

export default tableValueMap;
