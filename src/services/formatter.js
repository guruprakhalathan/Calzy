export const commaFormat = (x) => {
    if (x) {
        return !isNaN(x) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x;
    }
    return 0;
};

export const moneyFormat = (options, x) => {
    if (options.decimal) {
        x = x.toFixed ? x.toFixed(2) : x;
    } else {
        x = x.toFixed ? x.toFixed(0) : x;
    }
    return options.currency + commaFormat(x);
};

export const stripNonNumeric = (x) => {
    if (x) {
        return x.toString().replace(/\D/g, '');
    }
};

export const formatDecimalNumber = (x) => {
    if (x) {
        let nonNumericWithDots = x.toString().replace(/[^0-9.]/g, '');
        let split = nonNumericWithDots.split('.');
        if (split.length > 1) {
            split[1] = split[1].substring(0, 2);
            return split[0] + '.' + split[1];
        } else {
            return split[0];
        }
    }
};

export const formatMoney = (x, isInt = false) => {
    if (x) {
        let nonNumeric = x.toString().replace(/[^0-9]/g, '');
        if (!isInt) {
            const decimalLocation = x.indexOf('.');
            if (decimalLocation !== -1 && (decimalLocation !== (x.length - 1))) {
                if (((x.length - 1) - decimalLocation) === 1) {
                    nonNumeric += '0';
                }
                return Number(nonNumeric) / 100;
            } else {
                return Number(nonNumeric);
            }
        } else {
            return nonNumeric;
        }
    }
};

export const getCurrency = (currency) => {
    let arr = currency.split('(');
    let curr = arr[1].split(')');
    return curr[0];
};

export const getCurrencyAbbr = (currency) => {
    let arr = currency.split('-');
    return arr[0].trim();
};
