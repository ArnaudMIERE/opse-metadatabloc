import Vue from 'vue'
import VueRouter from 'vue-router'

import myProjectFakeBlockTest from "@/demo/modules/myproject-fake-block-test/myproject-fake-block-test.vue";
import opseDatasetNameBlockTest from "@/demo/modules/opse-datasetname-block-test/opse-datasetname-block-test.vue";
import opseDownloadBlockTest from "@/demo/modules/opse-download-block-test/opse-download-block-test.vue";
import opseYearBasedDownloadBlockTest from "@/demo/modules/opse-year-based-download-block-test/opse-year-based-download-block-test.vue";
import opseDataNetcdfBlockTest from "@/demo/modules/opse-data-netcdf-block-test/opse-data-netcdf-block-test.vue";
import opseImagesDisplayedBlockTest from "@/demo/modules/opse-images-displayed-block-test/opse-images-displayed-block-test.vue";

import opseThumbnailsDisplayedBlockTest from "@/demo/modules/opse-thumbnails-displayed-block-test/opse-thumbnails-displayed-block-test.vue";
import opseVisualisationBlockTest from "@/demo/modules/opse-visualisation-block-test/opse-visualisation-block-test.vue";
import opseGaleryImagesDisplayedBlock from "@/demo/modules/opse-galery-images-displayed-block-test/opse-galery-images-displayed-block-test.vue";

Vue.use(VueRouter)

const routes = [
{
    path: "/myproject-fake-block",
    component: myProjectFakeBlockTest,
},
{
    path: "/opse-galery-images-displayed-block",
    component: opseGaleryImagesDisplayedBlock,
},
{
    path: "/opse-datasetname-block",
    component: opseDatasetNameBlockTest,
},
{
    path: "/opse-visualisation-block",
    component: opseVisualisationBlockTest,
},
{
    path:"/opse-download-block",
    component: opseDownloadBlockTest,
},
{
    path:"/opse-year-based-download-block",
    component: opseYearBasedDownloadBlockTest,
},

{
    path:"/opse-data-netcdf-block",
    component: opseDataNetcdfBlockTest,
},

{
    path:"/opse-thumbnails-displayed-block",
    component: opseThumbnailsDisplayedBlockTest,
},

{
    path:"/opse-images-displayed-block",
    component: opseImagesDisplayedBlockTest,
}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router