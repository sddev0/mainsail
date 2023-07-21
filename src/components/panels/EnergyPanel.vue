<template>
    <panel
        v-if="klipperReadyForGui"
        :icon="mdiLightningBolt"
        :title="$t('Panels.EnergyPanel.Headline')"
        :collapsible="true"
        card-class="energy-panel">
        <v-card-text class="py-0">
            <electric-power-bar-chart :meters="meters" :max="400"></electric-power-bar-chart>
        </v-card-text>
        <v-card-text class="pa-0">
            <v-simple-table class="energy-panel-table">
                <thead>
                    <tr>
                        <th class="icon">&nbsp;</th>
                        <th class="name">Name</th>
                        <th class="power">Power</th>
                        <th class="total">Total</th>
                        <th v-if="activeJob" class="job">Job</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meter in meters" :key="meter.name">
                        <td class="icon">
                            <v-icon :color="meter.color">
                                {{ meter.icon }}
                            </v-icon>
                        </td>
                        <td class="name px-2">{{ capitalize(meter.name) }}</td>
                        <td class="power px-2">{{ formatPower(meter.power) }}</td>
                        <td class="total" :class="activeJob ? 'px-2' : 'pl-2'">{{ formatEnergy(meter.total_consumption) }}</td>
                        <td v-if="activeJob" class="job pl-2">{{ formatEnergy(meter.current_job_consumption) }}</td>
                    </tr>
                    <tr v-if="hasMoreThanOneMeter">
                        <td class="icon">&nbsp;</td>
                        <td class="name px-2">Total</td>
                        <td class="power px-2">{{ formatPower(totalMeter.power) }}</td>
                        <td class="total" :class="activeJob ? 'px-2' : 'pl-2'">{{ formatEnergy(totalMeter.total_consumption) }}</td>                        
                        <td v-if="activeJob" class="job pl-2">{{ formatEnergy(totalMeter.current_job_consumption) }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
    </panel>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '../mixins/base'
import Panel from '@/components/ui/Panel.vue'
import { mdiLightningBolt } from '@mdi/js'
import ElectricPowerBarChart from '@/components/charts/ElectricPowerBarChart.vue'
import { MachineEnergyStateMeter } from '@/store/server/energymeter/types'
import { capitalize } from '@/plugins/helpers'

@Component({
    components: { Panel, ElectricPowerBarChart },
})
export default class EnergyPanel extends Mixins(BaseMixin) {
    mdiLightningBolt = mdiLightningBolt

    capitalize = capitalize

    get totalMeter(): MachineEnergyStateMeter {
        return this.$store.getters['server/energymeter/getTotalMeter']
    }

    get meters(): MachineEnergyStateMeter[] {
        return this.$store.getters['server/energymeter/getMeters']
    }

    get activeJob(): boolean {
        return !['standby'].includes(this.printer_state)
    }

    get hasMoreThanOneMeter(): boolean {
        return this.meters.length > 1
    }

    formatPower(watt: number) {
        if(watt >= 1000) return (watt / 1000).toFixed(2) + ' kW'

        return watt.toFixed(1) + ' W'
    }

    formatEnergy(wattHours?: number) {
        if(wattHours === undefined) return ''

        if(wattHours >= 1000) return (wattHours / 1000).toFixed(2) + ' kWh'

        return Math.round(wattHours) + ' Wh'
    }
}
</script>

<style scoped>

.energy-panel-table th,
.energy-panel-table td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    height: auto !important;
}
.energy-panel-table tr:hover {
    background: none !important;
}

.energy-panel-table .icon {
    width: 24px;
    padding-right: 0 !important;
    text-align: center;
}

.energy-panel-table .power {
    width: 80px;
    text-align: right !important;
}

.energy-panel-table .total {
    width: 100px;
    text-align: right !important;
}

.energy-panel-table .job {
    width: 100px;
    text-align: right !important;
}

</style>