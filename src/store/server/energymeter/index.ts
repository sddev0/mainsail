import { Module } from "vuex"
import { MachineEnergyState } from '@/store/server/energymeter/types'
import { getters } from '@/store/server/energymeter/getter'
import { actions } from '@/store/server/energymeter/actions'
import { mutations } from '@/store/server/energymeter/mutations'

export const getDefaultState = (): MachineEnergyState => {
    return {
        meters: []
    }
}

const state = getDefaultState()

export const energymeter: Module<MachineEnergyState, any> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}