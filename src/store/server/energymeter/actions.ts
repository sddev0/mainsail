import Vue from 'vue'
import { ActionTree } from 'vuex'
import { MachineEnergyState } from '@/store/server/energymeter/types'
import { RootState } from '@/store/types'

export const actions: ActionTree<MachineEnergyState, RootState> = {
    reset({ commit }) {
        commit('reset')
    },

    init() {
        Vue.$socket.emit('machine.energy', {}, { action: 'server/energymeter/getData' })
    },

    async getData({ commit, dispatch }, payload) {
        if ('requestParams' in payload) delete payload.requestParams
        commit('setData', payload)

        await dispatch('socket/removeInitModule', 'server/energymeter/init', { root: true })
    },
}
