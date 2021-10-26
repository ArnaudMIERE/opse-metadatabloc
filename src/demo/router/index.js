import Vue from 'vue'
import VueRouter from 'vue-router'

import myProjectFakeBlockTest from "@/demo/modules/myproject-fake-block-test/myproject-fake-block-test.vue";
import opseDatasetNameBlockTest from "@/demo/modules/opse-datasetname-block-test/opse-datasetname-block-test.vue";

Vue.use(VueRouter)

const routes = [
{
    path: "/myproject-fake-block",
    component: myProjectFakeBlockTest,
},
{
    path: "/opse-datasetname-block",
    component: opseDatasetNameBlockTest,
}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router