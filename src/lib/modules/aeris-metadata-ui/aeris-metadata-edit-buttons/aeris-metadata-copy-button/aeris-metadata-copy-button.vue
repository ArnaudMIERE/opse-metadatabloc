<i18n  >
  {
    "en": {
      "clone": "Clone"
    },
    "fr": {
      "clone": "Cloner"
    }
  }
</i18n>

<template>
    <v-tooltip right color="white black--text">
        <template v-slot:activator="{ on }">
            <v-btn
                icon
                class="text-end"
                @click.stop="clone()"
                @mouseenter.stop="mouseEnterIcon()"
                @mouseleave.stop="mouseLeaveIcon()"
                v-on="on"
            >
                <v-icon v-if="!showHoverText" :small="useSmallIcon"
                    >mdi-clipboard-plus-outline</v-icon
                >
                <span class="caption" v-else>{{ textDeleteTranslated }}</span>
            </v-btn>
        </template>
        <span class="caption">{{ $t("clone") }}</span>
    </v-tooltip>
</template>

<script>
import i18nMixin from "../../../../mixins/i18nMixin";
export default {
    name: "aeris-metadata-copy-button",
    mixins: [i18nMixin],
    props: {
        useSmallIcon: {
            type: Boolean,
            default: false,
        },
        useHoverTest: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isShowingTextEdit: false,
        };
    },

    computed: {
        textDeleteTranslated() {
            return this.$t("clone");
        },
        showHoverText() {
            return this.useHoverTest && this.isShowingTextEdit;
        },
    },

    methods: {
        clone() {
            // this.$emit("copy");
            this.$emit("clone-contact");
        },
        mouseEnterIcon() {
            this.isShowingTextEdit = true;
        },
        mouseLeaveIcon() {
            this.isShowingTextEdit = false;
        },
    },
};
</script>