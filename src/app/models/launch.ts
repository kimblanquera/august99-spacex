export interface Launch {
    flight_number: number,
    launch_date_local: Date,
    rocket: Rocket,
    launch_site: LaunchSite,
    launch_success: boolean,
    details: string
}

export interface Rocket {
    rocket_id: string,
    rocket_name: string,
    rocket_type: string,
}

export interface LaunchSite {
    site_id: string,
    site_name: string,
    site_name_long: string
}