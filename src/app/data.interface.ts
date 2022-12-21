export interface CovidStatistics {
    continent: string,
    country: string,
    population: number,
    day: string,
    time: string,
    cases: CovidCases,
    deaths: CovidDeaths,
    tests: CovidTests
}

export interface CovidCases {
    new:string,
    active:number,
    critical:number,
    recovered:number,
    '1M_pop':string,
    total:number
}

export interface CovidDeaths{
    new:number,
    '1M_pop':string,
    total:number
}

export interface CovidTests{
    '1M_pop':string,
    total:number
}