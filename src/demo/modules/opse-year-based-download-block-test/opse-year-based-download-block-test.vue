<template>
  <section>
    <opse-year-based-download-block
      :metadata="metadata1"
      :theme="theme"
    ></opse-year-based-download-block>
  </section>
</template>

<script>
import opseYearBasedDownloadBlock from "@/lib/modules/opse-year-based-download-block/opse-year-based-download-block.vue";
export default {
  name: "opse-year-based-download-test",

  components: { opseYearBasedDownloadBlock },

  data() {
    return {
      metadata1: {
        id: "36064eb9-c781-4a5d-a8f2-1e80cd8dc121",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "http://localhost:8604/",
            name: "",
            description: { en: "Opensearch data access", fr: "" },
          },
        ],
        parameterSet: [
          {
            thesaurusCode: "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
            shortName: "NEE_micmolm2s_20m",
            longName: "Net Ecosystem Exchange (µmol m-2 s-1), at 20m",
            uom: "degré celcius",
            comment: {
              en: null,
              fr: null,
            },
            type: "",
            cfStandardName: "",
            label: "Land Surface.Soils.Soil Temperature.null",
          },
          {
            thesaurusCode: "LAND_SURFACE.SOILS.SOIL_TEMPERATURE.NULL",
            shortName: "LE_Wm2__20m",
            longName: "Latent heat flux (W m-2), at 20m",
            uom: "degré celcius",
            comment: {
              en: null,
              fr: null,
            },
            type: "",
            cfStandardName: "",
            label: "Land Surface.Soils.Soil Temperature.null",
          },
        ],

        "contacts" : [ 
        {
            "firstName" : "",
            "lastName" : "",
            "name" : "SEDOO",
            "nameType" : "Organizational",
            "email" : "contact@sedoo.fr",
            "organisation" : "",
            "organisations" : [],
            "comment" : {
                "en" : "",
                "fr" : ""
            },
            "address" : {
                "street" : "",
                "city" : "",
                "postalCode" : "",
                "country" : ""
            },
            "roles" : [ 
                "metadatapointofcontact"
            ],
            "orcId" : "",
            "ror" : "",
            "webSiteUrl" : "https://www.sedoo.fr",
            "temporalExtents" : [ 
                {
                    "beginDate" : "",
                    "endDate" : "now",
                    "comment" : null
                }
            ]
        }, 
        {
            "firstName" : "Arnaud",
            "lastName" : "MIERE",
            "name" : "",
            "nameType" : "Personal",
            "email" : "arnaud_salsero@yahoo.fr",
            "organisation" : "",
            "organisations" : [ 
                {
                    "name" : "IRD",
                    "country" : "France"
                }
            ],
            "comment" : {
                "en" : "",
                "fr" : ""
            },
            "address" : {
                "street" : "",
                "city" : "",
                "postalCode" : "",
                "country" : ""
            },
            "roles" : [ 
                "pointofcontact"
            ],
            "orcId" : "",
            "ror" : "",
            "webSiteUrl" : "",
            "temporalExtents" : [ 
                {
                    "beginDate" : "",
                    "endDate" : "now",
                    "comment" : null
                }
            ]
        }, 
        {
            "firstName" : "Mobalie",
            "lastName" : "Danger",
            "name" : "",
            "nameType" : "Personal",
            "email" : "mobalie@gmx.com",
            "organisation" : "",
            "organisations" : [],
            "comment" : {
                "en" : "",
                "fr" : ""
            },
            "address" : {
                "street" : "",
                "city" : "",
                "postalCode" : "",
                "country" : ""
            },
            "roles" : [ 
                "principalinvestigator"
            ],
            "orcId" : "",
            "ror" : "",
            "webSiteUrl" : "",
            "temporalExtents" : [ 
                {
                    "beginDate" : "",
                    "endDate" : "now",
                    "comment" : null
                }
            ]
        }
    ],

    "resourceTitle" : {
        "en" : "Test mail Arnaud",
        "fr" : "Copie de Répartition de la culture de l'embouche bovine par village de l'OPSE en 2012"
    },
      },
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "#AAA",
      },
    };
  },
};
</script>