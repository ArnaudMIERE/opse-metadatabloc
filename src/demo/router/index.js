import Vue from 'vue'
import VueRouter from 'vue-router'

import myProjectFakeBlockTest from "@/demo/modules/myproject-fake-block-test/myproject-fake-block-test.vue";
import opseDatasetNameBlockTest from "@/demo/modules/opse-datasetname-block-test/opse-datasetname-block-test.vue";
import opseDownloadBlockTest from "@/demo/modules/opse-download-block-test/opse-download-block-test.vue";
import opseYearBasedDownloadBlockTest from "@/demo/modules/opse-year-based-download-block-test/opse-year-based-download-block-test.vue";

Vue.use(VueRouter)

const routes = [
{
    path: "/myproject-fake-block",
    component: myProjectFakeBlockTest,
},
{
    path: "/opse-datasetname-block",
    component: opseDatasetNameBlockTest,
},
{
    path:"/opse-download-block",
    component: opseDownloadBlockTest,
},
{
    path:"/opse-year-based-download-block",
    component: opseYearBasedDownloadBlockTest,
}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router