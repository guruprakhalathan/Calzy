// example of link below (you would add this to content)
// <a href="http://www.forio.com" target="_blank">forio</a>
// replace "http://www.forio.com" to "link-of-the-site" and "forio" to "text-being-shown"

const tooltipContent = {
    'accounting-standard': {
        title: 'U.S. GAAP or IFRS?',
        content: 'The new lease accounting standards issued by the FASB and the IASB are very similar, however, there are a few key differences.  As a result, please identify whether the lessee reports under U.S. GAAP or IFRS. If unsure, generally speaking a company domiciled in the U.S. will report under U.S. GAAP, while companies domiciled outside of the U.S. will report under IFRS.  For more information, <a href="glossary.html" target="_blank">click here</a>',
    },
    'transfer-of-ownership': {
        title: 'Transfer of Ownership?',
        content: 'As it relates to real estate leases, the transfer of ownership at the end of a lease is not common.',
    },
    'option-to-purchase': {
        title: 'What Does “Reasonably Certain” Mean?',
        content: 'The FASB and IASB have provided guidance that "reasonably certain" is a high threshold to meet.',
    },
    'economic-life': {
        title: 'What is a “major part”?',
        content: 'In general, it would be uncommon for a real estate lease to be 75% or more (Existing U.S. GAAP) or a “major part” (Existing IFRS and New U.S. GAAP) of the remaining economic life of an asset.  For more information, <a href="glossary.html#major-part" target="_blank">click here</a>',
    },
    'pv-exceed-asset': {
        title: 'What is “substantially all”?',
        content: 'This is the test that most commonly triggers a real estate lease to be capitalized under existing lease accounting standards and can occur if the term of the lease is for an extended period of time. To determine whether the present value is equal to or greater than 90% (Existing U.S. GAAP) or “substantially all” (Existing IFRS and New U.S. GAAP) of the fair value of the property, you must calculate the present value of the minimum rent payments to be paid over the term of the lease using the company’s incremental borrowing rate.  For more information, <a href="glossary.html#substantially-all" target="_blank">click here</a>',
    },
    'specialized-nature': {
        title: 'Specialized Nature?',
        content: 'If the asset being leased is so specialized that it is expected to have no alternative use to the lessor after the lease term, please select "yes". As it related to real estate leases, specialized nature is rare.',
    },
    'alternative-use': {
        title: 'Alternative Use',
        content: '',
    },
    'fair-value-residual-accrue': {
        title: 'fair-value-residual-accrue',
        content: '',
    },
    'secondary-rent': {
        title: 'secondary-rent',
        content: '',
    },
    'lesse-cancel-borne': {
        title: 'lesse-cancel-borne',
        content: '',
    },
    'initial-lease-term': {
        title: 'Initial Lease Term',
        content: '<p>For purposes of determining the initial lease term, please take into account not only the stated primary term of the lease, but also include any periods of free rent/rent abatement “outside” of the primary lease term, as well as any period of early occupancy where the lessee “controls” the space (whether or not the space is occupied).  Any renewal and/or termination options will be addressed separately following this input.</p><p>As the lease calculator can only accommodate the input of the lease term in whole years, please round the number to the nearest whole year if the components above result in a fraction of a year.</p>',
    },
    'termination-option': {
        title: 'Termination Option',
        content: 'If there is a termination/break option available in the lease please select "yes".  This will prompt additional selections relating to the termination option.',
    },
    'reasonable-certainty': {
        title: 'Reasonable Certainty',
        content: 'If the termination/break option is “reasonably certain” of being exercised, please select "yes". The FASB and the IASB have both stated that "reasonably certain" is a high threshold to meet. For more information, <a href="glossary.html#term" target="_blank">click here</a>',
    },
    'when-option': {
        title: 'When Will The Option Be Exercised?',
        content: 'Please select the lease year in which the termination option is reasonably certain of being exercised. If the termination option is not at the end of a lease year, please round to the nearest year.',
    },
    'renewal': {
        title: 'Renewal Options',
        content: 'If there are any renewal options available in the lease please select "yes" here, which will prompt additional questions.',
    },
    'renew-option-switch': {
        title: 'What Does “Reasonably Certain” Mean?',
        content: 'The standard states a lessee should determine whether a renewal option is reasonably certain of being exercised after considering “…all relevant factors that create an economic incentive for the lessee.”  This is to take into account contract-based, asset-based, entity-based and market-based factors.  The FASB and IASB have provided further guidance in saying that “reasonably certain” is a high threshold to meet.',
    },
    'lease-type': {
        title: 'Lease Type',
        content: '',
    },
    'how-to-input-rent': {
        title: 'How would you like to input rent?',
        content: 'Please select whether you would like to enter rent as a total amount per year or by unit of measure (e.g. rent per square foot). Your selection here will determine how you enter your rent later in the section.',
    },
    'rent-amount': {
        title: 'Rent Amount',
        content: 'Input the initial year rent making any adjustments, if required, for operating expenses and/or real estate taxes and insurance.  See Reference Guide for details.',
    },
    'triple-net': {
        title: 'Triple Net',
        content: '',
    },
    'increases': {
        title: 'Are there any rent increases?',
        content: '<p>If applicable, please select whether rent increases occur annually by either: 1) a set percentage rate, 2) a fixed rate per square foot or square meter or 3) by a fixed rent amount.  If there are other types of rent increases, please choose “Customized Annual Input(s)”.  This option will require you to input each year’s rent separately for the term of the lease.</p>',
    },
    'custom': {
        title: 'Customized Annual Input(s)',
        content: 'Choosing this option will require you to manually input the rent for each year of the lease beginning in Year 2.',
    },
    'fixed': {
        title: 'Fixed',
        content: 'If selecting “Fixed annual increases” calculated as an “Annual percentage increase”, this will not accurately reflect cash rent in future years if operating expenses and/or real estate taxes/insurance have been carved out of the rent.  Accounting for this mathematical difference is beyond the scope of the Lease Calculator.',
    },
    'discount-borrowing-rate': {
        title: 'What is a lessee’s “incremental borrowing rate”?',
        content: 'The new lease accounting standards require the discount rate used in calculating the amount that goes on the balance sheet to be the interest rate that is implicit in the lease.  If that rate cannot be readily determined, which is the case in almost all real estate leases, the lessee is required to use its incremental borrowing rate. The incremental borrowing rate is defined as the rate of interest a company would have to pay to borrow funds on a collateralized basis over a term similar to the term of the lease in a similar economic environment.',
    },
    'rent-table': {
        title: 'Rent Table',
        content: '',
    },
    'name': {
        title: 'Name',
        content: 'Please enter a title for the lease analysis, which will appear as a heading above the summary output analysis.',
    },
    'by': {
        title: 'By',
        content: 'Please enter the name of the professional who has completed this analysis.',
    },
    'for': {
        title: 'For',
        content: 'Please enter the name of the client who this analysis has been completed for.',
    }
};

export default tooltipContent;
