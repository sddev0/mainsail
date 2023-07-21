export interface MachineEnergyState {
    [name: string]: any
}

export interface MachineEnergyStateMeter {
    name: string
    power: number
    color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'custom'
    icon?: string
    total_consumption: number
    current_job_consumption?: number
}