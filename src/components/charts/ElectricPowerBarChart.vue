<template>
    <v-sheet
        width="100%"
        :height="'20px'"
        color="secondary"
        class="d-flex overflow-hidden my-4 rounded bar-container">
        <v-sheet
            v-for="meter in meters"
            :key="meter.name"
            :color="`${meter.color}`"
            :width="`${(meter.power) / max * 100}%`"
            height="100%"
            class="bar"/>
    </v-sheet>
</template>

<script lang="ts">

import Component from 'vue-class-component';
import { Mixins, Prop } from 'vue-property-decorator';
import BaseMixin from '@/components/mixins/base';
import { MachineEnergyStateMeter } from '@/store/server/energymeter/types';

@Component({
    components: {},
})
export default class ElectricPowerBarChart extends Mixins(BaseMixin) {
    @Prop({ required: true })
    declare readonly meters: MachineEnergyStateMeter[]

    get totalPower(): number {
        let sum = 0
        this.meters.forEach((m) => sum += m.power)
        return sum
    }

    @Prop({ default: 500})
    declare readonly max: number
}

</script>

<style scoped>

.bar {
    transition: width 2s;
}

.bar-container :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.bar-container :last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

</style>