export class Registration {
    $key: string;
    date: Date;
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
    stateCosts: number;
}
