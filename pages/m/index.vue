<template>
    <b-row>
        <b-col cols="12">
            <div style="background-color:black !important">
                <b-card no-body>
                    <b-tabs card justified fill align="center">
                        <b-tab title="danhsachtheodoi" active>
                            <template #title>
                                ⭐
                            </template>
                            <b-container>

                            </b-container>
                        </b-tab>
                        <b-tab title=" 📊">
                            <b-row>
                                <b-col style="background-color: black;" ref="tdvCol" :key="eh" cols="12">
                                    <tvchart :width="ew" :height="eh" ref="tvchart" :key="currentSymbol"
                                        :symbol="currentSymbol"></tvchart>
                                </b-col>
                            </b-row>

                        </b-tab>

                        <b-tab title="chart">
                            <template #title>
                                🧩
                            </template>
                            <b-container>

                            </b-container>
                        </b-tab>
                        <b-tab title="chart">
                            <template #title>
                                🥺
                            </template>
                            <b-container>

                            </b-container>
                        </b-tab>
                        <b-tab title=" ⚙️">
                            <div class="tab_containt">
                                <m-config />

                            </div>

                        </b-tab>

                    </b-tabs>
                </b-card>
            </div>
        </b-col>
    </b-row>

</template>

<script>
import m_config from '../../components/m_config.vue'
export default {
    components: { m_config },
    data() {
        return {
            eh: "10px",
            ew: "10px",
            currentSymbol: 'BTCUSDT'
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.eh = (window.innerHeight || 500) + "px";
            this.ew = (window.innerWidth || 500) - 10 + "px"
        });
    }

}
</script>

<style scope>
html,
body {
    background-color: black Im !important;
}
</style>