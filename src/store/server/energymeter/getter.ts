import { GetterTree } from 'vuex'
import { MachineEnergyState, MachineEnergyStateMeter } from '@/store/server/energymeter/types'
import { mdiHelp, mdiPrinter3dNozzleHeat, mdiRaspberryPi } from '@mdi/js'

// eslint-disable-next-line
export const getters: GetterTree<MachineEnergyState, any> = {
    getMeterKeys: (state) => {
        return Object.keys(state.meters)
    },

    getMeters: (state, getters) => {
        const colors: any = {'printer': 'error', 'pi': 'success'}
        const icons: any = {'printer': mdiPrinter3dNozzleHeat , 'pi': mdiRaspberryPi}
        const objects: MachineEnergyStateMeter[] = []
        const keys = getters['getMeterKeys']
        keys.forEach((key: string) => {
            const values = {...state.meters[key]}
            objects.push({
                name: key,
                color: colors[key] ?? 'warning',
                icon: icons[key] ?? mdiHelp,
                power: values.power ?? 0,
                consumption: {
                    total: values.consumption?.total ?? 0,
                    current_job: values.consumption?.current_job ?? 0
                }
            })
        })

        return objects
    },

    getTotalMeter: (_, getters) => {
        const meters = getters['getMeters']
        const object: MachineEnergyStateMeter = {
            name: 'total',
            power: 0,
            color: 'custom',
            icon: undefined,
            consumption: {
                total: 0,
                current_job: 0
            }
        }
        meters.forEach((meter: MachineEnergyStateMeter) => {
            object.power += meter.power
            object.consumption.total += meter.consumption.total
            object.consumption.current_job += meter.consumption.current_job
        })

        return object
    },

    getTotalPower: (_, getters) => {
        const meters = getters['getMeters']
        let output = 0
        meters.forEach((meter: MachineEnergyStateMeter) => {
            output += meter.power
        })

        return output
    }
}
