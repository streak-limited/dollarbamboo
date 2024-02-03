type User = {
    // phone: string;
    // bank_name?: string;
    // bank_account_number?: string;
    // bank_account_name?: string;
    // approved_organizer: boolean;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    dob: Date;
    last_login_at: date;
    user_addresses?: UserAddresses[];
    country_code: string;
    phone_number: string;
    avatar_url?: string;
    // first_name: string;
    // last_name: string;
    // username: string;
    // email: string;
    // password?: string;
    // type: string;
    // shipping_area: string;
    // shipping_district: string;
    // shipping_address: string;
    // last_login_at?: Date | string;
    // salesman_id?: number;
    // nickname?: string;
    // client_no?: string;
    // address_id?: string;
    // user_addresses?: UserAddress[];
    // balance?: float;

    // amountSpent?: number;

    // status?: string;

    // lastConsumption?: Date | string;
} & BaseModel;

type SignInDto = {
    ref?: string;
    email: string;
    password: string;
};

type SignUpData = {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    ref?: string;
    confirm_password: string;
    gender?: string;
    dob?: Date;
};

type UserAddress = {
    territories: string;
    district: string;
    street: string;
    building: string;
    floor: string;
    unit: string;
    user_id: string;
    name: string;
    phone: string;
    is_default: boolean;
} & BaseModel;

type SelfPickAddress = {
    territories: string;
    district: string;
    street: string;
    building: string;
    floor: string;
    unit: string;
    user_id: string;
    name: string;
} & BaseModel;

type UserPaymentMethod = {
    user_id: string;
    number: string;
    type: "visa" | "master";
    expiry: string;
    cvc: string;
    name: string;
    is_default: boolean;
} & BaseModel;
