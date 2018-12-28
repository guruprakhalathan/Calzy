const sum = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; ++i) {
        sum += arr[i];
    }
    return sum;
};

const cumsum = (arr) => {
    let cumsum = [arr[0]];
    for (let i = 1; i < arr.length; ++i) {
        cumsum[i] = cumsum[i - 1] + arr[i];
    }
    return cumsum;
};

const avg = (arr) => {
    return sum(arr) / arr.length;
};

const fill = (value, length) => {
    let arr = [];
    for (let i = 0; i < length; ++i) {
        arr.push(value);
    }
    return arr;
};

const add = (arr1, arr2) => {
    let arr = [];
    for (let i = 0; i < arr1.length; ++i) {
        arr[i] = arr1[i] + arr2[i];
    }
    return arr;
};

const sub = (arr1, arr2) => {
    let arr = [];
    for (let i = 0; i < arr1.length; ++i) {
        arr[i] = arr1[i] - arr2[i];
    }
    return arr;
};

const npv = function (discount, arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; ++i) {
        sum += arr[i] / Math.pow(1 + discount, i + 1);
    }
    return sum;
};

export const operatingOldLease = (annualCashRent, leaseTerm) => {
    // Operating lease, current standard
    let straightLineRentExpense = fill(avg(annualCashRent), leaseTerm);
    let deferredRent = sub(annualCashRent, straightLineRentExpense);
    let cumulativeDeferredRent = cumsum(deferredRent);
    return {
        straightLineRentExpense: straightLineRentExpense,
        deferredRent: deferredRent,
        cumulativeDeferredRent: cumulativeDeferredRent
    };
};

export const financeNewLease = (annualCashRent, leaseTerm, incrementalBorrowingRate) => {
    // Finance lease, new standard
    let presentValueOfRent = npv(incrementalBorrowingRate, annualCashRent);
    let leaseLiabilityOnBalanceSheet = presentValueOfRent;
    let initialRightOfUseAsset = presentValueOfRent;

    let interestExpense = [leaseLiabilityOnBalanceSheet * incrementalBorrowingRate];
    let eoyBalanceLeaseLiability = [leaseLiabilityOnBalanceSheet - (annualCashRent[0] - interestExpense[0])];
    for (let i = 1; i < leaseTerm; ++i) {
        interestExpense[i] = eoyBalanceLeaseLiability[i - 1] * incrementalBorrowingRate;
        eoyBalanceLeaseLiability[i] = eoyBalanceLeaseLiability[i - 1] - (annualCashRent[i] - interestExpense[i]);
    }

    let amortizationExpense = fill(initialRightOfUseAsset / leaseTerm, leaseTerm);
    let eoyBalanceRightOfUseAsset = [initialRightOfUseAsset - amortizationExpense[0]];
    for (let j = 1; j < leaseTerm; ++j) {
        eoyBalanceRightOfUseAsset[j] = eoyBalanceRightOfUseAsset[j - 1] - amortizationExpense[j];
    }

    let totalExpense = add(interestExpense, amortizationExpense);
    return {
        presentValueOfRent: presentValueOfRent,
        eoyBalanceRightOfUseAsset: eoyBalanceRightOfUseAsset,
        eoyBalanceLeaseLiability: eoyBalanceLeaseLiability,
        interestExpense: interestExpense,
        amortizationExpense: amortizationExpense,
        totalExpense: totalExpense
    };
};

export const operatingNewLease = (annualCashRent, leaseTerm, incrementalBorrowingRate) => {
    // Operating lease, new standard
    let straightLineRentExpense = fill(avg(annualCashRent), leaseTerm);
    let presentValueOfRent = npv(incrementalBorrowingRate, annualCashRent);
    let leaseLiabilityOnBalanceSheet = presentValueOfRent;
    let initialRightOfUseAsset = presentValueOfRent;
    let interestComponent = [leaseLiabilityOnBalanceSheet * incrementalBorrowingRate];
    let eoyBalanceLeaseLiability = [leaseLiabilityOnBalanceSheet - (annualCashRent[0] - interestComponent[0])];
    for (let i = 1; i < leaseTerm; ++i) {
        interestComponent[i] = eoyBalanceLeaseLiability[i - 1] * incrementalBorrowingRate;
        eoyBalanceLeaseLiability[i] = eoyBalanceLeaseLiability[i - 1] - (annualCashRent[i] - interestComponent[i]);
    }
    let rightOfUseAssetAmortization = sub(straightLineRentExpense, interestComponent);
    let eoyBalanceRightOfUseAsset = [initialRightOfUseAsset - rightOfUseAssetAmortization[0]];
    for (let j = 1; j < leaseTerm; ++j) {
        eoyBalanceRightOfUseAsset[j] = eoyBalanceRightOfUseAsset[j - 1] - rightOfUseAssetAmortization[j];
    }
    return {
        presentValueOfRent: presentValueOfRent,
        eoyBalanceRightOfUseAsset: eoyBalanceRightOfUseAsset,
        eoyBalanceLeaseLiability: eoyBalanceLeaseLiability,
        straightLineRentExpense: straightLineRentExpense
    };
};
