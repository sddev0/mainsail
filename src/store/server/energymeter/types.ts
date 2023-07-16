export interface MachineEnergyState {
    [name: string]: any
}

export interface MachineEnergyStateMeter {
    name: string
    power: number
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'custom'
    icon?: string
    consumption: MachineEnergyConsumption
}

export interface MachineEnergyConsumption {
    total: number
    current_job: number
}