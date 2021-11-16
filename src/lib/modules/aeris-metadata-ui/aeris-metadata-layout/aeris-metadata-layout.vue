<template>
    <v-card
        :style="applyTheme"
        :outlined="!displayInFlat"
        :flat="displayInFlat"
    >
        <v-card-title v-if="showTitle">
            <v-icon large left>{{ icon }}</v-icon>
            <span>{{ title }}</span>
            <aeris-metadata-edit-button
                class="ml-2"
                v-if="canDisplayEditIcon"
                @edit="edit()"
            ></aeris-metadata-edit-button>
        </v-card-title>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<script>
import { applyPrimaryAndSecondaryColors } from "../../../utils";
import AerisMetadataEditButton from "../aeris-metadata-edit-buttons/aeris-metadata-edit-button/aeris-metadata-edit-button.vue";

export default {
    name: "aeris-metadata-layout",

    components: {
        AerisMetadataEditButton,
    },

    props: {
        title: {
            type: String,
        },
        icon: {
            type: String,
        },
        showTitle: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: Object,
            default: () => ({}),
        },
        canDisplayEditIcon: {
            type: Boolean,
            default: false,
        },
        displayInFlat: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        applyTheme() {
            return applyPrimaryAndSecondaryColors(this.theme);
        },
    },
    methods: {
        edit() {
            this.$emit("edit");
        },
    },
};
</script>

<style scoped>
.v-card .v-icon {
    color: var(--primaryColor);
}
</style>