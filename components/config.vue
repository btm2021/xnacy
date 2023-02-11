<template>
    <b-row>

        <b-col cols="6">
            <b-overlay :show="overlayServerScan">
                <h4 class="text-center">Server Quét Sàn <a target="_blank"
                        href="https://web.deta.sh/home/baotm/default/bases/listServerScan">➕</a>
                </h4>
                <b-table small bordered responsive class="text-center" :fields="serverScanFields"
                    :items="listServerScan" show-empty>
                </b-table>
            </b-overlay>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            //server quét
            overlayServerScan: true,
            listServerScan: [

            ],

            serverScanFields: [
                { key: 'name', label: 'Tên' },
                { key: 'timeframe', label: 'Timeframe' },
                { key: 'timeout', label: 'TimeOut' },
                { key: 'link', label: 'Link' },

            ]
        }
    },
    methods: {
        //server quét.
        getServerScan() {
            let url = `https://database.deta.sh/v1/c06pa3r8/listServerScan/query`
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': 'c06pa3r8_6XB282uQdaB74eHiFq6QMK4uMjfEGc8M'
                }
            }).then(data => data.json()).then(data => {

                this.listServerScan = data.items;
                this.overlayServerScan = false
            })
        },

    },
    mounted() {
        this.getServerScan();
    }
}
</script>

<style>

</style>