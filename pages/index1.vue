<template>
    <div>
        <!-- Image and text -->

        <div>
            <b-navbar type="dark" variant="dark">
                <b-navbar-brand href="#">
                    XNacy
                </b-navbar-brand>
                <b-navbar-nav small>
                    <b-nav-item href="#">Home</b-nav-item>

                    <!-- Navbar dropdowns -->
                    <b-nav-item-dropdown text="File" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Edit" right>
                        <b-dropdown-item href="#">Account</b-dropdown-item>
                        <b-dropdown-item href="#">Settings</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="Setting" right>
                        <b-dropdown-item href="#">Account</b-dropdown-item>
                        <b-dropdown-item href="#">Settings</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown text="About" right>
                        <b-dropdown-item href="#">Account</b-dropdown-item>
                        <b-dropdown-item href="#">Settings</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <div>
            <b-row>
                <b-col cols="4">
                    <div style="min-height:65vh;">
                        <b-row>
                            <b-col cols="12">
                                <b-card class="h-100" no-body>
                                    <b-tabs small card end>
                                        <b-tab title="Tab 1" active>

                                            <div style="min-height: 50vh;">

                                            </div>
                                        </b-tab>
                                        <b-tab title="Tab 2">
                                            <div style="min-height: 50vh;">

                                            </div>
                                        </b-tab>
                                    </b-tabs>
                                </b-card>
                            </b-col>

                        </b-row>

                    </div>
                    <div style="">
                        <b-card class="h-100" no-body>
                            <b-tabs small card end>
                                <b-tab title="Tab 1" active>

                                    <div style="min-height: 20vh;">
                                        dasd
                                    </div>
                                </b-tab>
                                <b-tab title="Tab 2">
                                    <div style="min-height: 20vh;">
                                        1213
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </b-col>
                <b-col cols="8">
                    <b-row>
                        <b-col>
                            <b-embed type="iframe" src="tv"></b-embed>

                        </b-col>
                        <b-col>

                        </b-col>
                        <div class="w-100"></div>
                    </b-row>
                </b-col>

            </b-row>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>