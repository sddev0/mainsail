import { GetterTree } from 'vuex'
import { MachineEnergyState, MachineEnergyStateMeter } from '@/store/server/energymeter/types'
import { mdiHelp, mdiPrinter3dNozzleHeat, mdiRaspberryPi } from '@mdi/js'

// eslint-disable-next-line
export const getters: GetterTree<MachineEnergyState, any> = {
    getJobRelatedMeterKeys: (state) => {
        return Object.keys(state.meters).filter(name => state.meters[name].is_job_related)
    },

    getGlobalMeterKeys: (state) => {
        return Object.keys(state.meters).filter(name => !state.meters[name].is_job_related)
    },

    getMeters: (state, getters) => {
        const objects: MachineEnergyStateMeter[] = []
        const jobRelatedMeters: MachineEnergyStateMeter[] = getters['getJobRelatedMeters']
        objects.push(...jobRelatedMeters)
        const globalMeters: MachineEnergyStateMeter[] = getters['getGlobalMeters']
        objects.push(...globalMeters)

        return objects
    },

    getJobRelatedMeters: (state, getters) => {
        const colors: any = {'printer': 'error', 'pi': 'success'}
        const icons: any = {'printer': mdiPrinter3dNozzleHeat , 'pi': mdiRaspberryPi}
        const objects: MachineEnergyStateMeter[] = []
        const keys: string[] = getters['getJobRelatedMeterKeys']
        keys.forEach(key => {
            const values = {...state.meters[key]}
            objects.push({
                name: key,
                color: colors[key] ?? 'warning',
                icon: icons[key] ?? mdiHelp,
                power: values.power ?? 0,
                total_consumption: values.consumption?.total ?? 0,
                current_job_consumption: values.consumption?.current_job ?? 0
            })
        })

        return objects
    },

    getGlobalMeters: (state, getters) => {
        const colors: any = {'printer': 'error', 'pi': 'success'}
        const icons: any = {'printer': mdiPrinter3dNozzleHeat , 'pi': mdiRaspberryPi}
        const objects: MachineEnergyStateMeter[] = []
        const keys: string[] = getters['getGlobalMeterKeys']
        keys.forEach(key => {
            const values = {...state.meters[key]}
            objects.push({
                name: key,
                color: colors[key] ?? 'warning',
                icon: icons[key] ?? mdiHelp,
                power: values.power ?? 0,
                total_consumption: values.consumption?.total ?? 0
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
            total_consumption: 0,
            current_job_consumption: 0
        }
        meters.forEach((meter: MachineEnergyStateMeter) => {
            object.power += meter.power
            object.total_consumption += meter.total_consumption
            if (object.current_job_consumption) {
                object.current_job_consumption += meter.current_job_consumption ?? 0
            }
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
