<i18n  >
{
  "en": {
    "loading": "Loading..."
  },
  "fr": {
    "loading": "Chargement"
  }
}
</i18n>
<template>
    <section v-if="visible" class="aeris-metadata-host">
        <div id="aerisMetadataContent" class="aeris-metadata_content grid">
            <slot />
        </div>
    </section>
</template>

<script>
import { computeUuid } from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/utils/utils.js";

export default {
    name: "aeris-metadata-services",

    props: {
        language: {
            type: String,
            default: "en",
        },
        visible: {
            type: Boolean,
            default: true,
        },
        service: {
            type: String,
            default: "",
        },
        identifier: {
            type: String,
            default: "",
        },
        program: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            currentMetadata: null,
        };
    },

    watch: {
        language(value) {
            this.$i18n.locale = value;
        },

        identifier() {
            this.refresh();
        },
        service() {
            this.refresh();
        },
        currentMetadata(value) {
            this.$emit("metadata", value);
        },
    },

    mounted() {
        this.$i18n.locale = this.language;
        this.refresh();
    },

    methods: {
        refresh() {
            if (this.service && this.identifier) {
                const url = `${this.service}${
                    this.service.endsWith("/") ? "" : "/"
                }${this.identifier}`;
                console.log(url);

                let uuid = computeUuid();

                const notification = {
                    message: this.$i18n.t("loading"),
                    type: "wait",
                    uuid: uuid,
                };
                this.$store.dispatch("addNewNotification", notification);
                this.axios.get(url).then(
                    (response) => {
                        this.handleSuccess(response, uuid);
                    },
                    (error) => {
                        this.handleError(error, uuid);
                    }
                );
            }
        },

        handleSuccess(response, uuid) {
            this.$store.dispatch("deleteNotification", uuid);
            this.currentMetadata = response.data;
        },

        handleError(error, uuid) {
            this.$store.dispatch("deleteNotification", uuid);
            this.currentMetadata = null;
        },
    },
};
</script>

<style scoped>
.aeris-metadata-host {
    display: block;
    font-size: 14px;
}

.aeris-metadata-host * {
    box-sizing: border-box;
}
</style>
