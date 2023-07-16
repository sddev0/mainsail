import Vue from 'vue'
import { getDefaultState } from './index'
import { MutationTree } from 'vuex'
import { MachineEnergyState } from '@/store/server/energymeter/types'

export const mutations: MutationTree<MachineEnergyState> = {
    reset(state) {
        Object.assign(state, getDefaultState())
    },

    setData(state, payload) {
        Object.keys(payload).forEach((key) => {
            Vue.set(state.meters, key, payload[key])
        })
    },

    setMeter(state, payload) {
        if ('meter' in payload) {
            const key = payload.meter
            Vue.set(state.meters, key, payload)
        }
    }
}
