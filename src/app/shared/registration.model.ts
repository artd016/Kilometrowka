export class Registration {
    $key: string;
    reg_date: string;
    purpose: string;
    fromWhere: string;
    toWhere: string;
    initial_odometer: number;
    final_odometer: number;
}

export class Vehicle {
    $key: string;
    brand: string;
    model: string;
    ratePerKm: number;
}

export class Setting {
    //$key: string;
    ratesPerKm: number[]
}